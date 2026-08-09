# Urimai Kaavalan — Core User Journey

> **Source:** 03-PRD/01_URIMAI_KAAVALAN_GOVERNMENT_PRD.pdf (Sections 7, 34)
> **Phase:** 0 — Governance & Research

---

## End-to-End User Journey

*(Source: PRD Section 7)*

```
Discovery
    ↓
Intake
    ↓
Case Creation
    ↓
Document / Record Verification
    ↓
Legal-Source Retrieval
    ↓
Rule Screening
    ↓
Explainable Result
    ↓
Human Legal Review
    ↓
Legal-Aid Routing
    ↓
Family Notification
    ↓
Hearing / Action
    ↓
Resolution
    ↓
Post-Release Follow-up
```

---

## Journey Rules

*(Source: PRD Section 7)*

1. **Incomplete intake is allowed** — PLV-assisted completion when the family does not know an FIR/CNR number
2. **Source transparency** — Show source, date and verification status for important case/legal information
3. **Human review path** — Every high-impact AI signal must provide a human-review path
4. **Audit record** — Every important workflow action must generate a case event and audit record

---

## Case States

*(Source: PRD Section 10)*

| State | Meaning |
|---|---|
| NEW | Case just created |
| INTAKE_INCOMPLETE | Family intake not complete; PLV assistance may be needed |
| UNDER_REVIEW | Case under legal or administrative review |
| LEGAL_AID_REQUESTED | Legal aid has been requested |
| LAWYER_ASSIGNED | Lawyer or PLV has been assigned |
| ACTION_REQUIRED | An action is required (by family, lawyer, or admin) |
| HEARING_SCHEDULED | Court hearing has been scheduled |
| RESOLVED | Case resolved |
| ESCALATED | Case escalated due to urgency or SLA breach |

---

## Case Events

*(Source: PRD Section 10)*

Each event stores: **actor, timestamp, source, status, relevant evidence/reference**

| Event | Description |
|---|---|
| Case created | Initial case record created |
| Document uploaded | Family/PLV uploaded a document |
| Extraction verified | Document fields verified by user/PLV |
| Screening completed | Rule-based eligibility screening run |
| Human review | Legal reviewer reviewed an AI signal |
| Lawyer assigned | Lawyer or PLV formally assigned |
| Hearing scheduled | Court hearing date recorded |
| Outcome recorded | Legal outcome documented |
| Release confirmed | Prison-side release fact confirmed |

---

## Journey A — Family Access

*(Source: PRD Section 34)*

```
Feature-phone or portal intake
    ↓
Incomplete case (family may not know FIR/CNR)
    ↓
PLV completion (field-assisted intake)
    ↓
Document verification
    ↓
Screening (rule-based eligibility signal)
    ↓
Plain-language explanation (cited sources)
    ↓
Legal-aid routing
    ↓
Lawyer assignment
    ↓
Family notification
    ↓
Hearing / action
    ↓
Resolution
```

**Key design consideration:** Family may only have a phone number, name, and approximate arrest date. The system must support this with PLV assistance.

---

## Journey B — Urgent Statutory Review

*(Source: PRD Section 34)*

```
Custody / investigation data (verified)
    ↓
Versioned rule engine evaluation
    ↓
Potential statutory review signal detected
    ↓
Urgent priority flag set
    ↓
DLSA / legal-aid queue (prioritized)
    ↓
Human verification (legal reviewer or lawyer)
    ↓
Action taken
    ↓
Audit record
```

**Key design consideration:** This journey requires fast escalation. The AI signal is advisory — a human must verify and decide whether to act.

---

## Legal-Aid Workflow

*(Source: PRD Section 9)*

```
Family/PLV request
    ↓
Eligibility / priority triage
    ↓
District / language / case-type matching
    ↓
Lawyer / PLV assignment
    ↓
SLA timer starts
    ↓
Human review
    ↓
Action
    ↓
Resolution
```

**Rules:**
- Maintain verified lawyer/PLV profiles and availability
- Never fabricate or display an unverified professional as verified
- Use configurable SLA policies rather than hard-coded assumptions
- Support escalation when response windows are approaching or breached

---

## Document Intelligence Pipeline

*(Source: PRD Section 11)*

```
PDF / JPG / PNG
    ↓
OCR
    ↓
Structured extraction
    ↓
Confidence per field + source page
    ↓
User / PLV verification
    ↓
Case record
```

**Fields extracted:** FIR number, police station, accused name, sections, dates, court and other supported fields

**Rules:**
- Never silently trust OCR
- Store extraction confidence and source location
- Allow correction and retain an audit trail

---

## Legal Knowledge & RAG Pipeline

*(Source: PRD Section 12)*

```
Approved legal-source registry
    ↓
Document chunked and indexed
    ↓
Relevant provisions retrieved
    ↓
Citation validation + safety checks
    ↓
Citation-backed legal explanation
    OR
Abstain and route to human support
```

**RAG Rule (PRD Section 12):** Retrieval is a prerequisite for legal explanation; free-form model knowledge must not be treated as authoritative legal source material.
