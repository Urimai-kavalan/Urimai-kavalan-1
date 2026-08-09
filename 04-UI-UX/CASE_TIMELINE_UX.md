# Urimai Kaavalan — Case Timeline UX

> **Phase:** 2 — UI/UX Design System and User Experience
> **Context:** The chronological history view of a case.

---

## 1. Visual Structure
- **Orientation:** Vertical timeline.
- **Order:** Reverse chronological (newest events at the top).
- **Nodes:** Circular icons representing the event type (e.g., document icon for upload, gavel for assignment).

## 2. Event Card Anatomy
Each timeline event must clearly display:
- **Date & Time:** (e.g., "Oct 12, 2026 • 2:30 PM").
- **Title:** Action-oriented (e.g., "FIR Uploaded", "AI Screening Completed", "Lawyer Assigned").
- **Description/Details:** Brief context (e.g., "Document verified by PLV").
- **Actor/Source:** Who performed the action.
  - *Privacy Rule (Family View):* Use roles, not names (e.g., "By PLV", "By System").
  - *Professional View:* Show exact user names/IDs for auditability.
- **Attachments:** Mini-links to view associated documents or AI briefs directly from the timeline event.

## 3. Differentiating Future vs. Past
- **Past Events:** Solid lines, colored nodes, high-contrast text.
- **Current / Pending Step:** Highlighted node (e.g., pulsing or distinct primary color), bold text.
- **Future Anticipated Steps (Optional):** Dotted lines, grayed-out nodes, muted text (e.g., "Next: Lawyer Review").

## 4. Error/Override Events
- If a document is rejected or an AI signal is overridden by a human, it appears as a distinct event in the timeline.
- E.g., "AI Result Overridden by Lawyer [Date]".
