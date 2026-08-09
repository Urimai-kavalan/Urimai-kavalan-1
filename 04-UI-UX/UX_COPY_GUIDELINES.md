# Urimai Kaavalan — UX Copy Guidelines

> **Phase:** 2 — UI/UX Design System and User Experience
> **Context:** Plain language standards to reduce cognitive load and legal jargon.

---

## 1. Core Principles
- **Clarity over Legalese:** Use everyday language.
- **Active Voice:** Tell the user who is doing what.
- **Empathetic but Neutral:** Do not promise outcomes; offer structured support.
- **Action-Oriented CTAs:** Buttons should describe exactly what happens when clicked.

## 2. Bad vs. Better Examples

### Errors
- ❌ **Bad:** `Error 500: Internal Server Exception.`
- ✅ **Better:** `We're having trouble connecting right now. Please try again in a few minutes.`
- ❌ **Bad:** `Validation failed. Input string was not in a correct format.`
- ✅ **Better:** `Please enter a valid 10-digit phone number.`

### Buttons
- ❌ **Bad:** `Submit` (Too generic for critical actions)
- ✅ **Better:** `Request Legal Aid` or `Save Information`
- ❌ **Bad:** `Execute Action`
- ✅ **Better:** `Assign Lawyer`

### AI Responses & Disclaimers
- ❌ **Bad:** `Based on the facts, the accused is eligible for bail under Section 436A.` (Implies guarantee)
- ✅ **Better:** `Based on the information provided, Section 436A regarding maximum detention may apply. A lawyer will need to review this.`
- ❌ **Bad:** `I am an AI lawyer here to help you win your case.`
- ✅ **Better:** `I am an AI assistant. I can explain legal information, but I cannot give legal advice for your specific case.`

### Status Messages
- ❌ **Bad:** `Case status updated to Pending_Assignment.`
- ✅ **Better:** `We are currently finding an available lawyer for your case.`
- ❌ **Bad:** `Document OCR verification successful.`
- ✅ **Better:** `Your document has been verified by our team.`

### Empty States
- ❌ **Bad:** `No records found in database [Table: Requests].`
- ✅ **Better:** `You don't have any pending requests right now.`

## 3. Tamil Localization Rule
- Do not rely on machine translation for UX copy.
- Translate the *intent* (plain language), not the literal English phrasing.
- E.g., Ensure the Tamil equivalent of "Under Review" conveys "Humans are looking at this carefully" rather than a clinical "Status: Inspection".
