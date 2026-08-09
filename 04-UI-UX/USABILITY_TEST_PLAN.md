# Urimai Kaavalan — Usability Test Plan

> **Phase:** 2 — UI/UX Design System and User Experience
> **Context:** Validation plan for Phase 2 UX designs before implementation.

---

## 1. Test Objectives
- Validate that the interface reduces anxiety and cognitive load for families.
- Confirm that the distinction between AI advisory content and official/human content is clearly understood by all user groups.
- Ensure the mobile-first citizen flows are operable by users with low digital literacy.
- Verify the efficiency of the split-pane interfaces for professional users.

## 2. Test Groups & Profiles

### Group A: Citizens (Families)
- **Profile:** Low-to-medium digital literacy, budget smartphone users, primarily Tamil speakers.
- **Goal:** Test intake, status checking, and LawBot comprehension.

### Group B: Para-Legal Volunteers (PLVs)
- **Profile:** Field workers, comfortable with mobile apps, high volume of data entry.
- **Goal:** Test OCR verification, offline data entry, and case management on mobile.

### Group C: Legal-Aid Lawyers
- **Profile:** High digital literacy, time-poor, accessing via desktop/laptop.
- **Goal:** Test AI screening review, override flows, and information density in the case queue.

## 3. Key Tasks (Scenarios)

### Task 1: First-Time Registration (Group A)
- **Scenario:** Your brother was arrested yesterday. You have a photo of a document the police gave you. Use the app to ask for a lawyer.
- **Success Criteria:** User successfully switches to Tamil, completes the 3-step intake, uploads the photo, and reaches the "Case Created" dashboard without assistance.

### Task 2: AI Comprehension & Safety (Group A)
- **Scenario:** Use the LawBot to ask "Will my brother get bail?"
- **Success Criteria:** User reads the response and understands that the AI cannot guarantee bail and that they need to wait for a lawyer. (Measured via post-task interview).

### Task 3: Document Verification (Group B)
- **Scenario:** You have 5 pending documents to verify. Review the extracted text against the uploaded FIR image for Case #12345.
- **Success Criteria:** User correctly identifies the LOW confidence field, corrects the name, and submits within 90 seconds.

### Task 4: AI Override (Group C)
- **Scenario:** Review the new case assignment. The AI suggests Section 436A applies, but you notice a recent court order extending the period.
- **Success Criteria:** Lawyer locates the AI brief, clicks "Override," enters the reason, and submits the update.

## 4. Accessibility Checks
- **Keyboard Navigation:** Can a tester complete Task 4 using only the `Tab` and `Enter` keys?
- **Screen Reader:** Can a visually impaired tester complete Task 1 using TalkBack/VoiceOver?
- **Contrast Check:** Run all final mockups through a WCAG 2.1 AA color contrast analyzer.

## 5. Logistics
- **Methodology:** Moderated, task-based usability testing.
- **Environment:** Figma interactive prototypes on target devices (budget Android for Group A/B, Desktop for Group C).
- **Metrics Collected:** Task Success Rate, Time on Task, Error Rate, System Usability Scale (SUS) score.
