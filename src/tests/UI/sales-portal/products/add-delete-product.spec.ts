//import { test, expect } from "@playwright/test";
import { test, expect } from "fixtures/business.fixture";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";

test.describe("[Sales Portal] Login, add new product and delete new product", async () => {
  test("Add new product and delete it", async ({ homePage, addNewProductPage, loginPage, productsListPage }) => {
    await homePage.open();

    await expect(loginPage.loginPageText).toBeVisible();
    await loginPage.fillCredentials(credentials.username, credentials.password);
    await loginPage.loginButtonClick();

    await homePage.waitForOpened();
    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForOpened();
    //Add new product
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();
    await productsListPage.checkNotification(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();

    //Delete product
    await productsListPage.deleteButton(productData.name).click();
    const { deleteModal } = productsListPage;
    await deleteModal.waitForOpened();
    await deleteModal.clickSubmitDelete();

    //Check if product is deleted
    await productsListPage.checkNotification(NOTIFICATIONS.PRODUCT_DELETED);
    await productsListPage.waitForOpened();
    await expect(productsListPage.tableRowByName(productData.name)).toHaveCount(0);
  });
});
