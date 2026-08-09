# Urimai Kaavalan — Integration Requirements

> **Phase:** 1 — PRD & Acceptance Criteria
> **Source:** 03-PRD/01_URIMAI_KAAVALAN_GOVERNMENT_PRD.pdf (§18 — Integration Strategy)

---

## Integration Principle

> **No unofficial scrapers. No fabricated government APIs. Official access only.**

Urimai Kaavalan must use an adapter architecture. Government system connectors are implemented ONLY when official access is formally authorized. Manual verified entry is the fallback for all integrations during development and pilot.

---

## URM-INT-001 — Adapter Architecture Pattern

**Priority:** P0 | **PRD Section:** §18 | **Status:** CONFIRMED

### Architecture
```
Core Case Service
  ↓
Integration Interface (Adapter Contract)
  ↓
Connector Implementations:
  - ICJS Connector (placeholder — GOV-APPROVAL required)
  - e-Courts Connector (placeholder — GOV-APPROVAL required)
  - Prison Connector (placeholder — GOV-APPROVAL required)
  - DLSA/Legal-Aid Connector (proposed)
  - Manual Entry Fallback (always available)
```

### Requirements
- Each connector must implement a standard Integration Interface contract.
- Business logic must not know which connector is active — it calls the interface only.
- Connectors can be switched, added, or disabled without changes to core business logic.
- During development and pilot: all connectors default to Manual Entry Fallback.

---

## URM-INT-002 — No Unofficial Government Scrapers

**Priority:** P0 | **PRD Section:** §18 | **Status:** CONFIRMED

### Requirement
The system must NOT implement any web scraping of:
- NJDG / e-Courts public portal
- e-Prisons portal
- ICJS data systems
- Any government database or portal

This is a non-negotiable governance requirement.

**Permitted:** Use of publicly available, officially documented APIs or data feeds when terms of service permit and government approval is obtained.

---

## URM-INT-003 — Stable CaseRecord Contract

**Priority:** P0 | **PRD Section:** §18 | **Status:** CONFIRMED

### Contract Definition (Phase 1 Specification)

```typescript
// CaseRecord — stable integration contract
interface CaseRecord {
  platformCaseId: string;       // Platform-generated ID (not CNR)
  cnrNumber?: string;           // Judicial CNR — optional; from verified source only
  firNumber?: string;           // FIR number — optional; may be incomplete
  accusedName: string;          // Encrypted in transit and at rest
  policeStation: string;
  districtId: string;
  status: CaseStatus;
  createdAt: ISO8601DateTime;
  updatedAt: ISO8601DateTime;
  dataSource: 'MANUAL' | 'ICJS' | 'ECOURTS' | 'VERIFIED_ENTRY';
  verificationStatus: 'UNVERIFIED' | 'PLV_VERIFIED' | 'OFFICIAL';
}
```

**Business Rule:** `dataSource` must always be recorded — the system must never present unverified data as official.

---

## URM-INT-004 — Stable CustodyRecord Contract

**Priority:** P1 | **PRD Section:** §18 | **Status:** CONFIRMED

```typescript
// CustodyRecord — stable integration contract
interface CustodyRecord {
  platformCaseId: string;
  facilityId: string;
  facilityName: string;
  custodyStatus: 'IN_CUSTODY' | 'TRANSFERRED' | 'RELEASED' | 'UNKNOWN';
  confirmedAt?: ISO8601DateTime;
  confirmedByRole: 'PRISON_OFFICER' | 'MANUAL_ENTRY' | 'SYSTEM';
  isAdvisoryOnly: true;   // Always true — this is never an official government record
}
```

---

## URM-INT-005 — Stable CourtRecord Contract

**Priority:** P1 | **PRD Section:** §18 | **Status:** CONFIRMED

```typescript
// CourtRecord — stable integration contract
interface CourtRecord {
  platformCaseId: string;
  cnrNumber?: string;
  courtName: string;
  districtId: string;
  nextHearingDate?: ISO8601Date;
  caseType?: string;
  currentStage?: string;
  dataSource: 'MANUAL' | 'ECOURTS_API' | 'VERIFIED_ENTRY';
  dataAsOf: ISO8601DateTime;
}
```

---

## URM-INT-006 — Stable LegalAidRequest Contract

**Priority:** P0 | **PRD Section:** §18 | **Status:** CONFIRMED

```typescript
// LegalAidRequest — stable integration contract
interface LegalAidRequest {
  requestId: string;
  platformCaseId: string;
  familyId: string;
  districtId: string;
  languagePreference: LanguageCode;
  caseCategory?: string;
  requestDate: ISO8601DateTime;
  urgencyLevel: 'STANDARD' | 'PRIORITY' | 'URGENT';
  status: LegalAidStatus;
  assignedLawyerId?: string;    // Only when assigned
  slaDeadline?: ISO8601DateTime;
}
```

---

## URM-INT-007 — Stable CaseEvent Contract

**Priority:** P0 | **PRD Section:** §18 | **Status:** CONFIRMED

```typescript
// CaseEvent — stable audit/integration contract
interface CaseEvent {
  eventId: string;
  platformCaseId: string;
  eventType: CaseEventType;
  actorRole: UserRole;
  actorId: string;              // Hashed for privacy in cross-system events
  timestamp: ISO8601DateTime;
  source: string;               // Module or service that generated the event
  metadata: Record<string, unknown>;  // Event-specific data
}
```

---

## URM-INT-008 — Integration Failure Visibility

**Priority:** P0 | **PRD Section:** §18 | **Status:** CONFIRMED

### Requirements
- When any integration connector returns an error or timeout, it must be logged in `integration_records`.
- Failed integrations must NOT silently update or corrupt case records.
- The system must present a clear, human-readable status when integration data is unavailable:
  - Family view: *"Case information from [system] is not currently available. Your case details are shown based on verified entries."*
  - Admin/DLSA view: Integration health dashboard showing connector status.
- Integration failures must trigger an alert to the system admin.
- Integration error rate is an operational metric monitored in the admin dashboard.

---

## URM-INT-009 — ICJS Connector (Placeholder)

**Priority:** P3 | **PRD Section:** §18 | **Status:** GOV-APPROVAL

### Status
- Not implemented in development or pilot.
- Placeholder connector stub created (returns MANUAL fallback).
- Official implementation requires:
  1. Ministry of Home Affairs / ICJS formal API documentation.
  2. Signed data-sharing agreement.
  3. Security review of data-in-transit requirements.
  4. Government approval of data usage scope.

---

## URM-INT-010 — e-Courts Connector (Placeholder)

**Priority:** P3 | **PRD Section:** §18 | **Status:** GOV-APPROVAL

### Status
- Not implemented in development or pilot.
- Public NJDG data is accessible; however, integration requires:
  1. Review of e-Courts/NJDG API terms of service.
  2. Formal authorization for programmatic access.
  3. Legal review of data re-presentation rules.

---

## URM-INT-011 — Prison Connector (Placeholder)

**Priority:** P2 | **PRD Section:** §18 | **Status:** GOV-APPROVAL

### Status
- Prison-side confirmation is implemented via the manual human confirmation workflow (Module O).
- Automated connector to e-Prisons system is a future capability requiring formal authorization.
- Placeholder connector uses the `prison_confirmations` table with human officer response.

---

## URM-INT-012 — DLSA / Legal-Aid Connector

**Priority:** P1 | **PRD Section:** §18 | **Status:** PROPOSED

### Status
- DLSA workflow is implemented natively within the platform (Module N).
- This connector covers potential future integration with NALSA/SLSA digital systems.
- Current implementation: DLSA officers use the platform directly (no external system integration).
- Future: NALSA systems integration subject to formal approval.

---

## URM-INT-013 — Manual Verified Entry Fallback

**Priority:** P0 | **PRD Section:** §18 | **Status:** CONFIRMED

### Requirements
- For every integration that is unavailable (ICJS, e-Courts, Prison), the platform must support manual verified entry.
- Manual entry fields are clearly labeled: "Entered manually by [role] — not from an official government system."
- Manual entries have `verification_status = PLV_VERIFIED` or `MANUAL` — never `OFFICIAL`.
- Manual entry is the default mode for all integrations during development and pilot phases.

---

## Integration Governance

| Connector | Available In | Requires |
|---|---|---|
| Manual Entry Fallback | All phases | Nothing |
| DLSA Portal (native) | Pilot | DLSA officer onboarding |
| e-Courts API | Post-pilot | GOV-APPROVAL + legal review |
| ICJS | Post-pilot | GOV-APPROVAL + MHA authorization |
| e-Prisons | Post-pilot | GOV-APPROVAL + state prison dept |
| NALSA Systems | Future | GOV-APPROVAL + NALSA agreement |

---

## Integration Data Flow Diagram

```
[Family / PLV / DLSA] → Platform Core Services
                              ↓
                    Integration Interface
                    ┌─────────┬─────────┬──────────┐
                    ↓         ↓         ↓          ↓
              Manual      ICJS stub  e-Courts   Prison
              Entry       (Phase 3)  stub       human
              (always)    (future)   (future)   confirm
```
