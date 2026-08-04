# Execution Summary

Generated after local validation of smoke, regression, and complete suites.

## Run metadata

- **Execution Date & Time:** 04 Aug 2026, 08:23:17 IST
- **Application Under Test:** Practice Software Testing (Toolshop)
- **Environment:** `https://practicesoftwaretesting.com` / `https://api.practicesoftwaretesting.com`
- **Browser:** Chromium (Desktop Chrome)
- **Total:** 13
- **Passed:** 13
- **Failed:** 0
- **Skipped:** 0
- **Overall Status:** **PASS**

## Suite validation

| Suite | Result |
|-------|--------|
| Smoke (`npm run test:smoke`) | PASS |
| Regression (`npm run test:regression`) | PASS |
| Complete (`npm test`) | PASS (13/13) |

## Suite results (complete run)

| Test Case | Layer | Type | Status |
|-----------|-------|------|--------|
| Register Login And Create Cart | API | Smoke | passed |
| Login API | API | Smoke | passed |
| Product Search API | API | Regression | passed |
| Cart API | API | Regression | passed |
| Product Selection And Invoice Generation | API | Smoke | passed |
| User Registration | UI | Smoke | passed |
| Valid Login | UI | Smoke | passed |
| Invalid Login | UI | Regression | passed |
| Product Search | UI | Smoke | passed |
| Add Multiple Products to Cart | UI | Smoke | passed |
| Update Quantity | UI | Regression | passed |
| Checkout and Order Confirmation | UI | Smoke | passed |
| View Invoice in My Invoices | UI | Regression | passed |

## Evidence locations

| Artifact | Path |
|----------|------|
| HTML Report | `execution-evidence/html-report/index.html` |
| Screenshots | `execution-evidence/screenshots/` |
| Logs | `execution-evidence/logs/` |
| JSON Results | `execution-evidence/logs/results.json` |

## Screenshots

- `01-registration-success.png`
- `02-login-success.png`
- `03-product-search-success.png`
- `04-cart-success.png`
- `05-checkout-success.png`
- `06-my-invoices-success.png`

## Defects

No defects were observed during this execution.

## Conclusion

All smoke, regression, and complete (UI + API) suites passed. Execution evidence is consolidated under `PrismStructure/execution-evidence/` for assessment review.
