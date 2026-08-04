const { URLS } = require('../utils/constants');

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-submit');
    this.loginError = page.getByTestId('login-error');
    this.pageHeading = page.getByRole('heading', { name: 'Login' });
  }

  async navigateToLogin() {
    if (/\/auth\/login\/?$/.test(this.page.url())) {
      await this.verifyLoginPageLoaded();
      return;
    }

    // Public demo can briefly drop connections; retry transient navigation failures.
    const maxAttempts = 3;
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        await this.page.goto(URLS.LOGIN, {
          waitUntil: 'domcontentloaded',
          timeout: 45_000,
        });
        await this.verifyLoginPageLoaded();
        return;
      } catch (error) {
        lastError = error;
        const message = String(error && error.message ? error.message : error);
        const transient =
          /ERR_NETWORK_CHANGED|ERR_CONNECTION_RESET|ERR_INTERNET_DISCONNECTED|ERR_CONNECTION_CLOSED|Timeout|interrupted by another navigation/i.test(
            message,
          );
        if (!transient || attempt === maxAttempts) {
          throw error;
        }
        await this.page.waitForTimeout(1_000 * attempt);
      }
    }
    throw lastError;
  }

  /**
   * @param {string} email
   * @param {string} password
   * @param {{ expectSuccess?: boolean }} [options]
   */
  async login(email, password, { expectSuccess = true } = {}) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    const loginResponse = this.page.waitForResponse(
      (response) =>
        response.url().includes('/users/login') &&
        response.request().method() === 'POST',
      { timeout: 30_000 },
    );
    await this.loginButton.click();
    const response = await loginResponse;

    if (!expectSuccess) {
      return response;
    }

    if (!response.ok()) {
      const body = await response.text().catch(() => '');
      throw new Error(`Login failed (${response.status()}): ${body}`);
    }
    await this.page.getByTestId('nav-menu').waitFor({
      state: 'visible',
      timeout: 30_000,
    });
    return response;
  }

  // Sync readiness only — assertions belong in the test layer.
  async verifyLoginPageLoaded() {
    await this.pageHeading.waitFor({ state: 'visible' });
    await this.emailInput.waitFor({ state: 'visible' });
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.loginButton.waitFor({ state: 'visible' });
  }
}

module.exports = { LoginPage };
