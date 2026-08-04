const { URLS, MESSAGES } = require('../utils/constants');

class ProductPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByTestId('search-query');
    this.searchButton = page.getByTestId('search-submit');
    this.productNames = page.getByTestId('product-name');
    this.unitPrice = page.getByTestId('unit-price');
    this.addToCartButton = page.getByTestId('add-to-cart');
    this.addedToCartMessage = page.getByTestId('product-added-to-cart');
    this.noResultsMessage = page.getByText(MESSAGES.NO_PRODUCTS_FOUND);
  }

  async navigateToHome() {
    await this.page.goto(URLS.HOME);
  }

  /**
   * @param {string} productName
   */
  productByName(productName) {
    return this.productNames.filter({ hasText: productName }).first();
  }

  /**
   * @param {string} query
   */
  async searchProduct(query) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  /**
   * @param {string} productName
   */
  async openProduct(productName) {
    await this.productByName(productName).click();
  }

  async addProductToCart() {
    const enabledAddToCart = this.page.locator(
      '[data-test="add-to-cart"]:not([disabled])',
    );
    await enabledAddToCart.waitFor({ state: 'visible' });

    const cartBadge = this.page.getByTestId('cart-quantity');
    const previousCount = (await cartBadge.isVisible())
      ? Number((await cartBadge.innerText()).trim())
      : 0;

    // Prefer the item-add response (POST /carts/{id}) over cart creation (POST /carts).
    const cartResponse = this.page.waitForResponse(
      (response) =>
        /\/carts\/[^/?]+$/.test(new URL(response.url()).pathname) &&
        response.request().method() === 'POST' &&
        response.ok(),
    );
    await enabledAddToCart.click();
    await cartResponse;

    // Toast is ephemeral; fall back to cart badge when it has already dismissed.
    const toastAppeared = await this.addedToCartMessage
      .waitFor({ state: 'visible', timeout: 3_000 })
      .then(() => true)
      .catch(() => false);

    if (!toastAppeared) {
      await cartBadge.waitFor({ state: 'visible' });
      await this.page.waitForFunction(
        ({ selector, previous }) => {
          const badge = document.querySelector(selector);
          if (!badge) {
            return false;
          }
          return Number(badge.textContent.trim()) > previous;
        },
        { selector: '[data-test="cart-quantity"]', previous: previousCount },
      );
    }
  }

  // Readiness sync + values for test-layer assertions (no expect here).
  async verifyProductDetails() {
    await this.productNames.first().waitFor({ state: 'visible' });
    await this.unitPrice.waitFor({ state: 'visible' });
    await this.addToCartButton.waitFor({ state: 'visible' });

    return {
      name: (await this.productNames.first().innerText()).trim(),
      price: (await this.unitPrice.innerText()).trim(),
    };
  }

  /**
   * @param {string} query
   */
  async handleInvalidSearch(query) {
    await this.searchProduct(query);
    await this.noResultsMessage.waitFor({ state: 'visible' });
  }
}

module.exports = { ProductPage };
