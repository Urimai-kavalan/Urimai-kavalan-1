# Urimai Kaavalan — Design System

> **Phase:** 2 — UI/UX Design System and User Experience
> **Source:** Phase 0 & 1 Documentation

---

## Overview

The Urimai Kaavalan design system aims for a "civic-tech" aesthetic: trustworthy, professional, calm, and highly accessible. It avoids flashy, gradient-heavy "startup" looks in favor of solid contrast, clear typography, and utilitarian elegance.

## 1. Color System

### Base Palette
- **Primary:** Deep Indigo/Navy (Trust, authority, calm)
- **Secondary:** Teal/Cyan (Action, progress, legal-aid connection)
- **Background:** Off-White/Light Gray (Reduces eye strain compared to pure white)
- **Surface:** Pure White (For cards, modals, distinct content blocks)

### Text Colors
- **Text Primary:** Near-Black (High contrast, #1A1A1A)
- **Text Secondary/Muted:** Dark Gray (For metadata, timestamps, #4A4A4A)

### Semantic/Status Colors
- **Success:** Forest Green (Clear, verified, complete)
- **Warning:** Amber/Mustard (Action required, pending, incomplete)
- **Error/Destructive:** Brick Red (Validation failure, rejected)
- **Information:** Muted Blue (Educational nudges, AI context)
- **AI Highlight:** Subtle Purple (To distinguish AI-generated advisory content)

## 2. Typography

### Font Families
- **English / System:** Inter (or similar highly legible sans-serif like Roboto)
- **Tamil:** Noto Sans Tamil (Engineered for digital legibility and proper rendering of conjuncts)

### Hierarchy (Mobile Scale)
- **Display:** 32px / 40px line-height (Rarely used, only for major landing headers)
- **H1:** 24px / 32px line-height (Page titles)
- **H2:** 20px / 28px line-height (Section headers)
- **H3:** 18px / 24px line-height (Card titles)
- **Body Large:** 16px / 24px line-height (Primary reading text)
- **Body Regular:** 14px / 20px line-height (Secondary text)
- **Caption/Label:** 12px / 16px line-height (Metadata, form labels, timestamps)

### Typography Rules
- Minimum contrast ratio 4.5:1 for all text.
- Tamil text requires slightly looser line-height to accommodate ascenders/descenders.

## 3. Spacing

- Uses a strict 4px/8px baseline grid.
- **Base Unit:** 8px
- **xs:** 4px
- **sm:** 8px
- **md:** 16px (Standard padding/margin)
- **lg:** 24px
- **xl:** 32px
- **xxl:** 48px

## 4. Borders & Radius

- **Radius:** Subtle rounding to feel approachable but not overly playful.
  - `sm`: 4px (Inputs, buttons)
  - `md`: 8px (Cards, modals)
  - `lg`: 12px (Large structural containers)
- **Border Weights:**
  - `1px` solid for inputs, dividers, card borders.
  - `2px` solid for active focus states (accessibility requirement).

## 5. Elevation (Shadows)

Shadows are used sparingly to establish hierarchy, not for decoration.
- **Level 0:** Flat (Background, standard content)
- **Level 1:** Subtle drop shadow (Cards resting on background)
- **Level 2:** Medium drop shadow (Sticky headers, bottom navigation)
- **Level 3:** Large blurred shadow (Modals, dropdowns, popovers)

## 6. Icons

- **Style:** Clean, stroke-based (not filled), 2px stroke width. (e.g., Lucide or Phosphor).
- **Sizing:** 
  - `sm`: 16px (Inline with text)
  - `md`: 24px (Standard UI controls, button icons)
  - `lg`: 32px (Empty states, major feature highlights)
- **Rule:** Icons must ALWAYS be accompanied by a text label or an `aria-label` for screen readers. Never rely on an icon alone to convey meaning in the family portal.

## 7. Buttons

### Styles
- **Primary:** Solid Primary color background, white text. (Main calls to action: "Submit", "Request Legal Aid").
- **Secondary:** Transparent background, Primary color border and text. (Alternative actions: "Cancel", "Upload Later").
- **Tertiary/Ghost:** No background, no border, Primary color text. (Low-priority actions: "View details").
- **Destructive:** Solid or outlined Error color. ("Delete Document", "Revoke").

### States
- **Default:** Standard styling.
- **Hover:** Slightly darkened background (Desktop).
- **Focus:** 2px high-contrast outline ring (Accessibility).
- **Active/Pressed:** Scaled down slightly (0.98x) for tactile feedback.
- **Disabled:** Muted gray background, low-contrast text, `cursor-not-allowed`.
- **Loading:** Spinner replaces icon/text, button is disabled.

### Sizing
- Minimum height: 44px (Touch target requirement).
- Padding: 16px horizontal.
