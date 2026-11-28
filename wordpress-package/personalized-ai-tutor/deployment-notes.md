# Blast Learning — Personalized AI Tutor Deployment Notes

This document provides operational guidance for deploying and maintaining the **Personalized AI Tutor** campaign landing page inside the live WordPress + Elementor website (`https://blastlearning.in/`).

---

## 1. Page Configuration Settings

| Setting | Value | Notes |
| :--- | :--- | :--- |
| **Page Title** | `Personalized AI Tutor for Grades 6–12` | Public page title displayed in browser tab and search engines |
| **URL Slug** | `courses/personalized-ai-tutor` | Canonical slug matching site structure under `/courses/` |
| **Page Template** | **Elementor Full Width** | **CRITICAL**: Do NOT select "Elementor Canvas" |
| **Parent Page** | `Courses` | Organizes URL hierarchy logically under the Courses taxonomy |
| **Status** | `Draft` &rarr; `Published` | Preview before publishing |

---

## 2. Elementor Section & Widget Setup

### Container Configuration
1. **Add 1-Column Container**:
   - In Elementor Editor, add a new single-column container.
2. **Layout Settings**:
   - **Content Width**: `Full Width` (100%).
   - **Columns Gap**: `No Gap`.
   - **Height**: `Default`.
3. **Advanced Spacing Settings**:
   - **Margin**: `0px` on all sides (Top: 0, Right: 0, Bottom: 0, Left: 0).
   - **Padding**: `0px` on all sides (Top: 0, Right: 0, Bottom: 0, Left: 0).
   - This ensures seamless edge-to-edge alignment with global Header 55 and Footer 185.

### Custom HTML Widget
1. Search for **HTML** widget in Elementor panel.
2. Drag **Custom HTML** widget into the container.
3. Open `wordpress-package/personalized-ai-tutor/landing-page-elementor.html`.
4. Copy entire file content and paste into the HTML Code box.
5. Click **Publish** (or **Update**).

---

## 3. Global Header and Footer Coexistence

- **Global Header (ID 55)**: Renders automatically from WordPress Theme Builder.
- **Global Footer (ID 185)**: Renders automatically from WordPress Theme Builder.
- **Complete CSS Isolation**: All 420 style rules are scoped beneath `#blast-ai-tutor`. No rules target `.elementor-55` or `.elementor-185`, guaranteeing zero visual collisions.
- **Sticky Header Scroll Offset**: All internal anchor buttons (`#trial-form`, `#how-it-works`) include an 80px scroll offset to prevent sticky header clipping.

---

## 4. Live WordPress CDN Image URLs

The following URLs are referenced directly in `landing-page-elementor.html` and verified active (HTTP 200 OK):
- `https://blastlearning.in/wp-content/uploads/2026/11/guarantee_seal.jpg`
- `https://blastlearning.in/wp-content/uploads/2026/11/hero_campaign_transformation.jpg`
- `https://blastlearning.in/wp-content/uploads/2026/11/parent_weekly_dashboard.jpg`
- `https://blastlearning.in/wp-content/uploads/2026/11/student_study_flow.jpg`
- `https://blastlearning.in/wp-content/uploads/2026/11/tutor_divergent_paths.jpg`
- `https://blastlearning.in/wp-content/uploads/2026/11/chapter_multimodal_ecosystem.jpg`

---

## 5. SEO & Social Metadata Configuration (WordPress)

Configure the SEO title, meta description, canonical URL, Open Graph/Twitter cards, and other head metadata in WordPress/Yoast using the supplied **“Meta Tags — Personalized AI Tutor Page (blastlearning.in)”** document. Do not duplicate those tags inside the Elementor HTML widget.

### Structured data (JSON-LD)

The Elementor HTML package now includes one valid JSON-LD script containing page-specific **Course**, **Product**, and **FAQPage** entities. The FAQ entries mirror the five questions and answers visible in the page. The script deliberately references Yoast's global Organization entity (https://blastlearning.in/#organization) rather than duplicating Yoast's Organization, WebSite, WebPage, and Breadcrumb graph.

Do not paste another copy of this JSON-LD into Yoast. Keep Yoast's global schema enabled. After the page is published, validate the rendered page source and structured data. The JSON-LD currently uses the URL specified in the supplied meta-tags document: https://blastlearning.in/courses-personalized-ai-tutor/. Confirm the actual WordPress permalink is exactly this URL; if it differs, update the page-specific JSON-LD IDs and URLs in the HTML package to match the final permalink and Yoast canonical.

The structured data describes the visible ₹1,699/month subscription and seven-day trial. Do not add review ratings, return-policy claims, or social profile URLs until they are real and visibly supported. Google does not guarantee rich-result display for any valid schema type; FAQ rich results are generally limited to authoritative government and health sites.

### Primary values from the supplied meta-tags document
- **SEO Title**: `AI Tutor for CBSE & ICSE Students, Classes 6 to 12 | Blast Learning`
- **Meta Description**: `A personal AI tutor that learns your child's class, teacher, and syllabus, then builds the study plan around them. Built for CBSE and ICSE students in Grades 6 to 12. Start a 7-day free trial.`
- **Canonical URL specified by the document**: `https://blastlearning.in/courses-personalized-ai-tutor/`
- **Open Graph type**: `website`
- **Twitter Card**: `summary_large_image`
- **Language**: `en-IN`

### Important URL check before saving SEO fields
The supplied meta-tags document specifies `/courses-personalized-ai-tutor/`, while the existing deployment configuration and prior Elementor preview use `/courses/personalized-ai-tutor/`. Confirm the actual published WordPress permalink with the site owner, then make the page URL, canonical, Open Graph URL, Twitter URL, and all JSON-LD entity URLs identical. Do not publish a canonical pointing to a different URL.

### Social image and placeholder dependencies
The meta-tags document references dedicated OG/Twitter image files under `/wp-content/uploads/og/`, plus favicon assets under `/wp-content/uploads/favicon/`. Upload those exact assets before entering their URLs. Do not substitute the campaign hero image unless the approved social artwork is unavailable and the owner approves the substitute.

The document also contains Facebook verification placeholders and placeholder social profile URLs in Organization `sameAs`. Leave those fields out until real values are supplied; never publish the literal `[REPLACE-WITH-...]` strings.

### Structured data
Add the supplied single JSON-LD graph through the SEO plugin's page-level schema/custom-code facility or a WordPress head injection mechanism. The Elementor widget no longer contains its earlier, conflicting JSON-LD. Before publishing, review the supplied FAQ and offer/billing statements against the visible page copy so the schema does not promise details the page does not show.

---

## 6. Performance & Cache Invalidation

After deploying or updating:
1. **WP Rocket / LiteSpeed**: Click **Clear cache** in the top admin bar.
2. **Elementor Data**: Go to **Elementor** &rarr; **Tools** &rarr; **Regenerate Files & Data**, click **Save Changes**.
3. **Cloudflare / CDN**: Execute a **Custom Purge** for URL `https://blastlearning.in/courses/personalized-ai-tutor/`.
4. **Browser Testing**: Test in an incognito window with hard refresh (`Ctrl + Shift + R`).
