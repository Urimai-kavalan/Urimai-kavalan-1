# Urimai Kaavalan — User Stories

> **Phase:** 1 — PRD & Acceptance Criteria
> **Source:** 03-PRD/01_URIMAI_KAAVALAN_GOVERNMENT_PRD.pdf
> **Format:** As a [role], I want [capability], so that [outcome].
> **Priority:** P0=Critical/MVP | P1=Pilot-required | P2=Desirable | P3=Future

---

## ROLE-01 — Family User Stories

### URM-US-001
**Priority:** P0 | **Module:** B — Intake

> As a **family member** whose relative has been arrested,
> I want to **register my relative's case using only their name and the arresting police station**,
> so that I can **start the process even if I don't know the FIR number**.

**Acceptance Criteria:** AC-001, AC-002
**PRD:** §7, §8

---

### URM-US-002
**Priority:** P0 | **Module:** D — Case Dashboard

> As a **family user**,
> I want to **see the current status of my relative's case in plain Tamil or English**,
> so that I can **understand what is happening without needing a lawyer to explain it**.

**Acceptance Criteria:** AC-003
**PRD:** §8

---

### URM-US-003
**Priority:** P0 | **Module:** E — Document Upload

> As a **family user**,
> I want to **upload a photo of the FIR from my phone**,
> so that the platform can **help extract case details and connect me with legal aid**.

**Acceptance Criteria:** AC-004
**PRD:** §8, §11

---

### URM-US-004
**Priority:** P0 | **Module:** I — Legal Rights Library

> As a **family member who does not understand legal terms**,
> I want to **read simple cards explaining my relative's legal rights**,
> so that I can **understand what rights they have and what steps to take**.

**Acceptance Criteria:** AC-005
**PRD:** §8

---

### URM-US-005
**Priority:** P0 | **Module:** L — Legal Aid Application

> As a **family user**,
> I want to **apply for free legal aid through the platform**,
> so that my relative **can have a lawyer assigned through the legal aid system**.

**Acceptance Criteria:** AC-006
**PRD:** §9

---

### URM-US-006
**Priority:** P1 | **Module:** G — Screening

> As a **family user**,
> I want to **see whether a legal reviewer has identified any relevant legal criteria for my relative's case**,
> so that I can **understand if there may be a basis for legal review** — with the understanding that a lawyer will confirm.

**Acceptance Criteria:** AC-007
**PRD:** §13, §14

---

### URM-US-007
**Priority:** P0 | **Module:** Q — Notifications

> As a **family user**,
> I want to **receive an SMS or app notification when my relative's legal aid status changes**,
> so that I **don't have to keep checking the platform manually**.

**Acceptance Criteria:** AC-008
**PRD:** §8

---

### URM-US-008
**Priority:** P1 | **Module:** R — Voice

> As a **family member with a feature phone who cannot navigate a website**,
> I want to **call a number and get my case status and basic rights information in Tamil**,
> so that I can **access the platform without internet or a smartphone**.

**Acceptance Criteria:** AC-009
**PRD:** §22

---

### URM-US-009
**Priority:** P1 | **Module:** J — AI Assistant

> As a **family user**,
> I want to **ask a question in plain language like "how long can they keep my brother without a bail hearing?"**,
> so that I can **understand the legal process** with answers that cite the actual law.

**Acceptance Criteria:** AC-010
**PRD:** §12

---

### URM-US-010
**Priority:** P2 | **Module:** P — Surety Navigator

> As a **family user whose relative has been granted bail**,
> I want to **understand the surety process step by step**,
> so that I **know what documents and guarantors are required to secure release**.

**Acceptance Criteria:** AC-011
**PRD:** §17

---

## ROLE-02 — PLV User Stories

### URM-US-011
**Priority:** P0 | **Module:** B, F — Intake, Document

> As a **PLV assigned to a village**,
> I want to **complete an incomplete case intake on behalf of a family I am meeting in person**,
> so that the case **can proceed to legal screening even though the family didn't know the FIR number**.

**Acceptance Criteria:** AC-012
**PRD:** §7

---

### URM-US-012
**Priority:** P0 | **Module:** F — Document OCR Verification

> As a **PLV reviewing extracted document fields**,
> I want to **see all OCR-extracted fields with their confidence levels and correct any errors**,
> so that **the case record is accurate before legal screening is run**.

**Acceptance Criteria:** AC-013
**PRD:** §11

---

### URM-US-013
**Priority:** P1 | **Module:** D, Q — Dashboard, Notifications

> As a **PLV**,
> I want to **see a list of all my assigned incomplete cases and receive alerts when a family has added new information**,
> so that I can **prioritize my field visits effectively**.

**Acceptance Criteria:** AC-014
**PRD:** §9

---

## ROLE-03 — Legal-Aid Lawyer User Stories

### URM-US-014
**Priority:** P0 | **Module:** N, H — Queue, Screening

> As a **legal-aid lawyer assigned to a case**,
> I want to **see the AI-generated screening brief with all cited legal sources**,
> so that I can **quickly understand the key legal factors without starting from scratch**.

**Acceptance Criteria:** AC-015
**PRD:** §9, §14

---

### URM-US-015
**Priority:** P0 | **Module:** V — Human Review

> As a **legal-aid lawyer**,
> I want to **agree with or override the AI screening signal and provide a reason**,
> so that **the family receives a human-verified assessment, not a raw AI output**.

**Acceptance Criteria:** AC-016
**PRD:** §15

---

### URM-US-016
**Priority:** P1 | **Module:** D — Case Timeline

> As a **legal-aid lawyer**,
> I want to **see a complete chronological timeline of all case events with sources**,
> so that I can **understand the full history of the case at a glance**.

**Acceptance Criteria:** AC-017
**PRD:** §10

---

## ROLE-04 — DLSA / SLSA Officer User Stories

### URM-US-017
**Priority:** P0 | **Module:** N — DLSA Workflow

> As a **DLSA officer**,
> I want to **see all legal-aid requests in my district sorted by urgency and SLA deadline**,
> so that I can **prioritize cases that are most time-sensitive**.

**Acceptance Criteria:** AC-018
**PRD:** §9

---

### URM-US-018
**Priority:** P0 | **Module:** M — Matching

> As a **DLSA officer**,
> I want to **see suggested lawyer matches for a case based on district, language, and availability**,
> so that I can **make an informed assignment decision** rather than relying on memory.

**Acceptance Criteria:** AC-019
**PRD:** §9

---

### URM-US-019
**Priority:** P1 | **Module:** U, W — Dashboard, Analytics

> As a **DLSA officer**,
> I want to **see a dashboard showing open cases, SLA compliance rate, and unassigned requests**,
> so that I can **identify and resolve bottlenecks in the legal-aid process**.

**Acceptance Criteria:** AC-020
**PRD:** §6, §31

---

### URM-US-020
**Priority:** P2 | **Module:** W — URC Export

> As a **DLSA officer**,
> I want to **export a URC-ready report of cases reviewed in my district this month**,
> so that I can **meet my reporting obligations without manual data collection**.

**Acceptance Criteria:** AC-021
**PRD:** §17

---

## ROLE-05 — Prison Officer User Stories

### URM-US-021
**Priority:** P1 | **Module:** O — Prison Confirmation

> As an **authorized prison officer**,
> I want to **respond to a specific custody confirmation query for a named individual**,
> so that the platform can **show the family a verified confirmation of custody status**.

**Acceptance Criteria:** AC-022
**PRD:** §6, §17

---

## ROLE-06 — Legal Reviewer User Stories

### URM-US-022
**Priority:** P0 | **Module:** K — Legal Source Registry

> As a **legal reviewer**,
> I want to **approve or reject a proposed legal source before it is used in the RAG pipeline**,
> so that **only verified, current legal sources are used in AI responses**.

**Acceptance Criteria:** AC-023
**PRD:** §12

---

### URM-US-023
**Priority:** P0 | **Module:** V — AI Disagreements

> As a **legal reviewer**,
> I want to **see all cases where a lawyer overrode the AI screening signal and review the reasons**,
> so that I can **identify patterns that indicate rule errors or AI performance issues**.

**Acceptance Criteria:** AC-024
**PRD:** §15, §16

---

### URM-US-024
**Priority:** P1 | **Module:** — Rule Versioning

> As a **legal reviewer**,
> I want to **approve a new version of a legal rule with its effective date before it goes live**,
> so that **outdated rules are never applied to new cases**.

**Acceptance Criteria:** AC-025
**PRD:** §13

---

## ROLE-07 — State / District Admin User Stories

### URM-US-025
**Priority:** P1 | **Module:** U — Admin Dashboard

> As a **state admin**,
> I want to **see case volume, legal-aid routing success rate, and SLA compliance for all districts**,
> so that I can **identify districts that need more capacity or support**.

**Acceptance Criteria:** AC-026
**PRD:** §6, §31

---

### URM-US-026
**Priority:** P1 | **Module:** X — Pilot Management

> As a **state admin managing the pilot**,
> I want to **configure which districts are included in the pilot and set their SLA thresholds**,
> so that the **pilot runs in a controlled, configurable environment**.

**Acceptance Criteria:** AC-027
**PRD:** §33

---

## ROLE-08 — System Admin / Auditor User Stories

### URM-US-027
**Priority:** P0 | **Module:** V — Audit

> As a **system auditor**,
> I want to **access a complete, immutable log of all sensitive data access events**,
> so that I can **investigate any security incident or unauthorized access claim**.

**Acceptance Criteria:** AC-028
**PRD:** §21

---

### URM-US-028
**Priority:** P0 | **Module:** — User Management

> As a **system admin**,
> I want to **deactivate a user account immediately when a security incident is detected**,
> so that **access is revoked without delay**.

**Acceptance Criteria:** AC-029
**PRD:** §21

---

## Cross-Role / System User Stories

### URM-US-029
**Priority:** P0 | **Module:** — Legal Safety

> As **any user interacting with AI-generated legal information**,
> I want to **see a clear disclaimer that the AI output is informational and not a legal decision**,
> so that I **never mistake AI guidance for a court verdict or legal guarantee**.

**Acceptance Criteria:** AC-030
**PRD:** §3, §12, §14

---

### URM-US-030
**Priority:** P0 | **Module:** G, J — Screening, AI

> As **any user**,
> when the **AI cannot find a supported answer in approved legal sources**,
> I want to **see an honest message that no answer was found and be directed to human support**,
> so that I am **never given a fabricated legal response**.

**Acceptance Criteria:** AC-031
**PRD:** §12

---

## Priority Summary

| Priority | Count | Stories |
|---|---|---|
| P0 | 14 | US-001–005, US-007, US-011, US-012, US-014, US-015, US-022, US-023, US-027, US-028, US-029, US-030 |
| P1 | 11 | US-006, US-008, US-009, US-013, US-016, US-017, US-018, US-019, US-021, US-024, US-025, US-026 |
| P2 | 2 | US-010, US-020 |
| P3 | 0 | — |
