import { test, expect } from "@playwright/test";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { IProduct } from "data/types/product.types";
import { HomePage } from "ui/pages/home.page";
import { LoginPage } from "ui/pages/login.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";

test.describe("[Sales Portal] Login, add new product and check new product", async () => {
  test("Login and add new product", async ({ page }) => {
    const homePage = new HomePage(page);
    const addNewProductPage = new AddNewProductPage(page);
    const productsListPage = new ProductsListPage(page);
    const loginPage = new LoginPage(page);

    await homePage.open();

    await expect(loginPage.loginPageText).toBeVisible();
    await loginPage.fillCredentials(credentials.username, credentials.password);
    await loginPage.loginButtonClick();

    await homePage.waitForOpened();
    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();

    //создаем обьект ожидаемого продукта для сравнения со сгеренерированными данными
    const expectedRow: Pick<IProduct, "name" | "manufacturer" | "price"> = {
      name: productData.name,
      price: productData.price,
      manufacturer: productData.manufacturer,
    };

    //вызываем getAddProductData, по умолчанию он берет первую строку (positinon = 0)
    const productDataFromRow = await productsListPage.getAddProductData(productData.name);

    expect(productDataFromRow).toEqual(expectedRow);
    console.log(`Product ${productDataFromRow.name} is first in table`);
  });
});
