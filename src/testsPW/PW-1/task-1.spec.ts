import { expect, test } from "@playwright/test";

interface ICreditentials {
  username: string;
  password: string;
}

enum NOTIFICATION {
  SUCCESSFULLY_REGISTERED = "Successfully registered! Please, click Back to return on login page",
}

test.describe("[demo-login-form]", () => {
  test("Should register with valid credentials", async ({ page }) => {
    const url = "https://anatoly-karpovich.github.io/demo-login-form/";
    const userNameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerOnLoginButton = page.locator("//input[@id='registerOnLogin']");
    const applyRegistryButton = page.locator("input#register");
    const validCredentials: ICreditentials = {
      username: "Andrey",
      password: "SuperSecretPassword!",
    };
    const notification = page.locator("#errorMessageOnRegister");

    await page.goto(url);
    await registerOnLoginButton.click();
    await userNameInput.fill(validCredentials.username);
    await passwordInput.fill(validCredentials.password);
    await applyRegistryButton.click();
    await expect(notification).toHaveText(NOTIFICATION.SUCCESSFULLY_REGISTERED);
  });
});

/*
  Разработайте смоук тест-сьют с тестами на REGISTER на странице https://anatoly-karpovich.github.io/demo-login-form/

  Требования:
    Страница регистрации:
      Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
      Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен
    Страница логина:
      Username: обязательное
      Password: обязательное
*/
