/*
Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
https://anatoly-karpovich.github.io/demo-login-form/

Требования:
Страница регистрации:
  Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, 
  как и имя состоящее из одних пробелов
  Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем 
  и нижнем регистрах, пароль из одних пробелов запрещен

1. Пароль валидный
1.1 Имя меньше 3 символов
1.2 Имя больше 40 символов
1.3 Имя состоящее из пробелов
1.4 Имя с префиксным пробелом
1.5 Имя с постфиксным пробелом
1.6 Имя не введено
2. Имя валидный
2.1 Пароль меньше 8 символов
2.2 Пароль больше 20 символов
2.3 Пароль состоящий из пробелов
2.4 Пароль без букв в верхнем регистре
2.5 Пароль без букв в нижнем регистре
2.6 Пароль не введен
*/

import { expect, test } from "@playwright/test";
// import fs from "fs";
// import path from "path";

import userData from "./register.data.ts";

// const file = path.resolve(`${process.cwd()}/src/tests/PW-3/task-1/userdata.json`);
// const userData = JSON.parse(fs.readFileSync(file, "utf-8"));

test.describe("[Demo Login Form] Registration", () => {
  const url = "https://anatoly-karpovich.github.io/demo-login-form/";

  for (const { title, credentials, errorMessage } of userData) {
    test(title, async ({ page }) => {
      await page.goto(url);
      const registerOnLoginButton = page.locator("//input[@id='registerOnLogin']");
      await expect(registerOnLoginButton).toBeVisible();
      await registerOnLoginButton.click();

      const registerForm = page.locator("div.registerForm");
      const registerFormTitle = registerForm.locator("#registerForm");
      await expect(registerFormTitle).toBeVisible();
      const userNameInput = registerForm.locator("#userNameOnRegister");
      const userPasswordInput = registerForm.locator("#passwordOnRegister");
      const applyRegistryButton = registerForm.locator("input#register");
      const errorRegisterMessage = registerForm.locator("h4");

      const { username, password } = credentials;
      await userNameInput.fill(username);
      await userPasswordInput.fill(password);
      await applyRegistryButton.click();

      await expect(errorRegisterMessage).toHaveText(errorMessage);
    });
  }
});
