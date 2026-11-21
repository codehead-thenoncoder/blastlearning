# Blast Learning Study Guide — Pre-Launch & Migration Checklist

Use this QA checklist to verify the Elementor implementation of the Study Guide on `https://blastlearning.in/courses/studyguide/` across devices, browsers, and interactions.

---

## 1. Environment & Setup Verification

- [ ] **Backup Verified**: Original approved files remain untouched in workspace root and `backup_approved/`.
- [ ] **Target URL & Permalinks Configured**:
  - [ ] Parent page set to `Courses` (`/courses/`).
  - [ ] Page slug set to `studyguide`.
  - [ ] Final live canonical URL: `https://blastlearning.in/courses/studyguide/`.
  - [ ] 301 Redirect configured from `/study-guide/` to `https://blastlearning.in/courses/studyguide/`.
- [ ] **Media Uploads Completed**:
  - [ ] `hero_campaign_transformation.jpg` uploaded to WordPress Media Library.
  - [ ] `chapter_multimodal_ecosystem.jpg` uploaded to WordPress Media Library.
- [x] **Image URLs Configured**:
  - [x] Hero image URL applied: `https://blastlearning.in/wp-content/uploads/2026/10/hero_campaign_transformation.jpg`
  - [x] Chapter image URL applied: `https://blastlearning.in/wp-content/uploads/2026/10/chapter_multimodal_ecosystem.jpg`
- [ ] **Elementor Layout Configured**:
  - [ ] Page Layout set to **Default** or **Elementor Full Width** (NOT Elementor Canvas).
  - [ ] Widget Container set to **Full Width** with **0 margin** and **0 padding**.
- [ ] **Chrome Integration**:
  - [ ] Global Header (Elementor ID 55) displays once at top of page.
  - [ ] No duplicate header rendered inside the page content area.
  - [ ] Global Footer (Elementor ID 185) displays once at bottom of page.
  - [ ] No duplicate footer rendered inside the page content area.

---

## 2. Console & Network Performance

- [ ] **Browser Console**: Open Chrome DevTools (`F12` &rarr; Console).
  - [ ] Zero JavaScript uncaught exceptions or errors.
  - [ ] GSAP and ScrollTrigger load successfully from CDN.
- [ ] **Network Tab**:
  - [ ] Zero 404 HTTP errors for images, scripts, or fonts.
  - [ ] Google Fonts (`Montserrat`, `Newsreader`, `Poppins`) load with status 200/304.

---

## 3. Visual & Responsive Design Audits

### Desktop (>= 1200px)
- [ ] **Hero Section (`#hero`)**:
  - [ ] 4-line typography reveal cleanly masks and animates into position.
  - [ ] Ambient background class material pills float gently.
  - [ ] Hero composition (Master image frame + underlay grid + note fragment + podcast chip + product panel) displays at proper optical depths.
  - [ ] Subtle mouse movement triggers parallax on composition elements without lag.
- [ ] **Audience Fit (`#audienceFit`)**: 2-column grid cards hover with elevation and border highlight.
- [ ] **Student Stage (`#students`)**: 3-step numbered sequence aligns cleanly with timeline dots and metadata chips.
- [ ] **Chapter Deconstruct (`#chapterDeconstruct`)**: Chapter ecosystem visual displays alongside the interactive multimodal sandbox.
- [ ] **Depth Calibration (`#depthSection`)**: Equalizer card renders centered with two sliders and dynamic calculated badge.
- [ ] **For Tutors (`#tutors`)**:
  - [ ] 3-step horizontal workflow switcher with active state tabs.
  - [ ] 4 tutor pillar cards in a 4-column row.
  - [ ] Consultation card with primary CTA and direct telephone link.
- [ ] **FAQ (`#faq`)**: 5 approved questions render with editorial typography and arrow toggle indicators.
- [ ] **Registration Finale (`#start`)**: Registration card centered with clean input styling, required indicators, and consent checkboxes.

### Tablet (768px - 1024px)
- [ ] Hero transitions into stacked or compact 2-column layout without clipped typography.
- [ ] Tutor workflow steps maintain full readability and tap responsiveness.
- [ ] Tutor pillars re-flow into a clean 2x2 grid.
- [ ] Sliders in the equalizer remain fully draggable via touch or stylus.

### Mobile (< 767px)
- [ ] Hero headline scales fluidly via `clamp()` without text overflow or horizontal scrollbars.
- [ ] Navigation burger menu in Header 55 opens and closes smoothly.
- [ ] Tutor pillars stack into a single column.
- [ ] Phone link (`tel:+918792697655`) triggers phone dialer on mobile tap.
- [ ] Form inputs are full-width and touch-friendly (min 44px tap targets).

---

## 4. Interactive Components QA

### A. Hero Controlled Motion
- [ ] Line-by-line text reveal runs on page load.
- [ ] Parallax motion smoothly settles on mouse leave.
- [ ] If `prefers-reduced-motion` is enabled in OS/browser, all animations gracefully bypass and elements remain visible immediately.

### B. Interactive Audio Podcast Player (`#btnPlayPodcast`)
- [ ] Clicking the play button changes icon to pause.
- [ ] Waveform bars in `#waveformContainer` animate dynamically in height.
- [ ] Elapsed timer increments second-by-second (`0:01 / 5:48`).
- [ ] Clicking pause halts the timer and freezes wave bars.

### C. Teacher Calibration Equalizer
- [ ] Dragging the "Teacher Emphasis" slider updates the percentage display (`#teacherVal`).
- [ ] Dragging the "Student Learning Gap" slider updates the percentage display (`#gapVal`).
- [ ] The calculated badge (`#eqResultBadge`) dynamically recalculates the recommended revision sessions (1 to 4 sessions) in real-time according to the formula:
  $$\text{Score} = (\text{Teacher} \times 0.6) + (\text{Gap} \times 0.4)$$

### D. Tutor 3-Step Workflow Switcher
- [ ] Step 1 ("Set up the course once"), Step 2 ("Assign to students"), and Step 3 ("Follow progress and adjust") switch the active panel visual.
- [ ] Hover and click both activate the selected step.
- [ ] Keyboard navigation (Tab &rarr; Enter / Space) toggles steps with proper ARIA updates.

### E. FAQ Single-Open Accordion
- [ ] Clicking any FAQ item expands the answer and rotates the chevron.
- [ ] Clicking another question automatically collapses the previously open item (accordion behavior).
- [ ] Clicking an already open question collapses it cleanly.

### F. Phone CTA
- [ ] In Act 6, the phone button is clickable and links to `tel:+918792697655`.
- [ ] Text explicitly reads `+91 87926 97655`.

### G. Registration Form Validation & Submission
- [ ] **Honeypot Trap**: Hidden input `company_website` remains invisible; if populated by bots, form silently drops submission without user disruption.
- [ ] **Empty Submit**: Submitting empty form highlights Full Name, Email, Mobile, and Terms with `.is-invalid` borders and red error messages.
- [ ] **Name Validation**: Inputting 1 character shows error; 2+ characters clears error.
- [ ] **Email Validation**: Inputting `user@` or `invalid` shows error; `user@example.com` passes.
- [ ] **Phone Validation**: Inputting non-Indian or non-10-digit number (e.g. `12345`) shows error; valid 10-digit number starting with 6, 7, 8, or 9 passes.
- [ ] **Role Switcher**:
  - Selecting "Tutor or teacher" automatically hides the optional "I am preparing for" field group.
  - Selecting "Student" reveals the "I am preparing for" field group.
- [ ] **Valid Submission**:
  - Submit button disables and changes label to `Activating Free Trial...`.
  - Confirmation alert appears with personalized message for the registrant.
  - Form fields hide cleanly upon success.

---

## 5. SEO, Social Metadata & Schema Audit

- [ ] **Canonical URL**: Points to `https://blastlearning.in/courses/studyguide/`.
- [ ] **Primary H1 Tag**: Exactly one `<h1>` appears in document (`#hero`).
- [ ] **SEO Title**:
  - Rendered `<title>` tag matches: `Study Guide: Class Notes Into a Study Plan | Blast Learning`.
- [ ] **Meta Description**:
  - Rendered `name="description"` tag matches: `Study Guide turns class notes into a dated study plan, and tutors can assign a course and follow each student's progress. 14-day free trial.`.
- [ ] **Open Graph Tags**:
  - [ ] `og:type` is `website` (NOT `article`).
  - [ ] `og:locale` is `en_IN` (localized for India).
  - [ ] `og:site_name` is `Blast Learning India`.
  - [ ] `og:url` is `https://blastlearning.in/courses/studyguide/`.
  - [ ] `og:title` matches `Study Guide: Class Notes Into a Study Plan | Blast Learning`.
  - [ ] `og:description` matches approved 140-char description.
  - [ ] `og:image` is `https://blastlearning.in/wp-content/uploads/2026/10/hero_campaign_transformation.jpg` (1200 &times; 630).
- [ ] **Twitter / X Card**:
  - [ ] `twitter:card` is `summary_large_image`.
  - [ ] `twitter:title` and `twitter:description` present and non-empty.
  - [ ] `twitter:image` references hero image.
- [ ] **JSON-LD Structured Data (Google Rich Results Test)**:
  - [ ] Block 1 (WebPage & SoftwareApplication): Validates without errors; contains `https://blastlearning.in/courses/studyguide/`, `inLanguage: "en-IN"`, and zero fake pricing/ratings.
  - [ ] Block 2 (HowTo for Students): Validates without errors.
  - [ ] Block 3 (HowTo for Tutors): Validates without errors.
  - [ ] Block 4 (FAQPage): Validates with 5 questions.
- [ ] **Internal Links & Redirects**:
  - [ ] 301 Redirect from `https://blastlearning.in/study-guide/` redirects to `https://blastlearning.in/courses/studyguide/`.
  - [ ] Study Guide link added to `/courses/` and site footer Courses menu.
