# Urimai Kaavalan — Responsive Design

> **Phase:** 2 — UI/UX Design System and User Experience
> **Context:** Adapting layouts across device sizes.

---

## 1. Breakpoints
- **Mobile (sm):** Base to 639px (Target: 360px viewport).
- **Tablet (md):** 640px to 1023px.
- **Desktop (lg):** 1024px to 1279px.
- **Large Desktop (xl):** 1280px and up.

## 2. Core Layout Adaptations

### 2.1 Navigation
- **Mobile:** Bottom navigation bar (Family). Full-screen hamburger overlay (Professional).
- **Tablet:** Left sidebar collapses to icons only.
- **Desktop:** Left sidebar expanded by default. Top horizontal nav for Family portal.

### 2.2 Data Tables (Professional Portal)
- **Desktop/Tablet:** Standard multi-column grid table with sortable headers.
- **Mobile:** Tables MUST transform into stacked cards.
  - *Example:* Instead of a row with columns for ID, Name, Status, Date. Render a Card with "Name" as title, "Status" as badge in top right, and "ID/Date" as subtitle text.

### 2.3 Split Panes (Case Detail / OCR Verification)
- **Desktop:** Left/Right 50-50 or 30-70 split.
- **Tablet:** Stacked vertically if content demands, or constrained 50-50.
- **Mobile:** Strictly sequential. E.g., for OCR, user sees the image first. Tapping "Verify" slides up a bottom sheet or navigates to a new page with the form inputs.

### 2.4 Modals
- **Desktop:** Centered dialog box with an overlay overlay (`sm` or `md` width).
- **Mobile:** Modals must transform into full-screen dialogs or bottom-sheet drawers to maximize usable screen real estate.
