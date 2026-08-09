# Urimai Kaavalan — Phase 0 Governance Framework

> **Source:** 03-PRD/01_URIMAI_KAAVALAN_GOVERNMENT_PRD.pdf (Sections 27, 28, 29, 33)
> **Phase:** 0 — Governance & Research

---

## Agent Operating Method

*(Source: PRD Section 27 — Antigravity + Claude Operating Method)*

| Agent | Role |
|---|---|
| Antigravity | Primary implementation agent. Open project folder as workspace; keep review-driven development enabled; use implementation plans/tasks/walkthroughs; work phase-by-phase |
| Claude | Senior reviewer for architecture, code review, security review, RAG prompt review, documentation and adversarial testing |

### Critical Rules

1. **No agent may silently change the architecture or legal assumptions** — update the PRD/decision log first
2. **After every phase:** keep tests, screenshots/walkthroughs, decision notes and a phase status record

---

## Workspace Rules

*(Source: PRD Section 28)*

- Project skeleton and PRD inside the workspace — always same source of truth
- Use review-driven development
- Inspect terminal/file-system permissions before allowing changes
- Use workspace Rules under `.agents/rules/`
- Use workspace Workflows under `.agents/workflows/`

---

## Master Source-of-Truth Files

*(Source: PRD Section 29)*

| File | Purpose |
|---|---|
| `03-PRD/01_URIMAI_KAAVALAN_GOVERNMENT_PRD.pdf` | Product requirements |
| `05-ARCHITECTURE/SYSTEM_ARCHITECTURE.md` | Current architecture |
| `10-LEGAL-RULES/LEGAL_RULE_GOVERNANCE.md` | Legal-source/rule governance |
| `14-SECURITY/SECURITY_BASELINE.md` | Security controls |
| `17-GOVERNMENT-PILOT/PILOT_PLAN.md` | Pilot scope and governance |
| `18-DOCUMENTATION/PROJECT_STATUS.md` | Phase status and blockers |

---

## Pilot Strategy

*(Source: PRD Section 33)*

| Principle | Detail |
|---|---|
| Pilot scale | One state, one tightly scoped district/pilot environment |
| First stakeholder | Legal-aid institution (DLSA/SLSA) — platform's immediate value is access and routing |
| Development data | Synthetic data only |
| Pilot data | Controlled, approved data only under formal pilot agreement |
| Pre-launch requirements | Governance, legal review, security review, user training, support, incident escalation |
| Government partnership claim | Must NOT be claimed until formally obtained |

---

## Governance Gates

The following governance gates must be passed before each major phase:

| Gate | Required Before | Approver |
|---|---|---|
| Legal-source approval | Phase 6 (Legal knowledge) | Legal reviewer |
| Rule version sign-off | Phase 7 (Rule engine) | Legal reviewer |
| ML evaluation approval | Phase 8 (Legal RAG) | Legal/ethics reviewer |
| Security review | Phase 13 | Security reviewer |
| Pilot governance review | Phase 15 | Stakeholder + legal + security |
| Production infrastructure approval | Phase 16 | Government-approved process |

---

## Pilot Governance Checklist (Phase 0 Identification)

Before live pilot begins (Phase 15), the following must be in place:

- [ ] Governance document reviewed and approved
- [ ] Legal review of all rules and sources completed
- [ ] Security review and penetration test completed
- [ ] User training materials prepared (family, PLV, lawyer, DLSA officer)
- [ ] Incident escalation procedure documented
- [ ] SOP alignment with DLSA/SLSA completed
- [ ] Stakeholder co-design sessions completed
- [ ] Synthetic-to-real data transition plan reviewed
- [ ] Privacy/consent mechanism reviewed by legal counsel
- [ ] Government partnership/MOU (if applicable) obtained before claiming

---

## Ongoing Governance Requirements

*(Source: PRD Sections 15, 16, 27)*

1. AI disagreements with human reviewers are logged and reviewed regularly
2. Bias audits are conducted across operational dimensions before scale
3. Legal sources are reviewed for changes and updated with effective dates
4. Architecture decisions are recorded in `ARCHITECTURE_DECISIONS.md`
5. Phase status is updated in `18-DOCUMENTATION/PROJECT_STATUS.md` after each phase
