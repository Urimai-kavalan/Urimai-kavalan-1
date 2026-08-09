# Urimai Kaavalan — Document UX

> **Phase:** 2 — UI/UX Design System and User Experience
> **Context:** Uploading, processing, and viewing legal documents.

---

## 1. Upload Flow
- **Trigger:** Clear "Upload Document" CTA on Dashboard or Document Center.
- **Mobile Optimized:** Tapping upload must invoke the native camera / photo gallery picker, as most users will take photos of paper FIRs.
- **Guidance:** Show brief instructions before camera opens (e.g., "Place document on a flat surface. Ensure good lighting.").

## 2. Processing States
- **Uploading:** Progress bar indicating network transfer.
- **Analyzing (OCR):** "Reading document... this takes a few moments." (Use skeleton loader or analyzing animation).
- **Verification Required:** Document is flagged yellow. "Please wait for a PLV to verify the details."

## 3. Document Viewer (Gallery)
- **Thumbnail Grid:** Documents displayed as cards with a preview thumbnail.
- **Card Data:** Document Type (e.g., "FIR"), Upload Date, Verification Status Badge.
- **Full-Screen Viewer:** Clicking a document opens it in a full-screen modal with pinch-to-zoom capabilities.

## 4. Failed/Rejected Documents
- If OCR fails entirely (illegible) or a PLV rejects it (wrong document type):
- Visual: Red error badge on the document card.
- Message: "We couldn't read this document. It might be blurry."
- CTA: "Upload Again" button displayed prominently next to the error.

## 5. Security & Privacy Overlay
- When viewing sensitive documents (like FIRs) in the Professional or Admin portals, a watermark (Viewer's ID/Timestamp) is overlaid on the image to deter unauthorized screenshotting/sharing.
- Download buttons must be explicitly tracked in the audit log.
