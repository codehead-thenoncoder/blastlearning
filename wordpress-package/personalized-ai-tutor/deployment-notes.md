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

## 5. SEO & Social Metadata Configuration

If using **Yoast SEO** or **RankMath** in WordPress:
- **SEO Title**: `Personalized AI Tutor for Grades 6–12 | Blast Learning India`
- **Meta Description**: `Personalized AI Tutor calibrated to your child's school teacher, syllabus, and textbook. Start your 7-day free trial at ₹1,699/month.`
- **Canonical URL**: `https://blastlearning.in/courses/personalized-ai-tutor/`
- **Open Graph / Twitter Image**: `https://blastlearning.in/wp-content/uploads/2026/11/hero_campaign_transformation.jpg`
- **Schema.org Structured Data**: Included in embed as JSON-LD (`WebPage`, `Course`, `FAQPage`).

---

## 6. Performance & Cache Invalidation

After deploying or updating:
1. **WP Rocket / LiteSpeed**: Click **Clear cache** in the top admin bar.
2. **Elementor Data**: Go to **Elementor** &rarr; **Tools** &rarr; **Regenerate Files & Data**, click **Save Changes**.
3. **Cloudflare / CDN**: Execute a **Custom Purge** for URL `https://blastlearning.in/courses/personalized-ai-tutor/`.
4. **Browser Testing**: Test in an incognito window with hard refresh (`Ctrl + Shift + R`).
