# AI Prompt Log – Requirements & Planning

## Purpose

This document captures how AI was used during the **Requirement Analysis and Test Planning** phase of this assessment.

The objective was not to delegate engineering decisions to AI, but to use AI as a collaborative assistant for accelerating requirement analysis, identifying risks, validating assumptions, refining the testing scope, and planning automation.

All AI-generated recommendations were manually reviewed against the application behaviour before being accepted.

---

# Assessment Context Provided to AI

Before requesting any recommendations, the following project context was shared with the AI assistant.

## Project Type

AI-Assisted Software Testing Assessment

## Role

Senior Software Development Engineer in Test (SDET)

## Experience Level

Approximately 8 years of experience in:

- Web Application Testing
- API Testing
- Test Automation
- Playwright
- Risk-Based Testing
- Requirement Analysis
- CI/CD Test Automation

## Application Under Test

Practice Software Testing (Toolshop)

An e-commerce web application that allows users to browse products, manage shopping carts and complete purchases.

## Assessment Objective

The goal is **not maximum automation coverage**.

The objective is to demonstrate:

- effective AI collaboration
- prompt engineering
- prompt refinement
- validation of AI outputs
- engineering judgement
- maintainable automation
- professional documentation

## Expected Deliverables

- Requirement Analysis
- Manual Test Cases
- API Test Scenarios
- Automation Opportunity Analysis
- UI Automation
- Exploratory Testing Notes
- AI Prompt Documentation
- Execution Evidence

Providing this context significantly improved the quality and relevance of AI-generated recommendations.

---

# Prompt Iteration 1

## Problem Statement

Before writing test cases or automation, I wanted to identify the most business-critical workflow that would provide the highest testing value while remaining achievable within the assessment timeline.

## Prompt

> I am working on an AI-assisted software testing assessment as a Senior SDET.
>
> The application under test is Practice Software Testing (Toolshop), an e-commerce web application.
>
> Instead of analysing every feature, recommend the **single most valuable end-to-end business workflow** that should be selected for manual testing, API testing, UI automation and exploratory testing.
>
> Consider:
>
> - business value
> - customer impact
> - automation feasibility
> - risk coverage
> - maintainability
>
> Explain why the workflow should be prioritised over other possible workflows.

---

## Why this Prompt was Written

The assessment rewards engineering judgement rather than maximum feature coverage.

Therefore, selecting the correct workflow before designing tests was an important planning activity.

---

## AI Response Summary

AI recommended the following workflow:

```
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
Update Product Quantity
        ↓
Proceed to Checkout
        ↓
Place Order
        ↓
Verify Order Confirmation
```

**Reason for Selection**

- Covers the complete customer lifecycle from account creation to successful order placement.
- Includes the highest business-critical user journey of the application.
- Maximizes requirement traceability across manual testing, UI automation, API automation, and execution evidence.
- Covers positive, negative, validation, and edge-case scenarios.
- Suitable for both Smoke and Regression testing.
- Provides maximum business value while keeping automation maintainable and scalable.

---

## Human Validation

The recommendation was verified manually by exploring the application.

The following observations were made:

- Authentication is the entry point for most user activities.
- Search is a core business capability.
- Cart functionality affects order placement.
- Checkout represents the highest business value transaction.

The recommendation was accepted without modification.

---

# Prompt Iteration 2

## Problem Statement

After selecting the workflow, the next objective was to understand which functional areas should receive higher testing priority.

## Prompt

> Using the selected Login → Search → Cart → Checkout workflow, identify:
>
> 1. Functional Requirements
> 2. Business Risks
> 3. Technical Risks
> 4. High-Risk Functional Areas
> 5. Automation Opportunities
> 6. Suggested Requirement IDs for traceability
>
> Present the response using a structure suitable for an enterprise QA team.

---

## Why this Prompt was Written

Rather than asking AI to generate documentation, the objective was to accelerate structured requirement analysis.

---

## AI Response Summary

AI suggested:

- Functional requirements
- Business risks
- Technical risks
- Requirement traceability
- Automation candidates

---

## Human Validation

The generated output was manually reviewed.

The following refinements were performed:

- Removed duplicate risks.
- Reordered priorities based on business impact.
- Introduced requirement identifiers (FR-01 to FR-04).
- Simplified generic recommendations.

The refined output became the basis of **Requirement-Risk-Analysis.md**.

---

# Prompt Iteration 3

## Problem Statement

The assessment expects a realistic engineering approach rather than maximum automation.

Therefore, the testing scope needed to be clearly defined.

## Prompt

> Recommend an achievable testing scope for this assessment.
>
> The scope should balance:
>
> - Manual Testing
> - API Testing
> - UI Automation
> - Exploratory Testing
>
> The recommendation should prioritise quality over quantity and focus on demonstrating engineering best practices.

---

## AI Response Summary

AI recommended focusing on a single critical workflow rather than attempting complete application coverage.

---

## Human Validation

This aligned with the assessment objective.

The following scope was finalised:

- Manual Testing
- API Testing
- UI Automation
- Exploratory Testing

restricted to the Login → Search → Cart → Checkout workflow.

---

# Prompt Iteration 4

## Problem Statement

A professional repository structure was required to make the deliverables easy to navigate and review.

## Prompt

> Recommend a clean GitHub repository structure for an AI-assisted software testing project.
>
> The repository should separate:
>
> - documentation
> - prompt history
> - automation framework
> - execution reports
> - evidence
>
> Keep the structure simple, maintainable and suitable for engineering review.

---

## AI Response Summary

AI recommended separating documentation, automation and prompt history into dedicated folders.

---

## Human Validation

The proposed structure was simplified to remove unnecessary folders while ensuring every assessment deliverable had a clearly defined location.

---

# Prompt Engineering Improvements

Prompt quality improved throughout the planning phase.

The following refinements consistently produced better responses.

| Improvement | Reason |
|------------|--------|
| Added business context | Reduced generic responses |
| Defined engineering role | Responses became more QA-focused |
| Specified expected output | Improved structure and consistency |
| Added technical constraints | Reduced unnecessary assumptions |
| Requested reasoning | Improved recommendation quality |

---

# AI Output Validation Strategy

Every AI-generated recommendation followed the same validation process.

1. Understand the recommendation.
2. Compare it with actual application behaviour.
3. Verify business relevance.
4. Remove duplicate or low-value suggestions.
5. Refine technical accuracy.
6. Accept only validated recommendations.

---

# Engineering Decisions

The following decisions were taken after reviewing AI recommendations.

- Selected one high-value workflow instead of complete application coverage.
- Adopted a risk-based testing strategy.
- Introduced requirement traceability.
- Planned reusable Playwright automation using the Page Object Model.
- Prioritised documentation and AI workflow alongside automation.
- Planned iterative Git commits to demonstrate project evolution.

---

# Key Learnings

The planning phase demonstrated that AI produces significantly better recommendations when provided with:

- complete business context
- technical constraints
- expected deliverable format
- testing objectives
- engineering expectations

AI accelerated analysis, but the final testing strategy was established through manual review and engineering judgement.

---

# Conclusion

AI was used as an engineering assistant during the planning phase to accelerate requirement analysis and improve decision-making.

The final testing scope, repository structure, requirement traceability, and automation strategy were established through iterative prompt refinement and manual validation, ensuring the project aligns with both engineering best practices and the assessment objectives.