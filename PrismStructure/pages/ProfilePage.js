const { expect } = require('@playwright/test');

class ProfilePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.pageTitle = page.getByTestId('page-title');
    this.firstNameInput = page.getByTestId('first-name');
    this.lastNameInput = page.getByTestId('last-name');
    this.emailInput = page.getByTestId('email');
  }

  async verifyProfilePageLoaded() {
    await this.page.waitForURL(/\/account\/profile/);
    await this.firstNameInput.waitFor({ state: 'visible' });
    await this.page
      .waitForResponse(
        (response) =>
          response.url().includes('/users/me') && response.ok(),
        { timeout: 15_000 },
      )
      .catch(() => undefined);
    await expect
      .poll(async () => (await this.firstNameInput.inputValue()).trim(), {
        timeout: 15_000,
      })
      .not.toBe('');
  }

  async getProfileValues() {
    return {
      firstName: (await this.firstNameInput.inputValue()).trim(),
      lastName: (await this.lastNameInput.inputValue()).trim(),
      email: (await this.emailInput.inputValue()).trim(),
    };
  }
}

module.exports = { ProfilePage };
