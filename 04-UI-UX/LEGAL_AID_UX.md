# Urimai Kaavalan — Legal-Aid UX

> **Phase:** 2 — UI/UX Design System and User Experience
> **Target Roles:** Legal-Aid Lawyer, Para-Legal Volunteer (PLV)

---

## 1. UX Goals
- **Efficiency:** Professionals manage high caseloads. The UI must facilitate rapid scanning, quick triage, and fast data entry.
- **Information Density:** Unlike the citizen view, the professional view can be dense, utilizing data tables and split panes on desktop/tablet.
- **Clarity of Source:** Professionals must instantly know if a fact is from OCR (unverified), human entry (verified), or AI inference.

## 2. Key Interfaces (Desktop / Tablet primary)

### 2.1 The Professional Dashboard (PRO-01)
- **Top Metrics:** Active Cases, SLA Warnings (e.g., "3 cases breaching SLA in 24h").
- **Task List:** A prioritized list of required actions, not just a list of cases. (e.g., "Review AI screening for Case #1234", "Verify FIR for Case #5678").

### 2.2 Case Detail View (PRO-03)
- **Split Pane Layout:** 
  - Left pane: Permanent context (Case details, current status, assigned personnel).
  - Right pane: Tabbed workspace (Timeline, Documents, AI Brief, Case Notes).
- **AI Brief Tab:** 
  - Must highlight exactly which statutory criteria were matched.
  - Must provide direct links to the approved legal source text.
  - Prominent "Agree" / "Override" floating action bar at the bottom.

### 2.3 OCR Verification Interface (PRO-04)
- Highly optimized for speed.
- Focus jumps automatically to the first LOW confidence field.
- Keyboard shortcuts supported (e.g., `Tab` to next field, `Enter` to approve, `Esc` to flag as unreadable).

## 3. Human-in-the-Loop Overrides
- When a lawyer overrides an AI signal, the required "Reason" textarea must be immediately focused.
- Provide quick-select chips for common override reasons (e.g., "Statutory limit not met", "Facts misinterpreted by AI") to speed up data entry, alongside a free-text option.

## 4. Mobile Capabilities for PLVs
While lawyers may use desktops, PLVs are in the field.
- The PLV mobile UI must focus heavily on **Document Capture** (camera integration, auto-cropping) and **Offline-tolerant form entry** (saving drafts locally if the connection drops in a rural area or prison waiting room).
