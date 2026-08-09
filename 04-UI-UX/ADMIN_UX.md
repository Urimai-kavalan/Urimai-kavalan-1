# Urimai Kaavalan — Admin UX

> **Phase:** 2 — UI/UX Design System and User Experience
> **Target Roles:** DLSA/SLSA Officer, System Admin, Legal Reviewer

---

## 1. UX Goals
- **Oversight and Bottleneck Resolution:** Admins need a macroscopic view to see where the system is failing (e.g., unassigned cases, SLA breaches).
- **Auditability:** Every action taken in the admin interface must feel deliberate and traceable.
- **Resource Management:** Easy matching of supply (lawyers) to demand (cases).

## 2. Key Interfaces (Desktop only)

### 2.1 Queue & Triage Management (PRO-06)
- **Data Table:** Highly filterable and sortable (by Urgency, Days in Queue, Case Type).
- **Assignment Split View:** When clicking "Assign" on a request:
  - Left: Case details and language/location requirements.
  - Right: List of suggested lawyers, ranked by match score (Location + Language + Caseload).
  - "Assign" action requires a confirmation modal to prevent misclicks.

### 2.2 Legal Source Management (Legal Reviewer) (ADM-04)
- **Review Queue:** List of pending legal sources or rule versions awaiting approval.
- **Diff Viewer:** Visual comparison (red/green highlights) between the old rule version and the proposed new rule version.
- **Approval Flow:** Requires explicit clicking of a checkbox ("I verify this reflects current law") before the "Approve" button enables.

### 2.3 System Audit Log (ADM-03)
- **Code-like Interface:** Log entries displayed in a dense, monospace, terminal-like UI to emphasize immutability and technical truth.
- **Advanced Filtering:** By date range, actor ID, case ID, event type.
- **Export:** Secure export to CSV/JSON, triggering its own audit event.

## 3. Error and Escalation Handling
- Admins receive visual alerts (e.g., toast notifications or persistent banner alerts) when a systemic error occurs (e.g., "Notification Gateway Down - SMS delivery paused").
- SLA breaches are highlighted in red across all dashboard and table views.
