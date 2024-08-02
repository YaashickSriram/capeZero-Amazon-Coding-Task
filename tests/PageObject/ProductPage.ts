import { Page } from 'playwright';

export class ProductPage {
    private page: Page;
    private FIRST_PRODUCT = "//span[normalize-space()='Choice']";
    private PRODUCT_TITLE = '#productTitle';
    private PRODUCT_COLOR = '#variation_color_name .selection';
    private PRODUCT_SIZE = '#variation_size_name .selection';
    private PRODUCT_PRICE = '#priceblock_ourprice, #priceblock_dealprice';
    private ADD_TO_CART_BUTTON = '#add-to-cart-button';
    private CART_NAVIGATION = '#nav-cart';

    constructor(page: Page) {
        this.page = page;
    }

    async selectFirstProduct() {
        await this.page.waitForLoadState('domcontentloaded')
        await this.page.click(this.FIRST_PRODUCT);
        await this.page.waitForLoadState('domcontentloaded')
        await this.page.waitForSelector(this.PRODUCT_TITLE);
    }

    async getProductDetails() {
        const title = await this.page.textContent(this.PRODUCT_TITLE);
        const color = await this.page.textContent(this.PRODUCT_COLOR);
        return { title, color };
    }

    async addToCart() {
        await this.page.click(this.ADD_TO_CART_BUTTON);
    }

    async isCartNavigationSuccessful(): Promise<boolean> {
        await this.page.waitForSelector(this.CART_NAVIGATION);
        return await this.page.isVisible(this.CART_NAVIGATION);
    }
}
