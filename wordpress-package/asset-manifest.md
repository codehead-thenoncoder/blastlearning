# Blast Learning — Study Guide Asset Manifest

This document audits all visual, font, library, and media assets in the approved Blast Learning Study Guide page (`study-guide.html` / `index.html`) and provides exact instructions for WordPress Media Library upload and URL replacement.

---

## 1. Executive Summary

| Category | Total Found | Required WordPress Media Uploads | Embedded / CDN |
| :--- | :---: | :---: | :---: |
| **Photographic Images** | 2 active | **2 files** | 0 |
| **Site Chrome Logos** | 2 | **0** (Already on WordPress) | 2 |
| **Unused Asset Candidates** | 1 | **0** (Not referenced) | 0 |
| **Icons & Vectors** | 35+ | **0** | 100% Inline SVG |
| **Web Fonts** | 3 families | **0** | Google Fonts CDN |
| **Animation Libraries** | 2 scripts | **0** | cdnjs CDN |
| **Audio / Media** | 1 component | **0** | Interactive JS/CSS Simulation |

---

## 2. Images to Upload to WordPress Media Library

Only **two (2) photographic images** are referenced in the approved Study Guide content body. Both are located in the local `assets/` directory:

| Filename | Dimensions | File Size | Location in Page | Purpose / Context | Placeholder in Code |
| :--- | :---: | :---: | :---: | :---: | :---: |
| `hero_campaign_transformation.jpg` | 1376 &times; 768 px | ~757 KB | Act 1: Hero (`#hero`, line ~76 of fragment) | Editorial hero visual showing physical lecture notes and handwritten diagrams transforming into structured digital learning planes. | `https://blastlearning.in/wp-content/uploads/2026/10/hero_campaign_transformation.jpg` (Configured) |
| `chapter_multimodal_ecosystem.jpg` | 1376 &times; 768 px | ~722 KB | Act 4: Chapter Deconstruct (`#chapterDeconstruct`, line ~183 of fragment) | Editorial image showing a manuscript chapter unfurling into interactive lessons, audio podcasts, and calendar schedules. | `https://blastlearning.in/wp-content/uploads/2026/10/chapter_multimodal_ecosystem.jpg` (Configured) |

### Live Media Library URLs (Applied in Deliverables):
Both images are uploaded to the WordPress Media Library and integrated directly into the migration files:
- **Hero Image**: `https://blastlearning.in/wp-content/uploads/2026/10/hero_campaign_transformation.jpg`
- **Chapter Ecosystem Image**: `https://blastlearning.in/wp-content/uploads/2026/10/chapter_multimodal_ecosystem.jpg`

---

## 3. Site Chrome Logos (Already Live on WordPress)

These images belong to the global Header (Elementor 55) and global Footer (Elementor 185). They are already hosted on the live WordPress domain and do not need to be uploaded:

| Asset | Source URL on Live Site | Purpose |
| :--- | :--- | :--- |
| Header Logo (`logo-1.png`) | `https://blastlearning.in/wp-content/uploads/2026/08/logo-1.png` | Global site navigation logo in Header 55. |
| Footer Logo (`logo-1024x683.png`) | `https://blastlearning.in/wp-content/uploads/2026/09/logo-1024x683.png` | Global site branding logo in Footer 185. |

---

## 4. Inactive / Non-Referenced Assets in Workspace

The following files exist in the project repository but are **not** referenced in the approved HTML and should **not** be uploaded:

| Filename | Location | Status | Notes |
| :--- | :--- | :--- | :--- |
| `tutor_divergent_paths.jpg` | `assets/` | Unused | Candidate graphic from earlier exploration; verified absent from approved HTML markup and CSS. |
| `WhatsApp Video 2026-10-09 at 12.26.42 AM.mp4` | Workspace Root | Unused | Source reference video; walkthrough link is configured as an editorial ghost link (`href="#"`). |
| `WhatsApp Video 2026-10-09 at 12.26.56 AM.mp4` | Workspace Root | Unused | Source reference video. |

---

## 5. Typography & Font Assets

All fonts are loaded via Google Fonts. No local WOFF2/TTF font files are required in the Media Library.

| Font Family | Weights / Styles | Intended Usage | Delivery Method |
| :--- | :--- | :--- | :--- |
| **Montserrat** | 300, 400, 500, 600, 700, 800, 900 (normal & italic) | Display headlines (`.hero-display-h1`, Section titles) | Google Fonts `<link>` / CSS `@import` |
| **Newsreader** | Optical size 6..72, weights 400, 500, 600 (normal & italic) | Editorial quotes, lead editorial notes, accents | Google Fonts `<link>` / CSS `@import` |
| **Poppins** | 300, 400, 500, 600, 700 (normal & italic) | Body text, UI labels, buttons, site chrome | Google Fonts `<link>` / CSS `@import` |

CDN URL:
```
https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500;1,6..72,600&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&display=swap
```

---

## 6. Icons & Vector Graphics

All 35+ UI icons (document symbols, audio wave icons, play/pause controls, slider icons, checkmarks, arrows, and external badges) are implemented as **inline SVGs**:
- **Zero HTTP requests** for icon fonts or sprite sheets.
- **No Font Awesome stylesheet dependency** required for the Study Guide body (though Header 55 and Footer 185 on the site use Font Awesome).
- Completely immune to WordPress font-loading race conditions or CDN CORS blocks.

---

## 7. External JavaScript Libraries

| Library | Version | CDN Source | Placement | Purpose |
| :--- | :---: | :--- | :--- | :--- |
| **GSAP (GreenSock)** | 3.12.5 | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js` | Head or before widget script | Powers hero line-by-line reveal, image frame entrance, and interactive mouse parallax. |
| **ScrollTrigger** | 3.12.5 | `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js` | Immediately following GSAP | Powers optical depth parallax during hero scroll. |

---

## 8. Interactive Audio / Media Component

The Audio Podcast Player in Act 4 (`#chapterDeconstruct`) is a **lightweight, interactive CSS & JavaScript component**:
- Waveform bars (`.wave-bar`) are rendered dynamically into `#waveformContainer`.
- Play/pause toggles dynamic bar animation and increments the elapsed timer (`0:00 / 5:48`).
- **No external audio files (e.g. `.mp3`) or third-party player plugins** are required, ensuring zero streaming bandwidth overhead on your WordPress hosting server.
