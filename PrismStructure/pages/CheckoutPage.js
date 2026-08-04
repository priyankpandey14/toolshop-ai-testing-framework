const { expect } = require('@playwright/test');
const { MESSAGES, PAYMENT } = require('../utils/constants');

class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.proceedFromCart = page.getByTestId('proceed-1');
    this.proceedFromSignIn = page.getByTestId('proceed-2');
    this.proceedFromAddress = page.getByTestId('proceed-3');

    this.streetInput = page.getByTestId('street');
    this.cityInput = page.getByTestId('city');
    this.stateInput = page.getByTestId('state');
    this.countryInput = page.getByTestId('country');
    this.postalCodeInput = page.getByRole('textbox', { name: /postal code/i });
    this.houseNumberInput = page.getByRole('textbox', { name: /house number/i });

    this.paymentMethodSelect = page.getByTestId('payment-method');
    this.creditCardNumber = page.getByTestId('credit_card_number');
    this.expirationDate = page.getByTestId('expiration_date');
    this.cvv = page.getByTestId('cvv');
    this.cardHolderName = page.getByTestId('card_holder_name');
    this.finishButton = page.getByTestId('finish');

    this.paymentSuccessMessage = page.getByText(MESSAGES.PAYMENT_SUCCESS);
    this.orderConfirmationMessage = page.getByText(MESSAGES.ORDER_THANKS);
  }

  /**
   * Leaves the cart step. When alreadySignedIn, also continues past the sign-in step.
   * @param {{ alreadySignedIn?: boolean }} [options]
   */
  async proceedToCheckout({ alreadySignedIn = true } = {}) {
    await this.proceedFromCart.click();

    if (alreadySignedIn) {
      await this.proceedFromSignIn.click();
    }
  }

  /**
   * Toolshop billing address uses country + postal code + house number, then
   * auto-fills street/city/state via postcode lookup.
   * @param {{
   *   street?: string,
   *   city?: string,
   *   state?: string,
   *   country: string,
   *   countryLabel?: string,
   *   postalCode: string,
   *   houseNumber: string,
   * }} shippingDetails
   */
  async fillShippingDetails(shippingDetails) {
    const {
      street,
      city,
      state,
      country,
      countryLabel,
      postalCode,
      houseNumber,
    } = shippingDetails;

    await this.countryInput.waitFor({ state: 'visible' });
    await this.page
      .waitForResponse(
        (response) =>
          response.url().includes('/users/me') && response.ok(),
        { timeout: 8_000 },
      )
      .catch(() => undefined);

    await this.#setCountry(country, countryLabel);

    const lookupPromise = this.page.waitForResponse(
      (response) =>
        response.url().includes('/postcode-lookup') &&
        response.request().method() === 'GET',
      { timeout: 12_000 },
    );
    await this.postalCodeInput.fill(postalCode);
    await this.houseNumberInput.fill(houseNumber);

    const lookupResponse = await lookupPromise.catch(() => null);
    if (lookupResponse && lookupResponse.ok()) {
      await this.page.waitForFunction(
        (selector) => {
          const input = document.querySelector(selector);
          return Boolean(input && input.value && input.value.trim() !== '');
        },
        '[data-test="street"]',
        { timeout: 5_000 },
      ).catch(() => undefined);
    }

    // Ensure required fields remain populated after profile/lookup races.
    await this.#setCountry(country, countryLabel);
    if ((await this.postalCodeInput.inputValue()).trim() === '') {
      await this.postalCodeInput.fill(postalCode);
    }
    if ((await this.houseNumberInput.inputValue()).trim() === '') {
      await this.houseNumberInput.fill(houseNumber);
    }
    if (street && (await this.streetInput.inputValue()).trim() === '') {
      await this.streetInput.fill(street);
    }
    if (city && (await this.cityInput.inputValue()).trim() === '') {
      await this.cityInput.fill(city);
    }
    if (state && (await this.stateInput.inputValue()).trim() === '') {
      await this.stateInput.fill(state);
    }

    // Always pin explicit known-good address values for invoice validation.
    if (street) {
      await this.streetInput.fill(street);
    }
    if (city) {
      await this.cityInput.fill(city);
    }
    if (state) {
      await this.stateInput.fill(state);
    }

    await this.proceedFromAddress.click({ timeout: 15_000 });
  }

  /**
   * @param {string} countryCode
   * @param {string} [countryLabel]
   */
  async #setCountry(countryCode, countryLabel) {
    const tagName = await this.countryInput.evaluate((el) => el.tagName.toLowerCase());
    if (tagName !== 'select') {
      await this.countryInput.fill(countryLabel || countryCode);
      return;
    }

    if (countryLabel) {
      await this.countryInput.selectOption({ label: countryLabel });
    } else {
      await this.countryInput.selectOption({ value: countryCode });
    }
  }

  /**
   * Clears shipping fields for mandatory-field validation coverage.
   */
  async clearShippingDetails() {
    await this.postalCodeInput.clear();
    await this.houseNumberInput.clear();
    await this.streetInput.clear();
    await this.cityInput.clear();
    await this.stateInput.clear();
  }

  /**
   * @param {{
   *   method?: string,
   *   creditCardNumber?: string,
   *   expirationDate?: string,
   *   cvv?: string,
   *   cardHolderName?: string,
   * }} [payment]
   */
  async placeOrder(payment = { method: PAYMENT.method }) {
    const method = payment.method || PAYMENT.method;
    await this.paymentMethodSelect.waitFor({ state: 'visible' });
    await this.paymentMethodSelect.selectOption(method);
    await this.page.waitForFunction(
      ({ selector, expected }) => {
        const el = document.querySelector(selector);
        return Boolean(el && el.value === expected);
      },
      { selector: '[data-test="payment-method"]', expected: method },
      { timeout: 10_000 },
    );

    if (method === 'credit-card') {
      await this.#fillCreditCardDetails(payment);
    }

    // Assessment requirement: confirm twice to generate the invoice.
    await this.finishButton.click();
    await this.paymentSuccessMessage.waitFor({ state: 'visible', timeout: 30_000 });
    await this.finishButton.waitFor({ state: 'visible' });
    await this.finishButton.click();
    await this.orderConfirmationMessage.waitFor({
      state: 'visible',
      timeout: 30_000,
    });
  }

  // Readiness sync + value for test-layer assertions (no expect here).
  async verifyOrderConfirmation() {
    await this.orderConfirmationMessage.waitFor({ state: 'visible' });
    return (await this.orderConfirmationMessage.innerText()).trim();
  }

  /**
   * @param {{
   *   creditCardNumber?: string,
   *   expirationDate?: string,
   *   cvv?: string,
   *   cardHolderName?: string,
   * }} payment
   */
  async #fillCreditCardDetails(payment) {
    await this.creditCardNumber.fill(payment.creditCardNumber);
    await this.expirationDate.fill(payment.expirationDate);
    await this.cvv.fill(payment.cvv);
    await this.cardHolderName.fill(payment.cardHolderName);
  }
}

module.exports = { CheckoutPage };
