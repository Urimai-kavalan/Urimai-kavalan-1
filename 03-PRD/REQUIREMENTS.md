# Urimai Kaavalan — Requirements Master Index

> **Phase:** 1 — PRD & Acceptance Criteria
> **Source:** 03-PRD/01_URIMAI_KAAVALAN_GOVERNMENT_PRD.pdf (all sections)
> **Status:** Phase 1 Freeze

---

## ID Scheme

| Prefix | Domain |
|---|---|
| URM-FR-XXX | Functional Requirements |
| URM-NFR-XXX | Non-Functional Requirements |
| URM-AI-XXX | AI / RAG Requirements |
| URM-SEC-XXX | Security Requirements |
| URM-PRIV-XXX | Privacy Requirements |
| URM-VOICE-XXX | Voice / IVR Requirements |
| URM-INT-XXX | Integration Requirements |
| URM-ACC-XXX | Accessibility Requirements |
| URM-AUD-XXX | Audit Requirements |
| URM-NOT-XXX | Notification Requirements |
| URM-DATA-XXX | Data Requirements |
| URM-ROLE-XXX | Role / Permission Requirements |
| URM-ERR-XXX | Error Handling Requirements |
| URM-US-XXX | User Stories |
| URM-AC-XXX | Acceptance Criteria |

---

## Requirement Status Codes

| Code | Meaning |
|---|---|
| CONFIRMED | Explicitly stated in source PRD |
| PROPOSED | Derived logically from PRD; requires validation |
| ASSUMPTION | Not in PRD; recorded as assumption |
| LEGAL-REVIEW | Requires legal authority validation |
| GOV-APPROVAL | Requires government approval before implementation |
| PILOT-ONLY | Applicable to pilot phase only |
| FUTURE | Post-pilot or production only |

---

## Priority Codes

| Code | Meaning |
|---|---|
| P0 | Critical — MVP blocker |
| P1 | High — required for pilot |
| P2 | Medium — desirable for pilot |
| P3 | Future / post-pilot |

---

## Functional Requirements Summary

| ID | Name | Priority | PRD Section | Status |
|---|---|---|---|---|
| URM-FR-001 | Public Landing Page | P0 | §8 | CONFIRMED |
| URM-FR-002 | Citizen / Family Onboarding & Intake | P0 | §7, §8 | CONFIRMED |
| URM-FR-003 | Case Search | P0 | §8 | CONFIRMED |
| URM-FR-004 | Case Dashboard & Status | P0 | §8, §10 | CONFIRMED |
| URM-FR-005 | Document Upload & Management | P0 | §8, §11 | CONFIRMED |
| URM-FR-006 | Document Intelligence & OCR Extraction | P0 | §11 | CONFIRMED |
| URM-FR-007 | Bail Information Display | P0 | §8 | CONFIRMED |
| URM-FR-008 | Eligibility / Screening Engine (Rule-Based) | P0 | §13, §14 | CONFIRMED |
| URM-FR-009 | Default Bail Information & Statutory Thresholds | P1 | §13 | CONFIRMED |
| URM-FR-010 | Legal Rights / Legal Literacy Library | P0 | §8 | CONFIRMED |
| URM-FR-011 | AI Legal Information Assistant | P1 | §12 | CONFIRMED |
| URM-FR-012 | Citation-Grounded Legal RAG | P1 | §12 | CONFIRMED |
| URM-FR-013 | Legal Aid Application & Request | P0 | §9 | CONFIRMED |
| URM-FR-014 | Lawyer / PLV Matching & Assignment | P0 | §9 | CONFIRMED |
| URM-FR-015 | DLSA Workflow & Queue Management | P0 | §9 | CONFIRMED |
| URM-FR-016 | Prison-side Confirmation Workflow | P1 | §6, §17 | CONFIRMED |
| URM-FR-017 | Surety / Bail Bond Navigator | P2 | §17 | CONFIRMED |
| URM-FR-018 | Notification System | P0 | §8 | CONFIRMED |
| URM-FR-019 | Voice / IVR Access | P1 | §22 | CONFIRMED |
| URM-FR-020 | Multilingual Support | P1 | §23 | CONFIRMED |
| URM-FR-021 | Accessibility & Inclusive Design | P0 | §8, §23 | CONFIRMED |
| URM-FR-022 | Admin / Government Dashboard | P1 | §6 | CONFIRMED |
| URM-FR-023 | Audit & Governance Center | P0 | §15, §21 | CONFIRMED |
| URM-FR-024 | Analytics & KPI Reporting | P1 | §31 | CONFIRMED |
| URM-FR-025 | Pilot Management & Configuration | P1 | §33 | CONFIRMED |
| URM-FR-026 | Human-in-the-Loop Review Workflow | P0 | §15 | CONFIRMED |
| URM-FR-027 | Post-Release Reintegration Hooks | P3 | §17 | CONFIRMED |
| URM-FR-028 | URC-Ready Export | P2 | §17 | CONFIRMED |
| URM-FR-029 | Legal-Source Change Management | P2 | §17 | CONFIRMED |
| URM-FR-030 | PLV-Assisted Intake Completion | P0 | §7 | CONFIRMED |

---

## Non-Functional Requirements Summary

| ID | Name | Priority | PRD Section | Status |
|---|---|---|---|---|
| URM-NFR-001 | System Availability | P0 | §21 | PROPOSED |
| URM-NFR-002 | API Response Performance | P0 | §21 | PROPOSED |
| URM-NFR-003 | Mobile-First Responsive Design | P0 | §23 | CONFIRMED |
| URM-NFR-004 | Encryption in Transit | P0 | §21 | CONFIRMED |
| URM-NFR-005 | Encryption at Rest | P0 | §21 | CONFIRMED |
| URM-NFR-006 | Scalability | P1 | §21 | PROPOSED |
| URM-NFR-007 | Disaster Recovery & Backup | P1 | §21 | CONFIRMED |
| URM-NFR-008 | Observability & Monitoring | P1 | §21 | PROPOSED |
| URM-NFR-009 | Data Retention Policy | P1 | §21 | LEGAL-REVIEW |
| URM-NFR-010 | Rate Limiting & DDoS Protection | P0 | §21 | CONFIRMED |
| URM-NFR-011 | Malware Scanning | P0 | §21 | CONFIRMED |
| URM-NFR-012 | Accessibility — WCAG 2.1 AA | P0 | §23 | CONFIRMED |
| URM-NFR-013 | Low-Bandwidth Support | P0 | §23 | CONFIRMED |
| URM-NFR-014 | Multilingual Rendering | P0 | §23 | CONFIRMED |
| URM-NFR-015 | Maintainability & Code Separation | P0 | §13 | CONFIRMED |

---

## AI Requirements Summary

| ID | Name | Priority | PRD Section | Status |
|---|---|---|---|---|
| URM-AI-001 | Approved Legal-Source Registry | P0 | §12 | CONFIRMED |
| URM-AI-002 | Document Chunking & Indexing | P1 | §12 | CONFIRMED |
| URM-AI-003 | Semantic Retrieval | P1 | §12 | CONFIRMED |
| URM-AI-004 | Citation-Backed Answer Generation | P0 | §12 | CONFIRMED |
| URM-AI-005 | Citation Validation & Safety Checks | P0 | §12 | CONFIRMED |
| URM-AI-006 | Abstention When No Source Supports Answer | P0 | §12 | CONFIRMED |
| URM-AI-007 | Rule-Based Screening Engine | P0 | §13 | CONFIRMED |
| URM-AI-008 | Confidence Banding | P0 | §14 | CONFIRMED |
| URM-AI-009 | Explainability Output | P0 | §14 | CONFIRMED |
| URM-AI-010 | Hallucination Controls | P0 | §12 | CONFIRMED |
| URM-AI-011 | AI-Human Disagreement Logging | P0 | §15 | CONFIRMED |
| URM-AI-012 | Bias & Fairness Evaluation | P1 | §16 | CONFIRMED |
| URM-AI-013 | Held-Out Evaluation Dataset | P1 | §16 | CONFIRMED |
| URM-AI-014 | Outdated-Law Detection | P1 | §12 | CONFIRMED |
| URM-AI-015 | Provider-Agnostic LLM Interface | P0 | §24 | CONFIRMED |
| URM-AI-016 | Provider-Agnostic OCR Interface | P0 | §24 | CONFIRMED |
| URM-AI-017 | Rule-Code Separation from UI | P0 | §13 | CONFIRMED |

---

## Voice Requirements Summary

| ID | Name | Priority | PRD Section | Status |
|---|---|---|---|---|
| URM-VOICE-001 | Feature-Phone IVR Call Flow | P1 | §22 | CONFIRMED |
| URM-VOICE-002 | Language Selection via Voice | P1 | §22 | CONFIRMED |
| URM-VOICE-003 | Speech-to-Text Architecture | P1 | §22 | CONFIRMED |
| URM-VOICE-004 | Text-to-Speech Architecture | P1 | §22 | CONFIRMED |
| URM-VOICE-005 | Low-Literacy Prompts | P1 | §22 | CONFIRMED |
| URM-VOICE-006 | Fallback to Human / PLV | P1 | §22 | CONFIRMED |
| URM-VOICE-007 | Voice Responses Not as Final Legal Advice | P0 | §22 | CONFIRMED |
| URM-VOICE-008 | Shared Backend with Web | P0 | §22 | CONFIRMED |
| URM-VOICE-009 | Voice Session Audit Records | P0 | §22 | PROPOSED |
| URM-VOICE-010 | Tamil Language Support | P1 | §35 | CONFIRMED |
| URM-VOICE-011 | English Language Support | P1 | §22 | CONFIRMED |
| URM-VOICE-012 | Future Indian Language Extensibility | P3 | §22 | CONFIRMED |

---

## Integration Requirements Summary

| ID | Name | Priority | PRD Section | Status |
|---|---|---|---|---|
| URM-INT-001 | Adapter Architecture Pattern | P0 | §18 | CONFIRMED |
| URM-INT-002 | No Unofficial Government Scrapers | P0 | §18 | CONFIRMED |
| URM-INT-003 | Stable CaseRecord Contract | P0 | §18 | CONFIRMED |
| URM-INT-004 | Stable CustodyRecord Contract | P1 | §18 | CONFIRMED |
| URM-INT-005 | Stable CourtRecord Contract | P1 | §18 | CONFIRMED |
| URM-INT-006 | Stable LegalAidRequest Contract | P0 | §18 | CONFIRMED |
| URM-INT-007 | Stable CaseEvent Contract | P0 | §18 | CONFIRMED |
| URM-INT-008 | Integration Failure Visibility | P0 | §18 | CONFIRMED |
| URM-INT-009 | ICJS Connector (placeholder) | P3 | §18 | GOV-APPROVAL |
| URM-INT-010 | e-Courts Connector (placeholder) | P3 | §18 | GOV-APPROVAL |
| URM-INT-011 | Prison Connector (placeholder) | P2 | §18 | GOV-APPROVAL |
| URM-INT-012 | DLSA/Legal-Aid Connector | P1 | §18 | PROPOSED |
| URM-INT-013 | Manual Verified Entry Fallback | P0 | §18 | CONFIRMED |

---

## Security Requirements Summary

| ID | Name | Priority | PRD Section | Status |
|---|---|---|---|---|
| URM-SEC-001 | RBAC with Least Privilege | P0 | §21 | CONFIRMED |
| URM-SEC-002 | Private Document Storage + Signed URLs | P0 | §21 | CONFIRMED |
| URM-SEC-003 | TLS Encryption in Transit | P0 | §21 | CONFIRMED |
| URM-SEC-004 | Encryption at Rest | P0 | §21 | CONFIRMED |
| URM-SEC-005 | Secure Session Management | P0 | §21 | CONFIRMED |
| URM-SEC-006 | Input Validation | P0 | §21 | CONFIRMED |
| URM-SEC-007 | Rate Limiting | P0 | §21 | CONFIRMED |
| URM-SEC-008 | Malware Scanning on Upload | P0 | §21 | CONFIRMED |
| URM-SEC-009 | Audit Logs for Sensitive Access | P0 | §21 | CONFIRMED |
| URM-SEC-010 | Backups & Disaster Recovery | P1 | §21 | CONFIRMED |
| URM-SEC-011 | Production Government-Approved Infrastructure | P1 | §24 | GOV-APPROVAL |
| URM-SEC-012 | Development: Synthetic Data Only | P0 | §21 | CONFIRMED |

---

## Accessibility Requirements Summary

| ID | Name | Priority | PRD Section | Status |
|---|---|---|---|---|
| URM-ACC-001 | WCAG 2.1 AA Compliance | P0 | §23 | CONFIRMED |
| URM-ACC-002 | Mobile-First Responsive Layout | P0 | §23 | CONFIRMED |
| URM-ACC-003 | Large Touch Targets (min 44×44px) | P0 | §8, §23 | CONFIRMED |
| URM-ACC-004 | Screen-Reader Semantic HTML | P0 | §8 | CONFIRMED |
| URM-ACC-005 | Reduced Motion Support | P0 | §8 | CONFIRMED |
| URM-ACC-006 | Low-Bandwidth / Offline States | P0 | §8 | CONFIRMED |
| URM-ACC-007 | Plain Language / Simple Vocabulary | P0 | §2, §8 | CONFIRMED |
| URM-ACC-008 | Audio for Rights Library | P1 | §8 | CONFIRMED |
| URM-ACC-009 | Progressive Disclosure Pattern | P0 | §23 | CONFIRMED |

---

## Document Files Cross-Reference

| Domain | Detail File |
|---|---|
| Functional Requirements | 03-PRD/FUNCTIONAL_REQUIREMENTS.md |
| Non-Functional Requirements | 03-PRD/NON_FUNCTIONAL_REQUIREMENTS.md |
| User Stories | 03-PRD/USER_STORIES.md |
| Acceptance Criteria | 03-PRD/ACCEPTANCE_CRITERIA.md |
| Role & Permissions | 03-PRD/ROLE_PERMISSIONS_REQUIREMENTS.md |
| Data Requirements | 03-PRD/DATA_REQUIREMENTS.md |
| AI Requirements | 03-PRD/AI_REQUIREMENTS.md |
| Voice Requirements | 03-PRD/VOICE_REQUIREMENTS.md |
| Integration Requirements | 03-PRD/INTEGRATION_REQUIREMENTS.md |
| Accessibility Requirements | 03-PRD/ACCESSIBILITY_REQUIREMENTS.md |
| Privacy Requirements | 03-PRD/PRIVACY_REQUIREMENTS.md |
| Audit Requirements | 03-PRD/AUDIT_REQUIREMENTS.md |
| Notification Requirements | 03-PRD/NOTIFICATION_REQUIREMENTS.md |
| Error Handling | 03-PRD/ERROR_HANDLING_REQUIREMENTS.md |
| Edge Cases | 03-PRD/EDGE_CASES.md |
| Out of Scope | 03-PRD/OUT_OF_SCOPE.md |

---

## Unresolved Contradictions

None identified between PRD sections at Phase 1. Open questions are recorded in:
`03-PRD/REQUIREMENT_ASSUMPTIONS.md`
