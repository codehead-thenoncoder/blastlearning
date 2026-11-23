# Blast Learning — Personalized AI Tutor Migration & Deployment Checklist

This document provides a comprehensive, step-by-step checklist for deploying the approved **Personalized AI Tutor** campaign landing page inside the live WordPress + Elementor environment (`https://blastlearning.in/`).

---

## Pre-Deployment Overview

- **Source File**: `wordpress-package/personalized-ai-tutor/landing-page-elementor.html`
- **Asset Directory**: `wordpress-package/personalized-ai-tutor/assets/`
- **Target URL / Slug**: `https://blastlearning.in/courses/personalized-ai-tutor/` (or `/ai-tutor/`)
- **Required Page Template**: **Elementor Full Width** (*Never use Elementor Canvas*)
- **Global Components**: Sits between live Elementor Theme Builder Header (ID 55) and Footer (ID 185)

---

## Phase 1: WordPress Media Library Asset Upload

- [ ] **1.1. Locate Staging Assets**:
  Open `wordpress-package/personalized-ai-tutor/assets/`. You will find 5 required photographic images:
  1. `chapter_multimodal_ecosystem.jpg` (1376 &times; 768 px)
  2. `parent_weekly_dashboard.jpg` (1376 &times; 768 px)
  3. `student_study_flow.jpg` (1376 &times; 768 px)
  4. `hero_campaign_transformation.jpg` (1376 &times; 768 px)
  5. `tutor_divergent_paths.jpg` (1376 &times; 768 px)
- [ ] **1.2. Upload to WordPress**:
  Log into WordPress Admin &rarr; **Media** &rarr; **Add New**. Drag and drop all 5 files.
- [ ] **1.3. Verify Live CDN URLs**:
  Confirm that each asset uploaded correctly and note its exact URL.
  Default configured target URL in `landing-page-elementor.html`:
  `https://blastlearning.in/wp-content/uploads/2026/11/[filename]`
  *(If your upload directory uses a different year/month, e.g. `2026/12/`, run a quick search & replace in `landing-page-elementor.html` before pasting).*
- [ ] **1.4. Test Asset Accessibility**:
  Open each image URL in an incognito browser window to verify HTTP 200 OK responses with no 403 Forbidden or CORS errors.

---

## Phase 2: WordPress Page Setup & Template Selection

- [ ] **2.1. Create New Page**:
  In WordPress Admin, navigate to **Pages** &rarr; **Add New**.
  - **Page Title**: `Personalized AI Tutor for Grades 6–12`
  - **Permalink / URL Slug**: `personalized-ai-tutor` (or `courses/personalized-ai-tutor`)
- [ ] **2.2. Configure Page Attributes / Template**:
  In the Page Settings panel (right sidebar):
  - Locate **Template**.
  - Select **Elementor Full Width**.
  > [!IMPORTANT]
  > **DO NOT SELECT "Elementor Canvas"**. Elementor Canvas will strip the website header and footer. Selecting **Elementor Full Width** ensures that global Header ID 55 and Footer ID 185 are automatically injected by WordPress, placing the landing page naturally between them.
- [ ] **2.3. Save Draft & Launch Elementor**:
  Click **Save Draft**, then click **Edit with Elementor**.

---

## Phase 3: Elementor Container & Widget Configuration

- [ ] **3.1. Add Container / Section**:
  Create a single 1-column container (or section):
  - **Content Width**: Set to `Full Width` (100%).
  - **Columns Gap**: Set to `No Gap`.
  - **Min Height**: Leave default (or fit to screen).
- [ ] **3.2. Zero Out Spacing**:
  In the container's **Advanced** tab:
  - **Padding**: Set `Top: 0px`, `Right: 0px`, `Bottom: 0px`, `Left: 0px`.
  - **Margin**: Set `Top: 0px`, `Right: 0px`, `Bottom: 0px`, `Left: 0px`.
  - This ensures seamless edge-to-edge alignment with Header 55 above and Footer 185 below.
- [ ] **3.3. Add Custom HTML Widget**:
  From the Elementor widget search, drag the **HTML** widget (Custom HTML) into the container.
- [ ] **3.4. Paste Deployment Code**:
  Open `wordpress-package/personalized-ai-tutor/landing-page-elementor.html`, copy the **entire file contents**, and paste directly into the HTML Code box of the Elementor Custom HTML widget.
- [ ] **3.5. Update Page**:
  Click **Publish** (or **Update**).

---

## Phase 4: CTA & Anchor Navigation Verification

Verify that all on-page action buttons and informational navigation function correctly:

- [ ] **4.1. Hero "Start free trial" Button**:
  Click the primary CTA button in `#hero`. Verify smooth scrolling down to `#trial-form` with the proper sticky header offset.
- [ ] **4.2. Hero "See how it works" Secondary Button**:
  Click the secondary button. Verify smooth scrolling down to `#how-it-works`.
- [ ] **4.3. Mid-Page CTAs**:
  Test the "Start free trial" buttons in:
  - `#parents-students`
  - `#features` (Math Genius Maker banner)
  - `#pricing` ("Start the 7-day free trial" button on ₹1,699 card)
  Verify all smooth scroll to `#trial-form`.
- [ ] **4.4. Hero Support Email Link**:
  Click "Talk to the team at info@blastlearning.in". Verify it triggers `mailto:info@blastlearning.in`.
- [ ] **4.5. Header Login / Sign Up Coexistence**:
  Verify the global Header 55 buttons remain functional:
  - "Log In" links to `https://www.blastlearning.net/user/login`.
  - "Sign Up Now" works cleanly without conflicting with the landing page script.

---

## Phase 5: On-Page Form & Backend Verification

- [ ] **5.1. Form Layout & Field Arrangement**:
  Confirm that the 3-step on-page form renders with all fields:
  - **Step 1 (About your child)**: Student First Name, Class (5–12 dropdown), Board pills (CBSE / ICSE / State board), School (optional), Where to start (All subjects / Math / Science / etc.).
  - **Step 2 (The goal)**: Current Grade/Band, Target Grade/Band, Biggest Hurdle.
  - **Step 3 (Parent details)**: Parent Name, WhatsApp Mobile Number (+91 prefix), Email Address, Selected Plan Summary Card (₹1,699 / month after 7-day free trial).
- [ ] **5.2. Client-Side Validation Testing**:
  - Click "Start the 7-day free trial" with empty fields.
  - Verify validation errors highlight the missing inputs in red (`#ef4444`) with clear descriptive helper text.
  - Verify viewport smoothly scrolls to the first invalid field.
  - Test invalid mobile numbers (e.g. less than 10 digits or starting with non-Indian mobile digits). Verify error triggers.
  - Test invalid email format. Verify error triggers.
- [ ] **5.3. Payment Security Audit**:
  - Verify NO raw credit card fields, card expiry inputs, or CVV boxes exist on the page.
  - Verify no client-side scripts attempt to intercept, log, or transmit raw payment card details.
- [ ] **5.4. Backend Submission Handshake**:
  - Fill out valid test details and submit the form.
  - Verify the submit button displays an animated spinner and text: `Securing 7-Day Free Trial...`.
  - Check the browser Network console for the `POST` request to the configured backend endpoint (e.g., `/wp-json/blast/v1/trial-signup` or custom CRM webhook).
  - Verify success handling displays the personalized confirmation box (`#trial-success-message`) with child name, parent WhatsApp number, and calibration instructions.

---

## Phase 6: Responsive & Cross-Browser Quality Assurance

Test across standard responsive viewport breakpoints in Chrome DevTools / real devices:

- [ ] **6.1. Small Mobile (360px &times; 640px - Galaxy S8 / Android Mini)**:
  - [ ] Zero horizontal overflow / horizontal scrollbar (`overflow-x: clip`).
  - [ ] Hero headline wraps cleanly with readable font size (1.85rem – 2.1rem).
  - [ ] 3D prism graphic and VIBGYOR rays scale down proportionally.
  - [ ] Trust indicators and move cards stack vertically.
  - [ ] Comparison matrix allows smooth horizontal touch scrolling.
  - [ ] 3-step trial form inputs and buttons are easily tap-friendly (minimum 44px tap target).
- [ ] **6.2. Modern Mobile (390px &times; 844px - iPhone 12/13/14/15/16)**:
  - [ ] Clean typographic hierarchy; no text colliding with card edges.
  - [ ] Goldilocks interactive slider and Moving Dot HUD render crisply.
  - [ ] Pricing card displays ₹1,699 / month clearly with the 7-day free trial badge.
- [ ] **6.3. Tablet Portrait (768px &times; 1024px - iPad Mini / Air)**:
  - [ ] Move cards transition into a balanced 2-column or structured layout.
  - [ ] Parent and Student experience cards align comfortably side-by-side or stacked.
  - [ ] Form and sidebar aside align naturally.
- [ ] **6.4. Tablet Landscape / Small Laptop (1024px &times; 768px)**:
  - [ ] Multi-column feature grids display 3 cards per row.
  - [ ] Hero section displays two-column layout: left copy and right 3D prism graphic.
  - [ ] Trial form displays two-column layout: left 3-step form card and right "What happens next" aside.
- [ ] **6.5. High-Resolution Desktop (1440px &times; 900px+)**:
  - [ ] Content containers stay centered within `1200px` max-width container.
  - [ ] Particle canvas runs smoothly at 60 FPS without GPU lag.
  - [ ] Header 55 and Footer 185 frame the landing page naturally without visual gaps.

---

## Phase 7: SEO, Social Cards & Performance Optimization

- [ ] **7.1. Yoast SEO / RankMath Configuration**:
  In WordPress post editor, verify:
  - **SEO Title**: `Personalized AI Tutor for Grades 6–12 | Blast Learning India`
  - **Meta Description**: `Personalized AI Tutor calibrated to your child's school teacher, syllabus, and textbook. Start your 7-day free trial at ₹1,699/month.`
  - **Social Sharing Image**: `https://blastlearning.in/wp-content/uploads/2026/11/hero_campaign_transformation.jpg`
- [ ] **7.2. Schema.org JSON-LD Verification**:
  Inspect page source or test URL with [Google Rich Results Test](https://search.google.com/test/rich-results):
  - Verify `WebPage`, `Course`, and `FAQPage` schemas are parsed without syntax errors.
- [ ] **7.3. Cache Flushing**:
  - Purge page cache in WP Rocket, LiteSpeed Cache, or hosting cache.
  - Purge Cloudflare / CDN cache for `/courses/personalized-ai-tutor/`.
  - Test page in an incognito window with hard refresh (`Ctrl + Shift + R`).
