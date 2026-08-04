// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const { URLS, TIMEOUTS } = require('./utils/constants');

const isCI = !!process.env.CI;

/**
 * Playwright Test configuration for Practice Software Testing (Toolshop).
 * All execution evidence is written under execution-evidence/ for reviewers.
 *
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  // ---------------------------------------------------------------------------
  // Test discovery
  // ---------------------------------------------------------------------------
  testDir: './tests',

  // ---------------------------------------------------------------------------
  // Execution defaults
  // ---------------------------------------------------------------------------
  timeout: TIMEOUTS.DEFAULT,
  retries: isCI ? 1 : 0,
  forbidOnly: isCI,
  // Run UI serially to avoid demo-site auth/cart contention under parallel workers.
  fullyParallel: false,
  workers: isCI ? 1 : undefined,

  // ---------------------------------------------------------------------------
  // Reporting — single evidence root for reviewers
  // ---------------------------------------------------------------------------
  // HTML:   execution-evidence/html-report/
  // JSON:   execution-evidence/logs/results.json
  // Traces / failure screenshots: execution-evidence/test-results/
  reporter: [
    ['list'],
    ['html', { outputFolder: 'execution-evidence/html-report', open: 'never' }],
    ['json', { outputFile: 'execution-evidence/logs/results.json' }],
  ],

  outputDir: 'execution-evidence/test-results',

  // ---------------------------------------------------------------------------
  // Shared browser / context options
  // ---------------------------------------------------------------------------
  use: {
    baseURL: URLS.UI_BASE,
    testIdAttribute: 'data-test',
    headless: isCI,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    navigationTimeout: 45_000,
    actionTimeout: 15_000,
  },

  // ---------------------------------------------------------------------------
  // Projects
  // ---------------------------------------------------------------------------
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
