# Urimai Kaavalan — Out of Scope Requirements

> **Phase:** 1 — PRD & Acceptance Criteria
> **Source:** 03-PRD/01_URIMAI_KAAVALAN_GOVERNMENT_PRD.pdf (§3)

---

## Purpose
To explicitly define what Urimai Kaavalan is **NOT** designed to do, preventing feature creep and maintaining the project's strict legal safety boundaries.

---

## 1. Legal and Judicial Boundaries

- **Not an AI Judge:** The system will never issue a ruling, verdict, or legally binding decision.
- **Not an Autonomous Bail Decider:** The system will never automatically grant or deny bail. All screening signals are advisory.
- **Not a Lawyer Replacement:** The system will not provide bespoke legal representation or appear in court. It routes cases to human professionals.
- **Not a Court Registry:** The system is not the official record of truth for court proceedings; it is an access layer.

---

## 2. Technical Boundaries (Phase 1/MVP)

- **No Official Government Integrations (Yet):** ICJS, e-Courts, and e-Prisons integrations are strictly future-state (P3) and require formal government authorization. Manual/PLV entry is the MVP standard.
- **No Machine Learning in Screening Engine:** The MVP eligibility screening engine is strictly rule-based (URM-AI-007). ML implementations are deferred until Phase 7/8 and require separate bias evaluations.
- **No General-Purpose Chatbot:** The AI Legal Assistant is strictly bounded to approved legal RAG sources. It will not answer general knowledge, political, or non-legal questions.
- **No Auto-Translation of Legal Content:** All legal rights content must be professionally translated and approved by a legal reviewer.

---

## 3. Scope Exclusions

- **Juvenile Justice:** Cases involving minors are structurally different and fall outside the current PRD scope.
- **Civil Cases:** The platform's MVP focus is on undertrials and criminal justice (bail, remand). Property, family, and civil disputes are out of scope.
- **Financial Transactions:** The Surety Navigator provides information only. The platform will not process bail bonds, handle payments, or verify financial guarantors.
- **Direct Telecom Provisioning:** The platform specifies the IVR software architecture, but acquiring the physical telecom infrastructure (shortcodes, SIP trunks) is an operational concern for the pilot phase (Phase 15).
