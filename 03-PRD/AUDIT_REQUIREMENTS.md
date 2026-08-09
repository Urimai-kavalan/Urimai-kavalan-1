# Urimai Kaavalan — Audit Requirements

> **Phase:** 1 — PRD & Acceptance Criteria
> **Source:** 03-PRD/01_URIMAI_KAAVALAN_GOVERNMENT_PRD.pdf (§15, §21, §10, §19)

---

## Audit Principles

The platform's credibility depends on transparency and accountability. Every critical action, AI assessment, human override, and data access must be securely logged and reviewable.

---

## URM-AUD-001 — Immutable Audit Log

**Priority:** P0 | **PRD Section:** §21, §19 | **Status:** CONFIRMED

### Requirements
- The `audit_logs` data store must be append-only.
- No user role, including System Admin, may modify, alter, or delete existing audit log entries via the application.
- Direct database deletion of audit logs must be prevented via database-level restrictions where possible.

---

## URM-AUD-002 — Standardized Log Structure

**Priority:** P0 | **PRD Section:** §10, §18, §19 | **Status:** CONFIRMED

### Requirements
Every audit event (`case_events`, `audit_logs`) must capture a consistent set of fields:
- **Event ID:** Unique identifier for the log entry.
- **Timestamp:** ISO8601 UTC timestamp of the action.
- **Actor:** The role and hashed ID (or identifier) of the user performing the action.
- **Action/Event Type:** Standardized string (e.g., `case_created`, `document_uploaded`, `human_review_completed`).
- **Resource/Target:** The ID of the entity being acted upon (e.g., case_id, document_id).
- **Source:** The module or interface originating the action (e.g., Web, IVR, API).
- **Metadata:** Additional context (e.g., override reason, field changes) stored in a structured format (JSON).

---

## URM-AUD-003 — AI and Human Review Auditing

**Priority:** P0 | **PRD Section:** §15, §14 | **Status:** CONFIRMED

### Requirements
- Every execution of the AI eligibility screening engine must be logged, including the rule version applied, facts detected, and the resulting signal and confidence band.
- Every human review of an AI signal must be logged (`human_reviews`).
- If a human overrides an AI signal (`human_overrides`), the log MUST capture the mandatory override reason.
- AI-human disagreements must never be hidden or scrubbed from the audit trail.

---

## URM-AUD-004 — Security and Access Logging

**Priority:** P0 | **PRD Section:** §21 | **Status:** CONFIRMED

### Requirements
- The following security events must be logged:
  - Successful logins
  - Failed login attempts
  - Account lockouts
  - Password resets or credential changes
  - Access to sensitive case data by administrative or DLSA roles (viewing cases)
  - Unauthorized access attempts (403 Forbidden errors)
  - Role assignment or permission changes by System Admin
  - Document uploads flagged for malware

---

## URM-AUD-005 — Case History (Timeline)

**Priority:** P1 | **PRD Section:** §10 | **Status:** CONFIRMED

### Requirements
- A subset of operational audit events (`case_events`) drives the family and lawyer-facing Case Timeline.
- The timeline must show chronological events: intake, document upload, extraction verification, AI screening, lawyer assignment, and case resolution.
- For privacy, the timeline must display the *role* of the actor (e.g., "Verified by PLV", "Reviewed by Lawyer") rather than personal names in the family view.

---

## URM-AUD-006 — Audit Data Access

**Priority:** P0 | **PRD Section:** §5, §21 | **Status:** CONFIRMED

### Requirements
- The full security audit log is restricted to the System Admin / Auditor roles.
- The AI disagreements and rule evaluation logs are restricted to the Legal Reviewer and System Admin roles.
- The DLSA Officer may view operational case history within their jurisdiction but cannot view underlying security logs or system admin actions.
- Audit data export requires explicit authorization and must be logged as an audit event itself.
