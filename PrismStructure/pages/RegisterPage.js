const { URLS } = require('../utils/constants');

class RegisterPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByTestId('first-name');
    this.lastNameInput = page.getByTestId('last-name');
    this.dobInput = page.getByTestId('dob');
    this.countrySelect = page.getByTestId('country');
    this.postalCodeInput = page.getByTestId('postal_code');
    this.houseNumberInput = page.getByTestId('house_number');
    this.streetInput = page.getByTestId('street');
    this.cityInput = page.getByTestId('city');
    this.stateInput = page.getByTestId('state');
    this.phoneInput = page.getByTestId('phone');
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');
    this.registerSubmit = page.getByTestId('register-submit');
    this.pageHeading = page.getByRole('heading', { name: /Customer registration|Register/i });
  }

  async navigateToRegister() {
    await this.page.goto(URLS.REGISTER, {
      waitUntil: 'domcontentloaded',
      timeout: 45_000,
    });
  }

  async verifyRegisterPageLoaded() {
    await this.firstNameInput.waitFor({ state: 'visible' });
    await this.emailInput.waitFor({ state: 'visible' });
    await this.registerSubmit.waitFor({ state: 'visible' });
  }

  /**
   * @param {{
   *   firstName: string,
   *   lastName: string,
   *   dob: string,
   *   country: string,
   *   countryLabel?: string,
   *   postalCode: string,
   *   houseNumber: string,
   *   street?: string,
   *   city?: string,
   *   state?: string,
   *   phone: string,
   *   email: string,
   *   password: string,
   * }} user
   */
  async register(user) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.dobInput.fill(user.dob);

    if (user.countryLabel) {
      await this.countrySelect.selectOption({ label: user.countryLabel });
    } else {
      await this.countrySelect.selectOption({ value: user.country });
    }

    const lookupPromise = this.page.waitForResponse(
      (response) =>
        response.url().includes('/postcode-lookup') &&
        response.request().method() === 'GET',
      { timeout: 12_000 },
    );
    await this.postalCodeInput.fill(user.postalCode);
    await this.houseNumberInput.fill(user.houseNumber);
    await lookupPromise.catch(() => null);

    await this.page.waitForFunction(
      (selector) => {
        const input = document.querySelector(selector);
        return Boolean(input && input.value && input.value.trim() !== '');
      },
      '[data-test="street"]',
      { timeout: 5_000 },
    ).catch(() => undefined);

    if (user.street && (await this.streetInput.inputValue()).trim() === '') {
      await this.streetInput.fill(user.street);
    }
    if (user.city && (await this.cityInput.inputValue()).trim() === '') {
      await this.cityInput.fill(user.city);
    }
    if (user.state && (await this.stateInput.inputValue()).trim() === '') {
      await this.stateInput.fill(user.state);
    }

    await this.phoneInput.fill(user.phone);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);

    const registerResponse = this.page.waitForResponse(
      (response) =>
        response.url().includes('/users/register') &&
        response.request().method() === 'POST',
      { timeout: 30_000 },
    );
    await this.registerSubmit.click();
    const response = await registerResponse;
    if (response.status() !== 201) {
      const body = await response.text().catch(() => '');
      throw new Error(`Registration failed (${response.status()}): ${body}`);
    }

    // App usually redirects to login; fall back to an explicit navigation.
    await this.page
      .waitForURL(/\/auth\/login/, { timeout: 15_000 })
      .catch(async () => {
        await this.page.goto(URLS.LOGIN, {
          waitUntil: 'domcontentloaded',
          timeout: 45_000,
        });
      });
  }
}

module.exports = { RegisterPage };
