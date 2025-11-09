import { SALES_PORTAL_URL, credentials } from "config/env";
import { test as base, expect } from "fixtures";

export const test = base.extend<{
  loginAsAdmin: () => Promise<void>;
}>({
  loginAsAdmin: async ({ page, homePage }, use) => {
    await use(async () => {
      // const token = await loginApiService.loginAsAdmin();
      // await page.context().addCookies([
      //   {
      //     name: "Authorization",
      //     value: token,
      //     domain: "localhost",
      //     path: "/",
      //     expires: -1,
      //     httpOnly: false,
      //     secure: false,
      //     sameSite: "Lax",
      //   },
      // ]);
      const emailInput = page.locator("#emailinput");
      const passwordInput = page.locator("#passwordinput");
      const loginButton = page.locator("button[type='submit']");

      await page.goto(SALES_PORTAL_URL);
      await emailInput.fill(credentials.username);
      await passwordInput.fill(credentials.password);
      await loginButton.click();

      await homePage.waitForOpened();
    });
  },
});

export { expect };
