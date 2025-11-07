import { SalesPortalPage } from "./salesPortal.page";

export class LoginPage extends SalesPortalPage {
  readonly emailInput = this.page.locator("#emailinput");
  readonly passwordInput = this.page.locator("#passwordinput");
  readonly loginButton = this.page.locator(".loginBtn");
  readonly loginPageText = this.page.locator(".lead");
  readonly uniqueElement = this.loginPageText;

  async fillCredentials(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async loginButtonClick(): Promise<void> {
    await this.loginButton.click();
  }
}
