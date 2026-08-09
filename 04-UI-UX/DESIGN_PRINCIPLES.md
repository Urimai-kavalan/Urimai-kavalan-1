# Urimai Kaavalan — Design Principles

> **Phase:** 2 — UI/UX Design System and User Experience
> **Source:** Phase 0 & 1 Documentation

---

These principles guide all UI/UX decisions for Urimai Kaavalan, ensuring the platform remains safe, accessible, and human-centered.

## 1. Clarity Before Complexity
Users in crisis cannot parse dense interfaces. Show only the information immediately relevant to the user's current context. Hide complex secondary actions behind progressive disclosure patterns (e.g., "Show more details").

## 2. Explain Before Asking
Never ask a user for a document or piece of information without first explaining *why* it is needed and *how* it will be used. Example: "We need the FIR to find the correct legal sections, which helps us connect you to the right lawyer."

## 3. Never Hide Important Status
Case status and pending actions must be the most prominent elements on the dashboard. Families should never have to dig to find out what is happening or what they need to do next.

## 4. Human Review Must Be Visible
If an AI has generated an insight, and a lawyer has reviewed it, the human lawyer's approval must be clearly visible (e.g., "Reviewed by Lawyer [Name]"). This builds trust and reinforces that humans remain in the loop.

## 5. AI Limitations Must Be Transparent
AI features (like LawBot or the Screening Engine) must clearly state their limitations. Disclaimers must be persistent but not intrusive. Never present AI output as a guaranteed legal outcome.

## 6. Accessibility by Default
Accessibility is not an overlay. Minimum contrast ratios, large touch targets (44x44px), semantic HTML for screen readers, and support for reduced motion must be baked into every component from the ground up.

## 7. Mobile First
The citizen experience must be designed for a budget smartphone on a slow 2G/3G network. Desktop layouts are enhancements of the mobile experience, not the other way around.

## 8. Tamil and English Parity
Tamil is not a secondary localization; it is a primary interface language. The design must accommodate Tamil's longer word lengths and unique typographic needs (e.g., adequate line height to prevent vowel marker clipping) without breaking layouts.

## 9. Minimize Cognitive Load
Use familiar interaction patterns. Do not invent novel navigation structures where standard tabs, accordions, or bottom navigation will suffice. Consistency across the app reduces the mental effort required to use it.

## 10. Never Imply Legal Certainty Where Uncertainty Exists
Use cautious, advisory language. Use words like "Potential," "May apply," and "Requires review." Avoid "Will," "Guaranteed," or "Eligible."

## 11. Preserve User Control
Users must always have a way to go back, cancel an action, or correct a mistake (especially during OCR verification and case intake).

## 12. Privacy by Design
Sensitive information (like accused names or family contact details) should not be unnecessarily broadcast on screens, especially in admin or legal-aid queue views. Mask PII where contextually appropriate until explicitly revealed by authorized users.

## 13. Graceful Fallbacks Always
If a government API is down, if a document cannot be read, or if the user loses connectivity, the system must fail gracefully, explaining the issue simply and offering a manual or human-assisted alternative.
