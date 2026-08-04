class InvoicesPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.pageTitle = page.getByTestId('page-title');
    this.invoiceRows = page.getByRole('row');
  }

  /**
   * @param {string} invoiceNumber
   */
  invoiceRowByNumber(invoiceNumber) {
    return this.page.getByRole('row').filter({ hasText: invoiceNumber });
  }

  async verifyInvoicesPageLoaded() {
    await this.page.waitForURL(/\/account\/invoices/);
    await this.pageTitle.waitFor({ state: 'visible' });
  }

  /**
   * @param {string} invoiceNumber
   */
  async waitForInvoice(invoiceNumber) {
    await this.invoiceRowByNumber(invoiceNumber).waitFor({
      state: 'visible',
      timeout: 15_000,
    });
  }
}

module.exports = { InvoicesPage };
