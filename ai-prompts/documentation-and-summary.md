# AI Prompts – Documentation & Summary

## Objective

Leverage AI as a collaborative QA engineering assistant throughout the documentation lifecycle to analyze requirements, establish requirement traceability, review documentation quality, validate repository consistency, identify assessment gaps, and prepare a reviewer-friendly submission. AI was used iteratively—not for one-time content generation—but to improve documentation quality, maintainability, and assessment compliance. Every AI-generated recommendation was manually reviewed, validated against the implementation, refined where necessary, and committed incrementally following an iterative development methodology.

---

# Prompt 1 – Requirement Analysis & Risk Documentation

### Prompt

> Act as a Senior QA Lead and Test Architect with extensive experience in software testing and quality engineering. Review the project requirements, application workflow, and functional scope before generating any documentation. Prepare a Requirement & Risk Analysis document that clearly identifies business objectives, testing scope, assumptions, dependencies, constraints, functional risks, technical risks, business risks, mitigation strategies, and testing priorities. Before finalizing the document, perform a gap analysis to ensure every business requirement is represented and no critical risk has been overlooked. Keep the documentation concise, technically accurate, and aligned with QA best practices.

### Documentation Flow

Requirement Analysis

↓

Business Understanding

↓

Risk Identification

↓

Gap Analysis

↓

Documentation Review

↓

Final Validation

### Outcome

- Requirement Analysis
- Risk Assessment
- Scope Definition
- Risk Mitigation Plan
- Project Assumptions

---

# Prompt 2 – Project Information & Functional Coverage

### Prompt

> Review the application under test and generate a professional Project Information document describing business modules, user workflows, supported features, UI scope, API scope, Smoke scope, Regression scope, positive scenarios, negative scenarios, edge case coverage, assumptions, dependencies, and testing approach. Cross-validate the document against the Functional Test Cases, UI Automation, and API Automation to ensure consistency and eliminate documentation gaps before finalizing.

### Documentation Flow

Application Analysis

↓

Business Workflow

↓

Feature Mapping

↓

Coverage Review

↓

Cross Validation

↓

Final Documentation

### Outcome

- Project Information
- Functional Coverage
- UI Coverage
- API Coverage
- Testing Strategy

---

# Prompt 3 – Requirement Traceability Review

### Prompt

> Review the Functional Test Cases, UI Automation suite, API Automation suite, and Project Information document. Establish clear traceability between business requirements, manual testing, UI automation, and API automation. Verify that every critical workflow is covered by positive, negative, validation, and edge scenarios. Highlight missing mappings, duplicate coverage, documentation inconsistencies, and recommendations to improve traceability before submission.

### Documentation Flow

Business Requirements

↓

Manual Test Cases

↓

UI Automation

↓

API Automation

↓

Coverage Validation

↓

Traceability Review

### Outcome

- Requirement Traceability Matrix
- Coverage Validation
- Documentation Consistency
- Gap Analysis

---

# Prompt 4 – Repository Documentation Review

### Prompt

> Act as a QA Documentation Reviewer. Review every project document including Requirement Analysis, Project Information, Functional Test Cases, README, AI Prompt History, and Execution Evidence. Validate formatting consistency, naming conventions, technical accuracy, document relationships, and reviewer readability. Identify missing sections, duplicate information, inconsistent terminology, broken references, and opportunities to improve documentation quality before final submission.

### Documentation Flow

Document Review

↓

Consistency Check

↓

Gap Analysis

↓

Documentation Refinement

↓

Final Validation

### Outcome

- Documentation Review
- Improved Consistency
- Reviewer-Friendly Documentation
- Documentation Quality Validation

---

# Prompt 5 – README & Repository Navigation

### Prompt

> Generate a professional README that enables any reviewer to configure, execute, and validate the project without additional guidance. Include project overview, repository structure, prerequisites, installation steps, framework architecture, Playwright setup, UI execution, API execution, Smoke execution, Regression execution, HTML report generation, execution evidence location, troubleshooting guidance, assumptions, limitations, and future enhancements. Before finalizing, review the README against the repository structure to ensure every referenced file, folder, and command exists.

### Documentation Flow

Repository Review

↓

Installation Guide

↓

Execution Guide

↓

Evidence Location

↓

Validation

↓

README Finalization

### Outcome

- Professional README
- Installation Guide
- Execution Guide
- Repository Navigation
- Reviewer Instructions

---

# Prompt 6 – Test Execution Summary & Evidence

### Prompt

> Review the Playwright HTML Report, execution logs, screenshots, traces, and test execution artifacts. Generate a concise Test Execution Summary containing execution date, browser, environment, executed scenarios, passed tests, failed tests, skipped tests, execution duration, Smoke execution status, Regression execution status, API execution status, key validations performed, observations, and overall execution outcome. Validate that the summary references only actual execution evidence and never generates fictitious results.

### Documentation Flow

Execute Tests

↓

Collect Evidence

↓

Analyze Results

↓

Generate Summary

↓

Evidence Validation

↓

Final Report

### Outcome

- Test Execution Summary
- Execution Statistics
- Test Evidence Summary
- Reviewer-Friendly Execution Report

---

# Prompt 7 – Repository Quality Audit

### Prompt

> Act as a QA Assessment Reviewer and Principal SDET. Review the complete repository against the QA Practical Assessment document before submission. Validate repository structure, documentation, requirement traceability, manual testing, UI automation, API automation, execution evidence, AI prompt history, README instructions, Git commit history, Playwright best practices, and Cursor-assisted development workflow. Categorize findings as Critical, Major, Minor, or Nice-to-Have. Recommend improvements only where necessary and provide a final assessment readiness score with justification.

### Documentation Flow

Repository Review

↓

Assessment Checklist

↓

Gap Analysis

↓

Quality Audit

↓

Repository Refinement

↓

Submission Readiness

### Outcome

- Repository Audit
- Assessment Compliance
- Documentation Validation
- Final Readiness Report

---

# AI Usage Summary

AI was used iteratively throughout the documentation lifecycle to:

- Analyze project requirements and business workflows.
- Identify project risks, assumptions, and testing priorities.
- Prepare project documentation aligned with assessment requirements.
- Establish traceability between requirements, manual testing, UI automation, and API automation.
- Review documentation quality and repository consistency.
- Identify documentation gaps through structured quality reviews.
- Improve README quality and repository navigation.
- Generate execution summaries using actual automation evidence.
- Audit repository readiness against the QA Practical Assessment.
- Refine technical documentation through multiple review iterations.

Every AI-generated response was critically evaluated before adoption. Outputs were manually verified against the application, functional test cases, automation implementation, and repository structure. Recommendations were refined where necessary, validated through execution, and committed incrementally following an iterative AI-assisted software testing methodology. AI was used to enhance engineering productivity and documentation quality while maintaining complete human oversight and technical ownership throughout the project.