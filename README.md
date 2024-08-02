# Amazon Automation Test Project

## Folder Structure


## Test File :
newAmz.spec.ts

## How to Run the Tests
 Command : npx playwright test newAmz.spec.ts --headed --project=chromium

### Test Cases

1. **Login to the application with user credentials and ensure that you are logged in**
2. **Search for 'Shoes' in the navigation bar and hit search**
3. **Apply filters for 'Shoes' search**
   - Brands: Adidas
   - Delivery Day: Get it by tomorrow
4. **Select a shoe and verify details**
5. **Select and add the product to the cart**

## Utils

### 1. Logger
Located in `src/config/utils/logger.ts`, this utility is used to log important information during test execution. It uses the Winston library to log messages to the console and a file.

### 2. CryptoJS
Located in `src/config/utils/CryptoJS.ts`, this utility is used to encrypt and decrypt login credentials. It uses the CryptoJS library to securely handle sensitive data.

## Page Objects

### 1. amazPageObj.ts
This page object contains methods for the login functionality on Amazon.

### 2. ProductPage.ts
This page object contains methods related to product selection and details on Amazon.

### 3. HomePage.ts
This page object contains methods for searching products and applying filters on Amazon.

