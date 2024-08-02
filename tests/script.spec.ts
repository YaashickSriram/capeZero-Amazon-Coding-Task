import {test,expect, chromium, Browser, Page} from '@playwright/test'

// test.describe("Ama", () => {
//     let context
//     let browser : Browser
//     let page : Page
// test.beforeAll(async () => {
//     // browser = chromium.launch({
//     //     headless : false,
//     //     channel : 'chrome',
//     //     executablePath : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
//     // })
//     context = browser.newContext() 
//     page = context.
// })
const authFile = "src/config/auth.json"
let browser: Browser;
let page: Page;

test('Login', async ({page}) => {
    let email : string = 'yaashshiva1012@gmail.com'
    let password : string = "ShivaSaiYS@101296"
    // browser = await chromium.launch();
    //     page = await browser.newPage();
await page.goto("https://www.amazon.com")
await page.waitForSelector("//div[@id='nav-signin-tooltip']//span[text()='Sign in']")
await page.locator("//div[@id='nav-signin-tooltip']//span[text()='Sign in']").click()
await page.waitForLoadState('domcontentloaded')
await expect(page.locator("//input[@id='ap_email']")).toBeVisible({timeout : 10000})
await page.locator("//input[@id='ap_email']").fill(email);
await page.locator("//input[@type='submit']").click()
await page.locator("//input[@id='ap_password']").fill(password)
await page.waitForSelector("//input[@name='rememberMe']")
await page.locator("//input[@name='rememberMe']").check()
await page.locator("//input[@id='signInSubmit']").click()
expect(page.locator("//a[@id='nav-logo-sprites']")).toBeVisible
await page.waitForTimeout(15000)
await page.context().storageState({path : authFile})
})

test('Hompage', async({browser}) => {
    const context = await browser.newContext({storageState : authFile})
    const page = await context.newPage()
    await page.goto('https://www.amazon.in/?ref_=nav_signin')
})
test.only('ENV', () => {
    console.log(process.env.NODE_ENV)
    console.log(process.env.userid)
})
// test('Ensure Name', async ({browser}) => {
//     const context = await browser.newContext({storageState : authFile})
//     const page = await context.newPage()
//     //await page.goto("https://www.amazon.in")
//     const element = page.locator('//*[@id="nav-link-accountList-nav-line-1"]')
//     expect(element).toBeVisible
//     const text = await element.innerText()
//     console.log(element)
// })

// Search for 'Shoes'
        // await page.fill('#twotabsearchtextbox', 'Shoes');
        // await page.click('#nav-search-submit-button');
        // await page.waitForSelector('.s-main-slot');

        // // Apply 'Brands: Adidas' filter
        // await page.click('span.a-size-base:has-text("Adidas")');
        // await page.waitForSelector('span.a-size-base.a-color-base:has-text("Adidas")');
        // const isAdidasFilterApplied = await page.isVisible('span.a-size-base.a-color-base:has-text("Adidas")');
        // expect(isAdidasFilterApplied).toBe(true);

        // // Apply 'Delivery Day: Get it by tomorrow' filter
        // await page.click('span.a-size-base:has-text("Get it by Tomorrow")');
        // await page.waitForSelector('span.a-size-base.a-color-base:has-text("Get it by Tomorrow")');
        // const isDeliveryDayFilterApplied = await page.isVisible('span.a-size-base.a-color-base:has-text("Get it by Tomorrow")');
        // expect(isDeliveryDayFilterApplied).toBe(true);

        // await page.fill('#twotabsearchtextbox', 'Shoes');
        // await page.click('#nav-search-submit-button');
        // await page.waitForSelector('.s-main-slot');

