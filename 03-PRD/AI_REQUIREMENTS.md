# Urimai Kaavalan — AI & RAG Requirements

> **Phase:** 1 — PRD & Acceptance Criteria
> **Source:** 03-PRD/01_URIMAI_KAAVALAN_GOVERNMENT_PRD.pdf (§12, §13, §14, §15, §16)

---

## Foundational AI Principle

> **AI detects. Verified law explains. Humans verify. Courts decide.**

All AI components in this system are advisory only. No AI component may produce output that is presented as a legal decision, bail guarantee, or court outcome.

---

## URM-AI-001 — Approved Legal-Source Registry

**Priority:** P0 | **PRD Section:** §12 | **Status:** CONFIRMED

### Requirements
- A dedicated legal-source registry must store all authoritative content used by the RAG pipeline.
- Each source record must contain:
  - Law / act name
  - Section or provision reference
  - Document title
  - Version identifier
  - Effective date
  - Expiry / superseded date (if applicable)
  - Source URL (authoritative publication)
  - Review status: PENDING / APPROVED / REJECTED / SUPERSEDED
  - Reviewer ID (Legal Reviewer who approved)
  - Approval timestamp

- **Governance gate:** No source may be used in the RAG pipeline until its review_status = APPROVED.
- **Change management:** When a law is amended, the old version is marked SUPERSEDED; a new version is created in PENDING state until approved.
- **Outdated law detection:** Sources with an expiry date or superseded status must be automatically excluded from retrieval.

---

## URM-AI-002 — Document Ingestion, Chunking & Indexing

**Priority:** P1 | **PRD Section:** §12 | **Status:** CONFIRMED

### Requirements
- Approved legal source documents are processed through the following pipeline:
  1. Document ingested (PDF/text)
  2. Cleaned and normalized (remove headers/footers, fix encoding)
  3. Chunked into semantically coherent segments
  4. Each chunk tagged with: source_id, section_ref, chunk_index, effective_date
  5. Embedding generated for each chunk (provider-agnostic)
  6. Stored in vector search index (pgvector or equivalent)

- Chunk strategy: Overlap-aware chunking to prevent context loss at boundaries. **[Specific parameters: PROPOSED — requires RAG evaluation]**
- Re-indexing required when a source version is updated.
- Old version chunks are deactivated (not deleted) when a source is superseded.

---

## URM-AI-003 — Semantic Retrieval

**Priority:** P1 | **PRD Section:** §12 | **Status:** CONFIRMED

### Requirements
- Before any legal explanation is generated, the system must retrieve relevant chunks from the approved source index.
- Retrieval must be semantic (vector similarity) with optional keyword boosting.
- Top-K relevant chunks are retrieved (K = configurable, not hard-coded).
- Retrieval results include: chunk_text, source_id, section_ref, effective_date, similarity_score.
- Minimum retrieval confidence threshold must be defined and configurable.
- If no chunk exceeds the minimum threshold, the system must abstain (see URM-AI-006).
- Retrieval performance metrics logged: latency, top-K count, similarity scores.

---

## URM-AI-004 — Citation-Backed Answer Generation

**Priority:** P0 | **PRD Section:** §12 | **Status:** CONFIRMED

### Requirements
- The LLM generates a response ONLY using the retrieved chunks as context.
- The response must cite: statute name, section number, version, effective date for each material claim.
- The LLM must not introduce legal claims not present in the retrieved chunks.
- Response format must separate: plain-language explanation vs. cited source vs. disclaimer.
- The citation must reference the specific chunk/section retrieved — not a general document title.
- Citation format (to be defined in Phase 6 with legal reviewer).

### Safe Output Language
- ✅ "According to [Section X of Act Y, Version Z, effective DD/MM/YYYY], ..."
- ✅ "The law states that..."
- ❌ "You will get bail."
- ❌ "You are eligible for bail."
- ❌ "The court will grant bail because..."

---

## URM-AI-005 — Citation Validation & Safety Checks

**Priority:** P0 | **PRD Section:** §12 | **Status:** CONFIRMED

### Requirements
- After generation, a citation validation step must verify:
  - Each cited source_id exists in the registry and is in APPROVED status.
  - Each cited section_ref corresponds to the stated chunk content.
  - The cited effective_date is correct and the source is not superseded.
- Safety check must verify:
  - Response does not contain guaranteed outcome language.
  - Response does not claim government endorsement.
  - Response does not fabricate case numbers or citations.
- If citation validation fails: the response must be blocked and an abstention response returned instead.
- All validation results must be logged.

---

## URM-AI-006 — Abstention Rule (Hard Requirement)

**Priority:** P0 | **PRD Section:** §12 | **Status:** CONFIRMED

### Rule
> **If no approved source supports the answer, the system MUST abstain and route to human support.**

This is a non-negotiable safety requirement.

### Abstention Triggers
- No retrieved chunk exceeds the minimum confidence threshold.
- Citation validation fails.
- The question falls outside the scope of the approved source set.
- The LLM would need to draw on general knowledge not in the approved sources.
- Safety check detects a potential guaranteed-outcome statement.

### Abstention Response
The system must respond with an honest, helpful refusal:

> *"I wasn't able to find a verified answer to this question in our legal sources. Please contact a lawyer or speak to our support team."*

Alternatives:
> *"This question requires expert legal advice. Our approved sources don't cover this specific situation. A legal-aid lawyer can help."*

### Abstention Audit
- Every abstention event must be logged with: query_hash (not query text), reason_code, timestamp.
- Abstention rate is a KPI monitored by the legal reviewer.

---

## URM-AI-007 — Rule-Based Screening Engine

**Priority:** P0 | **PRD Section:** §13 | **Status:** CONFIRMED

### Architecture Requirement
The eligibility/screening engine must be a **versioned, rule-based system** in the first production-oriented implementation. ML is a later, separately evaluated layer.

### Rule Engine Requirements
1. Rules are stored separately from application code (URM-NFR-015).
2. Rules are versioned with effective dates.
3. On each screening run, the applicable rule version is loaded based on effective date.
4. Rules evaluate against normalized, verified case facts.
5. Rule evaluation returns:
   - Signal: POTENTIAL_CRITERIA_IDENTIFIED / NO_CRITERIA_IDENTIFIED / INSUFFICIENT_INFORMATION
   - For each rule condition evaluated: condition_id, rule_source, detected_fact, met (yes/no/unknown)
   - Identified missing information (facts needed to complete evaluation)
6. Rules must reference their legal source (statute, section, version).
7. No rule may be activated without Legal Reviewer approval (governance gate).

### What the Rule Engine Must NOT Do
- Must NOT return a probability of bail being granted.
- Must NOT auto-trigger any legal action.
- Must NOT bypass human review for POTENTIAL_CRITERIA_IDENTIFIED signals.

---

## URM-AI-008 — Confidence Banding

**Priority:** P0 | **PRD Section:** §14 | **Status:** CONFIRMED

### Definition
Confidence band describes the **reliability of the information used in the assessment** — NOT the probability of a court granting bail.

| Band | Trigger Criteria |
|---|---|
| HIGH | All key facts are verified; rule conditions are clearly met or not met |
| MEDIUM | Some facts are missing or unverified; conditions partially met |
| LOW | Significant facts missing; assessment cannot be reliably completed |

### Display Requirements
- Confidence band must be shown to family in plain language:
  - HIGH: "We have enough information for a preliminary assessment"
  - MEDIUM: "Some information is missing — the assessment may be incomplete"
  - LOW: "We need more information to assess — a PLV will help"
- Confidence band must be shown to lawyer/reviewer in technical terms alongside the above.

---

## URM-AI-009 — Explainability Output

**Priority:** P0 | **PRD Section:** §14 | **Status:** CONFIRMED

### For each screening result, the system must show:
1. Why the signal was raised (specific conditions detected)
2. Which facts were detected and their verification status
3. Which facts are missing or unverified
4. The exact legal source and version used
5. The specific rule version applied
6. The human reviewer's decision and reason (if reviewed)

### Presentation Levels
- **Family view:** Plain-language summary with source reference
- **Lawyer/reviewer view:** Full technical detail including all condition evaluations

---

## URM-AI-010 — Hallucination Controls

**Priority:** P0 | **PRD Section:** §12 | **Status:** CONFIRMED

### Requirements
- The LLM must be prompted to rely ONLY on provided context chunks.
- System prompt must explicitly instruct: "Do not introduce legal facts or citations not present in the provided context."
- Citation validation (URM-AI-005) is the primary technical control.
- Abstention (URM-AI-006) is the fallback when citations cannot be verified.
- Hallucination rate is measured in model evaluations (URM-AI-013).
- Hallucination rate thresholds for deployment gate to be defined with legal reviewer in Phase 8.

---

## URM-AI-011 — AI-Human Disagreement Logging

**Priority:** P0 | **PRD Section:** §15 | **Status:** CONFIRMED

### Requirements
- Every human_review record must include the original AI signal and the human decision.
- When human decision != AI signal (OVERRIDE), the `human_overrides` record is created.
- Disagreements must never be deleted or modified.
- Disagreements are viewable by: Legal Reviewer, System Admin.
- Disagreements feed the evaluation dataset under approved governance.
- Aggregated disagreement rates are reported in the admin dashboard.

---

## URM-AI-012 — Bias & Fairness Evaluation

**Priority:** P1 | **PRD Section:** §16 | **Status:** CONFIRMED

### Requirements
- Before any ML layer is trusted at scale, a held-out evaluation set must be built.
- Evaluation must measure performance disaggregated by:
  - District (geography)
  - Offence category
  - Language of documents
  - Legal-aid availability in district
- Metrics: precision, recall, F1, hallucination rate, citation accuracy, human agreement rate.
- If performance gaps exist across demographic dimensions, the ML layer must NOT be deployed.
- Legal and ethics reviewers must inspect disaggregated results before scale approval.

---

## URM-AI-013 — Held-Out Evaluation Dataset

**Priority:** P1 | **PRD Section:** §16 | **Status:** CONFIRMED

### Requirements
- A held-out evaluation dataset must be built from synthetic cases in Phase 14.
- The dataset must include:
  - Cases with known correct screening outcomes (labeled by legal reviewer)
  - Cases with ambiguous facts (for uncertainty handling testing)
  - Cases spanning all offence categories in scope
  - Cases in all supported languages
- The evaluation dataset must NOT be used for training — only for evaluation.
- Dataset version must be recorded alongside model evaluation results.

---

## URM-AI-014 — Outdated-Law Detection

**Priority:** P1 | **PRD Section:** §12 | **Status:** CONFIRMED

### Requirements
- Sources in the registry with `effective_date` in the future must not be used until that date.
- Sources with `superseded` status must be automatically excluded from retrieval.
- When a source is approaching its expiry/review date, the legal reviewer must receive an alert.
- Retrieval pipeline must check source effective_date at query time — not only at indexing time.
- If only a superseded source is available for a topic, the system must abstain and flag the gap to the legal reviewer.

---

## URM-AI-015 — Provider-Agnostic LLM Interface

**Priority:** P0 | **PRD Section:** §24 | **Status:** CONFIRMED

### Requirements
- The LLM must be accessed through a backend adapter interface — not called directly from frontend.
- The adapter must accept a standard prompt contract (context_chunks, query, safety_instructions).
- LLM provider can be switched by changing the adapter configuration — no changes to business logic required.
- Vendor-specific SDKs must not appear in business logic layers.
- LLM provider selection is recorded in `model_versions` table.

---

## URM-AI-016 — Provider-Agnostic OCR Interface

**Priority:** P0 | **PRD Section:** §24 | **Status:** CONFIRMED

### Requirements
- OCR is accessed through a backend adapter interface.
- OCR adapter returns: per-field extracted text, confidence score, source page reference.
- OCR provider can be switched without changing document intelligence business logic.
- Output format is normalized to the `document_extractions` schema regardless of OCR provider.

---

## URM-AI-017 — Rule-Code Separation

**Priority:** P0 | **PRD Section:** §13 | **Status:** CONFIRMED

### Requirements
- Legal rules must be stored in a dedicated rule repository (file-based YAML/JSON or database table `legal_rule_versions`) — NOT embedded in application source code.
- Rules must be loadable by the screening engine at runtime by version and effective date.
- Changes to rules must NOT require an application code deployment.
- Rule repository changes require Legal Reviewer approval (governance gate).
- Rule history must be fully retained — no rule version may be deleted.

---

## AI Governance Summary

| Governance Gate | Required For | Approver |
|---|---|---|
| Legal source approval | Any RAG use | Legal Reviewer |
| Rule version approval | Any screening use | Legal Reviewer |
| Held-out evaluation | Any ML deployment | Legal + Ethics Reviewer |
| Bias audit | Scale deployment | Legal + Ethics Reviewer |
| Citation validation | Every AI response | Automated + Legal Reviewer audit |
