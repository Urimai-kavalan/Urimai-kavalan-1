# Urimai Kaavalan — Accessibility UX

> **Phase:** 2 — UI/UX Design System and User Experience
> **Target:** WCAG 2.1 AA Compliance + Low Digital Literacy Support

---

## 1. Keyboard Navigation
- Every interactive element (button, link, form field, tab) must be reachable via the `Tab` key.
- Focus order must be logical (top-to-bottom, left-to-right).
- **Focus Rings:** A highly visible `2px` solid border (using `--color-primary`) must appear around the focused element. Do NOT use `outline: none` without providing a custom focus state.

## 2. Screen Reader Experience
- **Semantic HTML:** Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>`.
- **Headings:** Ensure strict hierarchical order (H1 -> H2 -> H3). No skipping heading levels.
- **Aria-Labels:** Provide descriptive labels for all icon-only buttons (e.g., `<button aria-label="Close modal"><Icon /></button>`).
- **Live Regions:** Dynamic changes (e.g., "File uploaded successfully", or a new AI chat message) must be wrapped in `aria-live="polite"` regions so the screen reader announces them without requiring user focus.

## 3. Visual Accessibility
- **Contrast:** Ensure 4.5:1 contrast for regular text against its background, and 3:1 for large text and UI components (like button borders).
- **Color Independence:** NEVER convey critical information by color alone.
  - *Bad:* A red dot to indicate a rejected document.
  - *Good:* A red dot accompanied by the text "Rejected" or an "X" icon.
- **Font Scaling:** The UI must remain usable if the user zooms text up to 200% in their browser settings. Text must wrap, not truncate.

## 4. Reduced Motion
- Respect `prefers-reduced-motion` media queries.
- Disable all sliding, fading, and pulsing animations if the user has requested reduced motion at the OS level. Modals should appear instantly rather than sliding up.

## 5. Forms and Error Identification
- Required fields must be clearly marked (e.g., with an asterisk `*` and `aria-required="true"`).
- Error messages must be associated with the input field using `aria-describedby`.
- Focus must automatically move to the first invalid field upon form submission failure.
