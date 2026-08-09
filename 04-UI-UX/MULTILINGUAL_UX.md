# Urimai Kaavalan — Multilingual UX

> **Phase:** 2 — UI/UX Design System and User Experience
> **Languages:** Tamil (Primary/Pilot), English. Future-ready for others.

---

## 1. Language Selection
- **First Encounter:** The public landing page must present a clear, unmissable language toggle before any complex text is shown.
- **Toggle Design:** Use the native script for the language name (e.g., "தமிழ்", "English") rather than flags (which represent countries, not languages).
- **Persistence:** Language preference is saved in the user's session (anonymous) or profile (authenticated).

## 2. Text Expansion & UI Adaptability
- Tamil text is frequently 30-50% longer than its English equivalent.
- **Rule:** Never use fixed-height containers for text. All cards, buttons, and list items must be able to grow vertically to accommodate wrapped text.
- **Rule:** Avoid dense multi-column layouts on mobile; stack elements vertically to allow full horizontal width for long Tamil words.

## 3. Typographic Scale (Tamil)
- Noto Sans Tamil requires slightly larger line-heights (`1.6` or `1.75`) compared to English to ensure vowel markers (uyirmei ezhuthukkal) above and below the baseline are not clipped.
- Avoid using font weights below 400 (Regular) for Tamil text, as intricate glyphs become illegible at light weights.

## 4. Consistency in Legal Terminology
- Legal terms must be translated consistently across the entire platform (Web, IVR, Print).
- Maintain a central glossary.
- **Fallback:** If a specific legal term lacks a widely understood Tamil equivalent, provide the English term in brackets or a brief contextual tooltip.

## 5. Mixed-Language Input
- The system (especially search and intake forms) must tolerate users typing Tamil names in English script (transliteration) and vice versa, handling it gracefully at the backend/search level.
