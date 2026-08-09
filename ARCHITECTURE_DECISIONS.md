# Urimai Kaavalan — Architecture Decisions

> **Phase:** 0 — Governance & Research

---

## Purpose

This file records all significant architecture and legal-policy decisions made during the project.

**Rule (PRD Section 27):** No agent may silently change the architecture or legal assumptions — update this decision log first.

---

## ADR-001 — Adapter Architecture for Government Integrations

| Attribute | Detail |
|---|---|
| **Decision** | Use adapter architecture: Core Case Service → Integration Interface → connectors |
| **Status** | Accepted |
| **Source** | PRD Section 18 |
| **Date** | Phase 0 — August 2026 |
| **Rationale** | PRD explicitly prohibits unofficial scrapers; integration availability is uncertain; adapter pattern allows graceful degradation to manual verified fallback |
| **Consequences** | No direct government database connections in development; all integration stubs must expose the same stable contract |

---

## ADR-002 — Rule-Based Screening First; ML as Later Layer

| Attribute | Detail |
|---|---|
| **Decision** | The first production-oriented implementation is a versioned rule-based screening engine; ML is a separately evaluated, later layer |
| **Status** | Accepted |
| **Source** | PRD Section 13 |
| **Date** | Phase 0 — August 2026 |
| **Rationale** | PRD explicitly states this. Rule-based systems are more auditable, explainable and legally defensible in Phase 1 |
| **Consequences** | Phase 7 builds rule engine; Phase 8 builds RAG/ML; no ML deployed before held-out evaluation |

---

## ADR-003 — Retrieval-Augmented Generation (RAG) is Mandatory for Legal Explanations

| Attribute | Detail |
|---|---|
| **Decision** | Retrieval from approved legal sources is a prerequisite for any substantive legal explanation |
| **Status** | Accepted |
| **Source** | PRD Section 12 — RAG rule |
| **Date** | Phase 0 — August 2026 |
| **Rationale** | Free-form model knowledge must not be treated as authoritative legal source material |
| **Consequences** | Abstention is required when no approved source supports an answer; general AI knowledge cannot be used for legal responses |

---

## ADR-004 — Human-in-the-Loop is Non-Negotiable for Consequential Actions

| Attribute | Detail |
|---|---|
| **Decision** | No consequential legal action may be taken solely on AI recommendation; human review is always required |
| **Status** | Accepted |
| **Source** | PRD Sections 13, 15, 36 |
| **Date** | Phase 0 — August 2026 |
| **Rationale** | Core platform principle: AI assists, humans verify, courts decide |
| **Consequences** | All AI screening signals route to a human review queue before any action is triggered |

---

## ADR-005 — Synthetic Data Only During Development

| Attribute | Detail |
|---|---|
| **Decision** | Development and testing use synthetic/composite data only |
| **Status** | Accepted |
| **Source** | PRD Section 21 |
| **Date** | Phase 0 — August 2026 |
| **Rationale** | PRD explicit requirement; protects privacy of real citizens during development |
| **Consequences** | No real FIRs, case numbers, names or prisoner data in development environment |

---

## ADR-006 — Technology Stack (Starting Point)

| Attribute | Detail |
|---|---|
| **Decision** | Use the PRD-recommended starting stack for prototyping |
| **Status** | Accepted for prototyping; production stack subject to government-approved infrastructure |
| **Source** | PRD Section 24 |
| **Date** | Phase 0 — August 2026 |

| Layer | Stack |
|---|---|
| Frontend | React + TypeScript + Vite + Tailwind CSS + shadcn/ui + Framer Motion |
| Backend | Node.js + Express + TypeScript |
| Database | PostgreSQL / Supabase |
| Vector search | pgvector |
| Storage | Private object storage / Supabase Storage during prototype |
| AI | Provider-agnostic LLM API behind backend |
| OCR | Provider-agnostic OCR service |
| Charts | Recharts |
| Dev deployment | Vercel + Render/Railway + Supabase |
| Production | Government-approved infrastructure and security architecture |

---

## ADR-007 — No Claim of Government Endorsement or Integration Until Formally Obtained

| Attribute | Detail |
|---|---|
| **Decision** | The platform must not claim official government partnership, integration or endorsement unless formally obtained |
| **Status** | Accepted |
| **Source** | PRD Sections 11, 33 |
| **Date** | Phase 0 — August 2026 |
| **Consequences** | All documentation, UI text and communications must use appropriate disclaimers |

---

## Future Decisions (Not Yet Made)

| Area | Decision Needed | Required Before |
|---|---|---|
| Pilot state | Which state for pilot | Phase 15 |
| Auth method | Specific auth mechanism | Phase 3 |
| Voice provider | IVR/telephony vendor | Phase 10 |
| LLM provider | Specific AI model | Phase 8 |
| Data residency | India hosting requirement | Phase 13 |
| Specific statutes | Which laws in rule engine | Phase 7 (legal reviewer) |
