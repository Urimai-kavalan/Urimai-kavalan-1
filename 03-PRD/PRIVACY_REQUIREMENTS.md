# Urimai Kaavalan — Privacy Requirements

> **Phase:** 1 — PRD & Acceptance Criteria
> **Source:** 03-PRD/01_URIMAI_KAAVALAN_GOVERNMENT_PRD.pdf (§21, §19, §8)

---

## Core Privacy Principles

Urimai Kaavalan handles highly sensitive data related to legal cases, individuals in custody, and family members. Data minimization, strict access controls, and transparent usage are foundational.

---

## URM-PRIV-001 — Data Minimization & Consent

**Priority:** P0 | **PRD Section:** §21 | **Status:** CONFIRMED

### Requirements
- The system must only collect data strictly necessary for case tracking, legal-aid routing, and notification purposes.
- Explicit consent must be obtained from the family user during case intake for data storage and processing.
- Voice channel users must receive a brief consent prompt before sensitive case details are discussed.
- Consent text must be drafted in plain language and approved by legal review.

---

## URM-PRIV-002 — PII (Personally Identifiable Information) Protection

**Priority:** P0 | **PRD Section:** §19, §21 | **Status:** CONFIRMED

### Requirements
- Sensitive fields must be encrypted at rest and in transit. This includes:
  - Accused person's name and DOB
  - Family contact details (phone, email)
  - Lawyer contact details and bar numbers
  - Document extraction values (e.g., names extracted from FIRs)
- PII must not be exposed in URLs (e.g., no `?phone=12345` in query parameters).

---

## URM-PRIV-003 — Document Privacy

**Priority:** P0 | **PRD Section:** §21 | **Status:** CONFIRMED

### Requirements
- Uploaded legal documents (FIRs, orders) must be stored in private object storage.
- Documents are never public.
- Access to a document requires an authenticated session with appropriate RBAC permissions (Family owning the case, assigned Lawyer, or assigned PLV).
- Access to documents must use time-limited, signed URLs to prevent direct hotlinking or exposure.

---

## URM-PRIV-004 — Data Isolation (Multi-Tenancy Privacy)

**Priority:** P0 | **PRD Section:** §21 | **Status:** CONFIRMED

### Requirements
- Family users must absolutely not be able to view cases, documents, or notifications belonging to other families.
- DLSA officers are restricted to viewing cases within their assigned district jurisdiction.
- Lawyers only see cases explicitly assigned to them.
- Any attempt to access unauthorized cross-tenant data must result in a 403 Forbidden error and be logged as a security event.

---

## URM-PRIV-005 — Anonymization for AI / RAG Processing

**Priority:** P1 | **PRD Section:** §12, §21 | **Status:** PROPOSED

### Requirements
- When case facts are sent to the LLM (adapter) for screening or answering questions, direct PII (accused name, family contact) must be masked or excluded from the prompt payload if the LLM provider is external.
- The system should rely on non-identifying facts (dates, sections, durations) for legal screening.
- **[GOV-APPROVAL]** If an external LLM provider is used in production, strict data processing agreements guaranteeing no training on user data must be in place.

---

## URM-PRIV-006 — Voice Session Privacy

**Priority:** P1 | **PRD Section:** §22 | **Status:** CONFIRMED

### Requirements
- Full call audio recordings and full transcripts must NOT be stored permanently unless explicitly legally mandated and consented to.
- The `voice_sessions` log must store a hashed version of the caller's phone number, not the raw number.
- Any legal information delivered via voice is logged by topic/reference ID, not by storing the raw transcript.

---

## URM-PRIV-007 — Data Retention and Purging

**Priority:** P1 | **PRD Section:** §21 | **Status:** LEGAL-REVIEW

### Requirements
- A formal data retention policy must be defined before production deployment (see URM-NFR-009).
- The system must support the ability to purge/delete a family's case data and documents upon verified request or upon reaching the end of the legal retention period.
- Audit logs regarding the *deletion* of data must be retained (e.g., "Case 12345 deleted by user request on [Date]"), but the sensitive payload must be wiped.

---

## URM-PRIV-008 — Synthetic Data in Development

**Priority:** P0 | **PRD Section:** §21 | **Status:** CONFIRMED

### Requirements
- **NO REAL CITIZEN DATA** may be used in development, staging, or testing environments.
- All development databases must be seeded with purely synthetic, fictional case records.
- Developers must not have access to production databases containing real PII.
