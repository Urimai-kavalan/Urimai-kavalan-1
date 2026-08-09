# Urimai Kaavalan — User Flows

> **Phase:** 2 — UI/UX Design System and User Experience
> **Context:** Step-by-step mapping of critical user journeys.

---

## Flow 1: First-Time Citizen Onboarding & Case Intake

**Entry Point:** Public Landing Page (Mobile Web)
**Goal:** Register a relative's case to begin tracking and seek legal aid.

1. **Landing Page:** User clicks "Register Case".
2. **Language Select:** Modal prompts for preferred language (Tamil / English). (State saved).
3. **Authentication:** User enters phone number → Receives OTP → Enters OTP.
4. **Intake Step 1 (Accused Details):** Enters Name, District, Police Station.
5. **Intake Step 2 (Identifiers - Optional):** Enters FIR or CNR if known.
   - *Decision:* If FIR/CNR unknown, show inline notice: "That's okay. A PLV will help find this later."
6. **Intake Step 3 (Contact Prefs):** Confirms notification number.
7. **Success State:** Case created. Status set to `NEW` or `INTAKE_INCOMPLETE`. User is redirected to **Case Dashboard**.
   - *Accessibility Note:* Screen reader announces success before redirect.

---

## Flow 2: Document Processing & OCR Verification (PLV)

**Entry Point:** PLV Dashboard
**Goal:** Verify a poorly scanned FIR uploaded by a family.

1. **Dashboard:** PLV clicks on an alert: "Document Verification Required - Case #12345".
2. **Case View:** Navigates to the Documents tab. Clicks "Verify Document".
3. **OCR Interface:** Split screen. Left side shows the image (FIR). Right side shows extracted form fields with confidence indicators (Red/Yellow/Green).
4. **Verification Action:**
   - PLV sees "Accused Name" has LOW confidence (Yellow).
   - PLV zooms into the image, reads the correct name, and types it into the input field.
   - Field state changes to "Verified by PLV".
5. **Submit:** PLV clicks "Save Verified Data".
6. **Success State:** Document marked `VERIFIED`. Core case record updates with corrected name.

---

## Flow 3: Human Review of AI Screening (Lawyer)

**Entry Point:** Lawyer Queue
**Goal:** Review an AI-generated advisory signal before the family sees it.

1. **Queue:** Lawyer clicks a case marked `UNDER_REVIEW`.
2. **AI Brief View:** System presents the AI output: "Potential bail criteria identified. Source: CrPC Sec 436A."
3. **Review Action:** Lawyer evaluates the extracted facts against the cited law.
   - *Decision Path A (Agree):* Lawyer clicks "Agree & Approve". Signal is released to family view.
   - *Decision Path B (Override):* Lawyer clicks "Override Signal".
4. **Override Flow:** A modal appears demanding a reason.
   - Lawyer types: "Statutory period not yet complete due to prior extension."
   - Submits override.
5. **Success State:** AI signal is suppressed or modified. Audit log captures the disagreement and reason. Family dashboard updates to reflect lawyer's manual assessment.

---

## Flow 4: IVR Voice Assistance Fallback

**Entry Point:** Phone Call (Feature Phone)
**Goal:** Get case status in Tamil.

1. **IVR Welcome:** "Welcome to Urimai Kaavalan. For Tamil, press 1. For English, press 2." (User presses 1).
2. **Menu:** "To check case status, press 1." (User presses 1).
3. **Identifier Entry:** "Please enter your case ID followed by the hash key, or speak the number."
   - *STT Failure:* User speaks number, but background noise causes STT failure.
   - *Retry Prompt:* "I didn't catch that. Please enter using the keypad."
   - *Second Failure:* User takes too long.
4. **Fallback:** "Connecting you to a support person to assist you."
5. **End State:** Call routed to DLSA PLV queue.

---

## Flow 5: LawBot AI Assistant Inquiry

**Entry Point:** Rights Library / LawBot Chat
**Goal:** Understand a specific legal concept (e.g., "What is a surety?").

1. **Chat Interface:** User types or speaks (via browser mic): "What is a surety?"
2. **Loading State:** Chat shows "Checking legal sources..." (communicates RAG retrieval, not general thinking).
3. **Response:** Chat bubble appears with plain-language explanation.
4. **Trust Elements Displayed:**
   - Below the text, a link: *Source: CrPC Section 441 (Effective 1973)*.
   - A persistent footer: *"AI-generated information. Not legal advice."*
5. **Follow-up:** System suggests related contextual chips: ["Who can be a surety?", "What if I can't find a surety?"].
