# Urimai Kaavalan — Trust & Safety UX

> **Phase:** 2 — UI/UX Design System and User Experience
> **Context:** Maintaining the "AI assists, humans verify" boundary.

---

## 1. Visualizing Information Provenance
Users must instantly understand where a piece of information came from. We use visual badges/tags to denote source:
- 🏢 **Official System:** (e.g., ICJS, e-Courts - future). Tagged with a gray "Government Source" badge.
- 👤 **Verified Human:** (e.g., PLV, Lawyer). Tagged with a green "Verified by PLV" badge.
- 🤖 **AI Advisory:** Tagged with a purple "AI Assessment" badge + mandatory disclaimer.
- ❓ **User Provided:** (e.g., unverified OCR, initial intake). Tagged with a yellow "Unverified" badge.

## 2. The Human Override Pattern
When a lawyer reviews an AI screening result:
- The original AI result is shown.
- The lawyer's action is recorded.
- **If Approved:** The family sees the result branded as "Reviewed by Lawyer".
- **If Overridden:** The family sees ONLY the lawyer's manual assessment. The underlying AI error is hidden from the family to prevent confusion, but retained in the audit log for Admin review.

## 3. Privacy & Sensitive Content Overlays
- **Lawyer/Admin Queue:** Case lists containing accused names and FIR numbers should blur or mask the names by default in dense table views, revealing them only on hover or click, to prevent shoulder-surfing in public legal aid offices.
- **Document Viewing:** When a user opens a sensitive document (like an FIR photo), a watermark of their user ID/timestamp is overlaid to discourage unauthorized screenshots.

## 4. Security Warnings
- If a user uploads a file flagged by malware scanning, the UI must immediately block the upload, turn red, and display a large, clear warning icon with plain text: "Upload Blocked: This file may contain a virus."

## 5. Consent Collection
- Consent checkboxes must NEVER be pre-checked.
- Consent text must be explicit: "I agree to share my case details with legal aid professionals to get assistance."
- A link to the plain-language Privacy Policy must be inline with the consent checkbox.
