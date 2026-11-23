# Blast Learning — Personalized AI Tutor Asset Manifest

This document audits all visual, font, library, and media assets required by the approved Blast Learning **Personalized AI Tutor** campaign landing page (`index.html` &rarr; `landing-page-elementor.html`) and provides exact specifications for WordPress Media Library upload and URL mapping.

---

## 1. Executive Summary

| Category | Total Assets | WordPress Media Uploads | Embedded / CDN | Status |
| :--- | :---: | :---: | :---: | :---: |
| **Photographic Content Images** | 5 | **5 files** | 0 | **Prepared in `assets/`** |
| **Hero 3D Optical Graphic** | 1 | **0** | Embedded 3D SVG + Canvas | **Zero HTTP requests** |
| **Site Chrome Logos** | 2 | **0** (Already on WordPress) | Global Header 55 / Footer 185 | **Excluded from embed** |
| **Icons & UI Badges** | 40+ | **0** | 100% Inline SVG | **Zero font dependencies** |
| **Web Typography** | 4 families | **0** | Google Fonts CDN | **Optimized preconnect** |
| **Interactive Scripts** | 6 modules | **0** | Pure Vanilla JS | **Zero third-party library overhead** |

---

## 2. Photographic Content Images to Upload to WordPress Media Library

A clean staging folder has been created at:
`wordpress-package/personalized-ai-tutor/assets/`

The developer should upload these **five (5) photographic assets** directly into the WordPress Media Library (`wp-admin -> Media -> Add New`):

| Filename | Source Path | Dimensions | File Size | Page Section | Context & Visual Content | WordPress Media Library Target URL | Status |
| :--- | :--- | :---: | :---: | :--- | :--- | :--- | :---: |
| `chapter_multimodal_ecosystem.jpg` | `assets/chapter_multimodal_ecosystem.jpg` | 1376 &times; 768 px | 722 KB | Section: `#goldilocks` (The Learning Goldilocks Zone) | Editorial visual displaying multimodal learning inputs (handwritten notes, chapter slides, audio recordings) converting into personalized structured study plans. | `https://blastlearning.in/wp-content/uploads/2026/11/chapter_multimodal_ecosystem.jpg` | Ready for Upload |
| `parent_weekly_dashboard.jpg` | `assets/parent_weekly_dashboard.jpg` | 1376 &times; 768 px | 463 KB | Section: `#parents-students` (Parents Experience Card) | High-contrast dashboard preview highlighting the weekly parent summary, subject progress bars, and CBSE grade trajectory. | `https://blastlearning.in/wp-content/uploads/2026/11/parent_weekly_dashboard.jpg` | Ready for Upload |
| `student_study_flow.jpg` | `assets/student_study_flow.jpg` | 1376 &times; 768 px | 520 KB | Section: `#parents-students` (Students Experience Card) | Engaging student learning UI displaying daily SPARK streak counter, mastery shields, and upcoming chapter review timer. | `https://blastlearning.in/wp-content/uploads/2026/11/student_study_flow.jpg` | Ready for Upload |
| `hero_campaign_transformation.jpg` | `assets/hero_campaign_transformation.jpg` | 1376 &times; 768 px | 757 KB | Section: `#features` (Featured System Showcase) | Editorial showcase visual depicting a student in deep study flow with transparent weekly parent oversight. | `https://blastlearning.in/wp-content/uploads/2026/11/hero_campaign_transformation.jpg` | Ready for Upload |
| `tutor_divergent_paths.jpg` | `assets/tutor_divergent_paths.jpg` | 1376 &times; 768 px | 640 KB | Section: `#features` (Diagnostic Branching Card) | Technical diagnostic visual illustrating gap-filling prerequisite branching logic and personalized mastery trees. | `https://blastlearning.in/wp-content/uploads/2026/11/tutor_divergent_paths.jpg` | Ready for Upload |

### Image URL Configuration in `landing-page-elementor.html`:
All five images in `landing-page-elementor.html` are configured with the live WordPress Media Library upload URL as their primary `src`, paired with an inline fallback handler:
```html
<img src="https://blastlearning.in/wp-content/uploads/2026/11/filename.jpg" 
     onerror="this.onerror=null; this.src='assets/filename.jpg';" 
     alt="..." 
     loading="lazy" 
     width="1376" 
     height="768">
```
> [!NOTE]
> If WordPress uploads the files into a different folder (e.g., `uploads/2026/12/`), update the base path in `landing-page-elementor.html` via a simple find-and-replace.

---

## 3. Hero Visual Asset (Embedded 3D Optical Graphic)

Unlike standard landing pages that rely on heavy photographic hero banners, the approved Personalized AI Tutor hero utilizes a high-performance, embedded vector and particle architecture:

- **Component**: 3D Optical Dispersion Prism with VIBGYOR spectral rays.
- **Technology**: Pure SVG vector paths with radial gradient filters and hardware-accelerated CSS keyframe pulse animations.
- **Particle Layer**: Hardware-accelerated HTML5 `<canvas id="heroParticlesCanvas">` running dynamic particle streams traveling along the refractive spectrum.
- **Performance Advantage**: **0 HTTP requests**, 0 external image dependencies, infinitely sharp on all retina / 4K displays, and under 15 KB total execution footprint.

---

## 4. Site Chrome Logos (Excluded from Embed)

The standalone header and footer have been removed from the embeddable package because the live site renders them globally via Elementor Theme Builder:

| Asset | Source URL on Live Site | Host Location | Reason for Exclusion |
| :--- | :--- | :--- | :--- |
| **Header Logo** (`logo-1.png`) | `https://blastlearning.in/wp-content/uploads/2026/08/logo-1.png` | Global Header ID 55 | Automatically rendered by WordPress Theme Builder |
| **Footer Logo** (`logo-1024x683.png`) | `https://blastlearning.in/wp-content/uploads/2026/09/logo-1024x683.png` | Global Footer ID 185 | Automatically rendered by WordPress Theme Builder |

---

## 5. Web Fonts & Typography

All fonts are loaded via Google Fonts CDN with preconnect headers for optimal Time to First Byte (TTFB) and Largest Contentful Paint (LCP):

| Font Family | Weights / Styles | Application | Delivery |
| :--- | :--- | :--- | :--- |
| **Plus Jakarta Sans** | 400, 500, 600, 700, 800 | Primary UI font, headings, form labels, buttons, pricing | Google Fonts CDN |
| **Newsreader** | 400, 600, Italic | Editorial quotes, section subheaders, trust callouts | Google Fonts CDN |
| **Poppins** | 300, 400, 500, 600, 700 | Alignment font matching live global WordPress header and footer | Google Fonts CDN |

CDN Snippet included in embed:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Newsreader:ital,wght@0,400;0,600;1,400;1,600&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&display=swap" rel="stylesheet">
```

---

## 6. Icons & Vector Graphics

Over 40 icons (checkmarks, arrows, exam badges, feature pillars, board selectors, accordions) are implemented as **100% inline SVG elements**:
- **Zero font files** (`.woff2`, `.ttf`, Font Awesome) to load.
- Completely immune to WordPress font loading race conditions or CORS blocking.
- Scalable, crisp on high-DPI screens, and fully stylable via CSS `currentColor`.

---

## 7. Interactive JavaScript Modules

The page contains six lightweight, vanilla JavaScript modules with **zero external library dependencies** (no jQuery dependency, no external GSAP required for basic execution):

1. **Reading Progress Indicator**: Tracks vertical viewport progression and updates top line.
2. **Scroll Reveal Observer**: Native `IntersectionObserver` triggering staggered fade-in animations.
3. **Smooth Scroll with Sticky Header Offset**: Intercepts in-page anchor clicks (`#trial-form`, `#how-it-works`) and offsets by 80px to account for the live Elementor sticky header.
4. **VIBGYOR Particle Canvas**: Lightweight physics loop animating particles along optical ray trajectories.
5. **Goldilocks Zone Interactive Slider**: Moving dot indicator showing calibration between "Too Easy" and "Too Hard".
6. **On-Page Trial Form Validation & Submission**: Native asynchronous submission handling, validation, and error/success state display.
