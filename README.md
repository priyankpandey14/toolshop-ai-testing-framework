# Toolshop QA AI Practical Assessment

Playwright-based UI and API automation for [Practice Software Testing (Toolshop)](https://practicesoftwaretesting.com/), built with a simple Page Object Model and reusable test data.

**UI:** https://practicesoftwaretesting.com  
**API:** https://api.practicesoftwaretesting.com/api/documentation

---

## Project Overview

Automates the assessment-critical journey:

**Register/Login → Product Search → Multi-item Cart → Quantity Update → COD Checkout (confirm twice) → My Invoices**

| Layer | Coverage |
|-------|----------|
| UI | 8 tests — `@Smoke` / `@Regression` via Playwright Test + POM |
| API | 5 tests — register/auth/cart/invoice lifecycle via `APIRequestContext` |
| Manual | `FunctionalTestCase.csv` (8 cases) |
| Exploratory | `Exploratory-Testing-Notes.md` (session-based notes beyond the 5–8 cap) |

Supporting artifacts live at the repository root. Automation lives under `PrismStructure/`.

---
## Assessment Deliverables

This repository includes:

- Requirement & Risk Analysis
- Project Information
- Manual Functional Test Cases
- UI Automation (Playwright)
- API Automation
- Test Data Strategy
- Execution Evidence
- AI Prompt History
- Documentation

-----
## Folder Structure

```
toolshop-qa-ai-practical-assessment/
├── PrismStructure/                      # Playwright project root
│   ├── pages/                           # Page Object Model
│   ├── tests/
│   │   ├── ui/                          # UI specs
│   │   └── api/                         # API specs
│   ├── utils/                           # Constants, test data, API helpers
│   ├── execution-evidence/              # Reports, logs, screenshots
│   ├── playwright.config.js
│   └── package.json
├── ai-prompts/
├── .cursor/                             # Rules / Skills / MCP stub
├── FunctionalTestCase.csv
├── Requirement-Risk-Analysis.md
├── Exploratory-Testing-Notes.md
├── Test-Execution-Report.md
├── project-info.md
└── tool-workflow.md
```

---

## Installation

```bash
cd PrismStructure
npm install
npx playwright install chromium
```

**Requirements:** Node.js 18+ and npm.

Optional credential overrides for the published demo customer:

```bash
export TOOLSHOP_VALID_EMAIL="your-demo-email@example.com"
export TOOLSHOP_VALID_PASSWORD="your-demo-password"
```

Registration tests generate unique users automatically (no shared password reuse).

---

## Run Tests

```bash
cd PrismStructure
```

| Suite | Command |
|-------|---------|
| Smoke (UI + API `@Smoke`) | `npm run test:smoke` |
| Regression (UI + API `@Regression`) | `npm run test:regression` |
| Complete (UI + API) | `npm test` |
| UI only | `npm run test:ui` |
| API only | `npm run test:api` |

CI-style (headless + retries):

```bash
CI=true npm test
```

---

## Test Data

| Data | Location |
|------|----------|
| URLs, messages, schemas | `PrismStructure/utils/constants.js` |
| Scenario datasets / registration factory | `PrismStructure/utils/testData.js` |
| Manual cases | `FunctionalTestCase.csv` |

---

## Execution Evidence

All run evidence is under:

`PrismStructure/execution-evidence/`

| Artifact | Path |
|----------|------|
| HTML report | `execution-evidence/html-report/index.html` |
| Flow screenshots | `execution-evidence/screenshots/` |
| Traces / failure artifacts | `execution-evidence/test-results/` |
| Suite logs | `execution-evidence/logs/*.log` |
| Machine-readable results | `execution-evidence/logs/results.json` |
| Human summary | `execution-evidence/execution-summary.md` |

Open the HTML report:

```bash
cd PrismStructure
npm run report
```

---

## Assumptions

- Target environment is the public Toolshop demo (UI + API).
- Default customer credentials are the published demo account (overridable via env vars).
- Products under test default to **Pliers** / **Hammer** search keywords with in-stock fallback.
- COD checkout requires **Confirm/Finish twice** to generate the invoice number.
- Billing uses postcode-lookup compatible NL values (`3512 JC` / house `1`).
- Network access to `practicesoftwaretesting.com` and `api.practicesoftwaretesting.com` is available.

---

## AI Prompt History

See `ai-prompts/` for requirements, test design, test data, automation/debugging, and documentation prompt logs.
