# Urimai Kaavalan — Non-Functional Requirements

> **Phase:** 1 — PRD & Acceptance Criteria
> **Source:** 03-PRD/01_URIMAI_KAAVALAN_GOVERNMENT_PRD.pdf (§21, §22, §23, §24)
> **Note:** Where specific numeric targets are not stated in the PRD, they are labeled **[PROPOSED — requires validation]**.

---

## URM-NFR-001 — System Availability

| Attribute | Value |
|---|---|
| **ID** | URM-NFR-001 |
| **Priority** | P0 |
| **PRD Section** | §21 |
| **Status** | PROPOSED |

**Requirement:**
The platform must be available to family users and legal-aid professionals during reasonable access hours. A formal SLA must be defined before pilot.

**Proposed Target:** 99.5% monthly uptime during pilot hours. **[PROPOSED — requires validation]**

**Justification:** No specific SLA is stated in the PRD. 99.5% is a common government pilot service baseline. Exact target requires government/DLSA stakeholder agreement before Phase 15.

**Exceptions:**
- Scheduled maintenance windows (communicated in advance).
- External government system outages do not count against platform availability.

---

## URM-NFR-002 — API Response Performance

| Attribute | Value |
|---|---|
| **ID** | URM-NFR-002 |
| **Priority** | P0 |
| **PRD Section** | §21 |
| **Status** | PROPOSED |

**Requirements:**
- Standard page loads (case dashboard, search): ≤ 2 seconds at P95. **[PROPOSED]**
- AI legal assistant response: ≤ 10 seconds at P95 (RAG retrieval + generation). **[PROPOSED]**
- Document upload acknowledgement: ≤ 3 seconds. **[PROPOSED]**
- OCR extraction: asynchronous; family notified when complete.

**Low-Bandwidth Consideration:** Platform must remain functional on 2G/Edge connections for critical pages. Target page weight ≤ 200KB initial load for critical family-facing pages. **[PROPOSED]**

---

## URM-NFR-003 — Mobile-First Responsive Design

| Attribute | Value |
|---|---|
| **ID** | URM-NFR-003 |
| **Priority** | P0 |
| **PRD Section** | §23 |
| **Status** | CONFIRMED |

**Requirements:**
- All family-facing pages must be fully functional on mobile devices (Android primary, iOS secondary).
- Minimum viewport support: 360px width.
- All interactive elements minimum 44×44px touch target (PRD §8).
- No horizontal scrolling on any family-facing page.
- Large-text mode must not break layouts.

---

## URM-NFR-004 — Encryption in Transit

| Attribute | Value |
|---|---|
| **ID** | URM-NFR-004 |
| **Priority** | P0 |
| **PRD Section** | §21 |
| **Status** | CONFIRMED |

**Requirements:**
- All API traffic must use TLS 1.2 or higher.
- TLS 1.3 preferred.
- HTTP must redirect to HTTPS; no mixed-content pages.
- Certificate must be from a recognized CA; auto-renewal required.

---

## URM-NFR-005 — Encryption at Rest

| Attribute | Value |
|---|---|
| **ID** | URM-NFR-005 |
| **Priority** | P0 |
| **PRD Section** | §21 |
| **Status** | CONFIRMED |

**Requirements:**
- Database: encrypted at rest (AES-256 or equivalent). **[Cipher requires infrastructure validation]**
- Document storage: encrypted at rest.
- Encryption keys must be managed separately from data.
- Key rotation policy required before production.

---

## URM-NFR-006 — Scalability

| Attribute | Value |
|---|---|
| **ID** | URM-NFR-006 |
| **Priority** | P1 |
| **PRD Section** | §21 |
| **Status** | PROPOSED |

**Requirements:**
- System must handle concurrent users expected in pilot district without performance degradation.
- Proposed initial load target: 100 concurrent users during pilot. **[PROPOSED — requires capacity planning]**
- Architecture must support horizontal scaling for production.
- No single point of failure in production infrastructure.

---

## URM-NFR-007 — Disaster Recovery & Backup

| Attribute | Value |
|---|---|
| **ID** | URM-NFR-007 |
| **Priority** | P1 |
| **PRD Section** | §21 |
| **Status** | CONFIRMED |

**Requirements:**
- Daily automated database backups. **[Frequency: PROPOSED — daily minimum]**
- Backup retention period: minimum 30 days. **[PROPOSED — requires legal/policy review]**
- Recovery Time Objective (RTO): ≤ 4 hours. **[PROPOSED]**
- Recovery Point Objective (RPO): ≤ 24 hours. **[PROPOSED]**
- Backup integrity verification on a regular schedule.
- Disaster recovery procedure must be documented and tested before pilot.

---

## URM-NFR-008 — Observability & Monitoring

| Attribute | Value |
|---|---|
| **ID** | URM-NFR-008 |
| **Priority** | P1 |
| **PRD Section** | §21 |
| **Status** | PROPOSED |

**Requirements:**
- Structured application logging (not plain text).
- Error rate, latency, and availability metrics exposed to operations dashboard.
- Alerting on SLA breach thresholds.
- AI component-specific metrics: retrieval latency, citation validation pass/fail rate, abstention rate.
- Audit logs must be separate from operational logs and immutable.

---

## URM-NFR-009 — Data Retention Policy

| Attribute | Value |
|---|---|
| **ID** | URM-NFR-009 |
| **Priority** | P1 |
| **PRD Section** | §21 |
| **Status** | LEGAL-REVIEW |

**Requirement:** Data retention periods for case records, documents, audit logs, and voice sessions require **formal legal/security review** before implementation.

**PRD Statement:** "Production privacy, retention, consent/notice and data-sharing rules require formal legal/security review." (PRD §21)

**Phase 1 Action:** Identify retention categories; populate thresholds after legal review.

| Data Category | Proposed Retention | Review Required |
|---|---|---|
| Case records | Duration of case + TBD | LEGAL-REVIEW |
| Uploaded documents | Duration of case + TBD | LEGAL-REVIEW |
| Audit logs | Minimum 5 years | LEGAL-REVIEW |
| Voice session records | TBD | LEGAL-REVIEW |
| AI query logs | TBD | LEGAL-REVIEW |

---

## URM-NFR-010 — Rate Limiting & DDoS Protection

| Attribute | Value |
|---|---|
| **ID** | URM-NFR-010 |
| **Priority** | P0 |
| **PRD Section** | §21 |
| **Status** | CONFIRMED |

**Requirements:**
- API rate limiting on all endpoints.
- Search endpoint: stricter rate limiting to prevent case enumeration attacks.
- Authentication endpoint: account lockout after repeated failure. **[Threshold: PROPOSED]**
- Voice/IVR channel: per-caller rate limiting.

---

## URM-NFR-011 — Malware Scanning

| Attribute | Value |
|---|---|
| **ID** | URM-NFR-011 |
| **Priority** | P0 |
| **PRD Section** | §21 |
| **Status** | CONFIRMED |

**Requirements:**
- All uploaded files scanned for malware before processing and storage.
- Scan must complete before OCR pipeline begins.
- Infected files: quarantined; user notified; audit event logged; case record not updated.
- Scanning service: provider-agnostic; integrated via adapter.

---

## URM-NFR-012 — Accessibility — WCAG 2.1 AA

| Attribute | Value |
|---|---|
| **ID** | URM-NFR-012 |
| **Priority** | P0 |
| **PRD Section** | §23 |
| **Status** | CONFIRMED |

**Requirements:**
- Minimum WCAG 2.1 Level AA compliance across all user-facing pages.
- Automated accessibility testing in CI pipeline.
- Manual accessibility audit by screen-reader testing before each major release.
- See ACCESSIBILITY_REQUIREMENTS.md for full specification.

---

## URM-NFR-013 — Low-Bandwidth Support

| Attribute | Value |
|---|---|
| **ID** | URM-NFR-013 |
| **Priority** | P0 |
| **PRD Section** | §23 |
| **Status** | CONFIRMED |

**Requirements:**
- Critical family pages (landing, case search, case status) must load on 2G/EDGE connections.
- Progressive image loading; text content loads before images.
- No mandatory video autoplay.
- Offline-aware error handling: clear message when connection lost.

---

## URM-NFR-014 — Multilingual Rendering

| Attribute | Value |
|---|---|
| **ID** | URM-NFR-014 |
| **Priority** | P0 |
| **PRD Section** | §23 |
| **Status** | CONFIRMED |

**Requirements:**
- RTL layout not required at launch (Tamil / English are LTR).
- Unicode compliance throughout; no character encoding issues.
- Tamil font (Noto Sans Tamil or equivalent) loaded with appropriate fallbacks.
- Font loading must not block page render on slow connections.

---

## URM-NFR-015 — Legal Rules/Code Separation

| Attribute | Value |
|---|---|
| **ID** | URM-NFR-015 |
| **Priority** | P0 |
| **PRD Section** | §13 |
| **Status** | CONFIRMED |

**Requirement:**
Legal rules must be stored in a dedicated, versioned rule store — completely separate from UI code, backend business logic, and AI model weights. No legal rule may be hard-coded in application source.

---

## URM-NFR-016 — Maintainability

| Attribute | Value |
|---|---|
| **ID** | URM-NFR-016 |
| **Priority** | P1 |
| **PRD Section** | §24 |
| **Status** | PROPOSED |

**Requirements:**
- All services must be independently deployable.
- API versioning strategy required from Phase 3.
- Provider-agnostic interfaces for LLM and OCR (PRD §24) — no direct vendor SDK in business logic.
- Dependency updates must not break legal rule versioning.
