# Blast Learning — Personalized AI Tutor Deployment Notes

This document provides operational guidance for deploying, managing, and maintaining the **Personalized AI Tutor** campaign landing page inside the live WordPress + Elementor environment (`https://blastlearning.in/`).

---

## 1. Page Configuration Settings

| Setting | Value | Notes |
| :--- | :--- | :--- |
| **Page Title** | `Personalized AI Tutor for Grades 6–12` | Public page title displayed in browser tab and search engines |
| **URL Slug** | `courses/personalized-ai-tutor` | Canonical slug matching the site structure under `/courses/` |
| **Page Template** | **Elementor Full Width** | **CRITICAL**: Do NOT select "Elementor Canvas" |
| **Parent Page** | `Courses` (ID or top-level) | Organizes URL hierarchy logically under the Courses taxonomy |
| **Status** | `Draft` &rarr; `Published` | Test in preview before setting status to Published |

---

## 2. Elementor Section & Widget Setup

### Container Configuration
To achieve a pixel-perfect, edge-to-edge layout that aligns seamlessly with Header 55 and Footer 185:

1. **Add Section / Container**:
   - Choose a single-column container.
2. **Layout Settings**:
   - **Content Width**: `Full Width` (or `100%`).
   - **Columns Gap**: `No Gap`.
   - **Height**: `Default`.
3. **Advanced Spacing Settings**:
   - **Margin**: `0px` on all sides (Top: 0, Right: 0, Bottom: 0, Left: 0).
   - **Padding**: `0px` on all sides (Top: 0, Right: 0, Bottom: 0, Left: 0).
   - **Z-Index**: `1` (or leave default).

### Widget Placement
1. From the Elementor widget panel on the left, search for **HTML**.
2. Drag the **Custom HTML** widget into the container.
3. Open `wordpress-package/personalized-ai-tutor/landing-page-elementor.html`.
4. Copy the entire file content (`Ctrl + A`, `Ctrl + C`) and paste it into the HTML Code textarea.
5. Click **Update** or **Publish**.

---

## 3. Global Header and Footer Coexistence

The live WordPress site uses Elementor Theme Builder with:
- **Global Header**: ID `55` (with logo, navigation menu, login button, and trial CTA)
- **Global Footer**: ID `185` (with 6 columns: brand, quick links, courses, resources, legal, contact, and social icons)

### How Conflicts Are Prevented:
1. **Zero Header/Footer Markup in Embed**:
   The embeddable HTML in `landing-page-elementor.html` contains zero `<header>` or `<footer>` tags. It contains only `<main id="blast-ai-tutor" role="main">`.
2. **Strict CSS Scoping**:
   All styling in `landing-page-elementor.html` is strictly scoped under `#blast-ai-tutor`. No global selectors (`body`, `a`, `h1`, `p`) will bleed into or override Header 55 or Footer 185.
3. **No Header/Footer CSS Rules**:
   All `.elementor-55` and `.elementor-185` selectors have been completely removed.
4. **Sticky Header Offset**:
   In-page anchor navigation (such as clicking "Start free trial" or "See how it works") includes an 80px scroll offset to ensure section headings do not get hidden behind the sticky header.

---

## 4. SEO & Social Metadata Configuration

`landing-page-elementor.html` includes comprehensive SEO metadata and Schema.org JSON-LD structured data. If your site uses **Yoast SEO** or **RankMath**, populate the fields as follows:

### Primary SEO Tags:
- **SEO Title**: `Personalized AI Tutor for Grades 6–12 | Blast Learning India`
- **Meta Description**: `Personalized AI Tutor calibrated to your child's school teacher, syllabus, and textbook. Start your 7-day free trial at ₹1,699/month.`
- **Canonical URL**: `https://blastlearning.in/courses/personalized-ai-tutor/`
- **Focus Keyphrase**: `Personalized AI Tutor`

### Open Graph & Twitter Cards:
- **OG Type**: `website`
- **OG Title**: `Personalized AI Tutor: Calibrated to Your Child's Teacher | Blast Learning`
- **OG Description**: `Turn classroom notes and textbook chapters into a daily personalized study rhythm. Class 6–12 CBSE, ICSE & State Boards. 7-day free trial.`
- **OG / Twitter Image**: `https://blastlearning.in/wp-content/uploads/2026/11/hero_campaign_transformation.jpg`
- **Twitter Card**: `summary_large_image`

### Schema.org JSON-LD Structured Data:
Included directly in the code:
- **WebPage Schema**: Connects the page to the official Blast Learning organization.
- **Course Schema**: Defines the All-Access Membership course with a price of ₹1,699 INR.
- **FAQPage Schema**: Formats the approved FAQs for Google Rich Snippets / Search Results accordions.

---

## 5. Performance Optimization & Cache Invalidation

After deploying or updating `landing-page-elementor.html`, follow this cache-clearing protocol:

### Step 1: WordPress Page Cache
- If using **WP Rocket**: Click **WP Rocket** &rarr; **Clear cache** in the WordPress top admin bar.
- If using **LiteSpeed Cache**: Click **Purge All** or **Purge Page** on the `/personalized-ai-tutor/` URL.
- If using **W3 Total Cache / WP Super Cache**: Purge all page and object caches.

### Step 2: Elementor CSS & Data Cache
- Navigate to **Elementor** &rarr; **Tools** &rarr; **General**.
- Click **Regenerate Files & Data**.
- Click **Save Changes**.

### Step 3: Cloudflare / CDN Cache
- Log into your Cloudflare dashboard (or CDN provider).
- Navigate to **Caching** &rarr; **Configuration** &rarr; **Custom Purge**.
- Enter URL: `https://blastlearning.in/courses/personalized-ai-tutor/` and click **Purge**.

### Step 4: Verification
- Open an incognito browser window.
- Visit `https://blastlearning.in/courses/personalized-ai-tutor/`.
- Press `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac) to bypass local browser cache.

---

## 6. Ongoing Maintenance & Copy Adjustments

- **Pricing Changes**: If the subscription price changes from ₹1,699, update the text in section `#pricing`, the plan summary card inside `#trial-form`, and the hidden field `value="all_access_1699"`.
- **Contact Details**: Support email `info@blastlearning.in` and phone `+91 87926 97655` are configured in `#hero`, `#how-subscription-works`, and the form error notice.
- **Adding FAQs**: To add a new question to the FAQ accordion, add a `<details class="faq-item">` block inside `#faq`. The JavaScript accordion listener automatically binds to all `.faq-item` elements.
