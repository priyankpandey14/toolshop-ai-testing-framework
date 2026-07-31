# Project Information

## 1. Project Overview

This repository contains my submission for the **QA AI Capability Assessment**. The objective of this project is to demonstrate how Artificial Intelligence can be effectively used throughout the Software Testing Life Cycle (STLC) while maintaining engineering ownership through validation, prompt refinement, and critical review.

The project focuses on automating a critical end-to-end user journey of the **Practice Software Testing (Toolshop)** application using **Playwright (Prism Framework)**. AI tools were used to assist with requirement analysis, risk identification, test design, automation, debugging, documentation, and continuous improvement.

---

# 2. Application Under Test

**Application Name**

Practice Software Testing (Toolshop)

**UI**

https://practicesoftwaretesting.com/

**API Documentation**

https://api.practicesoftwaretesting.com/api/documentation

---

# 3. Scope of Testing

The assessment focuses on validating one complete business workflow across both UI and API layers.

### End-to-End User Journey

```
Login
   ↓
Search Product
   ↓
Add Product to Cart
   ↓
Checkout
```

### Testing Scope

- UI Functional Testing
- API Functional Testing
- Smoke Testing
- Regression Testing
- Positive Scenarios
- Negative Scenarios
- Boundary Validation
- Exploratory Testing

---

# 4. Objectives

The primary objectives of this project are:

- Understand application requirements using AI.
- Identify business risks.
- Design meaningful manual test cases.
- Identify UI and API automation opportunities.
- Implement Playwright automation for the selected workflow.
- Validate AI-generated outputs before implementation.
- Demonstrate iterative prompt refinement.
- Produce reusable project documentation.

---

# 5. Technology Stack

| Category | Tool |
|-----------|------|
| UI Automation | Playwright |
| API Automation | Playwright APIRequestContext |
| Language | JavaScript |
| Test Runner | Playwright Test |
| Version Control | Git & GitHub |
| IDE | Cursor |
| AI Assistants | Cursor AI, ChatGPT (GPT-5.5) |
| Reporting | Playwright HTML Report |

---

# 6. AI Tools Used

## Cursor AI

Cursor AI was primarily used for:

- Playwright project setup
- Page Object Model generation
- Automation implementation
- Code refactoring
- Debugging
- Locator improvements

## ChatGPT (GPT-5.5)

ChatGPT was used for:

- Requirement analysis
- Risk analysis
- Test strategy
- Manual test case generation
- API test scenario design
- Prompt refinement
- Documentation
- Validation checklists
- Root Cause Analysis

---

# 7. AI-Assisted Testing Workflow

The following workflow was followed throughout the assessment:

```
Requirement Analysis
        ↓
Risk Analysis
        ↓
Test Planning
        ↓
Prompt Creation
        ↓
AI Generated Output
        ↓
Manual Validation
        ↓
Prompt Refinement
        ↓
Automation Development
        ↓
Execution
        ↓
Documentation
```

AI outputs were never accepted directly. Every response was manually reviewed and refined before implementation.

---

# 8. Requirement Analysis

The application requirements were first analysed using AI before creating any test artifacts.

The AI-assisted analysis helped identify:

- Core business workflow
- Critical user journey
- Mandatory validations
- High-risk functional areas
- Automation opportunities
- API dependencies
- Edge cases

The generated analysis was manually verified against the application before proceeding.

---

# 9. Risk Analysis

The following business risks were identified:

| Risk | Impact |
|------|--------|
| Login failure | User cannot access application |
| Product search failure | User cannot locate products |
| Cart failure | Purchase cannot proceed |
| Checkout failure | Revenue impact |
| Invalid API responses | Incorrect application behaviour |

These risks influenced the prioritisation of smoke and regression scenarios.

---

# 10. Test Design

AI assisted in generating the initial set of test scenarios.

The generated scenarios included:

- Positive cases
- Negative cases
- Boundary conditions
- Validation checks
- Error handling
- Exploratory scenarios

Each scenario was manually reviewed.

The following improvements were made before finalisation:

- Removed duplicate scenarios
- Improved expected results
- Added missing edge cases
- Added business validation
- Improved test data quality

---

# 11. Automation Strategy

The automation focuses on one complete end-to-end business flow:

```
Login
      ↓
Search Product
      ↓
Add to Cart
      ↓
Checkout
```

UI automation validates the user journey while API automation validates the backend services supporting the same workflow.

This combination provides better confidence than UI-only testing.

---

# 12. Validation of AI Output

All AI-generated artifacts were validated before implementation.

Validation activities included:

- Reviewing generated code
- Executing automation scripts
- Verifying assertions
- Checking locator reliability
- Validating API payloads
- Reviewing expected responses
- Removing duplicate logic
- Refactoring reusable methods

Engineering judgement was applied before accepting AI suggestions.

---

# 13. Prompt Engineering

Rather than relying on a single prompt, prompts were continuously refined throughout the assessment.

Each refinement focused on improving:

- Context
- Business rules
- Expected output
- Test coverage
- Automation quality

Prompt history has been documented in the **ai-prompts** folder.

---

# 14. Responsible AI Usage

Sensitive information was intentionally excluded from AI prompts.

The following information was never shared:

- Passwords
- Access tokens
- Secrets
- Personal data
- Confidential organisational information
- Proprietary implementation details

Only information necessary for solving the engineering problem was provided.

---

# 15. Project Deliverables

This repository contains:

- Requirement Analysis
- Risk Analysis
- Functional Test Cases
- API Test Scenarios
- Playwright UI Automation
- Playwright API Automation
- AI Prompt History
- Validation Notes
- Execution Reports
- Screenshots

---

# 16. Key Learnings

This assessment demonstrated that AI is most effective when used as an engineering assistant rather than a replacement for engineering judgement.

The quality of AI-generated outputs depends on:

- Clear context
- Well-structured prompts
- Prompt refinement
- Human validation
- Critical review
- Continuous improvement

AI significantly accelerated repetitive tasks while the final responsibility for correctness, quality, maintainability, and testing decisions remained with the engineer.

---

# Author

**Priyank Pandey**

Senior Software Development Engineer in Test (SDET)

This project demonstrates AI-assisted software testing practices using Playwright, Cursor AI, and ChatGPT while following iterative prompt engineering and validation principles.