/*
Разработать тест со следующими шагами:
  - открыть https://the-internet.herokuapp.com/
  - перейти на страницу Dynamic Controls
  - Дождаться появления кнопки Remove
  - Завалидировать текста в заголовке страницы
  - Чекнуть чекбокс
  - Кликнуть по кнопке Remove
  - Дождаться исчезновения чекбокса
  - Проверить наличие кнопки Add
  - Завалидировать текст It's gone!
  - Кликнуть на кнопку Add
  - Дождаться появления чекбокса
  - Завалидировать текст It's back!

*/

import { test, expect } from "@playwright/test";

enum TEXT {
  TITLE = "Dynamic Controls",
  IT_IS_GONE = "It's gone!",
  IT_IS_BACK = "It's back!",
}

test.describe("[dynamic-controls]", () => {
  test("Dynamic Controls elements", async ({ page }) => {
    const url = "https://the-internet.herokuapp.com/";
    const removeButton = page.locator("//button[text() = 'Remove']");
    const title = page.getByText(TEXT.TITLE);
    const checkbox = page.locator("//input[@type = 'checkbox']");
    const loader = page.locator("//div[@id= 'loading'][1]");
    const addButton = page.locator("//button[text() = 'Add']");
    const GoneBackText = page.locator("p#message");

    await page.goto(url);
    await page.locator("//a[text() = 'Dynamic Controls']").click();
    await expect(removeButton).toBeVisible();
    await expect(title).toBeVisible();
    await checkbox.check();
    await checkbox.isChecked();
    await removeButton.click();
    await expect(loader).toBeVisible();
    await expect(loader).toBeVisible({ visible: false, timeout: 20000 });
    await expect(addButton).toBeVisible();
    await expect(GoneBackText).toHaveText(TEXT.IT_IS_GONE);
    await addButton.click();
    await expect(loader).toBeVisible();
    await expect(loader).toBeVisible({ visible: false, timeout: 20000 });
    await expect(checkbox).toBeVisible();
    await expect(GoneBackText).toHaveText(TEXT.IT_IS_BACK);
  });
});
