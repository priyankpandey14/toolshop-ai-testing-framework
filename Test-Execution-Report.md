# Test Execution Report

**Project:** Toolshop AI Testing Framework (Playwright)  
**Report Type:** Automated UI & API Execution Summary  
**Prepared by:** QA Automation  
**Report Source:** Playwright JSON/HTML results (`PrismStructure/execution-evidence/`)

---

## Test Execution Summary

| Attribute | Value |
|-----------|-------|
| Execution Date & Time | 04 Aug 2026 (IST) |
| Application Under Test | Practice Software Testing – Toolshop |
| Environment | UI: `https://practicesoftwaretesting.com` · API: `https://api.practicesoftwaretesting.com` |
| Browser | Chromium (Desktop Chrome) |
| Total Test Cases | 13 |
| Passed | 13 |
| Failed | 0 |
| Skipped | 0 |
| Flaky | 0 |
| Overall Status | **PASS** |

Evidence references:
- HTML report: `PrismStructure/execution-evidence/html-report/index.html`
- Latest summary: `PrismStructure/execution-evidence/execution-summary.md`

---

## Scope of Testing

### Smoke (`npm run test:smoke`) — 8 passed
UI + API `@Smoke`: Registration, Valid Login, Product Search, Multi-item Cart, Checkout/Confirmation, API Register+Cart, API Login, API Invoice Generation.

### Regression (`npm run test:regression`) — 5 passed
UI + API `@Regression`: Invalid Login, Update Quantity, My Invoices, API Product Search, API Cart.

### Manual
`FunctionalTestCase.csv` — 8 cases marked **Passed**, mapped to FR-01..FR-04 and assessment AC1/AC2.

---

## Test Execution Results

| Test Case | Layer | Type | Status |
|-----------|-------|------|--------|
| Register Login And Create Cart | API | Smoke | Passed |
| Login API | API | Smoke | Passed |
| Product Search API | API | Regression | Passed |
| Cart API | API | Regression | Passed |
| Product Selection And Invoice Generation | API | Smoke | Passed |
| User Registration | UI | Smoke | Passed |
| Valid Login | UI | Smoke | Passed |
| Invalid Login | UI | Regression | Passed |
| Product Search | UI | Smoke | Passed |
| Add Multiple Products to Cart | UI | Smoke | Passed |
| Update Quantity | UI | Regression | Passed |
| Checkout and Order Confirmation | UI | Smoke | Passed |
| View Invoice in My Invoices | UI | Regression | Passed |

---

## Screenshots

| Flow Step | Screenshot Path |
|-----------|-----------------|
| Registration | `PrismStructure/execution-evidence/screenshots/01-registration-success.png` |
| Login | `PrismStructure/execution-evidence/screenshots/02-login-success.png` |
| Product Search | `PrismStructure/execution-evidence/screenshots/03-product-search-success.png` |
| Multi-item Cart | `PrismStructure/execution-evidence/screenshots/04-cart-success.png` |
| Checkout | `PrismStructure/execution-evidence/screenshots/05-checkout-success.png` |
| My Invoices | `PrismStructure/execution-evidence/screenshots/06-my-invoices-success.png` |

---

## Observations

- Registration creates a unique user, logs in, and verifies profile fields.
- Multi-item cart and quantity update cover assessment UI AC2 cart behaviours.
- COD checkout uses **Confirm twice** to generate `INV-*`.
- My Invoices lists the generated invoice number after checkout.
- API AC1/AC2 covered via register → token → cart and multi-product invoice generation.

---

## Defects

No defects were observed during execution.

---

## Conclusion

Local validation completed with **100% pass rate (13/13)** across UI smoke/regression and API purchase-flow coverage. Assessment sample ACs (registration/login, multi-item COD checkout, My Invoices, double confirm, API register/invoice) are evidenced.

**Assessment readiness (local):** Ready for commit/push when you choose to publish.
