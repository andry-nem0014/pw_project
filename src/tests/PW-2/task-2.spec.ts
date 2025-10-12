/*
Разработать тест со следующими шагами:
  - открыть https://anatoly-karpovich.github.io/demo-login-form/
  - Засунуть в localStorage браузера данные test@gmail.com / SecretPw123!@# для логина на сайт
  - Залогиниться с данными что вы вставили в localStorage
  - Завалидировать успешный логин

  Рекоммендации:
  - Для доступа к localStorage используйте https://playwright.dev/docs/evaluating
*/

import { test, expect } from "@playwright/test";

interface ICreditentials {
  name: string;
  password: string;
}

test.describe("[demo-login-form]", () => {
  test("Should login with valid credentials", async ({ page }) => {
    const url = "https://anatoly-karpovich.github.io/demo-login-form/";
    const loginForm = page.locator("#loginForm");
    const submitButton = page.locator("#submit");
    const validCredentials: ICreditentials = {
      name: "test@gmail.com",
      password: "SecretPw123!@#",
    };
    const succsessMessage = `Hello, ${validCredentials.name}!`;
    const succsessMessageSelector = page.getByText(succsessMessage);

    await page.goto(url);
    await page.evaluate((validCredentials) => {
      return localStorage.setItem(validCredentials.name, JSON.stringify(validCredentials));
    }, validCredentials);

    await expect(loginForm).toBeVisible();
    await page.evaluate((validCredentials) => {
      const item = localStorage.getItem(validCredentials.name);
      if (item) {
        const credentials = JSON.parse(item);
        document.querySelector<HTMLInputElement>("#userName")!.value = credentials.name;
        document.querySelector<HTMLInputElement>("#password")!.value = credentials.password;
      }
    }, validCredentials);
    await submitButton.click();
    await expect(succsessMessageSelector).toBeVisible();
  });
});
