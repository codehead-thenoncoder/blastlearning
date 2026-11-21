# Blast Learning Study Guide — WordPress / Elementor Migration Guide

This guide walks you through integrating the approved Blast Learning Study Guide page into the live WordPress website at [https://blastlearning.in/courses/studyguide/](https://blastlearning.in/courses/studyguide/) using Elementor.

---

## 1. Source Identification & Architecture Overview

### Which Source File Was Used?
- **Source Used**: `study-guide.html` / `index.html`.
- **Reason**: Both files are byte-for-byte identical (184,333 bytes each). `study-guide.html` represents the master approved design file, and `index.html` was created to serve as the entry point for GitHub Pages preview (`https://codehead-thenoncoder.github.io/blastlearning/`).
- **Backup Created**: A pristine backup of all original source files was saved to `backup_approved/` before creating this migration package.
- **Target Canonical URL**: `https://blastlearning.in/courses/studyguide/` (migrated from `/study-guide/`).

### How Global Header (55) & Footer (185) Are Handled
In the approved standalone preview file, the HTML and CSS of Header ID 55 and Footer ID 185 were embedded statically so the page could be previewed outside WordPress. 

On the live WordPress site at `https://blastlearning.in/`:
1. The **Hello Elementor** theme and **Elementor Theme Builder** already render Header ID 55 at the top and Footer ID 185 at the bottom of every page automatically.
2. In this migration package, the outer `<header>` and `<footer>` markups have been **excluded** from the embeddable content.
3. Over 800 lines of `.elementor-55` and `.elementor-185` CSS rules (which contained dozens of `!important` declarations) have been **removed** from the page stylesheet. This completely eliminates any risk of clashing with or breaking the site's live navigation or footer.
4. Setting your page layout to **Default** or **Elementor Full Width** allows WordPress to render the authentic, centrally maintained Header 55 and Footer 185 seamlessly.

---

## 2. File Deliverables in `wordpress-package/`

| File | Purpose | Recommended Placement |
| :--- | :--- | :--- |
| **`study-guide-elementor-single.html`** | **All-in-One Option**: Self-contained package with Fonts, GSAP CDN, SEO metadata, JSON-LD, Scoped CSS, HTML body, and JS. | Paste entirely into a single Elementor **Custom HTML** widget. |
| **`study-guide-elementor.html`** | **Modular Option (HTML)**: Clean semantic HTML fragment (`<main id="study-guide-page">`) + SEO metadata & JSON-LD schemas. | Elementor **Custom HTML** widget. |
| **`study-guide-elementor.css`** | **Modular Option (CSS)**: Clean stylesheet strictly scoped under `#study-guide-page`. | Elementor Page Settings &rarr; Custom CSS, or Child Theme `style.css`, or WP Code snippet. |
| **`study-guide-elementor.js`** | **Modular Option (JS)**: Interactive controller with deferred loading guards and GSAP polling. | WPCode / Simple Custom CSS & JS plugin, or Elementor Custom Code (Footer). |
| **`asset-manifest.md`** | Complete audit of assets, dimensions, and placeholder mapping. | Reference document. |
| **`migration-checklist.md`** | QA validation test plan covering responsive layout, animations, interactions, and forms. | Pre-launch checklist. |

---

## 3. Step-by-Step Implementation Instructions

### Step 1: Upload Images to WordPress Media Library
1. Log into your WordPress admin panel (`https://blastlearning.in/wp-admin`).
2. Go to **Media &rarr; Add New Media File**.
3. Upload these two files from the local `assets/` folder:
   - `assets/hero_campaign_transformation.jpg`
   - `assets/chapter_multimodal_ecosystem.jpg`
4. Click each image to view its **Attachment Details** and copy the **File URL**.

---

### Step 2: Choose Your Implementation Method

You can deploy using either **Method A (All-in-One)** or **Method B (Modular)**.

---

### Method A: Single-File Deployment (Simplest & Recommended)
Use `study-guide-elementor-single.html`. This file contains the font links, animation libraries, SEO schemas, scoped CSS, and JavaScript in a single self-contained document.

1. **Create or Open the Page in WordPress**:
   - In WordPress admin, go to **Pages &rarr; Add New Page** (or edit `Study Guide`).
   - Page Title: `Study Guide`
   - **Page Attributes**: Set **Parent Page** to `Courses` (`/courses/`).
   - **Permalink Slug**: Set slug to `studyguide`.
   - **Canonical Live URL**: `https://blastlearning.in/courses/studyguide/`
     > *Note on URL migration*: This canonical URL replaces the former `/study-guide/` structure. Ensure an HTTP 301 Permanent Redirect is placed from `/study-guide/` to `/courses/studyguide/` in your WordPress Redirection plugin or `.htaccess`.
2. **Configure Elementor Page Settings**:
   - Click **Edit with Elementor**.
   - In the bottom-left corner of the Elementor panel, click the **Gear Icon (Page Settings)**.
   - Set **Page Layout** to **Default** (or **Elementor Full Width**).
     > **Do NOT select "Elementor Canvas"**, because Canvas disables Header 55 and Footer 185!
3. **Add the Custom HTML Widget**:
   - Drag a **Container** (or Section) into the canvas.
   - Set Container Width to **Full Width**, and set padding/margin to `0`.
   - Search the Elementor widget panel for **HTML** (the Custom HTML widget).
   - Drag the HTML widget into the container.
4. **Paste the Code**:
   - Open `wordpress-package/study-guide-elementor-single.html` in your text editor.
   - (The live WordPress image URLs for both the hero and chapter diagram are already pre-configured).
   - Copy the entire file content and paste it into the Elementor Custom HTML widget.
5. **Publish and View**:
   - Click **Publish** (or **Update**).
   - View the live page in a new incognito window.

---

### Method B: Modular Deployment (Best for Asset Caching & Optimization)
If your site uses advanced optimization plugins (like WP Rocket, LiteSpeed Cache, or Asset CleanUp), separating CSS and JS is optimal.

1. **Page Structure (HTML Fragment)**:
   - Open `wordpress-package/study-guide-elementor.html`.
   - (The live WordPress image URLs are already pre-configured).
   - Paste into the Elementor **Custom HTML** widget on the page.
2. **Page Stylesheet (Scoped CSS)**:
   - Option 1 (Elementor Pro): In Elementor Editor &rarr; Page Settings (gear icon) &rarr; **Advanced** &rarr; **Custom CSS**, paste the contents of `wordpress-package/study-guide-elementor.css`.
   - Option 2 (WPCode / Theme): Add as an enqueued CSS file or paste into **Appearance &rarr; Customize &rarr; Additional CSS**.
3. **Page Controller (JavaScript & Libraries)**:
   - In WordPress admin, go to **Elementor &rarr; Custom Code** (or WPCode plugin).
   - **Header Snippet**: Enqueue GSAP:
     ```html
     <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
     ```
   - **Footer Snippet**: Add the contents of `wordpress-package/study-guide-elementor.js` wrapped in `<script>...</script>`.
   - Set Display Condition to: **Include &rarr; Singular &rarr; Pages &rarr; Study Guide**.

---

## 4. SEO, Social Metadata & Schema Configuration (Yoast SEO / Theme)

To implement the client recommendations from *Blast Learning: SEO Meta Tags and Descriptions* with the updated India canonical URL:

### Recommended Page Metadata
| Field | Value | Notes / Limits |
| :--- | :--- | :--- |
| **Page Title** | `Study Guide: Class Notes Into a Study Plan \| Blast Learning` | 59 characters (~531 px). Serves students & tutors. |
| **Meta Description** | `Study Guide turns class notes into a dated study plan, and tutors can assign a course and follow each student's progress. 14-day free trial.` | 140 characters (~857 px). Under the 155-char desktop limit. |
| **Canonical URL** | `https://blastlearning.in/courses/studyguide/` | Explicitly configured to prevent duplicate indexing. |
| **Robots Meta** | `index, follow` | Page is indexable. |

### Open Graph & Twitter Social Metadata
| Meta Tag | Value | Target Market / Issue Addressed |
| :--- | :--- | :--- |
| `og:type` | `website` | Replaces incorrect WordPress default `article`. |
| `og:locale` | `en_IN` | Replaces `en_US` to localize for the Indian market. |
| `og:site_name` | `Blast Learning India` | Consistent regional branding. |
| `og:url` | `https://blastlearning.in/courses/studyguide/` | Matches new canonical URL. |
| `og:title` | `Study Guide: Class Notes Into a Study Plan \| Blast Learning` | Identical to approved SEO title. |
| `og:description` | `Study Guide turns class notes into a dated study plan, and tutors can assign a course and follow each student's progress. 14-day free trial.` | Authored description replacing raw mockup scrape. |
| `og:image` | `https://blastlearning.in/wp-content/uploads/2026/10/hero_campaign_transformation.jpg` | Verified hero visual (1200 &times; 630 px safe ratio). |
| `og:image:width` | `1200` | Standard social preview dimension. |
| `og:image:height` | `630` | Standard social preview dimension. |
| `twitter:card` | `summary_large_image` | Large preview card for X / Twitter. |
| `twitter:title` | `Study Guide: Class Notes Into a Study Plan \| Blast Learning` | Clean social card headline. |
| `twitter:description`| `Study Guide turns class notes into a dated study plan, and tutors can assign a course and follow each student's progress. 14-day free trial.` | Authored snippet. |
| `twitter:image` | `https://blastlearning.in/wp-content/uploads/2026/10/hero_campaign_transformation.jpg` | Consistent image with Open Graph. |

### Step-by-Step Yoast SEO Configuration
1. Open the **Study Guide** page editor in WordPress (`wp-admin`).
2. Scroll to the **Yoast SEO** meta box below the editor:
   - **SEO Title**: Paste `Study Guide: Class Notes Into a Study Plan | Blast Learning`.
   - **Slug**: Ensure slug is `studyguide` (under parent `courses`).
   - **Meta description**: Paste `Study Guide turns class notes into a dated study plan, and tutors can assign a course and follow each student's progress. 14-day free trial.`.
3. Open the **Advanced** tab in Yoast:
   - **Canonical URL**: Enter `https://blastlearning.in/courses/studyguide/`.
   - **Allow search engines to show this Page in search results?**: Select `Yes`.
4. Open the **Social** tab in Yoast:
   - **Facebook Title**: Paste `Study Guide: Class Notes Into a Study Plan | Blast Learning`.
   - **Facebook Description**: Paste the meta description above.
   - **Facebook Image**: Select or paste the URL of `hero_campaign_transformation.jpg`.
   - **Twitter Title / Description / Image**: Repeat identical values (Card type: Summary with large image).

### Schema Structured Data (JSON-LD)
Both `study-guide-elementor-single.html` and `study-guide-elementor.html` have all JSON-LD blocks pre-embedded. No manual coding is required:
1. **WebPage & SoftwareApplication**:
   - WebPage `@id` and `url`: `https://blastlearning.in/courses/studyguide/`
   - SoftwareApplication `@id` and `url`: `https://blastlearning.in/courses/studyguide/#app`
   - Language: `en-IN`
   - Publisher: `Blast Learning India`
   - *Note*: As mandated by client guidelines, no fictitious pricing, ratings, or review counts are included.
2. **HowTo (Students)**: Anchored to `https://blastlearning.in/courses/studyguide/#students`.
3. **HowTo (Tutors)**: Anchored to `https://blastlearning.in/courses/studyguide/#tutors`.
4. **FAQPage**: Structured FAQ schema covering all 5 approved questions.

### 301 Permanent Redirect Configuration
To preserve existing backlinks and Google indexing from the old `/study-guide/` URL:
- In WordPress admin &rarr; **Tools &rarr; Redirection** (or your redirect plugin):
  - **Source URL**: `^/study-guide/?$`
  - **Target URL**: `https://blastlearning.in/courses/studyguide/`
  - **HTTP Code**: `301 - Moved Permanently`

---

## 5. Registration Form & Backend Integration

### Current Behavior (Approved Prototype)
The approved form on `#start` operates with robust client-side validation:
1. **Spam Protection**: A hidden honeypot input (`company_website`) traps spambots silently without interrupting human visitors.
2. **Field Validations**:
   - Full Name (required, min 2 characters).
   - Email (required, RFC email regex).
   - Mobile (required, 10-digit Indian phone regex `/^[6-9]\d{9}$/`).
   - Role Dropdown: Switches the optional "I am preparing for" field (hidden for Tutors/Teachers, visible for Students).
   - Terms & Conditions consent checkbox (required).
3. **User Feedback**:
   - Invalid fields highlight with `.is-invalid` and show descriptive error microcopy.
   - On valid submit, the button displays `Activating Free Trial...` and shows a confirmation banner:
     > *"Welcome to Study Guide! Your free two-week trial has been registered for [Name]. A confirmation has been sent to [Email] with login instructions."*

### Connecting to a Live Backend Destination
Currently, the form simulates successful submission with a 1-second delay. To route lead submissions to an authentic destination:

#### Option A: WordPress REST API / Custom Endpoint
In `study-guide-elementor.js` (or in the single-file script block), find the `handleLeadSubmit` function. Replace the `setTimeout` block with:

```javascript
const payload = {
  full_name: nameInput.value.trim(),
  email: emailInput.value.trim(),
  phone: cleanedPhone,
  role: roleSelect ? roleSelect.value : 'Student',
  prep_goal: prepGoalInput ? prepGoalInput.value : '',
  updates_consent: document.getElementById('updatesCheck') ? document.getElementById('updatesCheck').checked : false
};

fetch('/wp-json/blastlearning/v1/study-guide-lead', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-WP-Nonce': (typeof wpApiSettings !== 'undefined' ? wpApiSettings.nonce : '')
  },
  body: JSON.stringify(payload)
})
.then(response => {
  if (!response.ok) throw new Error('Submission failed');
  return response.json();
})
.then(data => {
  const successAlert = document.getElementById('formSuccessAlert');
  if (successAlert) {
    successAlert.innerHTML = '<strong>Welcome to Study Guide!</strong> Your free two-week trial has been registered for ' + nameInput.value.trim() + '. A confirmation has been sent to ' + emailInput.value.trim() + ' with login instructions.';
    successAlert.style.display = 'block';
  }
  form.style.display = 'none';
})
.catch(err => {
  btnSubmit.disabled = false;
  btnSubmit.textContent = 'Start My Free Two Weeks';
  const warningAlert = document.getElementById('formWarningAlert');
  if (warningAlert) {
    warningAlert.textContent = 'Submission error. Please check your connection or contact info@blastlearning.in.';
    warningAlert.style.display = 'block';
  }
});
```

#### Option B: Webhook to Zapier / Make / CRM / Google Sheets
You can replace the URL with your webhook URL (e.g. `https://hooks.zapier.com/hooks/catch/...`). No credentials or secret keys are exposed.

---

## 6. Verification & Testing

### What Has Been Tested Locally
- [x] Confirmed `study-guide.html` and `index.html` are 100% identical byte-for-byte.
- [x] Secured a pristine backup in `backup_approved/`.
- [x] Audited all 8 sections to ensure 0 content or structural loss.
- [x] Extracted CSS and verified that zero global rules leak outside `#study-guide-page`.
- [x] Removed `.elementor-55` and `.elementor-185` overrides to prevent conflicts with the live site chrome.
- [x] Verified interactive logic:
  - Waveform bar generation and podcast timer.
  - Teacher emphasis & learning gap dynamic equalizer.
  - Tutor 3-step workflow panel switcher.
  - FAQ single-open accordion.
  - Role switcher and honeypot validation.
  - GSAP choreography and scroll trigger animations.

### What Must Be Verified on the Live WordPress Site
1. **Header/Footer Alignment**: Check that the live theme Header 55 and Footer 185 appear seamlessly above and below the `#study-guide-page` container without duplicate headers/footers or double scrollbars.
2. **Container Padding**: In Elementor, ensure the section/container enclosing the Custom HTML widget has `0` padding and `Full Width` content width so the page background colors extend edge-to-edge.
3. **CDN Loading**: Verify that your server firewall or security plugins do not block `cdnjs.cloudflare.com` for GSAP.
4. **Form Destination**: Once a backend endpoint or webhook is selected, submit a test lead and verify receipt in your CRM / database.
