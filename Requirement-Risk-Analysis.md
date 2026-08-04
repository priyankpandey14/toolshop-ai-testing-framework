# Requirement & Risk Analysis

## 1. Purpose

This document captures the functional requirements, business risks, technical risks, and testing priorities for the selected end-to-end workflow of the **Practice Software Testing (Toolshop)** application.

The analysis provides the foundation for:

- Manual Test Case Design
- API Test Scenario Design
- UI Automation
- API Automation
- Exploratory Testing
- Risk-Based Testing

---

# 2. Application Overview

**Application:** Practice Software Testing (Toolshop)

The application is an e-commerce platform where users can browse products, authenticate themselves, manage shopping carts, and purchase products through a checkout process.

For this assessment, the following business-critical workflow has been selected:

```
Register / Login
   ↓
Search Product
   ↓
Add Multiple Products to Cart
   ↓
Update Quantity
   ↓
Checkout (Cash on Delivery, confirm twice)
   ↓
View Invoice under My Invoices
```

This represents the application's primary revenue-generating user journey and therefore has been chosen for detailed testing and automation.

---

# 3. Functional Requirements

## FR-01 User Registration & Login

The system shall:

- Allow new users to register with valid details.
- Allow registered users to log in using valid credentials.
- Reject invalid username/password combinations.
- Display appropriate validation messages.
- Expose profile information for the authenticated user.
- Prevent unauthorized access to protected pages.

---

## FR-02 Product Search

The system shall:

- Allow users to search products using keywords.
- Display matching products.
- Return no results when products are unavailable.
- Maintain acceptable search performance.

---

## FR-03 Shopping Cart

The system shall:

- Allow users to add products to the shopping cart.
- Support adding multiple products.
- Display correct product information.
- Maintain cart information during the user session.
- Allow users to update quantities before checkout.

---

## FR-04 Checkout & Invoices

The system shall:

- Allow checkout for valid cart items using Cash on Delivery.
- Validate mandatory customer information.
- Require confirmation to generate the invoice (confirm twice in UI).
- Display order confirmation with an invoice number after successful checkout.
- List generated invoices under My Invoices.
- Prevent order placement when mandatory information is missing.

---

# 4. Non-Functional Requirements

The application should:

- Respond within acceptable response times.
- Maintain session stability.
- Handle invalid user inputs gracefully.
- Support modern browsers.
- Provide a consistent user experience.
- Ensure reliable API responses.

---

# 5. Assumptions

The following assumptions were considered during testing:

- Test environment is stable.
- Test user accounts are available.
- APIs are operational.
- Internet connectivity is stable.
- Test data remains consistent throughout execution.
- Browser cache is cleared before execution.

---

# 6. Business Risks

| Risk ID | Business Risk | Impact | Priority |
|----------|---------------|--------|----------|
| BR-01 | User cannot log in | User cannot access application | High |
| BR-02 | Product search returns incorrect results | User cannot find products | High |
| BR-03 | Product cannot be added to cart | Purchase journey interrupted | High |
| BR-04 | Checkout process fails | Customer cannot place an order | Critical |
| BR-05 | Incorrect order confirmation | Customer confusion and trust issues | High |

---

# 7. Technical Risks

| Risk ID | Technical Risk | Mitigation |
|----------|----------------|------------|
| TR-01 | Dynamic UI locators | Use stable Playwright locators |
| TR-02 | Slow API responses | Configure appropriate timeouts and retries |
| TR-03 | Dynamic test data | Use reusable and controlled test data |
| TR-04 | UI synchronization issues | Use Playwright auto-waiting mechanisms |
| TR-05 | Browser compatibility | Validate on supported browsers |

---

# 8. Risk-Based Testing Priorities

## Critical

- User Login
- Checkout

These directly impact the user's ability to purchase products.

---

## High

- Product Search
- Shopping Cart

These are essential for completing the purchase journey.

---

## Medium

- Product filtering
- Quantity update
- Session persistence

---

## Low

- Minor UI alignment
- Informational messages
- Cosmetic issues

---

# 9. Automation Opportunities

The following scenarios are suitable candidates for automation:

| Feature | UI Automation | API Automation |
|----------|---------------|----------------|
| Login | Yes | Yes |
| Product Search | Yes | Yes |
| Add Product to Cart | Yes | Yes |
| Checkout | Yes | Yes |

These scenarios are stable, repeatable, and business-critical, making them ideal for automation.

---

# 10. Exploratory Testing Focus Areas

Exploratory testing should cover:

- Invalid login attempts
- Empty search keywords
- Invalid product searches
- Empty cart checkout
- Session timeout
- Browser refresh during checkout
- Multiple browser tabs
- Rapid repeated user actions
- Boundary input values
- Unexpected navigation paths

---

# 11. AI-Assisted Requirement Analysis

Artificial Intelligence was used during the analysis phase to:

- Understand application workflows.
- Identify functional requirements.
- Discover potential business risks.
- Suggest edge cases.
- Recommend automation candidates.
- Improve test coverage.

All AI-generated insights were manually reviewed and validated against the application before being included in this document.

---

# 12. Test Strategy Summary

The testing approach combines manual testing, API testing, UI automation, and exploratory testing.

The strategy prioritizes:

- Business-critical functionality
- Risk-based testing
- End-to-end workflow validation
- Reusable automation
- AI-assisted engineering with human validation

---

# 13. Conclusion

Based on the requirement and risk analysis, the **Login → Search → Cart → Checkout** workflow has been identified as the highest-priority automation candidate.

This analysis serves as the baseline for creating manual test cases, API scenarios, Playwright automation scripts, exploratory testing notes, and AI prompt documentation included in this repository.