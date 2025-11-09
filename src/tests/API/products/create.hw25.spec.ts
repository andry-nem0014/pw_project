import { test, expect } from "fixtures/api.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { createProductSchema } from "data/schemas/products/create.schema";
import { IProduct } from "data/types/product.types";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { positiveTestData } from "data/salesPortal/products/positiveCreateTestData";
import { invalidTestData } from "data/salesPortal/products/invalidCreateTestData";
import { ERROR_MESSAGES } from "data/salesPortal/notifications";
import { errorSchema } from "data/schemas/core.schema";

test.describe("[API] [Sales Portal] [Create Product] [Positive Scenarios]", () => {
  let id = "";
  let token = "";
  let productData: IProduct;

  test.beforeEach(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
    productData = generateProductData();
  });

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

  test("Create Product, name without spaces", async ({ productsApi }) => {
    const createdProduct = await productsApi.create(productData, token);
    validateResponse(createdProduct, {
      status: STATUS_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    id = createdProduct.body.Product._id;

    const actualProductData = createdProduct.body.Product;
    expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);
  });

  test("Create Product, name with one spaces", async ({ productsApi }) => {
    const createdProduct = await productsApi.create(
      {
        ...productData,
        name: positiveTestData.name.nameOneSpase,
      } as unknown as IProduct,
      token,
    );
    validateResponse(createdProduct, {
      status: STATUS_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    id = createdProduct.body.Product._id;

    const actualProductData = createdProduct.body.Product;
    expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual({
      ...productData,
      name: positiveTestData.name.nameOneSpase,
    });
  });

  test("Create Product, min length name, minimal price, minimal amount", async ({ productsApi }) => {
    const createdProduct = await productsApi.create(
      {
        ...productData,
        name: positiveTestData.name.minLengthName,
        price: positiveTestData.price.minPrice,
        amount: positiveTestData.amount.minAmount,
      } as unknown as IProduct,
      token,
    );
    validateResponse(createdProduct, {
      status: STATUS_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    id = createdProduct.body.Product._id;

    const actualProductData = createdProduct.body.Product;
    expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual({
      ...productData,
      name: positiveTestData.name.minLengthName,
      price: positiveTestData.price.minPrice,
      amount: positiveTestData.amount.minAmount,
    });
  });

  test("Create Product, max length name, maximal price, maximal amount, maximal notes", async ({ productsApi }) => {
    const createdProduct = await productsApi.create(
      {
        ...productData,
        name: positiveTestData.name.maxLengthName,
        price: positiveTestData.price.maxPrice,
        amount: positiveTestData.amount.maxAmount,
        notes: positiveTestData.notes.maxNotes,
      } as unknown as IProduct,
      token,
    );
    validateResponse(createdProduct, {
      status: STATUS_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    id = createdProduct.body.Product._id;

    const actualProductData = createdProduct.body.Product;
    expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual({
      ...productData,
      name: positiveTestData.name.maxLengthName,
      price: positiveTestData.price.maxPrice,
      amount: positiveTestData.amount.maxAmount,
      notes: positiveTestData.notes.maxNotes,
    });
  });

  test("Create Product, without notes", async ({ productsApi }) => {
    const createdProduct = await productsApi.create(
      {
        ...productData,
        notes: positiveTestData.notes.minNotes,
      } as unknown as IProduct,
      token,
    );
    validateResponse(createdProduct, {
      status: STATUS_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    id = createdProduct.body.Product._id;

    const actualProductData = createdProduct.body.Product;
    expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual({
      ...productData,
      notes: positiveTestData.notes.minNotes,
    });
  });
});

test.describe("[API] [Sales Portal] [Create Product] [Negative Scenarios]", () => {
  let token = "";
  let productData: IProduct;

  test.beforeEach(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
    productData = generateProductData();
  });

  test("NOT create product with two spaces in name", async ({ productsApi }) => {
    const createdProduct = await productsApi.create(
      {
        ...productData,
        name: invalidTestData.name.nameTwoSpase,
      } as unknown as IProduct,
      token,
    );
    validateResponse(createdProduct, {
      status: STATUS_CODES.BAD_REQUEST,
      IsSuccess: false,
      ErrorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
      schema: errorSchema,
    });
  });

  test("NOT create product with less than 3 symbols in name", async ({ productsApi }) => {
    const createdProduct = await productsApi.create(
      {
        ...productData,
        name: invalidTestData.name.lessLengthName,
      } as unknown as IProduct,
      token,
    );
    validateResponse(createdProduct, {
      status: STATUS_CODES.BAD_REQUEST,
      IsSuccess: false,
      ErrorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
      schema: errorSchema,
    });
  });

  test("NOT create product with more than 40 symbols in name", async ({ productsApi }) => {
    const createdProduct = await productsApi.create(
      {
        ...productData,
        name: invalidTestData.name.highLengthName,
      } as unknown as IProduct,
      token,
    );
    validateResponse(createdProduct, {
      status: STATUS_CODES.BAD_REQUEST,
      IsSuccess: false,
      ErrorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
      schema: errorSchema,
    });
  });

  test("NOT create product without name", async ({ productsApi }) => {
    const { name, ...productDataWithoutName } = productData;
    const createdProduct = await productsApi.create(productDataWithoutName as unknown as IProduct, token);
    validateResponse(createdProduct, {
      status: STATUS_CODES.BAD_REQUEST,
      IsSuccess: false,
      ErrorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
      schema: errorSchema,
    });
  });

  test("NOT create product with duplicate name", async ({ productsApi }) => {
    const duplicateProductName = productData.name;
    const createdProduct = await productsApi.create(productData, token);
    validateResponse(createdProduct, {
      status: STATUS_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    const actualProductData = createdProduct.body.Product;
    expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);
    const createdDuplicateProduct = await productsApi.create({ ...productData, name: duplicateProductName }, token);
    validateResponse(createdDuplicateProduct, {
      status: STATUS_CODES.CONFLICT,
      IsSuccess: false,
      ErrorMessage: ERROR_MESSAGES.PRODUCT_ALREADY_EXISTS(duplicateProductName),
      schema: errorSchema,
    });
  });

  test("NOT create product without MANUFACTURER", async ({ productsApi }) => {
    const createdProduct = await productsApi.create({ ...productData, manufacturer: "" } as unknown as IProduct, token);
    validateResponse(createdProduct, {
      status: STATUS_CODES.BAD_REQUEST,
      IsSuccess: false,
      ErrorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
      schema: errorSchema,
    });
  });

  test("NOT create product without price", async ({ productsApi }) => {
    const { price, ...productDataWithoutPrice } = productData;
    const createdProduct = await productsApi.create(productDataWithoutPrice as unknown as IProduct, token);
    validateResponse(createdProduct, {
      status: STATUS_CODES.BAD_REQUEST,
      IsSuccess: false,
      ErrorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
      schema: errorSchema,
    });
  });

  test("NOT create product with zero price", async ({ productsApi }) => {
    const createdProduct = await productsApi.create(
      {
        ...productData,
        price: invalidTestData.price.zeroPrice,
      } as unknown as IProduct,
      token,
    );
    validateResponse(createdProduct, {
      status: STATUS_CODES.BAD_REQUEST,
      IsSuccess: false,
      ErrorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
      schema: errorSchema,
    });
  });

  test("NOT create product with negative price", async ({ productsApi }) => {
    const createdProduct = await productsApi.create(
      {
        ...productData,
        price: invalidTestData.price.negativePrice,
      } as unknown as IProduct,
      token,
    );
    validateResponse(createdProduct, {
      status: STATUS_CODES.BAD_REQUEST,
      IsSuccess: false,
      ErrorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
      schema: errorSchema,
    });
  });

  test("NOT create product with high price", async ({ productsApi }) => {
    const createdProduct = await productsApi.create(
      {
        ...productData,
        price: invalidTestData.price.highPrice,
      } as unknown as IProduct,
      token,
    );
    validateResponse(createdProduct, {
      status: STATUS_CODES.BAD_REQUEST,
      IsSuccess: false,
      ErrorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
      schema: errorSchema,
    });
  });

  test("NOT create product with fractional price", async ({ productsApi }) => {
    const createdProduct = await productsApi.create(
      {
        ...productData,
        price: invalidTestData.price.fractionalPrice,
      } as unknown as IProduct,
      token,
    );
    validateResponse(createdProduct, {
      status: STATUS_CODES.BAD_REQUEST,
      IsSuccess: false,
      ErrorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
      schema: errorSchema,
    });
  });

  test("NOT create product without amount", async ({ productsApi }) => {
    const { amount, ...productDataWithoutAmount } = productData;
    const createdProduct = await productsApi.create(productDataWithoutAmount as unknown as IProduct, token);
    validateResponse(createdProduct, {
      status: STATUS_CODES.BAD_REQUEST,
      IsSuccess: false,
      ErrorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
      schema: errorSchema,
    });
  });

  test("NOT create product with negative amount", async ({ productsApi }) => {
    const createdProduct = await productsApi.create(
      {
        ...productData,
        amount: invalidTestData.amount.negativeAmount,
      } as unknown as IProduct,
      token,
    );
    validateResponse(createdProduct, {
      status: STATUS_CODES.BAD_REQUEST,
      IsSuccess: false,
      ErrorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
      schema: errorSchema,
    });
  });

  test("NOT create product with fractional amount", async ({ productsApi }) => {
    const createdProduct = await productsApi.create(
      {
        ...productData,
        amount: invalidTestData.amount.fractionalAmount,
      } as unknown as IProduct,
      token,
    );
    validateResponse(createdProduct, {
      status: STATUS_CODES.BAD_REQUEST,
      IsSuccess: false,
      ErrorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
      schema: errorSchema,
    });
  });

  test("NOT create product with high amount", async ({ productsApi }) => {
    const createdProduct = await productsApi.create(
      {
        ...productData,
        amount: invalidTestData.amount.highAmount,
      } as unknown as IProduct,
      token,
    );
    validateResponse(createdProduct, {
      status: STATUS_CODES.BAD_REQUEST,
      IsSuccess: false,
      ErrorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
      schema: errorSchema,
    });
  });

  test("NOT create product with high notes", async ({ productsApi }) => {
    const createdProduct = await productsApi.create(
      {
        ...productData,
        notes: invalidTestData.notes.highNotes,
      } as unknown as IProduct,
      token,
    );
    validateResponse(createdProduct, {
      status: STATUS_CODES.BAD_REQUEST,
      IsSuccess: false,
      ErrorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
      schema: errorSchema,
    });
  });

  test("NOT create product with < and > symbols in notes", async ({ productsApi }) => {
    const createdProduct = await productsApi.create(
      {
        ...productData,
        notes: invalidTestData.notes.invalidSimbolNotes,
      } as unknown as IProduct,
      token,
    );
    validateResponse(createdProduct, {
      status: STATUS_CODES.BAD_REQUEST,
      IsSuccess: false,
      ErrorMessage: ERROR_MESSAGES.INCORRECT_REQUEST_BODY,
      schema: errorSchema,
    });
  });
});

// Используя DDT подход, напишите тест сьют для проверки эндпоинта создания продукта:
//   - с позитивными проверками

//   Используйте LoginApiService, ProductsApi, после каждого теста, где создастся продукт - удаляйте его.

//   Требования:
//   Name: обязательное, уникальное, Products's name should contain only 3-40 alphanumerical characters and one space between
//   Manufacturer: обязательное
//   Price: обязательное, Price should be in range 1-99999
//   Amount: обязательное, Amount should be in range 0-999
//   Notes: Notes should be in range 0-250 and without < or > symbols
