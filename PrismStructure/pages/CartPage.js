const { MESSAGES } = require('../utils/constants');

class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.navCart = page.getByTestId('nav-cart');
    this.cartQuantityBadge = page.getByTestId('cart-quantity');
    this.productTitles = page.getByTestId('product-title');
    this.cartTotal = page.getByTestId('cart-total');
    this.emptyCartMessage = page.getByText(MESSAGES.CART_EMPTY);
  }

  /**
   * @param {string} productName
   */
  cartRowByProductName(productName) {
    return this.page.getByRole('row').filter({
      has: this.page.getByRole('cell', { name: productName, exact: true }),
    });
  }

  async openCart() {
    await this.navCart.click();
  }

  /**
   * @param {string} productName
   * @param {number|string} quantity
   */
  async updateQuantity(productName, quantity) {
    const quantityInput = this.page.getByRole('spinbutton', {
      name: `Quantity for ${productName}`,
    });
    await quantityInput.click();
    await quantityInput.fill('');
    const cartUpdate = this.page.waitForResponse(
      (response) =>
        /\/carts\//.test(response.url()) &&
        ['PUT', 'PATCH', 'POST'].includes(response.request().method()) &&
        response.ok(),
      { timeout: 15_000 },
    );
    await quantityInput.pressSequentially(String(quantity));
    await quantityInput.press('Tab');
    await cartUpdate.catch(() => undefined);
    await this.cartTotal.waitFor({ state: 'visible' });
  }

  /**
   * @param {string} productName
   */
  async removeProduct(productName) {
    await this.cartRowByProductName(productName)
      .locator('.btn-danger')
      .click();
  }

  // Readiness sync + value for test-layer assertions (no expect here).
  async verifyTotal() {
    await this.cartTotal.waitFor({ state: 'visible' });
    return (await this.cartTotal.innerText()).trim();
  }

  // Navbar badge reflects cart size; hidden badge means an empty cart.
  async verifyCartItemCount() {
    if (!(await this.cartQuantityBadge.isVisible())) {
      return 0;
    }

    return Number((await this.cartQuantityBadge.innerText()).trim());
  }
}

module.exports = { CartPage };
