# Urimai Kaavalan — Edge Cases

> **Phase:** 1 — PRD & Acceptance Criteria
> **Source:** 03-PRD/01_URIMAI_KAAVALAN_GOVERNMENT_PRD.pdf

---

## Purpose
This document explicitly identifies known edge cases to ensure they are handled gracefully by the system design and test plans.

---

## 1. Intake and Identification Edge Cases

| Edge Case | Expected Handling |
|---|---|
| **Family doesn't know FIR or CNR number** | Allow creation with Name + Police Station only. Case marked `INTAKE_INCOMPLETE`. PLV assigned to assist. (URM-FR-002) |
| **Multiple cases with same name and police station** | Flag as potential duplicate during PLV verification. Do not automatically merge. (URM-FR-002) |
| **Accused person's name spelled differently across documents** | Store primary name; support aliases or fuzzy matching in search. Final verification relies on human review. |
| **Family has no phone number or email** | Require PLV assistance for registration. PLV acts as contact proxy. (URM-US-011) |

---

## 2. Document and OCR Edge Cases

| Edge Case | Expected Handling |
|---|---|
| **Document uploaded is illegible (blurry photo)** | OCR confidence will be LOW. System flags document as UNREADABLE and prompts user/PLV to manually enter details or re-upload. (URM-FR-006) |
| **Document uploaded is not a legal document (e.g., a selfie)** | OCR will fail to extract standard fields. Flag for manual PLV review. |
| **Document contains multiple cases or multiple accused** | OCR extracts all. PLV must manually verify and link to the correct specific case record. |
| **User uploads malware** | Malware scanner blocks file before storage. Alert shown. File discarded. (URM-SEC-008) |

---

## 3. AI and Rule Engine Edge Cases

| Edge Case | Expected Handling |
|---|---|
| **AI screening cannot determine a result due to missing facts** | Signal returns INSUFFICIENT_INFORMATION. Confidence is LOW. Routed to human review/PLV to gather facts. (URM-AI-008) |
| **AI Legal Assistant is asked a question outside its approved sources (e.g., family law)** | Citation validation fails to find a match. System abstains and advises consulting a lawyer. (URM-AI-006) |
| **Two legal rules conflict (e.g., state vs. central amendment)** | Rule engine evaluates based on jurisdictional precedence defined by Legal Reviewer. Conflicting signals must be flagged for human override. |
| **AI suggests a statutory deadline has passed, but human reviewer knows it was extended by court order** | Human reviewer selects OVERRIDE, enters reason ("Court granted extension on [Date]"). Output to family reflects human decision. (URM-AI-011) |

---

## 4. Operational and Integration Edge Cases

| Edge Case | Expected Handling |
|---|---|
| **No lawyer available in the matched district** | DLSA Officer must manually escalate to SLSA or neighboring district for assignment. (URM-FR-014) |
| **SLA breached and supervisor is unavailable** | Configurable escalation path required (e.g., alert SLSA admin). (URM-FR-015) |
| **Government API (e.g., e-Courts) goes down** | Platform degrades gracefully. Displays last verified state and allows manual entry. (URM-ERR-002) |
| **Caller drops during IVR menu selection** | Session logged as INCOMPLETE. No action taken on case. (URM-VOICE-009) |

---

## 5. Security and Abuse Edge Cases

| Edge Case | Expected Handling |
|---|---|
| **User attempts to enumerate case IDs in URL** | Rate limiting triggers. RBAC blocks access. Security event logged. (URM-SEC-007) |
| **User uses AI Assistant to generate fake legal documents** | Prompt injection defenses and strict RAG grounding prevent generation. Abstention triggered. |
| **Accused person is a juvenile** | Outside current MVP scope. If detected, case must be flagged and routed immediately to specialized DLSA juvenile justice panel. |
