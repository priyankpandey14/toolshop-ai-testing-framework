# Exploratory Testing Notes

**Application:** Practice Software Testing (Toolshop)  
**Environment:** https://practicesoftwaretesting.com / https://api.practicesoftwaretesting.com  
**Browser:** Chromium (Desktop Chrome)  
**Tester:** Priyank Pandey  
**Approach:** Session-based exploratory testing (SBTM-style), risk-based, complementary to scripted manual + automation  
**Related artifacts:** `Requirement-Risk-Analysis.md` §10 · `FunctionalTestCase.csv` · `PrismStructure/` automation · `Test-Execution-Report.md`

---

## 1. Purpose

This document records **chartered exploratory sessions** executed against the Toolshop purchase journey after scripted coverage was defined.

Exploratory testing was used to:

- Validate behaviours **outside** the capped 8 manual / 8 UI / 5 API cases
- Stress risk areas listed in `Requirement-Risk-Analysis.md`
- Discover edge, negative, and usability issues not suitable for immediate automation
- Confirm whether scripted cases leave dangerous gaps before submission

Exploratory findings **do not replace** Smoke/Regression automation. They prove human judgement beyond AI-generated happy paths.

---

## 2. Scope

### In scope

| Area | Why |
|------|-----|
| Authentication & session | FR-01 / BR-01 – entry gate for purchase |
| Product search & catalogue | FR-02 / BR-02 – discovery quality |
| Cart behaviour under edge conditions | FR-03 / BR-03 |
| Checkout, billing, double-confirm, invoices | FR-04 / BR-04–05 – revenue path |
| API error and auth boundary probes | Complements API automation happy path |
| Navigation, refresh, multi-tab interruption | Session / state risk |

### Out of scope (intentionally)

- Full multi-browser matrix (Firefox/Safari/mobile)
- Payment methods other than Cash on Delivery (assessment focus is COD + double confirm)
- Admin / back-office flows
- Performance / load testing
- Accessibility WCAG formal audit
- Exhaustive localisation beyond observing EN UI

---

## 3. Mission & Charter Strategy

| Session ID | Charter (mission) | Time-box | Related FR / Risk | Status |
|------------|-------------------|----------|-------------------|--------|
| EXP-01 | Probe authentication negatives, lockouts, and protected-route access | 45 min | FR-01, BR-01, TR-04 | Completed |
| EXP-02 | Explore search emptiness, irrelevance, stock, and filter/sort quirks | 45 min | FR-02, BR-02 | Completed |
| EXP-03 | Stress cart with stock, quantity, empty cart, and rapid actions | 40 min | FR-03, BR-03 | Completed |
| EXP-04 | Interrupt and misuse checkout (refresh, skip confirm, bad address, empty cart) | 50 min | FR-04, BR-04–05, TR-01/04 | Completed |
| EXP-05 | API boundary probes: auth missing, bad payloads, invoice without cart | 40 min | FR-01–04 API | Completed |
| EXP-06 | Cross-cutting: multi-tab cart, back-button, and unexpected navigation | 30 min | Session / UX | Completed |

**Total exploratory effort:** ~4 focused hours (within assessment Core guidance).

---

## 4. Heuristics Applied

| Heuristic | How it was used |
|-----------|-----------------|
| **Risk-based** | Critical/High risks from RRA drove charter order |
| **Error guessing** | Wrong password, empty fields, leaked passwords, missing confirm |
| **Boundary** | Quantity 0 / large values; empty vs whitespace search |
| **State / transition** | Login → logout → protected page; cart → empty → checkout |
| **Interruptions** | Refresh mid-checkout; second tab mutating cart |
| **Consistency** | UI message vs API status; invoice on confirmation vs My Invoices |
| **Touring** | Feature tour of Profile, Favourites, Messages (smoke glance only) |

---

## 5. Session Notes

### EXP-01 — Authentication & session

**Charter:** Find ways a user can fail login, get locked, or reach protected pages without a valid session.

**Environment / data:** Public demo customer; intentionally invalid password; newly registered throwaway user.

| # | Idea / probe | Observation | Result | Severity | Follow-up |
|---|--------------|-------------|--------|----------|-----------|
| 1 | Invalid email + wrong password | Error: `Invalid email or password`; remains on `/auth/login`; Sign in still visible | **Pass (defensive)** | — | Covered by TC-03 / UI Invalid Login |
| 2 | Empty email and password submit | Client-side / form validation prevents successful login; no authenticated nav | **Pass (defensive)** | — | Keep exploratory; not in 8-case CSV |
| 3 | Whitespace-only email | Login rejected; no session created | **Pass (defensive)** | Low | Optional future negative case |
| 4 | Repeated invalid attempts on known demo account | After many failures, account may show lock messaging (`Account locked...`) on public demo | **Observation** | Medium | Automation uses `customer3` + unique registrants to reduce lock risk (`constants.js` note) |
| 5 | Open `/account/profile` while logged out | Redirected / denied; Sign in required | **Pass (defensive)** | — | Aligns with FR-01 protected pages |
| 6 | Open `/account/invoices` while logged out | Protected; no invoice list without auth | **Pass (defensive)** | — | — |
| 7 | Register with weak / common password | API/UI can reject with validation (e.g. complexity / leaked-password style 422) | **Observation** | Medium | Registration factory uses strong unique passwords (`Qa!{stamp}Xy9`) |
| 8 | Register → login → My Profile field check | First name, last name, email match registration | **Pass** | — | Maps to UI AC1 / TC-01 |

**Session debrief (EXP-01):** Authentication negatives are handled sanely. Main residual risk is **demo account lockout** under shared public credentials — mitigated in automation by unique users and preferred `customer3`.

---

### EXP-02 — Product search & catalogue

**Charter:** Challenge search for empty, nonsense, stock, and result-quality issues.

| # | Idea / probe | Observation | Result | Severity | Follow-up |
|---|--------------|-------------|--------|----------|-----------|
| 1 | Search valid keyword `Pliers` | Results shown; heading indicates search; product `Pliers` present | **Pass** | — | TC-04 / UI Product Search |
| 2 | Empty search submit | Behaviour depends on current UI state; may clear or show broad catalogue | **Observation** | Low | Documented assumption; not automated |
| 3 | Nonsense keyword `zzznoproductxyz999` | “There are no products found.” (or equivalent empty state) | **Pass (defensive)** | — | Data exists in `invalidSearch`; suitable future regression |
| 4 | Search `Pliers` but scan for irrelevant hits | Results can include non-plier tools (e.g. hammers) — loose matching / demo quirk | **Finding F-01** | Low (quality) | Do not fail Smoke on this; treat as catalogue quality note |
| 5 | Open product marked Out of stock | Add to cart control disabled / not usable | **Pass (defensive)** | — | Automation skips disabled add-to-cart (`searchAndAddProductToCart`) |
| 6 | Sort / filter sidebar glance | Sort control may appear empty/incomplete on demo; filters present | **Observation** | Low | Out of Core automation scope |
| 7 | Energy rating labels on hand tools | All visible products may show same rating band — demo data oddity | **Observation** | Info | Cosmetic / data quality |

**Session debrief (EXP-02):** Search happy path is reliable enough for Core. Result **relevance** and **stock** are the real risks; automation correctly prefers in-stock products.

---

### EXP-03 — Shopping cart

**Charter:** Break cart quantity, emptiness, and rapid add behaviour.

| # | Idea / probe | Observation | Result | Severity | Follow-up |
|---|--------------|-------------|--------|----------|-----------|
| 1 | Add two different in-stock products | Cart badge ≥ 2; both lines retained when cart opened | **Pass** | — | TC-05 |
| 2 | Increase quantity on one line | Line quantity and cart total increase | **Pass** | — | TC-06 |
| 3 | Set quantity to `0` or clear aggressively | Cart may remove line or block invalid qty depending on UI | **Observation** | Medium | Candidate for future edge automation |
| 4 | Rapid double-click Add to cart | Occasional duplicate increments or toast race; usually ends consistent after settle | **Observation** | Low | Sync waits on cart POST in POM reduce flake |
| 5 | Proceed to checkout with empty cart | Checkout path blocked / empty-cart messaging; cannot complete COD invoice | **Pass (defensive)** | — | Important negative; kept exploratory within 5–8 case cap |
| 6 | Remove last product then checkout | Same as empty cart — order not placed | **Pass (defensive)** | — | — |
| 7 | Add product, navigate Home, reopen cart | Cart persistence for session / user appears retained | **Pass** | — | Supports FR-03 session cart |

**Session debrief (EXP-03):** Multi-item and quantity happy paths are solid. Empty-cart checkout is the highest-value **unautomated** negative still covered here.

---

### EXP-04 — Checkout, billing, double confirm, invoices

**Charter:** Misuse COD checkout and confirm the assessment double-confirm rule.

| # | Idea / probe | Observation | Result | Severity | Follow-up |
|---|--------------|-------------|--------|----------|-----------|
| 1 | Complete COD with **one** Finish only | Payment success may show, but invoice number / final thanks may not appear until second confirm | **Pass (requirement)** | Critical if missed | Explicitly automated in `CheckoutPage.placeOrder` |
| 2 | Finish **twice** after COD | `Thanks for your order! Your invoice number is INV-…` | **Pass** | — | TC-07 |
| 3 | Open My Invoices after success | Matching `INV-*` row listed | **Pass** | — | TC-08 |
| 4 | Clear / blank mandatory billing then proceed | Proceed blocked or validation prevents payment step | **Pass (defensive)** | Medium | RRA FR-04; not in 8-case CSV (scope control) |
| 5 | Country + postal + house number → postcode lookup | Street/city/state auto-fill for NL `3512 JC` / house `1` | **Pass** | — | Used by UI + API helpers |
| 6 | Refresh browser on Payment step before second confirm | May lose transient state / require re-entry; order not silently completed | **Observation** | Medium | Documented interruption risk |
| 7 | Refresh on confirmation page | Confirmation text may be lost from view; invoice still appears under My Invoices if order completed | **Observation** | Low | Invoice list is source of truth after success |
| 8 | Cart badge after successful order | Badge may still show residual count on demo | **Finding F-02** | Low (UX) | Cosmetic; does not block invoice generation |
| 9 | Wrong / incomplete postal + house combo | Lookup may fail; street remains empty unless manually filled | **Observation** | Medium | Automation waits lookup then fills fallback values |

**Session debrief (EXP-04):** Double confirm is a **must-know product quirk** for this SUT. Scripted automation correctly encodes it. Billing validation and refresh interruptions remain exploratory strengths.

---

### EXP-05 — API boundary probes

**Charter:** Confirm API rejects unsafe or incomplete calls that happy-path automation does not cover.

| # | Idea / probe | Observation | Result | Severity | Follow-up |
|---|--------------|-------------|--------|----------|-----------|
| 1 | `POST /users/login` with wrong password | Non-200; no usable bearer token | **Pass (defensive)** | — | Strong candidate to replace duplicate Login API later |
| 2 | `GET /users/me` without Authorization | Unauthorized / rejected | **Pass (defensive)** | — | — |
| 3 | `POST /invoices` without bearer token | Rejected | **Pass (defensive)** | — | — |
| 4 | `POST /invoices` with token but invalid / empty `cart_id` | Error response; no valid `INV-*` | **Pass (defensive)** | Medium | Future API negative |
| 5 | Register → login → create cart → add products → invoice (COD body) | `201` + `invoice_number` + listed in `/invoices` | **Pass** | — | API AC1/AC2 automated |
| 6 | Product search `q=Pliers` | `200` with `data[]` containing expected product | **Pass** | — | Product Search API |
| 7 | Add out-of-stock product id if available | May fail or still accept depending on API stock enforcement | **Observation** | Medium | UI already guards disabled button; API stock check via `findInStockProduct` |

**Session debrief (EXP-05):** Core lifecycle APIs are trustworthy. Auth and invoice negatives are understood but **not yet in the 5-case API suite** (cap + smoke overlap choice).

---

### EXP-06 — Cross-cutting navigation & multi-tab

**Charter:** Break assumptions about single-tab linear journeys.

| # | Idea / probe | Observation | Result | Severity | Follow-up |
|---|--------------|-------------|--------|----------|-----------|
| 1 | Two tabs, same user: add item in Tab A, view cart in Tab B | Cart eventually reflects shared backend state after refresh/navigation | **Observation** | Medium | Explains why UI suite runs serially (`fullyParallel: false`) |
| 2 | Browser Back from product detail to search results | Results usually restored; occasional need to re-search | **Observation** | Low | POM re-searches rather than relying on history |
| 3 | Open Favourites / Messages while focusing invoices | Pages load; no crash; not part of Core assertions | **Pass (smoke glance)** | Info | Out of Core scope |
| 4 | Change language selector briefly then return to EN | UI switches; Core flow still usable in EN | **Observation** | Info | Tests stay on EN |
| 5 | Deep-link to checkout steps without cart | User guided back / cannot complete payment | **Pass (defensive)** | Low | — |

**Session debrief (EXP-06):** Multi-tab shared cart is the main concurrency risk on the public demo — mitigated by serial UI execution and unique registration where possible.

---

## 6. Findings log

| ID | Title | Area | Severity | Repro summary | Disposition |
|----|-------|------|----------|---------------|-------------|
| F-01 | Search relevance includes unrelated tools | Search | Low | Search `Pliers`; hammers may appear in grid | Accepted demo limitation; Smoke asserts presence of target product, not exclusive relevance |
| F-02 | Cart badge may remain after successful COD order | Checkout UX | Low | Complete double-confirm checkout; badge still shows count | Accepted cosmetic issue; invoice confirmation + My Invoices are primary oracles |
| F-03 | Public demo accounts can lock after repeated bad logins | Auth | Medium | Many invalid attempts on shared customer | Mitigated: unique registration users; prefer `customer3`; env overrides documented |
| F-04 | Postcode lookup race can leave street empty | Checkout | Medium | Fill postal/house before lookup completes | Mitigated in POM with lookup wait + fallback fill |
| F-05 | Out-of-stock products block add-to-cart | Catalogue | Medium (env) | Open OOS product; button disabled | Mitigated: stock-aware product selection in UI/API |

No **Critical** open product defects blocked the Core assessment path. Critical risk was **missing double-confirm**, which is now scripted and verified.

---

## 7. Coverage map — Exploratory vs Scripted

| Risk / behaviour | Exploratory | Manual CSV | UI Auto | API Auto |
|------------------|:-----------:|:----------:|:-------:|:--------:|
| Valid registration + profile | EXP-01 | TC-01 | Yes | Yes (register) |
| Valid login | EXP-01 | TC-02 | Yes | Yes |
| Invalid login | EXP-01 | TC-03 | Yes | Explored |
| Account lock / weak password | EXP-01 | — | Mitigated | Mitigated |
| Valid search | EXP-02 | TC-04 | Yes | Yes |
| Empty / nonsense search | EXP-02 | — | — | — |
| Search relevance quirks | EXP-02 (F-01) | — | — | — |
| Multi-item cart | EXP-03 | TC-05 | Yes | Yes |
| Quantity update | EXP-03 | TC-06 | Yes | — |
| Empty cart checkout | EXP-03 | — | — | — |
| COD + **double confirm** | EXP-04 | TC-07 | Yes | N/A (API single create) |
| My Invoices | EXP-04 | TC-08 | Yes | Yes |
| Missing billing fields | EXP-04 | — | — | — |
| Refresh mid-checkout | EXP-04 | — | — | — |
| API unauthorized invoice | EXP-05 | — | — | Explored |
| Multi-tab cart | EXP-06 | — | Serial workers | — |

This matrix shows exploratory testing deliberately covers the **gaps** left by the 5–8 case cap.

---

## 8. Oracles used

| Oracle | Example |
|--------|---------|
| Explicit UI messages | Invalid login text; payment success; order thanks + `INV-*` |
| Navigation / URL | Remain on `/auth/login` after failure; reach `/account/invoices` |
| Visual state | Sign in hidden when logged in; disabled Add to cart |
| Cart badge / totals | Quantity and price movement |
| API status + body | 401/422 vs 200/201; schema fields; invoice list membership |
| Consistency | Confirmation invoice number appears in My Invoices |

---

## 9. Risks accepted for Core submission

1. **Case-count limit (5–8)** — empty search, empty cart checkout, and API auth negatives stay exploratory rather than expanding automation.
2. **Public demo volatility** — stock, lockouts, and slow postcode lookup are environmental; mitigated in code, not “fixed” in product.
3. **Search relevance (F-01)** — treated as demo quality, not a Core fail.
4. **Single browser** — Chromium only for automation; exploratory also Chromium-focused.

---

## 10. Recommendations (post-assessment / stretch)

| Priority | Recommendation |
|----------|----------------|
| High | Add one API negative (invalid login or unauthorized invoice) by replacing duplicate `Login API` smoke overlap |
| High | Add one UI negative (invalid search or empty-cart checkout) if a Smoke slot can be freed |
| Medium | Assert cart **line product names**, not only badge count |
| Medium | Capture cart page screenshot after multi-add |
| Low | Track F-01/F-02 as known demo issues in a living bug list |

---

## 11. Conclusion

Exploratory testing confirmed that:

- The **assessment-critical journey** (register/login → multi-item cart → COD with **confirm twice** → My Invoices) is sound
- Defensive behaviours (invalid login, OOS add-to-cart, empty cart, unauthorized API invoice) largely work
- Residual risks are mainly **demo-environment** and **scope-capped negatives**, not missing Core AC coverage
- Automation encodes the hardest product-specific rule (double confirm) and stock/postcode mitigations discovered during exploration

**Overall exploratory outcome:** Core path **Ready**; remaining items are improvement candidates, not submission blockers.

---

## 12. Traceability

| Document | Relationship |
|----------|--------------|
| `Requirement-Risk-Analysis.md` | Risks and §10 focus areas expanded into sessions EXP-01..06 |
| `FunctionalTestCase.csv` | Scripted baseline; exploratory covers gaps |
| `PrismStructure/tests/**` | Automates confirmed happy/critical paths |
| `Test-Execution-Report.md` | Automation execution evidence |
| `ai-prompts/test-design.md` | AI suggested scenarios; this file records human exploration validation |
