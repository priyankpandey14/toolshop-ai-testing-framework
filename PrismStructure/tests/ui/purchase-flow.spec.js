const path = require('path');
const fs = require('fs');
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { RegisterPage } = require('../../pages/RegisterPage');
const { NavBar } = require('../../pages/NavBar');
const { ProductPage } = require('../../pages/ProductPage');
const { CartPage } = require('../../pages/CartPage');
const { CheckoutPage } = require('../../pages/CheckoutPage');
const { InvoicesPage } = require('../../pages/InvoicesPage');
const { ProfilePage } = require('../../pages/ProfilePage');
const { URLS, TIMEOUTS, MESSAGES } = require('../../utils/constants');
const {
  positiveLogin,
  invalidLogin,
  productSearch,
  checkoutDetails,
  buildRegistrationUser,
} = require('../../utils/testData');

const SCREENSHOTS_DIR = path.join(__dirname, '../../execution-evidence/screenshots');

async function captureScreenshot(page, fileName) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, fileName),
    fullPage: false,
    timeout: 30_000,
  });
}

async function loginAsValidUser(page) {
  const loginPage = new LoginPage(page);
  const navBar = new NavBar(page);
  await loginPage.navigateToLogin();
  await loginPage.verifyLoginPageLoaded();
  await loginPage.login(positiveLogin.email, positiveLogin.password);
  await expect(navBar.navMenu).toContainText(positiveLogin.displayName, {
    timeout: 30_000,
  });
}

async function searchAndAddProductToCart(page, query = productSearch.searchKeyword) {
  const productPage = new ProductPage(page);
  await productPage.navigateToHome();
  await productPage.searchProduct(query);
  await productPage.productNames.first().waitFor({ state: 'visible', timeout: 30_000 });

  const names = (await productPage.productNames.allTextContents())
    .map((name) => name.trim())
    .filter(Boolean);

  if (names.length === 0) {
    await productPage.navigateToHome();
    await productPage.productNames.first().waitFor({ state: 'visible', timeout: 30_000 });
    names.push(
      ...(await productPage.productNames.allTextContents()).map((name) => name.trim()).filter(Boolean),
    );
  }

  // Prefer an exact keyword match, then try a few other visible results for stock.
  const preferred = names.findIndex((name) => name.toLowerCase() === query.toLowerCase());
  const order = preferred >= 0
    ? [preferred, ...names.map((_, i) => i).filter((i) => i !== preferred)]
    : names.map((_, i) => i);

  for (const index of order.slice(0, 5)) {
    const listedName = names[index];
    await productPage.productNames.nth(index).click();
    const addToCart = page.getByTestId('add-to-cart');
    await addToCart.waitFor({ state: 'visible', timeout: 15_000 });
    if (!(await addToCart.isDisabled())) {
      await productPage.addProductToCart();
      return { productPage, productName: listedName };
    }
    await page.goBack();
    await productPage.productNames.first().waitFor({ state: 'visible', timeout: 15_000 });
  }

  throw new Error(`No in-stock product found for search: ${query}`);
}

async function completeCheckout(page) {
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  await cartPage.openCart();
  await checkoutPage.proceedToCheckout({ alreadySignedIn: true });
  await checkoutPage.fillShippingDetails({
    street: checkoutDetails.street,
    city: checkoutDetails.city,
    state: checkoutDetails.state,
    country: checkoutDetails.country,
    countryLabel: checkoutDetails.countryLabel,
    postalCode: checkoutDetails.postalCode,
    houseNumber: checkoutDetails.houseNumber,
  });
  await checkoutPage.placeOrder({ method: checkoutDetails.paymentMethod });
  const confirmationText = await checkoutPage.verifyOrderConfirmation();
  return { checkoutPage, confirmationText };
}

test.describe('Purchase Flow', () => {
  test('User Registration', { tag: '@Smoke' }, async ({ page }) => {
    test.setTimeout(TIMEOUTS.CHECKOUT);

    // Arrange
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const navBar = new NavBar(page);
    const profilePage = new ProfilePage(page);
    const user = buildRegistrationUser();

    // Act
    await registerPage.navigateToRegister();
    await registerPage.verifyRegisterPageLoaded();
    await registerPage.register(user);
    await loginPage.verifyLoginPageLoaded();
    await loginPage.login(user.email, user.password);

    // Assert
    await expect(navBar.navMenu).toContainText(`${user.firstName} ${user.lastName}`, {
      timeout: 30_000,
    });
    await navBar.openMyProfile();
    await profilePage.verifyProfilePageLoaded();
    const profile = await profilePage.getProfileValues();
    expect(profile.firstName).toBe(user.firstName);
    expect(profile.lastName).toBe(user.lastName);
    expect(profile.email).toBe(user.email);
    await captureScreenshot(page, '01-registration-success.png');
  });

  test('Valid Login', { tag: '@Smoke' }, async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const navBar = new NavBar(page);
    await loginPage.navigateToLogin();
    await loginPage.verifyLoginPageLoaded();

    // Act
    await loginPage.login(positiveLogin.email, positiveLogin.password);

    // Assert
    await expect(navBar.navMenu).toContainText(positiveLogin.displayName, {
      timeout: 30_000,
    });
    await expect(navBar.signInLink).toHaveCount(0);
    await captureScreenshot(page, '02-login-success.png');
  });

  test('Invalid Login', { tag: '@Regression' }, async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);
    const navBar = new NavBar(page);
    await loginPage.navigateToLogin();
    await loginPage.verifyLoginPageLoaded();

    // Act
    await loginPage.login(invalidLogin.email, invalidLogin.password, {
      expectSuccess: false,
    });

    // Assert
    await expect(loginPage.loginError).toHaveText(MESSAGES.INVALID_LOGIN);
    await expect(page).toHaveURL(new RegExp(URLS.LOGIN.replace(/\//g, '\\/')));
    await expect(navBar.signInLink).toBeVisible();
  });

  test('Product Search', { tag: '@Smoke' }, async ({ page }) => {
    // Arrange
    const productPage = new ProductPage(page);
    await loginAsValidUser(page);
    await productPage.navigateToHome();

    // Act
    await productPage.searchProduct(productSearch.searchKeyword);

    // Assert
    await expect(productPage.productByName(productSearch.name)).toBeVisible();
    await expect(productPage.noResultsMessage).toHaveCount(0);
    await captureScreenshot(page, '03-product-search-success.png');
  });

  test('Add Multiple Products to Cart', { tag: '@Smoke' }, async ({ page }) => {
    test.setTimeout(TIMEOUTS.CHECKOUT);

    // Arrange
    const cartPage = new CartPage(page);
    await loginAsValidUser(page);

    // Act — assessment AC2: add multiple items
    const first = await searchAndAddProductToCart(page, productSearch.searchKeyword);
    const second = await searchAndAddProductToCart(
      page,
      productSearch.secondSearchKeyword,
    );

    // Assert
    expect(first.productName).toBeTruthy();
    expect(second.productName).toBeTruthy();
    expect(first.productName).not.toBe(second.productName);
    expect(await cartPage.verifyCartItemCount()).toBeGreaterThanOrEqual(2);
    await captureScreenshot(page, '04-cart-success.png');
  });

  test('Update Quantity', { tag: '@Regression' }, async ({ page }) => {
    test.setTimeout(TIMEOUTS.VALIDATION);

    // Arrange
    const cartPage = new CartPage(page);
    await loginAsValidUser(page);
    const { productName } = await searchAndAddProductToCart(page);
    await cartPage.openCart();
    const quantityInput = page.getByRole('spinbutton', {
      name: `Quantity for ${productName}`,
    });
    const totalBefore = await cartPage.verifyTotal();
    const beforeValue = Number(totalBefore.replace(/[^0-9.]/g, ''));

    // Act
    await cartPage.updateQuantity(productName, productSearch.updatedQuantity);

    // Assert
    await expect(quantityInput).toHaveValue(String(productSearch.updatedQuantity));
    await expect
      .poll(
        async () => {
          const totalAfter = await cartPage.verifyTotal();
          return Number(totalAfter.replace(/[^0-9.]/g, ''));
        },
        { timeout: 20_000 },
      )
      .toBeGreaterThan(beforeValue);
  });

  test('Checkout and Order Confirmation', { tag: '@Smoke' }, async ({ page }) => {
    test.setTimeout(TIMEOUTS.CHECKOUT);

    // Arrange
    await loginAsValidUser(page);
    await searchAndAddProductToCart(page);

    // Act — COD checkout; finish is confirmed twice for invoice generation
    const { confirmationText } = await completeCheckout(page);

    // Assert
    expect(confirmationText).toMatch(MESSAGES.ORDER_CONFIRMATION);
    expect(confirmationText).toMatch(MESSAGES.INVOICE_NUMBER);
    await captureScreenshot(page, '05-checkout-success.png');
  });

  test('View Invoice in My Invoices', { tag: '@Regression' }, async ({ page }) => {
    test.setTimeout(TIMEOUTS.CHECKOUT);

    // Arrange
    const navBar = new NavBar(page);
    const invoicesPage = new InvoicesPage(page);
    await loginAsValidUser(page);
    await searchAndAddProductToCart(page);
    const { confirmationText } = await completeCheckout(page);
    const invoiceMatch = confirmationText.match(/INV-\d+/i);
    expect(invoiceMatch).toBeTruthy();
    const invoiceNumber = invoiceMatch[0];

    // Act
    await navBar.openMyInvoices();
    await invoicesPage.verifyInvoicesPageLoaded();
    await invoicesPage.waitForInvoice(invoiceNumber);

    // Assert
    await expect(invoicesPage.invoiceRowByNumber(invoiceNumber)).toBeVisible();
    await captureScreenshot(page, '06-my-invoices-success.png');
  });
});
