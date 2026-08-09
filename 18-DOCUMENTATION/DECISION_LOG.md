# Urimai Kaavalan — Decision Log

> **Phase:** 0 — Governance & Research

---

## Purpose

This log records all significant decisions made during the project — architectural, legal-policy, product and governance decisions.

**Rule (PRD Section 27):** No agent may silently change the architecture or legal assumptions — update this log first.

---

## Naming Decision

| Decision | Detail |
|---|---|
| **ID** | DEC-001 |
| **Decision** | Rename product from "NYAY-SATHI" to "Urimai Kaavalan" |
| **Date** | Phase 0 — August 2026 |
| **Rationale** | User instruction — localized Tamil name for civic-tech product targeting Tamil Nadu pilot context |
| **Impact** | All newly created documentation uses "Urimai Kaavalan"; source PRD references retain "NYAY-SATHI" in quotation for traceability |
| **Files updated** | README.md, all 01-PRODUCT/, all new documentation |

---

## Phase 0 Scope Decision

| Decision | Detail |
|---|---|
| **ID** | DEC-002 |
| **Decision** | Phase 0 produces governance and research documentation only — no application code |
| **Date** | Phase 0 — August 2026 |
| **Rationale** | PRD Phase 0 definition (Section 26); user instruction |
| **Impact** | No source code, no packages, no APIs, no database schemas created in Phase 0 |

---

## Legal-Source Governance Decision

| Decision | Detail |
|---|---|
| **ID** | DEC-003 |
| **Decision** | No actual legal rules are created in Phase 0 |
| **Date** | Phase 0 — August 2026 |
| **Rationale** | Legal rules require a legal reviewer sign-off (PRD Section 13); creating rules without review would violate governance principles |
| **Impact** | Legal rules deferred to Phase 7 under formal legal reviewer governance |

---

## Data Policy Decision

| Decision | Detail |
|---|---|
| **ID** | DEC-004 |
| **Decision** | Only synthetic/composite data is used in all development phases |
| **Date** | Phase 0 — August 2026 |
| **Rationale** | PRD Section 21 explicit requirement |
| **Impact** | All test data must be synthetic; no real FIR numbers, prisoner names or case identifiers |

---

## Integration Policy Decision

| Decision | Detail |
|---|---|
| **ID** | DEC-005 |
| **Decision** | No unofficial scrapers will be built for any government system |
| **Date** | Phase 0 — August 2026 |
| **Rationale** | PRD Section 18 explicit prohibition |
| **Impact** | All government data access requires formal authorization before implementation |

---

## Architecture Decisions

See [ARCHITECTURE_DECISIONS.md](../ARCHITECTURE_DECISIONS.md) for detailed ADRs (ADR-001 through ADR-007).

---

## Open Decisions (Not Yet Made)

| ID | Decision Needed | Required Before | Decision Owner |
|---|---|---|---|
| DEC-006 | Pilot state selection | Phase 15 | Product Manager + DLSA Liaison |
| DEC-007 | Specific auth mechanism | Phase 3 | Security Lead |
| DEC-008 | Voice/IVR telephony provider | Phase 10 | Engineering Lead |
| DEC-009 | LLM provider selection | Phase 8 | AI/ML Lead |
| DEC-010 | Data residency and hosting | Phase 13 | Security Lead + Legal Counsel |
| DEC-011 | Which statutes in scope for rule engine | Phase 7 | Legal Reviewer |
| DEC-012 | SLA thresholds | Phase 9 | Product Manager + DLSA |
