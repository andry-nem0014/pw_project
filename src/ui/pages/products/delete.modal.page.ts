import { SalesPortalPage } from "../salesPortal.page";

export class DeleteProductModal extends SalesPortalPage {
  readonly uniqueElement = this.page.locator("//div[@class = 'modal-content']");
  readonly title = this.uniqueElement.locator("h5");
  readonly submitDeleteButton = this.uniqueElement.locator("button[type='submit']");
  readonly cancelButton = this.uniqueElement.locator("button.btn-secondary");

  async clickCancel() {
    await this.cancelButton.click();
  }

  async clickSubmitDelete() {
    await this.submitDeleteButton.click();
  }
}
