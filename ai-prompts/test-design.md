# AI Prompt Log – Test Design

## Objective

The objective of this phase was to leverage AI as an engineering assistant to design a concise, maintainable, and business-focused test suite for the selected end-to-end workflow.

Instead of requesting AI to generate random test cases, the prompts were designed to:
- Understand the business workflow.
- Identify high-risk functional scenarios.
- Design enterprise-grade manual test cases.
- Identify automation opportunities.
- Recommend an automation strategy suitable for Playwright.
- Review and improve the generated outputs through iterative prompt refinement.

Every AI-generated recommendation was manually reviewed before being accepted.

---

# Selected Business Workflow

```
Login
   ↓
Search Product
   ↓
View Product Details
   ↓
Add Product to Cart
   ↓
Checkout
```

This workflow was selected because it represents the application's primary customer journey while covering authentication, search, shopping cart and checkout functionality.

---

# Prompt Iteration 1 – Business-Oriented Test Scenario Design

## Problem Statement

Identify business-critical test scenarios instead of generating a large number of generic test cases.

## Prompt

> I am working as a Senior Software Development Engineer in Test (SDET) with approximately 8 years of experience in functional testing, API automation and UI automation.
>
> The application under test is Practice Software Testing (Toolshop), an e-commerce web application.
>
> The selected workflow for this assessment is:
>
> Login → Search Product → View Product → Add Product to Cart → Checkout
>
> Act as a QA Test Architect and identify the most valuable functional test scenarios for this workflow.
>
> While generating scenarios, consider:
>
> • Business Criticality
> • Customer Impact
> • Positive Flow
> • Negative Flow
> • Boundary Conditions
> • Error Guessing
> • Risk-Based Testing
> • Smoke Coverage
> • Regression Coverage
>
> Do NOT generate duplicate scenarios.
>
> Prioritize quality over quantity and recommend only scenarios that provide maximum business value.

## Validation

The generated scenarios were manually reviewed.

Changes made:

- Removed duplicate search scenarios.
- Combined repetitive validation points.
- Increased checkout coverage.
- Added cart validation.
- Removed low-value UI validation scenarios.

---

# Prompt Iteration 2 – Enterprise Manual Test Case Design

## Problem Statement

Convert the approved scenarios into maintainable enterprise-level manual test cases.

## Prompt

> Using the approved business scenarios, generate professional manual test cases.
>
> Each test case must include:
>
> - Requirement ID
> - Test Case ID
> - Module
> - Priority
> - Preconditions
> - Test Steps
> - Expected Result
> - Automation Candidate
>
> Follow enterprise QA documentation standards.
>
> Test steps should be reusable, concise and implementation independent.
>
> Expected results should be measurable and verifiable.
>
> Avoid unnecessary repetition.

## Validation

The AI-generated test cases were manually refined.

Changes made:

- Improved readability.
- Simplified test steps.
- Standardized priorities.
- Improved expected results.
- Added requirement traceability.

The final version was exported to **FunctionalTestCase.csv**.

---

# Prompt Iteration 3 – Automation Candidate Identification

## Problem Statement

Identify which manual test cases should be automated and justify the recommendation.

## Prompt

> Review every manual test case and classify it into one of the following categories:
>
> • UI Automation
> • API Automation
> • Manual Only
> • Exploratory Testing
>
> Consider:
>
> - Business Value
> - Stability
> - Repeatability
> - Automation ROI
> - Maintenance Cost
> - Test Execution Frequency
>
> Explain why each scenario should or should not be automated.

## Validation

The recommendations were manually reviewed.

The following workflow was selected for automation:

- Login
- Product Search
- Add Product to Cart
- Checkout

Visual verification scenarios and exploratory scenarios were intentionally kept manual.

---

# Prompt Iteration 4 – Playwright Automation Test Design

## Problem Statement

Design a maintainable Playwright automation strategy for the selected workflow.

## Prompt

> I am using Playwright with JavaScript.
>
> Recommend an automation strategy for the selected workflow.
>
> Include:
>
> - Page Object Model
> - Folder Structure
> - Utility Classes
> - Assertions
> - Test Data Strategy
> - Locator Strategy
> - Reporting
> - Reusability
>
> Avoid unnecessary framework complexity.
>
> The objective is to create a lightweight automation framework that demonstrates enterprise automation practices within the scope of this assessment.

## Validation

The generated framework recommendations were simplified.

The final framework contains:

- Page Objects
- Test Files
- Utilities
- Reports

Only components required for this assessment were implemented.

---

# Prompt Iteration 5 – Automation Code Review

## Problem Statement

Review the generated automation code before implementation.

## Prompt

> Review the generated Playwright automation code as a Senior Test Automation Architect.
>
> Identify:
>
> - Poor locator strategy
> - Code duplication
> - Missing assertions
> - Hardcoded waits
> - Synchronization issues
> - Readability issues
> - Reusability improvements
>
> Recommend changes that improve reliability, maintainability and scalability while keeping the framework simple.

## Validation

The following improvements were applied after manual review:

- Replaced weak locators with stable selectors.
- Added explicit assertions.
- Removed unnecessary waits.
- Improved reusable methods.
- Improved naming conventions.
- Reduced duplicate code.

---

# Prompt Engineering Practices Followed

The following prompt engineering techniques were consistently applied throughout the test design phase:

- Clearly defined business context before requesting recommendations.
- Specified the testing strategy (Risk-Based, Smoke, Regression, Boundary Value Analysis and Negative Testing).
- Defined expected output structure.
- Specified technical stack (Playwright + JavaScript).
- Requested reasoning instead of only generated content.
- Refined prompts based on previous AI responses.
- Reviewed every AI-generated recommendation before implementation.

---

# Human Validation Process

Every AI-generated output followed the same review process:

1. Verify business relevance.
2. Validate against application behaviour.
3. Remove duplicate recommendations.
4. Improve maintainability.
5. Add requirement traceability.
6. Review automation feasibility.
7. Approve only validated outputs.

---

# Engineering Decisions

The following engineering decisions were made after reviewing AI recommendations:

- Prioritized business-critical scenarios over exhaustive coverage.
- Designed approximately 10–15 high-quality manual test cases instead of generating a large test suite.
- Focused automation on the end-to-end customer purchase journey.
- Adopted the Page Object Model for maintainability.
- Selected Playwright with JavaScript due to its modern capabilities and suitability for UI and API automation.
- Ensured consistency between manual testing, API testing, and automation deliverables.

---

# Outcome

AI significantly accelerated the test design process by generating structured scenarios, identifying automation opportunities, and suggesting framework improvements.

However, all final deliverables—including manual test cases, automation scope, framework design, and testing strategy—were finalized through manual review and engineering judgement, ensuring they accurately reflect enterprise QA practices rather than unvalidated AI-generated output.