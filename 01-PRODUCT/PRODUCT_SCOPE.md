# Urimai Kaavalan — Product Scope

> **Source:** 03-PRD/01_URIMAI_KAAVALAN_GOVERNMENT_PRD.pdf (Sections 6, 17, 18)
> **Phase:** 0 — Governance & Research

---

## Five Interfaces

*(Source: PRD Section 6 — Product Scope)*

### 1. Family Portal
- Landing, onboarding, case search
- Case dashboard and timeline
- Document upload and management
- Legal screening results (explainable, advisory)
- Rights library
- Legal-aid request and status
- Notifications
- Voice help integration

### 2. Legal-Aid Portal
- Case queue management
- Case assignment
- AI-generated brief (citation-backed)
- Verified legal sources
- Task management
- SLA monitoring
- Case resolution recording

### 3. Government/Admin Portal
- District and state analytics
- Queue management and allocation
- Escalation management
- URC-ready export
- AI audit center

### 4. Prison-side Channel
- Restricted confirmation of custody status
- Transfer confirmation
- Arrest fact confirmation
- Release-related fact confirmation
- No write access to case data

### 5. Voice/IVR Layer
- Feature-phone-friendly call flow
- Language selection
- Speech-to-text and text-to-speech architecture
- Same backend case and legal services as web
- Low-literacy prompts
- Fallback to PLV/human support when confidence is low

---

## Differentiating / New Modules

*(Source: PRD Section 17)*

- Family-side literacy nudges (contextual rights explanations)
- Surety/bail-bond navigator using verified support resources
- Prison-side confirmation channel
- Post-release reintegration hooks
- URC-ready export and triage support
- Legal-source change management
- Document comparison / 'what changed?' feature
- Action-oriented 'What do I do next?' guidance

---

## Scope Boundary

### IN SCOPE

| Area | Description |
|---|---|
| Family access | Portal, voice, onboarding |
| Case understanding | Status, timeline, plain-language explanation |
| Document management | Upload, OCR, extraction, verification |
| Legal knowledge retrieval | Approved-source RAG, citation-backed |
| Explainable screening | Rule-based eligibility signal, not decision |
| Human legal review | Reviewer workflow, override, audit |
| Legal-aid routing | Lawyer/PLV matching, assignment, SLA |
| Notifications | Case updates, alerts, hearing reminders |
| Voice/IVR architecture | Feature-phone support, STT/TTS |
| Admin/government workflows | Analytics, queue, URC export |
| Prison-side confirmation | Restricted fact-check channel |
| Security & audit | RBAC, encryption, audit logs |
| Pilot governance | One state, tightly scoped district pilot |

### OUT OF SCOPE

| Item | Reason |
|---|---|
| AI judge | Core principle violation |
| Autonomous bail decision | Core principle violation |
| Replacement for lawyers | Core principle violation |
| Replacement for courts | Core principle violation |
| Replacement for ICJS/e-Prisons/e-Courts | PRD explicit exclusion |
| Unofficial government scraping | PRD Section 18 explicit prohibition |
| Unsupported legal advice | PRD abstention requirement |
| Fabricated government integrations | PRD explicit prohibition |
| Autonomous consequential decisions | Human-in-the-loop requirement |
| Production real citizen data (Phase 0) | PRD Section 21: synthetic data only during development |

---

## Integration Scope

*(Source: PRD Section 18 — Integration Strategy)*

- Adapter architecture: Core Case Service → Integration Interface → connectors
- Official access only — no unofficial scrapers
- Documented APIs, approved data-sharing mechanisms, or manual verified entry
- Stable data contracts: CaseRecord, CustodyRecord, CourtRecord, LegalAidRequest, CaseEvent
- Integration failures must be visible and auditable

---

## Phased Implementation Plan

*(Source: PRD Section 26)*

| Phase | Deliverables |
|---|---|
| 0 | Governance & research, stakeholders, legal review, existing-system map, scope, risks |
| 1 | PRD & acceptance criteria, roles, user stories, non-functional requirements |
| 2 | UI/UX: Figma/design system, mobile-first flows, accessibility, prototype testing |
| 3 | Foundation: workspace, auth, RBAC, database, API skeleton, logging |
| 4 | Case engine: creation/search, timeline, documents, notifications |
| 5 | Document AI: upload, OCR, extraction, verification |
| 6 | Legal knowledge: approved source registry, versioning, indexing, retrieval |
| 7 | Rule engine: versioned legal rules, screening signals, explainability, human review |
| 8 | Legal RAG: retrieval, citations, abstention, guardrails, evaluation |
| 9 | Legal-aid routing: lawyer/PLV registry, matching, assignment, SLA, escalation |
| 10 | Voice: IVR-ready flow, STT/TTS, language, fallback |
| 11 | Admin/government: dashboards, analytics, URC-ready export, audit center |
| 12 | Prison channel: restricted custody/transfer/release confirmation |
| 13 | Security: threat model, access control, secure files, privacy, audit |
| 14 | Testing: unit, integration, API, RAG, rule, accessibility, performance, security |
| 15 | Pilot: single district/state controlled pilot, training, governance, KPI measurement |
| 16 | Scale readiness: interoperability, operations, support, disaster recovery |
