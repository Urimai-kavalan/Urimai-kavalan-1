# Urimai Kaavalan — Requirement Assumptions

> **Source:** 03-PRD/01_URIMAI_KAAVALAN_GOVERNMENT_PRD.pdf
> **Phase:** 0 — Governance & Research

---

## Purpose

This document records the assumptions and open questions identified during Phase 0. These are areas where the PRD establishes a principle but does not fully specify an implementation detail.

Requirements are traceable to the source PRD. Assumptions are noted separately from stated requirements.

---

## Stated Requirements vs. Assumptions

### A. Stated in PRD — No Assumption Required

| Requirement | PRD Section |
|---|---|
| Five interfaces (Family, Legal-Aid, Admin, Prison, Voice) | Section 6 |
| Eight user roles | Section 5 |
| End-to-end workflow (Discovery → Post-release) | Section 7 |
| Adapter architecture for integrations | Section 18 |
| Rule-based screening first; ML is a later layer | Section 13 |
| Citation-backed legal explanations or abstain | Section 12 |
| Human-in-the-loop required for all consequential actions | Section 15 |
| RBAC and least privilege | Section 21 |
| Synthetic data during development | Section 21 |
| Voice/IVR layer with STT/TTS | Section 22 |
| No unofficial scrapers for government systems | Section 18 |
| Approved legal-source registry | Section 12 |
| Versioned legal rules | Section 13 |
| Confidence banding (High/Medium/Low) | Section 14 |
| Override logging and audit trail | Section 15 |
| Bias and fairness evaluation | Section 16 |
| URC-ready export | Section 6, 17 |
| Pilot: one state, tightly scoped district | Section 33 |
| No claim of government endorsement until formally obtained | Section 33 |

---

### B. Assumptions (Not Fully Specified in PRD)

| Area | Assumption | Risk if Wrong | PRD Closest Reference |
|---|---|---|---|
| Pilot state | Not specified — assumed Tamil Nadu based on TNSLSA reference | Governance/legal review needed | Section 35 (TNSLSA URL) |
| OCR provider | PRD says "provider-agnostic OCR service" | Vendor lock-in if not abstracted | Section 24 |
| LLM provider | PRD says "provider-agnostic LLM API behind backend" | Governance if model changes | Section 24 |
| Authentication method | Not specified beyond "secure authentication/session management" | Security review needed | Section 21 |
| Voice telephony provider | Not specified | IVR architecture depends on vendor | Section 22 |
| Data residency | Not specified — assumed India for government pilot compliance | Legal/regulatory review needed | Section 21, 33 |
| Specific statutes in rule engine | Not specified in PRD — require legal reviewer | Hallucination risk if assumed | Section 13 |
| PLV qualification standards | Not specified — deferred to NALSA standards | Governance review needed | Section 5 |
| SLA thresholds | PRD says "configurable SLA policies" — specific values not given | Operational assumption risk | Section 9 |
| Language support scope | PRD mentions Tamil (TNSLSA), Hindi implied; full list not specified | Accessibility gap | Section 23 |

---

## Open Questions for Phase 1

1. Which pilot state and district?
2. Which specific statutes are in scope for the rule engine (legal reviewer decision)?
3. What are the SLA thresholds for legal-aid assignment?
4. What languages must be supported in the Voice/IVR layer at launch?
5. What is the formal data-sharing agreement process with ICJS/e-Courts?
6. Which government infrastructure is approved for data hosting during pilot?
7. What is the approved PLV qualification/verification process?
8. What are the URC reporting format requirements?

---

## Note on Legal Rules

The PRD explicitly requires that legal rules be:
- Approved by a legal reviewer
- Versioned with effective dates
- Stored separately from UI code
- Traceable to statutory sources

**No legal rules have been created in Phase 0.**
Legal rules will only be created after formal legal review in Phase 7.
