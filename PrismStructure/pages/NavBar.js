class NavBar {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.navMenu = page.getByTestId('nav-menu');
    this.signInLink = page.getByTestId('nav-sign-in');
    this.myInvoicesLink = page.getByTestId('nav-my-invoices');
    this.myProfileLink = page.getByTestId('nav-my-profile');
    this.signOutLink = page.getByTestId('nav-sign-out');
  }

  async openUserMenu() {
    await this.navMenu.click();
  }

  async openMyInvoices() {
    await this.openUserMenu();
    await this.myInvoicesLink.click();
  }

  async openMyProfile() {
    await this.openUserMenu();
    await this.myProfileLink.click();
  }
}

module.exports = { NavBar };
