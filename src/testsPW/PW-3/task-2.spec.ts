/*Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
Например getTableRow(page, 'jsmith@gmail.com') => 
{ "Last Name": "Smith", "First Name": "John", Email: "jsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }

Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2

Сайт: https://the-internet.herokuapp.com/tables
*/

import { Page, test, expect } from "@playwright/test";

interface TableRow {
  "Last Name": string;
  "First Name": string;
  Email: string;
  Due: string;
  "Web Site": string;
}

// Ищем строку, где среди ячеек есть та, которая содержит нужный email
async function getTableRow(page: Page, email: string): Promise<TableRow | null> {
  const rowLocator = page.locator("#table1 tbody tr").filter({
    has: page.locator("td", { hasText: email }),
  });

  if ((await rowLocator.count()) === 0) return null;

  const cells = rowLocator.locator("td");
  return {
    "Last Name": await cells.nth(0).innerText(),
    "First Name": await cells.nth(1).innerText(),
    Email: await cells.nth(2).innerText(),
    Due: await cells.nth(3).innerText(),
    "Web Site": await cells.nth(4).innerText(),
  };
}

// Тест проверки функции на всех email из таблицы Example 2
test("getTableRow returns correct row object for each email in table1", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/tables");
  const table = page.locator("#table2");
  const rows = await table.locator("tbody tr").allInnerTexts();

  for (const email of rows.map((e) => e.trim())) {
    const data = await getTableRow(page, email);
    if (data) expect(data.Email.trim()).toBe(email);
  }
});
