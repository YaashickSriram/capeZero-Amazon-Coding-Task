import { Page } from 'playwright';

export class SearchPage {
    private page: Page;
    private SEARCH_INPUT = '#twotabsearchtextbox';
    private SEARCH_BUTTON = '#nav-search-submit-button';
    private SEARCH_RESULTS_SELECTOR = '.s-main-slot';
    private ADIDAS_FILTER = 'span.a-size-base:has-text("Adidas")';
    private DELIVERY_DAY_FILTER = 'span.a-size-base:has-text("Get it by Tomorrow")';

    constructor(page: Page) {
        this.page = page;
    }

    async searchFor(query: string) {
        await this.page.fill(this.SEARCH_INPUT, query);
        await this.page.click(this.SEARCH_BUTTON);
        await this.page.waitForSelector(this.SEARCH_RESULTS_SELECTOR);
    }

    async isSearchResultsVisible(): Promise<boolean> {
        return await this.page.isVisible(this.SEARCH_RESULTS_SELECTOR);
    }

    async applyAdidasFilter() {
        await this.page.click(this.ADIDAS_FILTER);
        await this.page.waitForSelector(this.ADIDAS_FILTER);
    }

    async isAdidasFilterApplied(): Promise<boolean> {
        return await this.page.isVisible(this.ADIDAS_FILTER);
    }

    async applyDeliveryDayFilter() {
        await this.page.waitForLoadState('domcontentloaded')
        await this.page.click(this.DELIVERY_DAY_FILTER);
        await this.page.waitForSelector(this.DELIVERY_DAY_FILTER);
    }

    async isDeliveryDayFilterApplied(): Promise<boolean> {
        return await this.page.isVisible(this.DELIVERY_DAY_FILTER);
    }
}
