import { chromium, Browser, Page } from 'playwright';
import { expect, test } from '@playwright/test';

let browser: Browser;
let page: Page;

test.describe('Amazon.in Automation Tests', () => {
    test.beforeAll(async () => {
        browser = await chromium.launch();
        page = await browser.newPage();
        await page.goto('https://www.amazon.in');
        
        // Login to Amazon.in
        await page.click('#nav-link-accountList');
        await page.fill('#ap_email', 'yaashshiva1012@gmail.com'); 
        await page.click('#continue');
        await page.fill('#ap_password', 'ShivaSaiYS@101296'); 
        await page.click('#signInSubmit');
        
        // Wait for login to complete
        await page.waitForSelector('#nav-link-accountList-nav-line-1');
        
        // Ensure login is successful
        const isLoggedIn = await page.isVisible('#nav-link-accountList-nav-line-1');
        expect(isLoggedIn).toBe(true);
    });

    test.afterAll(async () => {
        await browser.close();
    });

    test('Search for Shoes', async () => {
        await page.fill('#twotabsearchtextbox', 'Shoes');
        await page.click('#nav-search-submit-button');
        await page.waitForSelector('.s-main-slot');
        
        const searchResult = await page.isVisible('.s-main-slot');
        expect(searchResult).toBe(true);
    });
    
});
