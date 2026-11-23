# Blast Learning — Personalized AI Tutor Asset Manifest

This document audits all visual, font, library, and media assets in the approved Blast Learning **Personalized AI Tutor** campaign landing page (`landing-page-elementor.html`), confirming their live WordPress CDN URLs, dimensions, and local staging status.

---

## 1. Executive Summary

| Category | Total Assets | WordPress Media Status | Live CDN Status | Delivery Method |
| :--- | :---: | :---: | :---: | :--- |
| **Photographic Content Images** | 6 | **Uploaded** | **200 OK (Verified)** | WordPress Uploads CDN |
| **Hero 3D Optical Graphic** | 1 | **Embedded** | **Active** | 3D SVG + Canvas (0 HTTP requests) |
| **Site Chrome Logos** | 2 | **Existing Global** | **Live** | Global Header ID 55 & Footer ID 185 |
| **Icons & UI Badges** | 40+ | **Embedded** | **Active** | 100% Inline SVG (0 font requests) |
| **Web Typography** | 3 families | **CDN** | **Active** | Google Fonts preconnected CDN |
| **Interactive Scripts** | 6 modules | **Embedded** | **Active** | Lightweight Vanilla JavaScript |

---

## 2. Photographic Content Images (Verified WordPress CDN URLs)

All images have been uploaded to the WordPress Media Library and are verified active on the live production domain (`https://blastlearning.in/`):

| Asset Name | Exact Live WordPress CDN URL | Dimensions | Page Section | Context & Visual Content | HTTP Status |
| :--- | :--- | :---: | :--- | :--- | :---: |
| **Guarantee seal** | `https://blastlearning.in/wp-content/uploads/2026/11/guarantee_seal.jpg` | 1376 &times; 768 px | Section: `#trial-form` (`.trial-trust-box`) | 7-Day Free Trial Protection badge reassuring parents of zero upfront risk. | **200 OK** |
| **Hero campaign image** | `https://blastlearning.in/wp-content/uploads/2026/11/hero_campaign_transformation.jpg` | 1376 &times; 768 px | Section: `#features` (Featured System Showcase) | Editorial showcase depicting a student in deep study flow with transparent weekly parent view. | **200 OK** |
| **Parent weekly dashboard** | `https://blastlearning.in/wp-content/uploads/2026/11/parent_weekly_dashboard.jpg` | 1376 &times; 768 px | Section: `#parents-students` (Parents Card) | High-contrast dashboard preview highlighting subject progress bars and CBSE grade trajectory. | **200 OK** |
| **Student study flow** | `https://blastlearning.in/wp-content/uploads/2026/11/student_study_flow.jpg` | 1376 &times; 768 px | Section: `#parents-students` (Students Card) | Student study UI showing daily SPARK streak, mastery shields, and countdown timer. | **200 OK** |
| **Tutor divergent paths** | `https://blastlearning.in/wp-content/uploads/2026/11/tutor_divergent_paths.jpg` | 1376 &times; 768 px | Section: `#features` (Diagnostic Card) | Technical diagnostic visual illustrating prerequisite gap-filling and branching mastery trees. | **200 OK** |
| **Chapter multimodal ecosystem** | `https://blastlearning.in/wp-content/uploads/2026/11/chapter_multimodal_ecosystem.jpg` | 1376 &times; 768 px | Section: `#goldilocks` (Goldilocks Zone) | Editorial visual displaying multimodal learning inputs converting into structured daily study plans. | **200 OK** |

### Local Maintenance Archive:
All source image files are preserved locally in:
`wordpress-package/personalized-ai-tutor/assets/`
for future offline maintenance, resizing, or staging updates.

---

## 3. Hero Visual Asset (Embedded 3D Optical Graphic)

- **Architecture**: 3D Optical Dispersion Prism with VIBGYOR spectral rays.
- **Rendering**: Pure SVG vector paths with radial gradient filters and hardware-accelerated CSS keyframe pulse animations.
- **Particle System**: Hardware-accelerated HTML5 `<canvas id="hero-particles-canvas">` running dynamic particle streams traveling along refractive ray trajectories.
- **Performance**: **0 HTTP requests**, 0 external image dependencies, infinitely sharp on all retina / 4K displays.

---

## 4. Typography & Font Delivery

Loaded via Google Fonts with preconnect headers:
- **Plus Jakarta Sans** (400, 500, 600, 700, 800): Primary UI font, headings, form controls, pricing.
- **Newsreader** (400, 600, Italic): Editorial quotes, subheadings, trust callouts.
- **Poppins** (300, 400, 500, 600, 700): Alignment font matching live global header and footer.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Newsreader:ital,wght@0,400;0,600;1,400;1,600&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
```

---

## 5. Icons & UI Vectors

Over 40 UI icons (checkmarks, navigation arrows, board selector pills, pricing badges, accordion chevrons) are implemented as **100% inline SVGs**:
- Zero external font files (`.woff2`, `.ttf`, Font Awesome) to load.
- Completely immune to CDN font blocking, CORS errors, or WordPress theme font collisions.
