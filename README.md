# toolshop-ai-testing-framework
AI-assisted UI & API test automation framework for Practice Software Testing (Toolshop) using Playwright, Cursor AI and ChatGPT..

---

## Project Overview

This repository contains the submission for the **QA AI Capability Exercise**, demonstrating an AI-assisted testing workflow for the **Practice Software Testing (Toolshop)** application.

The objective is not only to automate tests but also to showcase how AI was effectively used throughout the Software Testing Life Cycle (STLC), including:

- Requirement Analysis
- Risk Assessment
- Test Planning
- Manual Test Design
- API Test Design
- UI Automation
- API Automation
- Test Data Generation
- Debugging
- Documentation
- Prompt Engineering
- Validation of AI-generated outputs

---

## System Under Test

### UI

https://practicesoftwaretesting.com/

### API

https://api.practicesoftwaretesting.com/api/documentation

---

## Technology Stack

| Area | Tool |
|-------|------|
| Language | JavaScript / TypeScript |
| UI Automation | Playwright |
| API Testing | Playwright APIRequestContext |
| Test Runner | Playwright Test |
| AI Assistant | Cursor AI |
| AI Assistant | ChatGPT (GPT-5.5) |
| Version Control | Git |
| Reporting | Playwright HTML Report |

---

## Project Structure

```
qa-ai-practical-assessment/

├── README.md
├── project-info.md
├── Requirement-Risk-Analysis.md
├── FunctionalTestCase.csv

├── PrismStructure/
│
├── ai-prompts/
│
├── screenshots/
│
└── execution-reports/
```

---

## Scope

The assessment covers:

### Manual Testing

- Functional Testing
- Positive Scenarios
- Negative Scenarios
- Edge Cases
- Smoke Tests
- Regression Tests

### UI Automation

- Registration
- Login
- Product Search
- Add to Cart
- Checkout
- Invoice Verification

### API Automation

- User Registration
- Authentication
- Product Retrieval
- Cart Operations
- Invoice Generation

---

## Test Strategy

The testing approach follows the AI-assisted testing lifecycle:

```
Requirement Analysis
        ↓
Risk Analysis
        ↓
Test Planning
        ↓
Manual Test Design
        ↓
Automation Design
        ↓
Implementation
        ↓
Execution
        ↓
Validation
        ↓
Documentation
```

---

## Smoke Suite

Smoke tests validate the critical user journey:

- User Login
- Product Search
- Add Product to Cart
- Checkout
- Invoice Generation

Run:

```bash
npx playwright test --grep @Smoke
```

---

## Regression Suite

Regression tests cover all critical functional areas.

Run:

```bash
npx playwright test --grep @Regression
```

---

## Execute All Tests

```bash
npx playwright test
```

---

## View HTML Report

```bash
npx playwright show-report
```

---

## AI-Assisted Workflow

AI was used throughout the project to assist in:

- Requirement Analysis
- Risk Identification
- Test Strategy
- Manual Test Case Generation
- API Test Design
- Automation Framework Design
- Code Generation
- Debugging
- Documentation

Every AI-generated artifact was manually reviewed, validated, refined, and updated before inclusion.

Prompt history is available under:

```
ai-prompts/
```

---

## Test Evidence

The repository contains:

- Manual Test Cases
- UI Automation
- API Automation
- HTML Reports
- Screenshots
- Prompt History
- Requirement Analysis
- Risk Analysis
- Execution Evidence
