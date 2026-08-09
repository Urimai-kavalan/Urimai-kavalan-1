# Urimai Kaavalan — Functional Requirements

> **Phase:** 1 — PRD & Acceptance Criteria
> **Source:** 03-PRD/01_URIMAI_KAAVALAN_GOVERNMENT_PRD.pdf
> **Version:** 1.0 — Phase 1 Freeze

---

## Module A — Public Landing / Home (URM-FR-001)

**Priority:** P0 | **PRD Section:** §8 | **Status:** CONFIRMED

### Objective
Provide a clear, trustworthy, low-friction entry point for families, accessible on mobile and low-bandwidth connections, with prominent calls to action for all primary journeys.

### Users
- Family user (primary)
- Any unauthenticated visitor

### Inputs
- None (unauthenticated access)

### Outputs
- Landing page with six primary action cards:
  1. Search Case
  2. Check Legal Screening
  3. Upload Document
  4. Get Legal Aid
  5. Know Your Rights
  6. Voice Help

### Business Rules
- **BR-A-01:** Language selector visible on landing without authentication.
- **BR-A-02:** No personal data is collected or required to view the landing page.
- **BR-A-03:** Voice Help CTA must be prominently accessible for low-literacy users.
- **BR-A-04:** The platform must not claim government endorsement or official government integration on landing page.
- **BR-A-05:** A clear, plain-language disclaimer must appear: *"This platform provides legal information and support. It is not a substitute for a qualified lawyer. AI outputs are advisory only."*

### Validation
- All six CTAs must be accessible via keyboard and screen reader.
- Language selector must function without JavaScript for the initial render (progressive enhancement).

### Permissions
- None — fully public.

### Failure States
- Low-bandwidth fallback: text-only version with no image assets.
- Service unavailable: static maintenance page with support contact.

### Audit Events
- None for anonymous landing page view.

### Accessibility
- WCAG 2.1 AA; large touch targets; screen-reader semantics; reduced motion.

### Privacy
- No cookies or tracking beyond essential session on landing page.

---

## Module B — Citizen / Family Intake (URM-FR-002)

**Priority:** P0 | **PRD Section:** §7, §8 | **Status:** CONFIRMED

### Objective
Allow families to create a case record with the information they have, supporting incomplete intake where critical identifiers (FIR/CNR) are unknown, with PLV-assisted completion.

### Users
- Family user (primary)
- PLV (assisted completion)

### Inputs
- Accused person's name
- Approximate arrest date or date range
- Police station name / district (if known)
- FIR number (optional at intake)
- CNR number (optional at intake)
- Offence described in family's words (optional)
- Family contact details for notifications
- Language preference

### Outputs
- Case record with status: `NEW` or `INTAKE_INCOMPLETE`
- Unique case identifier assigned by the platform
- Family acknowledgement notification
- Audit event: case_created

### Business Rules
- **BR-B-01:** FIR/CNR are NOT mandatory at initial intake. Intake must proceed with name + district alone.
- **BR-B-02:** If FIR/CNR is missing, case status is set to `INTAKE_INCOMPLETE` and PLV assistance is offered.
- **BR-B-03:** Platform case identifier is NOT the same as the judicial CNR number.
- **BR-B-04:** No two cases may share the same combination of accused name + FIR number + police station (duplicate check).
- **BR-B-05:** All intake fields must be clearly labelled in the selected language.
- **BR-B-06:** The system must not attempt to auto-verify case data against government databases at intake (no government integration at this stage).
- **BR-B-07:** Family must be informed of the next step after intake is complete.
- **BR-B-08:** PLV can complete or amend an `INTAKE_INCOMPLETE` case on behalf of the family, with the amendment recorded in audit trail.

### Validation
- Name: non-empty, minimum 2 characters.
- Arrest date: not in the future.
- Phone / email: format validation; at least one contact method required for notifications.
- All fields: input sanitization against injection.

### Permissions
- Family user: create own case, view own case.
- PLV: view and complete assigned incomplete cases.
- No other role may create a family case.

### Failure States
- Duplicate case detected: show existing case summary and ask family to confirm or proceed.
- Submission error: preserve all entered data; do not clear form.
- Network disconnection: local draft preservation (proposed; requires implementation validation).

### Audit Events
- `case_created` — actor, timestamp, intake fields (non-sensitive), status.
- `case_intake_completed` — actor (PLV if PLV-assisted), timestamp.

### Accessibility
- All form fields labelled with visible labels (not placeholder-only).
- Error messages announced by screen reader.
- Minimum 44px touch targets.

### Privacy
- Contact details (phone/email) are stored encrypted and used only for notifications.
- Accused person's details are protected; not visible to other families.

### Human-Review Requirements
- PLV-completed intake must be flagged in audit for DLSA awareness.

---

## Module C — Case Search (URM-FR-003)

**Priority:** P0 | **PRD Section:** §8 | **Status:** CONFIRMED

### Objective
Allow authenticated families to find an existing case record by multiple search parameters.

### Users
- Family user, PLV, Legal-aid lawyer, DLSA officer, System admin

### Inputs
- Platform case ID (direct lookup)
- Accused person name + district
- FIR number + police station
- CNR number (when available)
- Phone number (family-linked lookup)

### Outputs
- List of matching cases with status, date and access level
- Direct navigation to case dashboard

### Business Rules
- **BR-C-01:** Family users see only their own cases.
- **BR-C-02:** PLVs see cases assigned to them or cases in their district with INTAKE_INCOMPLETE status.
- **BR-C-03:** Lawyers see only their assigned cases.
- **BR-C-04:** DLSA officers see all cases in their district.
- **BR-C-05:** Search results must not expose personal details of accused to unauthorised roles.
- **BR-C-06:** Partial name search must be supported.
- **BR-C-07:** Search must degrade gracefully when government case databases are not connected.

### Validation
- Minimum 3 characters for name search.
- FIR number format validation (regex: alphanumeric + slash).
- Rate limiting on search to prevent enumeration attacks.

### Permissions
- Authentication required for all search operations.
- Role-based result filtering applied at query time, not display time.

### Failure States
- No results: plain-language guidance on how to proceed (contact PLV, try alternative identifiers).
- Search service unavailable: clear error with retry option.

### Audit Events
- `case_searched` — actor, timestamp, search parameters (not result set).

---

## Module D — Case Status & Dashboard (URM-FR-004)

**Priority:** P0 | **PRD Section:** §8, §10 | **Status:** CONFIRMED

### Objective
Show the family a clear, understandable, always-up-to-date view of their case including status, next action, timeline, legal-aid status and notifications.

### Users
- Family user (primary)
- PLV, Lawyer, DLSA officer (respective case views)

### Outputs
- Case identifier (platform ID)
- Case status (from defined state machine)
- Custody information (when verified by prison-side confirmation)
- Next action for family
- Legal-aid status and assigned professional (if applicable)
- Case timeline (all events in chronological order)
- Document list with status
- Screening result summary (if completed)
- Notifications

### Case States (from PRD §10)
| State | Plain-Language Label |
|---|---|
| NEW | Case received — being processed |
| INTAKE_INCOMPLETE | We need more information — PLV will contact you |
| UNDER_REVIEW | Under legal review |
| LEGAL_AID_REQUESTED | Legal aid request submitted |
| LAWYER_ASSIGNED | Lawyer assigned — they will contact you |
| ACTION_REQUIRED | Action needed — see next steps |
| HEARING_SCHEDULED | Hearing scheduled — see date and details |
| RESOLVED | Case resolved |
| ESCALATED | Case escalated — urgent review underway |

### Business Rules
- **BR-D-01:** Custody information is only shown when confirmed by prison-side channel or verified human entry.
- **BR-D-02:** All timeline events show actor role (not personal name for privacy), timestamp, and source.
- **BR-D-03:** Next action guidance must be written in plain language, not legal jargon.
- **BR-D-04:** AI screening results shown on dashboard must include confidence band, source references, and human-review status.
- **BR-D-05:** Legal information displayed must show effective date of source.
- **BR-D-06:** The dashboard must not display AI results as court decisions.

### Failure States
- Case not found: redirect to search with guidance.
- Legal-aid status unknown: show as "Pending — you will be notified".

### Audit Events
- `case_viewed` — actor, timestamp, role.

---

## Module E — FIR / Document Upload (URM-FR-005)

**Priority:** P0 | **PRD Section:** §8, §11 | **Status:** CONFIRMED

### Objective
Allow families and PLVs to securely upload legal documents (FIR, charge sheet, court orders, bail applications, etc.) with malware scanning and structured storage.

### Users
- Family user (primary), PLV

### Supported Formats
- PDF, JPG, PNG (PRD §11)

### Business Rules
- **BR-E-01:** All uploaded files must be scanned for malware before processing (PRD §21).
- **BR-E-02:** Maximum file size limit: *proposed* 20MB per file; to be validated with infrastructure team.
- **BR-E-03:** Files are stored in private object storage; family accesses via signed URLs only.
- **BR-E-04:** File names must be sanitized before storage.
- **BR-E-05:** Document type must be selected by uploader (FIR / Charge Sheet / Court Order / Bail Application / Identity Document / Other).
- **BR-E-06:** Upload progress must be shown; partial uploads must be resumable (proposed; requires implementation validation).
- **BR-E-07:** No document is publicly accessible under any circumstances.

### Audit Events
- `document_uploaded` — actor, timestamp, document_type, file_hash (not file contents), case_id.

### Privacy
- Documents contain sensitive personal data; access is strictly limited by RBAC.
- Documents are not shared between cases.

---

## Module F — Legal Document Intelligence & OCR (URM-FR-006)

**Priority:** P0 | **PRD Section:** §11 | **Status:** CONFIRMED

### Objective
Extract structured fields from uploaded documents using OCR, store confidence per field, and require user/PLV verification before the extracted data is used in the case record.

### Pipeline
```
PDF / JPG / PNG
  → Malware scan
  → OCR (provider-agnostic)
  → Structured extraction
  → Confidence score per field + source page reference
  → User / PLV verification
  → Case record update
  → Audit record
```

### Extracted Fields
- FIR number
- Police station name
- District
- Accused name(s)
- Sections (IPC / BNS / special acts cited)
- Arrest date
- Court name
- Hearing date(s)
- Bail application number (if present)

### Business Rules
- **BR-F-01:** The system must NEVER silently trust OCR output. All extracted fields are marked as UNVERIFIED until confirmed by user or PLV.
- **BR-F-02:** Each field shows its confidence level: High / Medium / Low.
- **BR-F-03:** Source page reference is stored for each extracted field.
- **BR-F-04:** User/PLV can correct any field; correction is recorded in audit trail.
- **BR-F-05:** Extraction failures (low confidence, unreadable) must be clearly shown to the user.
- **BR-F-06:** The system must not attempt to interpret legal sections — it extracts section numbers only; legal meaning is provided by the legal knowledge module.

### Failure States
- OCR fails: document flagged as UNREADABLE; PLV assistance offered.
- All fields low confidence: user notified; manual entry allowed.

### Audit Events
- `document_extraction_completed` — document_id, fields_extracted, confidence_summary.
- `document_field_verified` — actor, field, original_value, corrected_value (if changed).

---

## Module G — Bail Information & Eligibility Screening (URM-FR-008)

**Priority:** P0 | **PRD Section:** §13, §14 | **Status:** CONFIRMED

### Objective
Run a rule-based, versioned screening engine against verified case facts to identify whether relevant legal criteria may apply, return an explainable advisory signal, and route all significant signals to human review.

### CRITICAL SAFETY RULES
- **The system MUST NEVER say: "YOU WILL GET BAIL."**
- **The system MUST NEVER say: "You are eligible for bail."** (as a definitive statement)
- **The system MUST NEVER present screening output as a court decision.**
- **All screening results are advisory signals requiring human verification.**

### Permitted Output Language
- "Potentially relevant legal criteria identified — further review by a lawyer is required."
- "Our screening found factors that may be relevant. A lawyer will review."
- "Insufficient information to complete screening."
- "Not enough verified information to assess at this time."
- "No criteria identified based on available information."

### Inputs
- Verified case facts (from document extraction + PLV/user verification)
- Case status and timeline data
- Offence sections (IPC/BNS/special act)
- Custody duration (when confirmed)
- Applicable jurisdiction

### Rule Engine Requirements
- Rule versions are loaded by effective date.
- Rules are stored separately from UI code.
- Rule evaluation returns: signal present / absent / insufficient information.
- For each rule evaluated: rule ID, source statute, version, detected facts, missing facts.

### Confidence Banding
| Band | Meaning |
|---|---|
| High | Key facts verified; rule conditions clearly met or not met |
| Medium | Some facts missing or unverified; conditions partially met |
| Low | Significant facts missing; insufficient basis for assessment |

### Outputs (per PRD §14)
- Signal: POTENTIAL_CRITERIA_IDENTIFIED / NO_CRITERIA_IDENTIFIED / INSUFFICIENT_INFORMATION
- Confidence band (High / Medium / Low)
- Detected facts with verification status
- Missing or unverified facts
- Rule ID and source statute/version
- Recommended next step (always includes human review)

### Business Rules
- **BR-G-01:** Screening engine is versioned; version number and effective date shown in output.
- **BR-G-02:** ML screening is NOT implemented in Phase 7 without a separately approved held-out evaluation.
- **BR-G-03:** Every screening result above LOW confidence is routed to human review queue.
- **BR-G-04:** Human reviewer must agree or override before result is shown to family.
- **BR-G-05:** Override requires a documented reason.
- **BR-G-06:** AI-human disagreements are logged and never hidden.
- **BR-G-07:** Screening result shown to family must clearly state: source, date of law, confidence, and "A lawyer will review this."

### Audit Events
- `screening_completed` — case_id, rule_version, signal, confidence, facts_detected, facts_missing.
- `screening_human_reviewed` — reviewer_role, agree/override, override_reason.

---

## Module H — Default Bail & Statutory Threshold Information (URM-FR-009)

**Priority:** P1 | **PRD Section:** §13 | **Status:** CONFIRMED

### Objective
Provide plain-language, source-cited information about statutory bail provisions (e.g., bail after investigation completion deadlines) where those provisions are publicly documented in approved legal sources.

### Business Rules
- **BR-H-01:** All content must be sourced from approved legal-source registry.
- **BR-H-02:** Effective date of source must be shown.
- **BR-H-03:** Content must not be presented as legal advice.
- **BR-H-04:** "This is general legal information, not advice for your specific case. Consult a lawyer." must appear prominently.
- **BR-H-05:** Content requiring legal reviewer sign-off before display.

---

## Module I — Legal Rights / Legal Literacy Library (URM-FR-010)

**Priority:** P0 | **PRD Section:** §8 | **Status:** CONFIRMED

### Objective
Provide accessible, multilingual, source-cited legal rights information through visual cards, audio, and contextual nudges.

### Features
- Rights cards: simple language, maximum reading level Grade 6 equivalent.
- Audio playback for each rights card.
- Language selection.
- Source metadata (statute name, section, effective date) visible.
- Contextual nudges: surfaced on case dashboard based on case state.

### Business Rules
- **BR-I-01:** All content must cite approved legal sources with version and effective date.
- **BR-I-02:** Content must be reviewed and approved by legal reviewer before publishing.
- **BR-I-03:** Content must be translated professionally or by verified translator — not auto-translated without review.
- **BR-I-04:** Audio must be clearly labeled as informational, not legal advice.

### Audit Events
- `rights_content_viewed` — content_id, language, actor (anonymous OK for public content).

---

## Module J — AI Legal Information Assistant (URM-FR-011)

**Priority:** P1 | **PRD Section:** §12 | **Status:** CONFIRMED

### Objective
Allow users to ask plain-language questions about legal processes, rights and case-related topics, with answers grounded in approved legal sources and citations.

### Business Rules
- **BR-J-01:** Every substantive legal answer must include source citation (statute, section, version, effective date).
- **BR-J-02:** If no approved source supports the answer, the system must abstain: *"I cannot find a verified answer in our legal sources. Please speak to a lawyer or our support team."*
- **BR-J-03:** Responses must not be presented as legal advice or court decisions.
- **BR-J-04:** Free-form model knowledge must not be used as legal source (PRD §12 RAG rule).
- **BR-J-05:** Disclaimer visible in every interaction: *"AI-provided information. Not legal advice. Not a court decision."*
- **BR-J-06:** Every AI response must be routed through citation validation before being shown.

### Audit Events
- `ai_query_made` — actor, timestamp, query_hash (not query text for privacy), source_ids_retrieved.
- `ai_response_abstained` — actor, timestamp, reason.

---

## Module K — Citation-Grounded Legal RAG (URM-FR-012)

**Priority:** P1 | **PRD Section:** §12 | **Status:** CONFIRMED

*See detailed specification in AI_REQUIREMENTS.md (URM-AI-001 through URM-AI-017)*

### Summary
RAG pipeline for legal information retrieval. Retrieval from approved sources is mandatory before any generation. Citations must be validated before responses are returned. Abstention is required when sources are insufficient.

---

## Module L — Legal Aid Application (URM-FR-013)

**Priority:** P0 | **PRD Section:** §9 | **Status:** CONFIRMED

### Objective
Allow families to submit a legal-aid request that enters the DLSA triage and matching workflow.

### Inputs
- Case identifier
- Nature of legal assistance required (described in family's words)
- Language preference
- Contact preferences

### Outputs
- Legal-aid request record created
- Case status updated to `LEGAL_AID_REQUESTED`
- DLSA notified
- Family acknowledgement

### Business Rules
- **BR-L-01:** Legal-aid eligibility is assessed by DLSA human officer — NOT automatically by the system.
- **BR-L-02:** The system may show information about general legal-aid eligibility criteria (source-cited) but must not auto-approve or auto-deny.
- **BR-L-03:** Duplicate legal-aid requests for the same case must be detected and flagged.

---

## Module M — Lawyer / PLV Matching & Assignment (URM-FR-014)

**Priority:** P0 | **PRD Section:** §9 | **Status:** CONFIRMED

### Objective
Match legal-aid requests to available verified lawyers or PLVs based on location, language, case type, availability and DLSA jurisdiction.

### Matching Factors (PRD §9, PROPOSED specifics)
- District / jurisdiction alignment
- Language capability
- Case type / offence category
- Current caseload
- SLA compliance history
- Availability flag

### Business Rules
- **BR-M-01:** Matching suggestions are presented to DLSA officer for human approval — not auto-assigned.
- **BR-M-02:** Only VERIFIED professionals (approved by DLSA) may appear in matching results.
- **BR-M-03:** The system must NEVER display an unverified professional as verified (PRD §9).
- **BR-M-04:** Lawyer/PLV profile data is maintained by DLSA and is not editable by the professional without approval.
- **BR-M-05:** SLA timer starts when DLSA confirms assignment.
- **BR-M-06:** Escalation triggered when SLA window is approaching (configured threshold — not hard-coded).

### Audit Events
- `lawyer_matched` — actor (DLSA officer), lawyer_id, case_id, matching_factors_used.
- `assignment_confirmed` — actor, lawyer_id, case_id, sla_deadline.

---

## Module N — DLSA Workflow & Queue Management (URM-FR-015)

**Priority:** P0 | **PRD Section:** §9 | **Status:** CONFIRMED

### Objective
Provide DLSA officers with a complete queue of legal-aid requests, triage tools, assignment controls, SLA monitoring, and escalation management.

### Features
- Case queue with filters (status, district, urgency, SLA status, case type)
- Triage: mark as priority / standard / defer
- Assignment: select lawyer/PLV from matched list; confirm assignment
- SLA timer per case with breach alerts
- Escalation: route to supervisor when SLA breached
- URC-ready export (PRD §17)

### Business Rules
- **BR-N-01:** DLSA officer cannot access legal-aid cases from other districts without explicit admin escalation.
- **BR-N-02:** SLA policies are configurable per district — not hard-coded (PRD §9).
- **BR-N-03:** All triage decisions are logged.
- **BR-N-04:** URC export must follow defined format (format to be specified with government in Phase 15).

---

## Module O — Prison-side Confirmation Workflow (URM-FR-016)

**Priority:** P1 | **PRD Section:** §6, §17 | **Status:** CONFIRMED

### Objective
Allow authorized prison officers to confirm or deny specific factual queries about custody status, transfer, arrest and release facts — without general access to case management.

### Scope
- Restricted fact confirmation only.
- No write access to case records.
- No access to AI screening results.
- No access to legal-aid workflow.

### Inputs
- Specific query: Is [accused person name / platform ID] currently in custody at this facility?
- Transfer / release confirmation request.

### Outputs
- CONFIRMED / DENIED / UNABLE TO CONFIRM
- Confirmation timestamp
- Confirming officer identifier (role, not name, in family-facing view)

### Business Rules
- **BR-O-01:** Prison officer sees only the specific query — not the full case record.
- **BR-O-02:** All confirmations are human-generated — no auto-confirmation by the system.
- **BR-O-03:** Confirmation is advisory — it does not constitute an official government record.
- **BR-O-04:** Family is notified when prison confirmation is received.
- **BR-O-05:** False confirmations are a governance risk; all confirmations are audit-logged with officer identifier.

### Audit Events
- `prison_confirmation_requested` — case_id, query_type, timestamp.
- `prison_confirmation_received` — officer_role, facility_id, result, timestamp.

---

## Module P — Surety / Bail Bond Navigator (URM-FR-017)

**Priority:** P2 | **PRD Section:** §17 | **Status:** CONFIRMED

### Objective
Provide plain-language, source-cited information about the surety and bail-bond process using verified support resources.

### Business Rules
- **BR-P-01:** All content must be sourced from approved legal sources.
- **BR-P-02:** Must not recommend specific bondsmen, individuals or financial products.
- **BR-P-03:** Must not represent a guarantee of bail.
- **BR-P-04:** Links to NALSA/SLSA/DLSA official resources only.

---

## Module Q — Notification System (URM-FR-018)

**Priority:** P0 | **PRD Section:** §8 | **Status:** CONFIRMED

*See detailed specification in NOTIFICATION_REQUIREMENTS.md*

### Notification Types
- Case update (status change)
- Document request (from PLV or DLSA)
- Lawyer assigned
- Hearing reminder
- Escalation alert
- Prison confirmation received

---

## Module R — Voice / IVR Access (URM-FR-019)

**Priority:** P1 | **PRD Section:** §22 | **Status:** CONFIRMED

*See detailed specification in VOICE_REQUIREMENTS.md*

### Summary
Feature-phone-friendly IVR supporting Tamil and English. Same backend as web. Low-literacy prompts. Fallback to human/PLV. Voice responses must not sound like final legal advice.

---

## Module S — Multilingual Support (URM-FR-020)

**Priority:** P1 | **PRD Section:** §23 | **Status:** CONFIRMED

### Launch Languages
- Tamil (priority — pilot context, PRD §35)
- English

### Future Languages
- Hindi, Telugu, Kannada, Malayalam — post-pilot extensibility (PRD §22 implies future expansion)

### Business Rules
- **BR-S-01:** All user-facing content must be available in all supported languages.
- **BR-S-02:** Language selection persists per user session and account.
- **BR-S-03:** Translations must be professionally verified — not auto-translated without review.
- **BR-S-04:** Legal content translations require legal reviewer sign-off.
- **BR-S-05:** Font strategy: Inter + Noto Sans Tamil (or equivalent — PRD §23).

---

## Module T — Accessibility (URM-FR-021)

**Priority:** P0 | **PRD Section:** §8, §23 | **Status:** CONFIRMED

*See detailed specification in ACCESSIBILITY_REQUIREMENTS.md*

---

## Module U — Admin / Government Dashboard (URM-FR-022)

**Priority:** P1 | **PRD Section:** §6 | **Status:** CONFIRMED

### Features
- District-level analytics
- State-level analytics
- Queue status monitoring
- SLA compliance reporting
- Case volume and trend charts
- Legal-aid allocation metrics
- Escalation management
- URC-ready export
- AI performance summary (override rate, abstention rate)

### Business Rules
- **BR-U-01:** Dashboard shows aggregated metrics — no individual family-level data to admin users unless they are the assigned DLSA officer.
- **BR-U-02:** Export formats must support URC reporting requirements (format to be defined with government in Phase 15).
- **BR-U-03:** AI audit metrics are visible to legal reviewer and system admin only.

---

## Module V — Audit & Governance Center (URM-FR-023)

**Priority:** P0 | **PRD Section:** §15, §21 | **Status:** CONFIRMED

*See detailed specification in AUDIT_REQUIREMENTS.md*

---

## Module W — Analytics / KPI Reporting (URM-FR-024)

**Priority:** P1 | **PRD Section:** §31 | **Status:** CONFIRMED

### KPIs (from PRD §31)
1. Median time from legal-aid request to verified assignment
2. Percentage of cases successfully routed
3. Percentage of substantive legal responses with valid citations
4. Document extraction accuracy on labelled test set
5. AI-human disagreement / override rate
6. False-positive and false-negative rates (ML components only)
7. SLA breach rate
8. Notification delivery success rate
9. Family comprehension / task-completion rate
10. Voice interaction completion rate
11. System availability and incident response metrics

---

## Module X — Government Pilot Management (URM-FR-025)

**Priority:** P1 | **PRD Section:** §33 | **Status:** CONFIRMED

### Features
- Pilot district/state configuration
- Pilot user onboarding management
- Pilot KPI dashboard
- Pilot governance checklist
- Incident escalation management

### Business Rules
- **BR-X-01:** Pilot runs on synthetic data before live; transition to real data requires formal approval.
- **BR-X-02:** Pilot scope is locked to one state / one district (PRD §33) unless formally expanded.
- **BR-X-03:** Government partnership must be formally documented before pilot is claimed as government-endorsed.

---

## Module — Human-in-the-Loop Review (URM-FR-026)

**Priority:** P0 | **PRD Section:** §15 | **Status:** CONFIRMED

### Objective
Provide legal reviewers and lawyers with a structured workflow to review, agree with, or override AI screening signals, with mandatory reason logging.

### Workflow
```
AI signal generated
  → Queued for human review
  → Reviewer sees: signal, confidence, facts detected, facts missing, rule/source
  → Reviewer: AGREE or OVERRIDE
  → If OVERRIDE: reason required (free text + category)
  → Decision recorded in audit log
  → Evaluation dataset updated (under approved governance)
  → Family shown reviewed result
```

### Business Rules
- **BR-HRL-01:** No AI result is shown to the family before human review for HIGH/MEDIUM confidence signals.
- **BR-HRL-02:** Override reason is mandatory — system blocks submission without reason.
- **BR-HRL-03:** AI-human disagreements are never hidden in the audit log.
- **BR-HRL-04:** Disagreements are used only for audit and improvement — not publicly visible.
- **BR-HRL-05:** Legal reviewer is responsible for rule version approval; lawyer is responsible for case-level review.

### Audit Events
- `human_review_completed` — reviewer_role, signal_id, decision, override_reason, timestamp.
