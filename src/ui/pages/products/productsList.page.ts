import { MANUFACTURERS } from "data/salesPortal/products/manufacturers.ts";
import { SalesPortalPage } from "../salesPortal.page.ts";
import { IProduct } from "data/types/product.types.ts";

export class ProductsListPage extends SalesPortalPage {
  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewProductButton = this.page.locator('[name="add-button"]');
  readonly tableRowByName = (productName: string) =>
    this.page.locator("table tbody tr", {
      has: this.page.locator("td", { hasText: productName }),
    });

  readonly uniqueElement = this.addNewProductButton;

  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }

  async getAddProductData(
    productName: string,
    position: number = 0,
  ): Promise<Pick<IProduct, "name" | "manufacturer" | "price">> {
    await this.waitForOpened();
    const [name = "", priceRaw = "", manufacturer] = (
      await this.tableRowByName(productName).nth(position).locator("td").allInnerTexts()
    ).map((text) => text.trim());

    const price = Number(priceRaw.replace(/\$/g, ""));

    return {
      name,
      price,
      manufacturer: manufacturer as MANUFACTURERS,
    };
  }
}
