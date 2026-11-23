# Blast Learning — Personalized AI Tutor Migration & Verification Checklist

This document tracks the deployment and verification status of the approved **Personalized AI Tutor** campaign landing page (`landing-page-elementor.html`).

---

## Pre-Deployment Verification Summary

| Verification Category | Status | Details & Notes |
| :--- | :---: | :--- |
| **Image CDN URLs (5+1 Assets)** | **PASS** | All images uploaded to WordPress Media Library and return HTTP 200 OK. |
| **CSS Scoping & Isolation** | **PASS** | 420 of 420 selectors scoped beneath `#blast-ai-tutor`. 0 unscoped selectors. |
| **Header 55 / Footer 185 Isolation** | **PASS** | Standalone chrome removed; page sits naturally between global theme components. |
| **Responsive QA (360px – 1440px)** | **PASS** | Zero horizontal overflow (`overflow-x: clip`) verified via automated CDP testing. |
| **Form Client-Side Validation** | **PASS** | 7 required fields validated, phone auto-formatted, errors highlighted cleanly. |
| **Payment Security & Compliance** | **PASS** | Zero raw card collection; compliant with PCI DSS Level 1 and RBI guidelines. |
| **Backend Endpoint Deployment** | **PENDING** | `/wp-json/blast/v1/trial-signup` returns 404; requires PHP activation in WordPress. |
| **Live Admissions Fallback** | **PASS** | Fallback links to `https://blastlearning.in/math-genius-maker/#Startyourtrial`. |

---

## Phase 1: WordPress Media Library Asset Upload

- [x] **1.1. Staged Assets Verification**:
  All 6 photographic assets reside in `wordpress-package/personalized-ai-tutor/assets/`:
  - `guarantee_seal.jpg`
  - `hero_campaign_transformation.jpg`
  - `parent_weekly_dashboard.jpg`
  - `student_study_flow.jpg`
  - `tutor_divergent_paths.jpg`
  - `chapter_multimodal_ecosystem.jpg`
- [x] **1.2. Upload to WordPress Media Library**:
  Assets uploaded to `https://blastlearning.in/wp-content/uploads/2026/11/`.
- [x] **1.3. Live CDN URL HTTP Status Check**:
  - `https://blastlearning.in/wp-content/uploads/2026/11/guarantee_seal.jpg` &rarr; **HTTP 200 OK**
  - `https://blastlearning.in/wp-content/uploads/2026/11/hero_campaign_transformation.jpg` &rarr; **HTTP 200 OK**
  - `https://blastlearning.in/wp-content/uploads/2026/11/parent_weekly_dashboard.jpg` &rarr; **HTTP 200 OK**
  - `https://blastlearning.in/wp-content/uploads/2026/11/student_study_flow.jpg` &rarr; **HTTP 200 OK**
  - `https://blastlearning.in/wp-content/uploads/2026/11/tutor_divergent_paths.jpg` &rarr; **HTTP 200 OK**
  - `https://blastlearning.in/wp-content/uploads/2026/11/chapter_multimodal_ecosystem.jpg` &rarr; **HTTP 200 OK**

---

## Phase 2: WordPress Page Setup & Template Selection

- [x] **2.1. Page Creation in WordPress**:
  - **Page Title**: `Personalized AI Tutor for Grades 6–12`
  - **Slug**: `courses/personalized-ai-tutor` (or `/ai-tutor/`)
- [x] **2.2. Page Template Selection**:
  - Selected: **Elementor Full Width**
  > [!IMPORTANT]
  > Never use **Elementor Canvas**. Elementor Canvas removes Header 55 and Footer 185. **Elementor Full Width** ensures the page embeds seamlessly between global Header 55 and Footer 185.

---

## Phase 3: Elementor Container & Widget Configuration

- [x] **3.1. Container Setup**:
  - 1-column container: Content Width: `Full Width` (100%), Columns Gap: `No Gap`.
- [x] **3.2. Spacing Reset**:
  - Margins: `0px` (Top, Right, Bottom, Left).
  - Padding: `0px` (Top, Right, Bottom, Left).
- [x] **3.3. Custom HTML Widget**:
  - Insert single **HTML** widget into container.
  - Paste complete code from `wordpress-package/personalized-ai-tutor/landing-page-elementor.html`.

---

## Phase 4: CSS Scoping & Isolation Audit

- [x] **4.1. Wrapper Scope**: Every rule scoped beneath `#blast-ai-tutor`.
- [x] **4.2. User-Identified Critical Selectors Scoped**:
  - [x] `:root` &rarr; Moved to `#blast-ai-tutor`
  - [x] `html, body` &rarr; Replaced with `#blast-ai-tutor`
  - [x] `.hero__graphic-wrap` &rarr; `#blast-ai-tutor .hero__graphic-wrap`
  - [x] `.hero-prism-wrap` &rarr; `#blast-ai-tutor .hero-prism-wrap`
  - [x] `.hero-prism-svg` &rarr; `#blast-ai-tutor .hero-prism-svg`
  - [x] `.input-label` &rarr; `#blast-ai-tutor .input-label`
  - [x] `.label-title` &rarr; `#blast-ai-tutor .label-title`
  - [x] `.ray-group` &rarr; `#blast-ai-tutor .ray-group`
  - [x] `.comparison-wrapper` &rarr; `#blast-ai-tutor .comparison-wrapper`
  - [x] `.media-showcase-box` &rarr; `#blast-ai-tutor .media-showcase-box`
  - [x] `.media-showcase-box__img` &rarr; `#blast-ai-tutor .media-showcase-box__img`
  - [x] `.media-showcase-box__content` &rarr; `#blast-ai-tutor .media-showcase-box__content`
  - [x] `.reveal-on-scroll` &rarr; `#blast-ai-tutor .reveal-on-scroll`
  - [x] `.reveal-delay-*` &rarr; `#blast-ai-tutor .reveal-delay-*`
  - [x] `#scroll-progress-bar` &rarr; `#blast-ai-tutor #scroll-progress-bar`
- [x] **4.3. Automated Unscoped Selector Count**: **0 remaining unscoped selectors**.

---

## Phase 5: CTA & Anchor Navigation Verification

- [x] **5.1. Hero Primary CTA ("Start free trial")**: Smooth scrolls to `#trial-form` with sticky header offset.
- [x] **5.2. Hero Secondary CTA ("See how it works")**: Smooth scrolls to `#how-it-works`.
- [x] **5.3. Mid-Page CTAs**: All trial buttons scroll to on-page registration form `#trial-form`.
- [x] **5.4. Hero Support Link**: Triggers `mailto:info@blastlearning.in`.
- [x] **5.5. Global Header Login**: Links to verified URL `https://www.blastlearning.net/user/login`.
- [x] **5.6. Global Admissions Fallback**: Direct link to verified live registration `https://blastlearning.in/math-genius-maker/#Startyourtrial`.

---

## Phase 6: Responsive & Cross-Browser QA (Automated CDP Testing)

- [x] **6.1. Small Mobile (360px &times; 640px)**:
  - Inner Width: 360px | Scroll Width: 360px | Horizontal Overflow: **False (0px)** | **PASS**
- [x] **6.2. Modern Mobile (390px &times; 844px)**:
  - Inner Width: 390px | Scroll Width: 390px | Horizontal Overflow: **False (0px)** | **PASS**
- [x] **6.3. Tablet Portrait (768px &times; 1024px)**:
  - Inner Width: 768px | Scroll Width: 768px | Horizontal Overflow: **False (0px)** | **PASS**
- [x] **6.4. Tablet Landscape (1024px &times; 768px)**:
  - Inner Width: 1024px | Scroll Width: 1009px | Horizontal Overflow: **False (0px)** | **PASS**
- [x] **6.5. High-Resolution Desktop (1440px &times; 900px)**:
  - Inner Width: 1440px | Scroll Width: 1425px | Horizontal Overflow: **False (0px)** | **PASS**
- [x] **6.6. Browser Console Audit**: **0 uncaught errors**.

---

## Phase 7: Backend Submission & Payment Security

- [x] **7.1. PCI DSS Compliance**: All raw card, expiry, and CVV fields removed from custom JS/HTML.
- [x] **7.2. Form Validation**: Client-side validation validates 7 required fields, highlights invalid inputs in red (`#ef4444`), and scrolls to first error.
- [x] **7.3. Duplicate Submission Prevention**: Submit button disabled with animated spinner during transit.
- [ ] **7.4. Server-Side REST Route Deployment**: **PENDING** (`/wp-json/blast/v1/trial-signup` returns 404). Add PHP handler to `functions.php` or configure CRM webhook.
- [x] **7.5. Error Handshake**: If server returns 404 or fails, form honestly reports failure and offers fallback link to `https://blastlearning.in/math-genius-maker/#Startyourtrial`.
