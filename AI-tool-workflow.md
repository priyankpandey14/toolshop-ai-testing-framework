# AI Tool Workflow

## Purpose

This document describes how Artificial Intelligence (AI) tools were used throughout the assessment. The objective was not to replace engineering decisions with AI, but to improve productivity, accelerate repetitive tasks, and assist in generating high-quality testing artifacts.

Every AI-generated output was manually reviewed, validated against the application, and refined before being included in this repository.

---

# AI Tools Used

| Tool | Purpose |
|------|---------|
| ChatGPT | Requirement analysis, risk identification, test design, documentation, prompt refinement |
| Cursor IDE | Playwright code generation, code completion, debugging assistance, documentation updates |
| Playwright | UI and API automation execution |

---

# AI-Assisted Engineering Workflow

The following workflow was followed throughout this assessment.

```
Requirement Understanding
        ↓
Requirement Analysis
        ↓
Risk Identification
        ↓
Test Design
        ↓
Test Data Preparation
        ↓
Automation Development
        ↓
Execution
        ↓
Validation
        ↓
Documentation
```

Each phase involved human review before moving to the next stage.

---

# Phase 1 – Requirement Understanding

## Objective

Understand the application's business workflow and determine the testing scope.

### AI Usage

AI was provided with application context and asked to identify the most business-critical workflow suitable for end-to-end testing.

### Human Validation

The suggested workflow was manually verified by exploring the application.

The following workflow was selected:

```
Login
    ↓
Search Product
    ↓
Add Product to Cart
    ↓
Checkout
```

This workflow was selected because it represents the primary customer purchase journey.

---

# Phase 2 – Requirement & Risk Analysis

## Objective

Identify functional requirements, business risks, technical risks, and automation opportunities.

### AI Usage

AI assisted in:

- Functional requirement identification
- Business risk analysis
- Technical risk analysis
- Risk prioritization
- Automation opportunity identification

### Human Validation

AI-generated risks and recommendations were manually reviewed.

Duplicate risks were removed.

Business priorities were adjusted based on application behaviour.

---

# Phase 3 – Test Design

## Objective

Design high-quality manual test cases.

### AI Usage

AI generated:

- Smoke scenarios
- Regression scenarios
- Positive test cases
- Negative test cases
- Edge cases

### Human Validation

Generated scenarios were reviewed manually.

Low-value or duplicate scenarios were removed.

Each test case was mapped to functional requirements.

Automation candidates were identified separately.

---

# Phase 4 – Test Data Preparation

## Objective

Generate reusable test data.

### AI Usage

AI suggested:

- Valid login credentials
- Invalid login data
- Customer information
- Boundary values
- Negative test data

### Human Validation

Only deterministic and reusable test data was selected.

Sensitive or unrealistic values were discarded.

---

# Phase 5 – Automation Development

## Objective

Develop maintainable Playwright automation.

### AI Usage

Cursor AI assisted in:

- Page Object Model creation
- Locator suggestions
- Assertion recommendations
- API request generation
- Code refactoring

### Human Validation

All generated code was manually reviewed.

Locators were verified against the application.

Assertions were improved where required.

Only validated code was committed.

---

# Phase 6 – Debugging & Improvements

## Objective

Resolve automation failures.

### AI Usage

AI assisted with:

- Locator failures
- Synchronization issues
- Assertion failures
- Code optimization

### Human Validation

Each suggested fix was executed locally before acceptance.

Only successful fixes were committed.

---

# Phase 7 – Documentation

## Objective

Create professional project documentation.

### AI Usage

AI assisted in preparing:

- Project overview
- Requirement analysis
- Test documentation
- Markdown formatting
- Repository organization

### Human Validation

All documentation was reviewed manually.

Project-specific information replaced generic AI suggestions.

---

# Prompt Refinement Process

Prompt quality improved throughout the assessment.

The following approach was followed:

### Initial Prompt

General prompts were used to understand the application.

↓

### Refined Prompt

Additional business context, expected outputs, and testing objectives were provided.

↓

### Optimized Prompt

Prompts were refined further by specifying:

- desired output format
- testing scope
- automation goals
- documentation requirements
- engineering best practices

This iterative refinement significantly improved the quality and relevance of AI-generated responses.

---

# AI Output Validation Strategy

AI-generated outputs were never accepted without review.

The following validation process was followed for every artifact:

1. Review AI response.
2. Compare with application behaviour.
3. Remove incorrect or duplicate content.
4. Improve readability.
5. Verify technical correctness.
6. Commit only validated output.

---

# Responsible Use of AI

The following principles were followed throughout the assessment:

- AI was used as an engineering assistant rather than a replacement for engineering judgement.
- Human validation was performed before accepting AI-generated outputs.
- Application behaviour was treated as the source of truth.
- Prompt refinement was performed to improve output quality.
- Only reviewed and verified content was committed to the repository.

---

# Key Learnings

This assessment demonstrated that effective AI usage depends on:

- Providing clear context.
- Writing structured prompts.
- Refining prompts iteratively.
- Critically reviewing AI-generated outputs.
- Combining AI assistance with engineering judgement.

The final deliverables represent a combination of AI-assisted productivity and manual engineering validation rather than AI-generated content alone.