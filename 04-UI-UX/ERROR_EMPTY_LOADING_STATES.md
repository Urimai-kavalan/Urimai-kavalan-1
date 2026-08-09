# Urimai Kaavalan — Error, Empty & Loading States

> **Phase:** 2 — UI/UX Design System and User Experience
> **Context:** Handling the "in-between" and failure modes of the UI.

---

## 1. Loading States
- **Page Load:** Use Skeleton screens (shimmering wireframes matching the layout) rather than a single full-screen spinner. Skeletons reduce perceived wait time.
- **Component Load:** (e.g., waiting for AI RAG response). Use a localized spinner or a pulsing indicator within the specific component.
- **Action Load:** Buttons must show a spinner and disable themselves when clicked to prevent double-submission.

## 2. Empty States
An empty state occurs when a list, queue, or dashboard has no data to display.
- **Never just show a blank screen.**
- **Components:**
  - An appropriate, calming illustration or large, muted icon.
  - A clear headline: "No cases assigned yet."
  - A descriptive subhead: "When a family requests legal aid in your district, it will appear here."
  - Primary CTA (if applicable): e.g., "Register a New Case".

## 3. Error States (System & Integration)
- **Generic 500 / App Crash:** "Something went wrong on our end. We've logged the issue. Please try refreshing the page." + [Refresh Button].
- **Network / Offline:** "You appear to be offline. Check your connection to see the latest updates."
- **Integration Down (e.g., future e-Courts link):** Show data from the last verified manual entry, with a subtle inline warning: "Live court data is currently unavailable. Showing last verified status."
- **Permission Denied (403):** "You don't have access to this page." + [Go to Dashboard Button]. Do not reveal if the hidden resource exists.

## 4. UI/UX Tone in Errors
- Take the blame. (e.g., "We couldn't load this," not "You broke the page").
- Always offer a way out (a link home, a refresh button, or a phone number for support).
