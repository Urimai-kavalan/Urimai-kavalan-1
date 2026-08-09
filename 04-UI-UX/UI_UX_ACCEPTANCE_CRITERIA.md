# Urimai Kaavalan — UI/UX Acceptance Criteria

> **Phase:** 2 — UI/UX Design System and User Experience
> **Context:** Measurable criteria to validate that the UI/UX specification is complete and meets project goals.

---

## 1. Information Architecture & Navigation
- [x] All 6 primary user roles have a defined navigation structure (Mobile and Desktop).
- [x] All critical flows have documented entry points, decision nodes, and exit states.
- [x] The primary navigation for the Family portal is confirmed as a bottom-nav pattern for mobile.

## 2. Design System & Components
- [x] Design tokens (colors, typography, spacing, radius) are fully specified in CSS-variable format.
- [x] Minimum contrast ratio of 4.5:1 is mandated for all text tokens.
- [x] A minimum touch target of 44x44px is mandated for all interactive components.
- [x] Error, Empty, and Loading states are defined with plain-language guidelines.

## 3. Trust, Safety & Legal Boundaries
- [x] Visual distinction (badges/colors) between AI-generated, Human-verified, and Official data is specified.
- [x] The AI Assistant UX strictly mandates a source citation and a non-legal-advice disclaimer on every response.
- [x] No UI component or copy implies guaranteed legal outcomes.
- [x] The Human Override flow for AI screening is fully documented.

## 4. Accessibility & Multilingual
- [x] Tamil typography rules (increased line-height for vowel markers) are defined.
- [x] The UI is designed to accommodate 30-50% text expansion for Tamil localization.
- [x] Keyboard focus states (`2px` solid primary border) are mandated.
- [x] Support for `prefers-reduced-motion` is mandated.

## 5. Responsive Design
- [x] Desktop, Tablet, and Mobile breakpoints are defined.
- [x] Data tables are explicitly required to transform into stacked cards on mobile viewports.
- [x] Split-pane professional views are explicitly required to become sequential views on mobile.

## 6. Voice / IVR
- [x] The IVR flow includes language selection as the primary node.
- [x] Mandatory legal disclaimers are included in the voice UX specification.
- [x] The "Three Strikes" error recovery and human fallback routing are defined.
