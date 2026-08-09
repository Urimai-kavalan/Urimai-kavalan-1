# Urimai Kaavalan — Risk Register

> **Source:** 03-PRD/01_URIMAI_KAAVALAN_GOVERNMENT_PRD.pdf (Section 32 — Risk Register)
> **Phase:** 0 — Governance & Research

---

## Phase 0 Risk Register

All risks below are sourced directly from PRD Section 32.

---

### RISK-001 — Legal Hallucination

| Attribute | Detail |
|---|---|
| **Risk** | AI generates legal information not supported by approved sources |
| **Impact** | Critical — could mislead families about their legal rights or case status |
| **Source** | PRD Section 32 |
| **Mitigation** | Approved-source RAG; citation validation; abstention rule; human review required |
| **Owner placeholder** | Legal Reviewer + Engineering Lead |
| **Status** | Identified — not yet mitigated (implementation pending Phase 8) |
| **Phase 0 Action** | Abstention rule documented in LEGAL_RULE_GOVERNANCE.md; citation requirement established |

---

### RISK-002 — Outdated Law

| Attribute | Detail |
|---|---|
| **Risk** | Legal sources used by the system become outdated after statutory amendments |
| **Impact** | Critical — outdated legal information could harm families |
| **Source** | PRD Section 32 |
| **Mitigation** | Versioned legal sources; effective dates recorded; legal reviewer responsible for updates |
| **Owner placeholder** | Legal Reviewer |
| **Status** | Identified — governance principles documented; implementation pending Phase 6 |
| **Phase 0 Action** | Versioning and effective-date requirements documented in LEGAL_RULE_GOVERNANCE.md |

---

### RISK-003 — AI Bias

| Attribute | Detail |
|---|---|
| **Risk** | AI screening signals may be systematically biased across district, offence category, language or legal-aid availability |
| **Impact** | High — could disadvantage already-marginalized families |
| **Source** | PRD Section 32 |
| **Mitigation** | Held-out evaluation; disaggregated audit; human override; legal/ethics reviewer inspection |
| **Owner placeholder** | AI/ML Team + Legal/Ethics Reviewer |
| **Status** | Identified — evaluation framework documented; implementation pending Phase 8 |
| **Phase 0 Action** | Bias evaluation requirements documented in LEGAL_RULE_GOVERNANCE.md |

---

### RISK-004 — Unauthorized Access

| Attribute | Detail |
|---|---|
| **Risk** | Unauthorized access to sensitive case data, documents or audit logs |
| **Impact** | Critical — privacy violation and potential harm to families and accused |
| **Source** | PRD Section 32 |
| **Mitigation** | RBAC; least privilege; secure storage; audit logging |
| **Owner placeholder** | Security Lead |
| **Status** | Identified — principles documented; implementation pending Phase 3 and Phase 13 |
| **Phase 0 Action** | Security principles documented in SECURITY_BASELINE.md |

---

### RISK-005 — Government Integration Unavailable

| Attribute | Detail |
|---|---|
| **Risk** | Official ICJS/e-Prisons/e-Courts integration is not available or authorized when needed |
| **Impact** | High — platform cannot surface government case data; reduces utility |
| **Source** | PRD Section 32 |
| **Mitigation** | Adapter architecture with manual verified fallback; design for integration unavailability |
| **Owner placeholder** | Product Manager + Integration Lead |
| **Status** | Identified — adapter architecture requirement documented |
| **Phase 0 Action** | Integration strategy documented in EXISTING_SYSTEMS.md; no unofficial scrapers created |

---

### RISK-006 — Poor OCR

| Attribute | Detail |
|---|---|
| **Risk** | OCR extraction errors on handwritten FIRs, low-quality scans or non-standard document formats |
| **Impact** | Medium/High — incorrect document data leads to wrong case information |
| **Source** | PRD Section 32 |
| **Mitigation** | Confidence per field + user/PLV verification; never silently trust OCR; audit trail for corrections |
| **Owner placeholder** | Document AI Team |
| **Status** | Identified — OCR governance documented in user journey |
| **Phase 0 Action** | OCR verification requirements documented in user journey (SUCCESS_METRICS.md) |

---

### RISK-007 — Low Digital Literacy

| Attribute | Detail |
|---|---|
| **Risk** | Families cannot use the platform due to limited digital literacy or feature-phone dependency |
| **Impact** | High — platform fails to reach intended users |
| **Source** | PRD Section 32 |
| **Mitigation** | Voice/IVR; simple language; PLV support; progressive disclosure in UX |
| **Owner placeholder** | UX Lead + PLV Program Lead |
| **Status** | Identified — voice/IVR and PLV requirements documented |
| **Phase 0 Action** | Voice and PLV requirements documented in PRODUCT_SCOPE.md |

---

### RISK-008 — Over-Automation

| Attribute | Detail |
|---|---|
| **Risk** | AI system operates with insufficient human oversight; consequential decisions made without human review |
| **Impact** | High — violates core platform principle; could cause harm |
| **Source** | PRD Section 32 |
| **Mitigation** | Advisory-only positioning enforced at system level; human review required for all consequential actions |
| **Owner placeholder** | Product Manager + Engineering Lead |
| **Status** | Identified — advisory-only principle documented |
| **Phase 0 Action** | Human-in-the-loop requirements documented throughout governance files |

---

### RISK-009 — Operational Adoption

| Attribute | Detail |
|---|---|
| **Risk** | DLSA officers, lawyers and PLVs do not adopt the platform; or prison staff do not respond to confirmation requests |
| **Impact** | High — platform has no operational impact without institutional adoption |
| **Source** | PRD Section 32 |
| **Mitigation** | Pilot; training; SOP alignment; stakeholder co-design |
| **Owner placeholder** | Pilot Manager + DLSA Liaison |
| **Status** | Identified — pilot governance documented |
| **Phase 0 Action** | Pilot governance requirements documented in PILOT_PLAN.md |

---

## Risk Summary

| Risk ID | Risk | Impact | Status |
|---|---|---|---|
| RISK-001 | Legal hallucination | Critical | Documented; pending Phase 8 |
| RISK-002 | Outdated law | Critical | Documented; pending Phase 6 |
| RISK-003 | AI bias | High | Documented; pending Phase 8 |
| RISK-004 | Unauthorized access | Critical | Documented; pending Phase 3/13 |
| RISK-005 | Government integration unavailable | High | Documented; adapter design required |
| RISK-006 | Poor OCR | Medium/High | Documented; pending Phase 5 |
| RISK-007 | Low digital literacy | High | Documented; voice/PLV in scope |
| RISK-008 | Over-automation | High | Documented; advisory-only principle set |
| RISK-009 | Operational adoption | High | Documented; pilot governance set |

---

## Note

No risks have been marked as mitigated in Phase 0. Mitigation happens through implementation in later phases. This register will be updated after each phase.
