# Urimai Kaavalan — Legal Governance Principles

> **Source:** 03-PRD/01_URIMAI_KAAVALAN_GOVERNMENT_PRD.pdf (Sections 12, 13, 14, 15, 16, 36)
> **Phase:** 0 — Governance & Research

---

## Core Safety Principle

> **AI assists. Verified law explains. Humans verify. Courts decide.**

This principle governs all AI and legal-information decisions in Urimai Kaavalan.

---

## 1. AI Advisory-Only Positioning

*(Source: PRD Section 15, 36)*

- AI must remain **advisory** at all times
- AI must **not** make consequential legal decisions
- AI signals are **inputs to human review**, not outputs to families
- AI must **not** tell a family member that bail will or will not be granted
- AI must **not** replace a lawyer's legal judgment
- AI must **not** replace a court's decision

---

## 2. Human Verification Requirements

*(Source: PRD Section 15)*

- Every high-impact AI signal must provide a **human-review path**
- AI signal → legal reviewer/PLV/lawyer → agree or override → reason → audit log → evaluation dataset
- Every override requires a **documented reason**
- AI-human disagreements must **never be hidden**
- Disagreements are used for **audit and model improvement only** under approved governance

---

## 3. Legal-Source Governance

*(Source: PRD Section 12)*

### Approved Legal-Source Registry Requirements

- Law/section/title/version/effective dates/source URL/verification status/reviewer
- All sources must be **approved by a legal reviewer** before use
- Sources must be **versioned** with effective dates
- Chunks and indexes are built only from approved documents
- Sources must have **traceable URLs** to authoritative publications

### Citation Requirements

- All substantive legal explanations must be **citation-backed**
- Citations must reference the **approved source and version**
- Citation validation and safety checks run before returning any answer

---

## 4. Abstention Rule

*(Source: PRD Section 12)*

> **If no approved source supports the answer, the system must abstain and route to human support.**

This is a hard rule — not a guideline.

**RAG Rule:** Retrieval is a prerequisite for legal explanation. Free-form model knowledge must not be treated as authoritative legal source material.

---

## 5. Versioned Legal Rules

*(Source: PRD Section 13)*

- Legal rules must be **versioned** separately from application code
- Rules include: applicable rule versions, conditions, exceptions
- Rules produce a **potential signal**, not a court outcome
- Screening results show:
  - Detected facts
  - Rule/source
  - Missing information
  - Confidence band
- Human verification is required for all **consequential actions**

---

## 6. Confidence Banding

*(Source: PRD Section 14)*

| Band | Meaning |
|---|---|
| High | Strong information match; rule conditions well-evidenced |
| Medium | Partial match; some information missing or unverified |
| Low | Weak match; significant information missing |

**Definition:** Confidence means information/model reliability — NOT probability of a court granting bail.

### Explainability Requirements

- Show why a signal was raised
- Show which facts are missing or unverified
- Show exact legal source and version
- Record reviewer agreement/disagreement

---

## 7. Bias and AI Evaluation

*(Source: PRD Section 16)*

- Build a **held-out evaluation set** before trusting any ML layer
- Measure: retrieval accuracy, citation correctness, hallucination rate, rule accuracy, human agreement
- Track: false positives and false negatives
- Audit performance across: district, offence category, language, legal-aid availability
- Legal/ethics reviewers must inspect disagreements before any scale deployment

---

## 8. Auditability

*(Source: PRD Section 10, 15, 21)*

- Every case event stores: actor, timestamp, source, status, relevant evidence/reference
- Audit logs are maintained for sensitive access and changes
- AI-human disagreements are logged and never hidden
- Override reasons are recorded

---

## 9. Legal/Ethics Review Gate

*(Source: PRD Section 16, 33)*

Before any ML component is deployed at scale:
- Legal reviewer sign-off on rule versions
- Ethics reviewer inspection of AI disagreements
- Bias audit across operational dimensions
- No deployment without formal review and documented approval

---

## 10. Production Data Restrictions

*(Source: PRD Section 21)*

- Development uses **synthetic/composite data only**
- Production privacy, retention, consent/notice and data-sharing rules require **formal legal/security review** before implementation
- No real citizen data is used in any development or testing phase

---

## 11. Legal-Source Change Management

*(Source: PRD Section 17)*

The platform must support:
- Tracking changes to approved legal sources
- Document comparison / 'what changed?' visibility
- Effective date management for new rule versions
- Notification to reviewers when sources change

---

## What This Governance Does NOT Do

- Does not write actual legal rules (deferred to Phase 7 under legal reviewer)
- Does not claim to be a substitute for legal advice
- Does not claim government endorsement
- Does not create legal provisions from general AI knowledge
- Does not make bail predictions
