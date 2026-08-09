# Urimai Kaavalan — Voice / IVR Requirements

> **Phase:** 1 — PRD & Acceptance Criteria
> **Source:** 03-PRD/01_URIMAI_KAAVALAN_GOVERNMENT_PRD.pdf (§22)

---

## Core Voice Principle

Voice is not a secondary feature — it is a **primary access channel** for families who cannot access a smartphone or data connection.

The voice channel must share the same backend services as the web portal. Families using voice must have access to the same case information and legal rights content as web users.

---

## URM-VOICE-001 — Feature-Phone IVR Call Flow

**Priority:** P1 | **PRD Section:** §22 | **Status:** CONFIRMED

### Requirements
- The IVR must work on feature phones using DTMF (keypad) input as the primary interaction mode.
- Speech input must be supported as an optional enhancement (when STT is available and reliable).
- The call flow must be navigable by a caller who has never used the system before.
- Maximum menu depth: 3 levels before an action or fallback is triggered. **[PROPOSED]**
- Each menu option must be repeated once if no input is received.
- After 2 missed inputs, the system must offer human fallback.

### Primary IVR Menu (Proposed Flow — requires pilot validation)
```
Main Menu:
  1. Know your case status
  2. Know your legal rights
  3. Apply for legal aid / connect to PLV
  4. Speak in a different language
  5. Speak to a support person
```

### Call Flow Rules
- All flows must use the same backend API as the web portal.
- Case lookup via IVR uses platform case ID (entered via keypad) OR name + district combination.
- If case not found: offer to connect to PLV.
- If backend service unavailable: inform caller and offer callback or PLV connection.

---

## URM-VOICE-002 — Language Selection via Voice

**Priority:** P1 | **PRD Section:** §22 | **Status:** CONFIRMED

### Requirements
- Language selection must be the first option presented to the caller.
- Initial greeting must be in Tamil and English (bilingual).
- Caller can switch language at any point by pressing the language change key.
- Language preference is not persisted for anonymous callers — selected fresh each call.
- Language preference linked to case ID when caller identifies themselves.

---

## URM-VOICE-003 — Speech-to-Text (STT) Architecture

**Priority:** P1 | **PRD Section:** §22 | **Status:** CONFIRMED

### Requirements
- STT must be integrated via a provider-agnostic adapter interface.
- STT must support Tamil and English at launch.
- STT provider can be changed without altering call flow business logic.
- STT confidence threshold must be configurable — if below threshold, fall back to DTMF/keypad.
- STT must handle:
  - Background noise common in rural settings
  - Tamil regional accent variation
  - Numbers (case ID, dates) spoken aloud
- STT provider: **not specified in PRD** — to be selected in Phase 10 after evaluation. **[PROPOSED: provider-agnostic evaluation required]**

### Low-Reliability Handling
- If STT fails for 2 consecutive inputs: automatically offer keypad entry.
- If keypad also fails: connect to human/PLV support.

---

## URM-VOICE-004 — Text-to-Speech (TTS) Architecture

**Priority:** P1 | **PRD Section:** §22 | **Status:** CONFIRMED

### Requirements
- TTS must produce clear, natural-sounding Tamil and English speech.
- TTS must be accessible: clear pronunciation, appropriate pace, no excessive jargon.
- TTS provider: provider-agnostic adapter (same principle as STT and LLM).
- Legal information spoken via TTS must include explicit spoken disclaimer: *"This is general legal information. It is not legal advice or a court decision."*
- Complex legal section numbers must be spoken clearly digit-by-digit.
- Case status must be spoken in plain language — not system enum labels.

---

## URM-VOICE-005 — Low-Literacy Interaction Design

**Priority:** P1 | **PRD Section:** §22 | **Status:** CONFIRMED

### Requirements
- All voice prompts must assume the caller may be unable to read.
- Prompts must use simple vocabulary: Grade 4-5 equivalent reading level in spoken form.
- No prompt should assume prior knowledge of legal terms.
- Critical terms (e.g., bail, FIR, remand) must be briefly explained when used.
- Prompts must not overwhelm: maximum 2-3 options per menu level.
- Confirmation prompts must repeat key information back to the caller before any action.

### Sample Prompt Design
- ❌ BAD: *"Please enter your CNR number to access the ICJS-linked case record."*
- ✅ GOOD: *"To hear your case information, press 1 and then enter your case number using the keypad."*

---

## URM-VOICE-006 — Fallback to Human / PLV Support

**Priority:** P1 | **PRD Section:** §22 | **Status:** CONFIRMED

### Fallback Triggers
- Caller enters unrecognized input 2 consecutive times.
- Caller explicitly selects "Speak to a person" option.
- STT and DTMF both fail to recognize input.
- Case not found after 2 lookup attempts.
- Case status query returns an AI response with LOW confidence.
- AI abstention occurs.

### Fallback Behaviour
- Announce: *"Connecting you to a support person. Please wait."*
- If no PLV/support agent available: announce expected wait or offer callback. **[Callback mechanism: PROPOSED]**
- All fallback events logged in `voice_sessions` audit record.

---

## URM-VOICE-007 — Voice Responses Not as Final Legal Advice

**Priority:** P0 | **PRD Section:** §22 | **Status:** CONFIRMED

### Requirements
- Every legal information response via IVR must include a spoken disclaimer.
- The disclaimer must be mandatory — cannot be skipped by caller preference.
- Sample disclaimer (Tamil and English): *"This is general legal information. It is not legal advice. Please speak to a lawyer for advice about your specific situation."*
- IVR must NEVER state: "Your relative will get bail" or "You are eligible for bail."
- Case status is factual (e.g., "Your case is currently under review") — not a legal prediction.

---

## URM-VOICE-008 — Shared Backend with Web

**Priority:** P0 | **PRD Section:** §22 | **Status:** CONFIRMED

### Requirements
- The voice channel must call the same backend APIs as the web portal.
- No separate voice-only data store.
- Case updates made via web are immediately available on voice channel and vice versa.
- All voice-initiated actions (legal-aid request via IVR) are reflected in the case record.

---

## URM-VOICE-009 — Voice Session Audit Records

**Priority:** P0 | **PRD Section:** §22 | **Status:** PROPOSED

### Requirements
- Every IVR session must be logged in `voice_sessions`.
- Logged data: session_start, session_end, language_selected, menu_path, outcome.
- Caller identity: hashed caller ID only — raw phone number must NOT be stored permanently.
- If caller authenticates (provides case ID): session linked to case.
- Voice session logs are audit records — immutable.
- Voice sessions with legal information delivery must note which content was provided (content_id, not transcripts).

**Privacy note:** Full call transcripts must NOT be stored without explicit consent and formal legal review. This requirement is deferred to Phase 13/15.

---

## URM-VOICE-010 — Tamil Language Support

**Priority:** P1 | **PRD Section:** §35 | **Status:** CONFIRMED

### Requirements
- Tamil must be a fully supported language at pilot launch.
- All IVR prompts available in Tamil.
- All rights library content available in Tamil.
- All case status messages available in Tamil.
- Legal reviewer must sign off on Tamil translations of legal content.

---

## URM-VOICE-011 — English Language Support

**Priority:** P1 | **PRD Section:** §22 | **Status:** CONFIRMED

### Requirements
- English must be fully supported at pilot launch.
- All content available in English.
- English TTS must use Indian-English pronunciation models where available. **[PROPOSED]**

---

## URM-VOICE-012 — Future Language Extensibility

**Priority:** P3 | **PRD Section:** §22 | **Status:** CONFIRMED

### Requirements
- Voice architecture must support addition of new languages without a system rebuild.
- Language prompts must be stored in an i18n-compatible format, not hard-coded.
- STT and TTS adapter must support language configuration by code (e.g., `ta-IN`, `en-IN`, `hi-IN`).
- Future language additions require: translation, legal review of translated content, STT/TTS capability confirmation.

---

## Telecom Provider

**Not specified in PRD** — to be selected in Phase 10 subject to:
- India Telecom regulatory approval (DOT/TRAI requirements)
- Government-approved IVRS/telecom infrastructure for pilot
- Provider-agnostic adapter so provider can be changed

---

## Voice Architecture Diagram (Conceptual)

```
Caller (feature phone / mobile)
  ↓
Telecom / IVRS Provider (adapter layer)
  ↓
IVR Call Controller (call flow logic)
  ↓
STT Engine (provider-agnostic)
  ↓
Backend API (same as web)
  ├── Case Service
  ├── Legal Knowledge Service
  ├── Legal-Aid Service
  └── Audit Service
  ↓
TTS Engine (provider-agnostic)
  ↓
Voice Response to Caller
```

---

## Consent Requirements

- Voice consent for data collection must be obtained at the start of each authenticated session.
- Consent script must be reviewed by legal counsel before pilot.
- Consent mechanism subject to formal legal/security review (PRD §21).
