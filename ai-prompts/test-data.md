# AI Prompt Log – Test Data Design

## Objective

The objective of this phase was to use AI as an engineering assistant to design realistic, reusable, and maintainable test data for manual testing, API testing, and Playwright automation.

Instead of requesting random test data, the prompts focused on creating business-relevant datasets that support positive, negative, boundary, security, and automation scenarios while minimizing future maintenance effort.

All AI-generated test data recommendations were manually reviewed before implementation.

---

# Test Data Strategy

The selected business workflow:

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

The test data strategy was designed to support:

- Functional Testing
- Smoke Testing
- Regression Testing
- API Testing
- UI Automation
- Exploratory Testing

---

# Prompt Iteration 1 – Functional Test Data Design

## Problem Statement

Design realistic business test data for validating the selected workflow.

## Prompt

> I am working as a Senior Software Development Engineer in Test (SDET) with approximately 8 years of experience in web application, API, and automation testing.
>
> The application under test is Practice Software Testing (Toolshop), an e-commerce application.
>
> Design a realistic test data strategy for the following workflow:
>
> Login → Search Product → View Product → Add Product to Cart → Checkout
>
> Generate test data that covers:
>
> - Valid users
> - Invalid users
> - Empty inputs
> - Boundary values
> - Invalid search keywords
> - Existing products
> - Non-existing products
> - Different product categories
> - Checkout information
>
> Recommend only business-relevant test data suitable for enterprise QA projects.

## Validation

The generated data was manually reviewed to ensure realism and maintainability. Duplicate datasets were removed, and reusable test values were identified for both manual and automated execution.

---

# Prompt Iteration 2 – Negative & Boundary Test Data

## Problem Statement

Identify test data required to validate application robustness and input validation.

## Prompt

> Review the selected workflow and recommend negative and boundary test data that validates input handling and error scenarios.
>
> Include:
>
> - Empty values
> - Invalid credentials
> - Incorrect passwords
> - Special characters
> - Maximum and minimum input lengths
> - Invalid product searches
> - Invalid checkout details
>
> Explain the business risk associated with each category of test data and recommend expected application behavior.

## Validation

The recommendations were manually reviewed. Redundant combinations were removed, and only business-relevant negative datasets were retained to keep the test suite concise and effective.

---

# Prompt Iteration 3 – Automation Test Data Strategy

## Problem Statement

Design reusable test data for Playwright UI and API automation.

## Prompt

> Recommend a maintainable test data strategy for Playwright automation using JavaScript.
>
> Consider:
>
> - Reusable test users
> - Static vs dynamic test data
> - API payloads
> - Product identifiers
> - Checkout information
> - Environment independence
> - Future scalability
>
> Suggest whether the data should be stored as JSON, constants, fixtures, or environment variables, and justify the recommendation.

## Validation

The recommendations were refined to keep the framework lightweight. Frequently used data such as user credentials and product information were planned as reusable fixtures, while environment-specific values were isolated from test logic.

---

# Key Prompt Engineering Practices

The following practices were applied throughout the test data design phase:

- Defined complete business and technical context before requesting recommendations.
- Specified the selected business workflow.
- Requested realistic and maintainable datasets instead of random values.
- Included positive, negative, boundary, and security scenarios.
- Considered automation reusability while designing test data.
- Refined prompts based on previous AI responses.
- Manually validated every recommendation before adoption.

---

# Human Validation Process

Every AI-generated recommendation was reviewed using the following process:

1. Verify business relevance.
2. Remove unrealistic or duplicate datasets.
3. Ensure compatibility with manual and automated testing.
4. Validate maintainability and reusability.
5. Approve only practical and assessment-relevant test data.

---

# Engineering Decisions

The following decisions were made after reviewing AI recommendations:

- Designed reusable test data that supports both UI and API automation.
- Included positive, negative, boundary, and basic security datasets.
- Kept environment-specific values separate from reusable test data.
- Prioritized maintainability over excessive data combinations.
- Focused on realistic business scenarios rather than artificial edge cases.

---

# Outcome

AI accelerated the creation of a structured and reusable test data strategy by suggesting business-relevant datasets, automation-friendly data organization, and validation scenarios.

The final test data strategy was established through iterative prompt refinement and manual engineering review, ensuring the datasets remain realistic, maintainable, and aligned with enterprise software testing practices.