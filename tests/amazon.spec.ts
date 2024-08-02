import { chromium, Browser, Page } from 'playwright';
import { expect, test } from '@playwright/test';
import {LoginPage} from './PageObject/amazPageObj'
import { ProductPage } from './PageObject/ProductPage';
import { SearchPage } from './PageObject/HomePage';
import { decrypt, email , password} from '../src/config/utils/CryptoJS';
import path from 'path';
import fs from 'fs';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;
let productPage: ProductPage;
let searchPage : SearchPage

test.describe('Amazon.in Automation Tests', () => {
    test.beforeAll(async () => {
        browser = await chromium.launch();
        page = await browser.newPage();
        loginPage = new LoginPage(page);

        await loginPage.navigateToLoginPage();
        await loginPage.login(decrypt(email), decrypt(password)); 

        //  const isLoggedIn = await loginPage.isLoggedIn();
        //  expect(isLoggedIn).toBe(true);
    });

    test.afterAll(async () => {
        await browser.close();
    });

    test.beforeEach(async () => {
        // Ensure screenshots directory exists
        const screenshotsDir = path.join(__dirname, 'screenshots');
        if (!fs.existsSync(screenshotsDir)) {
            fs.mkdirSync(screenshotsDir);
        }
    });

    test.afterEach(async ({}, testInfo) => {
        if (testInfo.status === 'failed') {
            const screenshotPath = path.join(__dirname, `screenshots/${testInfo.title}.png`);
            await page.screenshot({ path: screenshotPath });
            console.log(`Screenshot taken for failed test: ${screenshotPath}`);
        }
        
    test('Search for Shoes', async () => {
        searchPage = new SearchPage(page)
        await searchPage.searchFor('Shoes');
        const searchResult = await searchPage.isSearchResultsVisible();
        expect(searchResult).toBe(true);
        
    });
    test('Apply Filters for Shoes Search', async () => {

        searchPage = new SearchPage(page)
        await searchPage.searchFor('Shoes');

        // Apply 'Brands: Adidas' filter
        await searchPage.applyAdidasFilter();
        const isAdidasFilterApplied = await searchPage.isAdidasFilterApplied();
        expect(isAdidasFilterApplied).toBe(true);

        // Apply 'Delivery Day: Get it by Tomorrow' filter
        await searchPage.applyDeliveryDayFilter();
        const isDeliveryDayFilterApplied = await searchPage.isDeliveryDayFilterApplied();
        expect(isDeliveryDayFilterApplied).toBe(true);
    });
    test('Select Shoe and Verify Details', async () => {
         searchPage = new SearchPage(page)
        await searchPage.searchFor('Shoes');

        // Apply filters before selecting the product
        await searchPage.applyAdidasFilter();
        await searchPage.applyDeliveryDayFilter();
        
    });

    test('Select and add the product to cart', async() =>{
        productPage = new ProductPage(page)

        await productPage.selectFirstProduct();

        // Capture product details
        const { title, color} = await productPage.getProductDetails();
        console.log(`Product details - Title: ${title}, Color: ${color}`);

        // Add to cart
        await productPage.addToCart();

        // Assert the navigation to the cart
        const isCartNavigationSuccessful = await productPage.isCartNavigationSuccessful();
        expect(isCartNavigationSuccessful).toBe(true);
    })
});
})