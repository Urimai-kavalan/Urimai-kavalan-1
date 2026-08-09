# Urimai Kaavalan — Accessibility Requirements

> **Phase:** 1 — PRD & Acceptance Criteria
> **Source:** 03-PRD/01_URIMAI_KAAVALAN_GOVERNMENT_PRD.pdf (§8, §22, §23)

---

## Accessibility Principles

The Urimai Kaavalan platform serves users across varied digital literacy levels, device capabilities, and linguistic backgrounds. Accessibility is not an afterthought; it is a primary product pillar.

---

## URM-ACC-001 — WCAG 2.1 AA Compliance

**Priority:** P0 | **PRD Section:** §23 | **Status:** CONFIRMED

### Requirements
- All user-facing interfaces (Family Portal, Legal-Aid Portal) must comply with WCAG 2.1 Level AA guidelines.
- Semantic HTML tags (e.g., `<nav>`, `<main>`, `<article>`) must be used correctly to support assistive technologies.
- Minimum contrast ratio for all text elements must be 4.5:1 (normal text) and 3:1 (large text).
- Form inputs must have explicitly associated labels (`<label for="...">`).
- Focus states must be highly visible and follow a logical tab order.

---

## URM-ACC-002 — Mobile-First Responsive Layout

**Priority:** P0 | **PRD Section:** §23 | **Status:** CONFIRMED

### Requirements
- Interfaces must be fully responsive, designed mobile-first.
- Supported minimum viewport width: 320px without horizontal scrolling.
- Information architecture must prioritize progressive disclosure to avoid overwhelming users on small screens.

---

## URM-ACC-003 — Touch Targets and Spacing

**Priority:** P0 | **PRD Section:** §8, §23 | **Status:** CONFIRMED

### Requirements
- All interactive elements (buttons, links, inputs) must have a minimum touch target size of 44x44 pixels.
- Adequate spacing must be provided between interactive elements to prevent accidental clicks.

---

## URM-ACC-004 — Screen-Reader Compatibility

**Priority:** P0 | **PRD Section:** §8 | **Status:** CONFIRMED

### Requirements
- UI components must include appropriate ARIA (Accessible Rich Internet Applications) attributes where native HTML semantics are insufficient.
- Dynamic content updates (e.g., toast notifications, form errors, AI responses) must be announced to screen readers using `aria-live` regions.
- Non-text content (images, icons) must have descriptive `alt` text or be hidden (`aria-hidden="true"`) if purely decorative.

---

## URM-ACC-005 — Reduced Motion

**Priority:** P0 | **PRD Section:** §8, §23 | **Status:** CONFIRMED

### Requirements
- The UI must respect the user's OS-level `prefers-reduced-motion` settings.
- When enabled, all non-essential animations and transitions must be disabled.
- Any animations used (when allowed) must be subtle and purposeful (e.g., state transitions, not decorative).

---

## URM-ACC-006 — Low-Bandwidth / Offline States

**Priority:** P0 | **PRD Section:** §8, §23 | **Status:** CONFIRMED

### Requirements
- The application must remain usable on 2G/EDGE network speeds.
- Critical paths (Case Status, Rights Library text) must prioritize text loading before heavy assets (images).
- Graceful degradation: If network fails, clear and actionable error messages must be displayed (e.g., "You are offline. Showing last known case status.").

---

## URM-ACC-007 — Plain Language and Literacy Support

**Priority:** P0 | **PRD Section:** §2, §8, §22 | **Status:** CONFIRMED

### Requirements
- All family-facing text must use plain language, aiming for a Grade 6 reading level or lower.
- Legal jargon must be avoided or immediately explained in simple terms.
- Instructions must be concise and action-oriented.
- Voice/IVR prompts must use a Grade 4-5 spoken equivalent vocabulary.

---

## URM-ACC-008 — Audio / Multi-Modal Support

**Priority:** P1 | **PRD Section:** §8 | **Status:** CONFIRMED

### Requirements
- Rights library cards must include an audio playback option for low-literacy users.
- Audio buttons must be clearly identifiable and accessible.
- Audio must not auto-play.

---

## URM-ACC-009 — Voice Channel (IVR) Accessibility

**Priority:** P1 | **PRD Section:** §22 | **Status:** CONFIRMED

### Requirements
- IVR must support DTMF (keypad) entry as the primary fallback for users who cannot or prefer not to use voice input.
- STT (Speech-to-Text) must tolerate background noise and regional accents.
- Fallback to human assistance (PLV) must be offered after 2 failed interactions.
- (See `VOICE_REQUIREMENTS.md` for full IVR specification).
