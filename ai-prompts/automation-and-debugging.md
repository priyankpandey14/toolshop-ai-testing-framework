# AI Prompts – Automation & Debugging

## Objective

Leverage AI as a collaborative engineering assistant throughout the automation lifecycle to design, implement, review, debug, optimize, and validate a Playwright-based automation framework. AI was used iteratively—not for one-time code generation—to improve framework quality, maintainability, test coverage, and execution stability. Every AI-generated output was manually reviewed, refined, executed, and committed incrementally following the assessment guidelines.

---

# Prompt 1 – Framework Design & Automation Strategy

### Prompt

> Act as a Principal SDET and Playwright Framework Architect with 10+ years of experience in UI/API automation. Review the project requirements, functional test cases, project information, and repository structure before generating any code. Design a production-ready Playwright automation framework using JavaScript and the Page Object Model (POM). Recommend the optimal folder hierarchy, reusable utilities, test data strategy, reporting mechanism, coding standards, execution strategy, Smoke/Regression segregation, and best practices for scalable UI and API automation. Explain every architectural decision before implementation and avoid unnecessary complexity.

### Automation Flow

Requirement Analysis

↓

Framework Planning

↓

Folder Structure Design

↓

Page Object Model

↓

Utilities & Test Data

↓

Reporting Strategy

↓

Execution Strategy

### Outcome

- Production-ready Playwright framework
- Modular Page Object architecture
- Reusable utilities
- Standardized coding conventions
- Scalable automation foundation

---

# Prompt 2 – End-to-End UI Automation Development

### Prompt

> Using the approved framework, implement reusable Page Object classes and develop complete end-to-end UI automation covering the application's primary business workflow. Automate Registration, Login, Product Search, Product Details, Add to Cart, Cart Validation, Quantity Update, Checkout, and Order Confirmation. Cover positive, negative, validation, and edge scenarios while following the Arrange–Act–Assert pattern. Avoid duplicate code, use explicit waits instead of hard waits, create reusable methods, implement meaningful assertions, and tag scenarios appropriately using @Smoke and @Regression. Keep the framework maintainable, readable, and suitable for future enhancements.

### Automation Flow

New User Registration

↓

Login

↓

Search Product

↓

View Product Details

↓

Add Product to Cart

↓

Validate Cart

↓

Update Quantity

↓

Proceed to Checkout

↓

Place Order

↓

Verify Order Confirmation

### Outcome

- Complete end-to-end UI automation
- Reusable Page Objects
- Smoke Suite
- Regression Suite
- Business flow validation
- Maintainable test architecture

---

# Prompt 3 – API Automation Development

### Prompt

> Design and implement API automation using Playwright APIRequestContext for the application's core business APIs. Automate user registration (if available), authentication, product retrieval, product search, cart operations, checkout, and order verification. Validate HTTP status codes, response schema, mandatory fields, business rules, negative responses, and edge cases. Ensure API tests remain independent, reusable, and aligned with the UI automation flow while minimizing duplicated logic.

### Automation Flow

Register User (if supported)

↓

Authenticate User

↓

Search Products

↓

Retrieve Product Details

↓

Cart Operations

↓

Checkout

↓

Order Validation

↓

Response Verification

### Outcome

- API automation suite
- End-to-end API validation
- Response schema verification
- Business rule validation
- Independent and reusable API tests

---

# Prompt 4 – Framework Review & Code Quality Improvement

### Prompt

> Perform a comprehensive code review of the Playwright framework as a Principal QA Automation Architect. Review Page Objects, UI tests, API tests, utilities, selectors, assertions, synchronization strategy, naming conventions, folder hierarchy, and overall maintainability. Identify duplicate code, unstable locators, poor assertions, synchronization issues, hardcoded values, and opportunities for refactoring. Recommend improvements that increase readability, scalability, stability, and compliance with Playwright best practices without changing business functionality.

### Review Flow

Framework Review

↓

Code Quality Analysis

↓

Identify Improvement Areas

↓

Refactor

↓

Validate Framework

### Outcome

- Cleaner architecture
- Improved maintainability
- Better locator strategy
- Reduced code duplication
- Enhanced framework quality

---

# Prompt 5 – Debugging & Root Cause Analysis

### Prompt

> Analyze Playwright execution logs, screenshots, traces, HTML reports, and failed test cases. For each failure, identify the exact root cause, explain why the issue occurred, recommend the best solution, update only the affected implementation, preserve the existing framework architecture, and avoid unnecessary code changes. After applying fixes, re-execute the failed scenarios until the automation suite passes successfully. Summarize all fixes performed during debugging.

### Debugging Flow

Execute Tests

↓

Analyze Failure

↓

Root Cause Analysis

↓

Implement Fix

↓

Re-run Failed Tests

↓

Validate Stability

↓

Confirm Successful Execution

### Outcome

- Stable automation suite
- Faster defect resolution
- Improved execution reliability
- Root-cause-driven debugging

---

# Prompt 6 – Execution Evidence & Reporting

### Prompt

> Execute the complete Smoke and Regression automation suites. Generate execution evidence including Playwright HTML reports, screenshots, execution logs, traces, and test results. Organize all execution artifacts in a reviewer-friendly folder structure. Verify that every executed scenario has corresponding evidence and generate a concise execution summary highlighting total tests executed, passed, failed, skipped, execution duration, browser details, and environment information.

### Execution Flow

Execute Smoke Suite

↓

Execute Regression Suite

↓

Generate HTML Report

↓

Capture Screenshots

↓

Collect Logs & Traces

↓

Generate Execution Summary

↓

Verify Evidence

### Outcome

- HTML execution report
- Screenshots
- Execution logs
- Test results
- Reviewer-friendly execution evidence

---

# Prompt 7 – Final Repository Validation

### Prompt

> Review the entire repository against the QA Practical Assessment document before submission. Validate repository structure, documentation, requirement traceability, manual test cases, UI automation, API automation, AI prompt history, execution evidence, README instructions, Git commit history, and Playwright best practices. Identify missing deliverables, repository inconsistencies, or assessment gaps. Provide a final readiness score and recommend only meaningful improvements that enhance compliance without introducing unnecessary complexity.

### Validation Flow

Repository Review

↓

Assessment Checklist

↓

Gap Analysis

↓

Repository Refinement

↓

Final Validation

↓

Submission Readiness

### Outcome

- Repository compliance verified
- Assessment gaps identified
- Submission readiness confirmed
- Reviewer-friendly project structure

---

# AI Usage Summary

AI was used iteratively throughout the software testing lifecycle to:

- Understand project requirements and define the automation strategy.
- Design a scalable Playwright automation framework.
- Implement reusable Page Objects following the Page Object Model.
- Develop end-to-end UI automation for complete business workflows.
- Develop API automation for critical business APIs.
- Improve framework quality through structured code reviews.
- Perform root cause analysis for automation failures.
- Optimize selectors, synchronization, assertions, and code reusability.
- Generate execution reports, screenshots, and test evidence.
- Validate repository compliance with the QA Practical Assessment.
- Review documentation and improve overall maintainability.

**All AI-generated outputs were manually reviewed, refined, validated through successful execution, and committed incrementally following an iterative AI-assisted development approach. No AI-generated code was accepted without verification, ensuring both technical accuracy and assessment compliance.**