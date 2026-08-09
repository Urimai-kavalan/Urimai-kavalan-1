# Urimai Kaavalan — Citizen (Family) UX

> **Phase:** 2 — UI/UX Design System and User Experience
> **Target Role:** Family Member / Citizen

---

## 1. UX Goals
- **Reduce Anxiety:** The interface must feel calm, authoritative (but not punitive), and supportive.
- **Extreme Simplicity:** Information must be presented in "bite-sized" pieces. Avoid walls of text.
- **Clear Next Steps:** The user should never wonder, "What do I do now?"

## 2. Key Interfaces (Mobile Web primary)

### 2.1 The Case Dashboard (FAM-01)
This is the heart of the citizen experience.
- **Top Section (Hero):** Large, highly legible status badge (e.g., "Under Review").
- **Action Card:** Immediately below the status. If an action is required (e.g., "Upload FIR"), it is a large button. If no action is needed, it says "We are working on your case. We will notify you when there is an update."
- **At-a-Glance Fact File:** 
  - Accused Name
  - Police Station
  - FIR No. (if known)
  - Assigned Lawyer (First name only + contact button)
- **Bottom Navigation:** Fixed to the bottom of the screen (Home, Timeline, Documents, Rights).

### 2.2 Case Timeline (FAM-03)
- Vertical line connecting circular nodes.
- **Completed steps:** Solid green node.
- **Current step:** Pulsing blue node (subtle pulse, respecting reduced-motion).
- **Future steps:** Grayed out.
- Events must be written in active voice: "A lawyer was assigned to your case," NOT "Case updated to ASSIGNED status."

### 2.3 Legal Aid Application (FAM-06)
- **Minimize Typing:** Use large tap-targets for common requests (e.g., "I need help getting bail", "I need to understand the charges").
- **Language Preference:** Explicitly ask "What language do you want the lawyer to speak?" using a visual selector.

## 3. Communication Style
- Use "We" and "You". Example: "We have received your document. You will hear from us soon."
- Avoid words like "Plaintiff", "Respondent", "Jurisprudence". Use "You", "The Police", "The Court", "The Law".

## 4. AI Interaction (LawBot)
- The chat interface must be cleanly separated visually from official case data (e.g., using a subtle purple AI background token).
- Responses must always end with: *"This is information based on the law, not a final decision for your case."*
