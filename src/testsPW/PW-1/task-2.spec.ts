import { expect, test } from "@playwright/test";

interface ICreditentials {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: number;
  language: string;
  date: {
    day: string;
    month: string;
    year: string;
  };
  superPassword: string;
}

test.describe("[demo-registration-form]", () => {
  test("Sucssfully registered", async ({ page }) => {
    const url = "https://anatoly-karpovich.github.io/demo-registration-form/";
    const validCredentials: ICreditentials = {
      firstName: "Andry",
      lastName: "Nemtsev",
      address: "350 5th Avenue, New York, NY, 10118",
      email: "aaa@aa.aa",
      phone: 71111111111,
      language: "English",
      date: {
        day: "1",
        month: "March",
        year: "1991",
      },
      superPassword: "1234567890",
    };
    const userFirstNameInput = page.locator("input#firstName");
    const userLastNameInput = page.locator("input#lastName");
    const userAddressInput = page.locator("textarea#address");
    const userPhoneInput = page.locator("input#phone");
    const userEmailInput = page.locator("input#email");
    const selectorCountry = page.locator("select#country");
    const userGender = page.locator("//div[@class = 'mb-3']//child::input[@value = 'male']");
    const userHobbies = page.locator("//div[@class = 'mb-3']//child::input[@value='Movies']");
    const userLanguage = page.locator("#language");
    const userSkill = page.locator("//select[@id = 'skills']//child::option[@value = 'JavaScript']");
    const userDateYearSelector = page.locator("//select[@id = 'year']");
    const userDateMonthSelector = page.locator("//select[@id = 'month']");
    const userDateDaySelector = page.locator("//select[@id = 'day']");
    const userPasswordInput = page.locator("input#password");
    const userConfirmPasswordInput = page.locator("input#password-confirm");
    const userSubmitButton = page.locator("button.btn-primary");
    const userDataSucsessRegistration = page.locator("h2.text-center");
    const userFullName = page.locator("#fullName");
    const backFormButton = page.locator("button.btn-primary");
    const mainPageTitle = page.locator("h2.text-center");

    await page.goto(url);
    await userFirstNameInput.fill(validCredentials.firstName);
    await userLastNameInput.fill(validCredentials.lastName);
    await userEmailInput.fill(validCredentials.email);
    await userAddressInput.fill(validCredentials.address);
    await userPhoneInput.fill(validCredentials.phone.toString());
    await selectorCountry.selectOption("USA");
    await userGender.check();
    await userHobbies.check();
    await userLanguage.fill(validCredentials.language);
    await userSkill.click();
    await userDateYearSelector.selectOption(validCredentials.date.year);
    await userDateMonthSelector.selectOption(validCredentials.date.month);
    await userDateDaySelector.selectOption(validCredentials.date.day);
    await userPasswordInput.fill(validCredentials.superPassword);
    await userConfirmPasswordInput.fill(validCredentials.superPassword);
    await userSubmitButton.click();
    await expect(userDataSucsessRegistration).toHaveText("Registration Details");
    await expect(userFullName).toHaveText(`${validCredentials.firstName} ${validCredentials.lastName}`);
    await backFormButton.click();
    await expect(mainPageTitle).toHaveText("Register");
  });
});

/*
Создайте ОДИН смоук тест со следующими шагами:

1. Переход на страницу https://anatoly-karpovich.github.io/demo-registration-form/
2. Заполните форму регистрации
3. Проверьте, что пользователь успешно зарегистрирован

*/
