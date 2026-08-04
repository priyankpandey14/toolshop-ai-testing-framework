# Project Information

**Primary AI Tool(s) Used:** Cursor AI, ChatGPT  
**Application Under Test:** Practice Software Testing (Toolshop) – Registration, Checkout & Invoice Flow  
**Assessment Start Date:** 31 Jul 2026  
**Submission Date:** 04 Aug 2026

---

## Project Summary

This submission automates and documents the Toolshop customer journey: **register/login → search → multi-item cart → quantity update → Cash on Delivery checkout (confirm twice) → My Invoices**. UI and API layers are covered with Playwright (Prism-style POM), with AI used for analysis, design, coding assistance, and documentation — always with human validation.

---

## Tools Used

| Category | Tool |
|-----------|------|
| UI Automation | Playwright Test (Chromium) |
| API Automation | Playwright `APIRequestContext` |
| Language | JavaScript |
| IDE / AI | Cursor AI |
| Planning AI | ChatGPT |
| Version Control | Git & GitHub |
| Reporting | Playwright HTML/JSON + `execution-evidence/` |

**UI:** https://practicesoftwaretesting.com/  
**API:** https://api.practicesoftwaretesting.com/api/documentation

---

## Setup Summary (Part A)

### 1. How project and SUT context is provided to the tool

Each focused chat starts with: role (SDET), SUT URLs, selected business flow, stack (Playwright JS + POM), constraints (≤5–8 cases per type, smoke/regression tags, keep framework simple), and assessment AC examples (registration, multi-item COD checkout, My Invoices, double confirm).

### 2. How AI is used for requirement analysis

AI helped extract functional requirements (login, search, cart, checkout, invoices), map them to FR-01..FR-04, and highlight risks. Outputs were checked against the live Toolshop UI/API before writing `Requirement-Risk-Analysis.md`.

### 3. How AI is used for test planning and strategy

AI proposed UI vs API split, smoke vs regression tagging, and prioritisation of the purchase journey. Final plan: UI smoke for happy path + registration; UI regression for negatives/quantity/invoices; API smoke for register/auth/invoice lifecycle; API regression for search/cart detail.

### 4. How AI is used for manual test case design

AI drafted positive, negative, and edge scenarios. Human review removed duplicates, capped the suite at **8** manual cases, and aligned steps to assessment AC1/AC2 language in `FunctionalTestCase.csv`.

### 5. How AI is used for automation design

Cursor assisted with POM pages, helpers, and specs under `PrismStructure/`. Design choices kept deliberately small: `pages/`, `tests/ui`, `tests/api`, `utils/`, single Chromium project, shared test data.

### 6. How AI-generated tests and scripts are validated

Every suggestion was reviewed for locator quality, assertions, and sync. Fixes were proven by local execution (`npm run test:smoke`, `npm run test:regression`, `npm test`) before accepting changes. Prompt refinements are logged under `ai-prompts/`.

### 7. How AI is used for test data, environment assumptions, and API payloads

AI helped shape registration payloads, COD invoice body, and NL postcode-lookup billing data. Final data lives in `utils/testData.js` / `constants.js` with env overrides for demo credentials. Unique users are generated per registration run.

### 8. How AI is used for debugging failing tests and interpreting logs

Failures (single confirm, postcode race, out-of-stock add-to-cart, leaked-password 422) were pasted into Cursor with logs/HTML clues. Accepted only fixes that passed re-runs. See `ai-prompts/automation-and-debugging.md`.

### 9. What information is avoided with AI tools

Not shared: personal/private credentials beyond public demo context, tokens from real systems, secrets, proprietary org data. Demo account values stay in local constants/env; prompts describe patterns rather than leaking non-demo secrets.

### 10. How this QA workflow would be reused on a real project

Reuse the same loop: context → requirements/risks → capped manual suite → tagged smoke/regression automation → prompt log → execution evidence. Swap SUT URLs and data; keep POM + utils; enforce human review gates before merge.

---

## Scope Snapshot

| Layer | Coverage |
|-------|----------|
| Manual | 8 cases (Smoke + Regression) |
| UI | 8 Playwright tests (`@Smoke` / `@Regression`) |
| API | 5 Playwright tests (`@Smoke` / `@Regression`) |
| Exploratory | Session-based notes in `Exploratory-Testing-Notes.md` (gaps beyond the 5–8 cap) |

**End-to-end journey:** Registration/Login → Search → Multi-item Cart → Quantity Update → COD Checkout (double confirm) → My Invoices

---

## Author

**Priyank Pandey** — Senior SDET  

AI accelerated repetitive drafting; correctness, scope control, and maintainability remained engineering-owned.
