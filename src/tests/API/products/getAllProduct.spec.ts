import { test } from "fixtures/api.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { getAllProductSchema } from "data/schemas/products/allProduct.schema";
import { createProductSchema } from "data/schemas/products/create.schema";
import { STATUS_CODES } from "data/statusCodes";
import { validateJsonSchema } from "utils/validation/validateSchema.utils";
import { validateResponse } from "utils/validation/validateResponse.utils";

test.describe("[API] [Sales Portal] [getAllProduct and find new product]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

  test("Get all products", async ({ loginApiService, productsApi }) => {
    //получаем токен авторизации
    token = await loginApiService.loginAsAdmin();

    //создаем продукт и проверяем схему
    const productData = generateProductData();
    const createdProduct = await productsApi.create(productData, token);
    validateResponse(createdProduct, {
      status: STATUS_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    id = createdProduct.body.Product._id;

    //проверяем наличие продукта по id
    const getProductResponse = await productsApi.getById(id, token);
    validateResponse(getProductResponse, {
      status: STATUS_CODES.OK,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    //получаем список всех продуктов и проверяем по схеме
    const allProdctList = await productsApi.getAll(token);
    validateJsonSchema(allProdctList.body, getAllProductSchema);
  });
});

// Написать смоук API тест на получение всех продуктов (без фильтрационных параметров) со следующими шагами:
//   - Залогиниться+
//   - Создать продукт и проверить 201й статус+
//   - Получить все продукты+
//   - создать и проверить схему
//   - проверить статус
//   - проверить, что в массиве тела респонса есть созданный продукт
//   - Проверить поля IsSuccess и ErrorMessage
