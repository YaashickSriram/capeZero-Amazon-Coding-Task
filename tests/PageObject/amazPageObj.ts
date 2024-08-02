import { Page } from 'playwright';

export class LoginPage {
    private page: Page;
    private EMAIL_INPUT = "//input[@name='email'] | //input[@id='ap_email']";
    private CONTINUE_BUTTON = '#continue';
    private PASSWORD_INPUT = '#ap_password';
    private SIGN_IN_BUTTON = '#signInSubmit';
    //private ACCOUNT_LINK = '#nav-link-accountList-nav-line-1';

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToLoginPage() {
        await this.page.goto(process.env.baseURL!);
        await this.page.click('#nav-link-accountList');
    }

    async login(username: string, password: string) {
        
        await this.page.fill(this.EMAIL_INPUT, username);
        await this.page.click(this.CONTINUE_BUTTON);
        await this.page.fill(this.PASSWORD_INPUT, password);
        await this.page.click(this.SIGN_IN_BUTTON);
        await this.page.waitForTimeout(9000) // To handle intermediate navaigation for OTP or Captcha 
    }

    // async isLoggedIn(): Promise<boolean> {
    //     return await this.page.isVisible(this.ACCOUNT_LINK);
    // }
}
