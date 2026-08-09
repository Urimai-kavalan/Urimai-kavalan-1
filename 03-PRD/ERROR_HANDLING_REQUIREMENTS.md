# Urimai Kaavalan — Error Handling Requirements

> **Phase:** 1 — PRD & Acceptance Criteria
> **Source:** 03-PRD/01_URIMAI_KAAVALAN_GOVERNMENT_PRD.pdf (§8, §18, §21, §22)

---

## Error Handling Principles

Error handling in Urimai Kaavalan must be user-centric. Families already face significant stress; cryptic technical errors exacerbate this. All errors must be handled gracefully, communicated in plain language, and offer clear recovery paths.

---

## URM-ERR-001 — Plain Language Error Messages

**Priority:** P0 | **PRD Section:** §8 | **Status:** CONFIRMED

### Requirements
- Technical error codes (e.g., 500, 404, Database Connection Failed) must NEVER be exposed to the Family User or PLV.
- Errors must be translated into plain language in the user's selected language.
- Every error message must include a "Next Step" or recovery action.
- *Example:* Instead of "API Timeout", display: "We couldn't reach the server right now. Please try again in a few minutes, or call support."

---

## URM-ERR-002 — Integration Failure Handling

**Priority:** P0 | **PRD Section:** §18 | **Status:** CONFIRMED

### Requirements
- The platform uses an adapter architecture (URM-INT-001). If a downstream government system (e.g., ICJS, e-Courts) is unreachable or returns an error, it must NOT crash the platform.
- Integration failures must degrade gracefully:
  - The UI must indicate that data from that specific source is currently unavailable.
  - The system must fall back to the last known verified state or manual entry.
- Integration errors must be logged internally in `integration_records` with full technical detail for administrators.

---

## URM-ERR-003 — AI / LLM Failure Handling

**Priority:** P0 | **PRD Section:** §12 | **Status:** PROPOSED

### Requirements
- If the LLM provider times out or returns an error during a RAG query or screening task, the system must handle it without exposing the provider's raw error.
- The user must see: "Our legal assistant is temporarily unavailable. Please try your question again later, or contact a PLV."
- AI failures must be logged in the operational audit trail.

---

## URM-ERR-004 — Form Validation and Data Preservation

**Priority:** P0 | **PRD Section:** §8 | **Status:** PROPOSED

### Requirements
- If a form submission fails (e.g., due to network loss or server error), the user's entered data MUST NOT be cleared.
- Client-side validation must catch common errors (e.g., incomplete required fields) before submission.
- Server-side validation errors must be mapped back to the specific fields in the UI.

---

## URM-ERR-005 — Voice/IVR Error Recovery

**Priority:** P1 | **PRD Section:** §22 | **Status:** CONFIRMED

### Requirements
- If Speech-to-Text (STT) fails to understand the caller, it must prompt them to try again.
- After two STT failures, the system must automatically switch to DTMF (keypad) input.
- If the backend case service is unavailable during a call, the IVR must play a localized maintenance message and offer to connect the caller to a human agent.

---

## URM-ERR-006 — Security and Authorization Errors

**Priority:** P0 | **PRD Section:** §21 | **Status:** CONFIRMED

### Requirements
- Unauthorized access attempts (e.g., a family user trying to view another family's case) must return a generic "Access Denied" message. It must not confirm whether the requested resource exists (to prevent enumeration).
- All such attempts must be logged in the security audit trail.
