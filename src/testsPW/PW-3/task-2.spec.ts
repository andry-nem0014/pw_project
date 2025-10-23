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

async function getTableRow(page: Page, email: string): Promise<TableRow | null> {
  // Таблица Example 2 имеет id="table2"
  const table = page.locator("#table1");
  // Считываем все строки тела таблицы
  const rows = await table.locator("tbody tr").all();

  for (const row of rows) {
    // Получаем все ячейки <td> строки
    const cells = await row.locator("td").all();
    // В третьей ячейке находится Email (индекс 2)
    const rowEmail = (await cells[2]!.innerText()).trim();
    if (rowEmail === email) {
      // Возвращаем объект с данными из ячеек - строго по спецификации
      return {
        "Last Name": (await cells[0]!.innerText()).trim(),
        "First Name": (await cells[1]!.innerText()).trim(),
        Email: (await cells[2]!.innerText()).trim(),
        Due: (await cells[3]!.innerText()).trim(),
        "Web Site": (await cells[4]!.innerText()).trim(),
      };
    }
  }
  return null;
}

// Тест проверки функции на всех email из таблицы Example 2
test("getTableRow returns correct row object for each email in table1", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/tables");
  const table = page.locator("#table2");
  const rows = await table.locator("tbody tr").all();

  // Собираем все email'ы из третьего столбца
  const emails: string[] = [];
  for (const row of rows) {
    const email = (await row.locator("td").nth(2).innerText()).trim();
    emails.push(email);
  }

  // Проверяем корректность результата для каждого email
  for (const email of emails) {
    const data = await getTableRow(page, email);
    expect(data).not.toBeNull();
    expect(data?.Email).toBe(email);

    // Дополнительные строгие проверки типа
    expect(typeof data?.["Last Name"]).toBe("string");
    expect(typeof data?.["First Name"]).toBe("string");
    expect(typeof data?.Due).toBe("string");
    expect(typeof data?.["Web Site"]).toBe("string");
  }
});
