# Urimai Kaavalan — Component Specification

> **Phase:** 2 — UI/UX Design System and User Experience
> **Context:** Reusable UI building blocks.

---

## 1. Status Badge
- **Purpose:** Communicate the state of a case, document, or request.
- **Variants:**
  - *Success (Green):* Verified, Approved, Resolved.
  - *Warning (Amber):* Pending, Action Required, Under Review.
  - *Error (Red):* Rejected, Failed.
  - *Info (Blue):* New, Draft.
- **Design:** Small pill shape, highly readable text, optional leading icon.

## 2. Alert / Banner
- **Purpose:** System-level or page-level important information.
- **Variants:** Info, Warning, Error.
- **Design:** Full width (mobile) or inline block (desktop). Left-bordered with semantic color. Contains Title, Message, and optional Dismiss button.

## 3. Case Action Card
- **Purpose:** Primary call to action on the family dashboard.
- **Design:** Elevated card. Large primary button. Clear instruction text.
- **Example:** "Upload FIR - We need this to assign a lawyer." -> [Upload Button].

## 4. Chat Bubble (LawBot)
- **Purpose:** Display conversational AI messages.
- **Variants:** User (Right-aligned, primary color), AI (Left-aligned, subtle background).
- **Design:** Rounded corners. AI bubbles include source citation box and disclaimer footer.

## 5. File Uploader / Dropzone
- **Purpose:** Document capture.
- **Mobile Design:** Large tap target invoking the native OS camera/file picker. "Take Photo" prominently featured.
- **Desktop Design:** Drag-and-drop dashed bordered area + "Browse" button.
- **States:** Idle, Active (Dragging), Uploading (Progress bar), Success (Thumbnail preview), Error.

## 6. Stepper (Progress Indicator)
- **Purpose:** Guide user through multi-part forms (e.g., Intake).
- **Design:** Horizontal numbered circles connected by lines.
- **Mobile:** If > 3 steps, show "Step 1 of 4" text instead of horizontal visual to save space.

## 7. Timeline Item
- **Purpose:** Single event in the Case Timeline.
- **Design:** Left vertical stroke. Circle node (colored by status). Timestamp on right (desktop) or above title (mobile).
