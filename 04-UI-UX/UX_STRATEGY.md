# Urimai Kaavalan — UX Strategy

> **Phase:** 2 — UI/UX Design System and User Experience
> **Source:** Phase 0 & Phase 1 PRD Analysis

---

## 1. UX Vision

Urimai Kaavalan must serve as a **trustworthy, calming, and highly accessible digital bridge** between families of undertrial prisoners and India’s justice ecosystem. It must de-escalate anxiety by providing clear, reliable information and pathways to human assistance, without ever implying that the AI replaces human judgment or official legal decisions.

## 2. Primary User Problems
- **Fear & Confusion:** Families are often terrified by the criminal justice system and overwhelmed by legal jargon.
- **Information Asymmetry:** Families struggle to know case status, rights, and next steps.
- **Access Barriers:** Low digital literacy, feature phone usage, and language barriers (Tamil vs. English legalese) prevent effective access to legal aid.
- **Uncertainty of Outcome:** Desperation makes families vulnerable to false promises. The platform must maintain strict integrity regarding potential outcomes.

## 3. User Goals
- **Citizen/Family:** Quickly find out where their relative is, understand the charges, learn their basic rights, and request verified free legal aid.
- **Para-Legal Volunteer (PLV):** Easily intake new cases in the field, verify documents, and monitor their assigned queue.
- **Legal-Aid Lawyer:** Rapidly understand a case via AI briefs, review screening signals, communicate with the family, and track SLAs.
- **DLSA Officer:** Triage incoming requests efficiently, match cases to verified professionals, and monitor SLA compliance across the district.

## 4. User Mental Models
- Families view the system as a **"Helper" or "Guide"**, not a "Judge."
- The interface must reinforce this model: "We will help you gather information and connect you to a lawyer who can advise you."
- Interactions should feel like a guided conversation or step-by-step wizard, rather than a complex enterprise dashboard.

## 5. Digital Literacy Considerations
- Use recognizable iconography paired with text labels (never icons alone).
- Use progressive disclosure: show only what is needed right now.
- Forms must be broken into small, logical steps.
- Error messages must tell the user exactly what to do next in plain language.
- Provide a persistent, highly visible "Voice Help" or "Call a PLV" escape hatch.

## 6. Trust Considerations
- Avoid "tech startup" aesthetics (e.g., dark mode neon, excessive glassmorphism). Use a clean, institutional, yet approachable civic-tech design language.
- Prominently display source citations for all legal information.
- Clearly differentiate AI-generated summaries from official government data and human-entered notes.
- Use explicit visual boundaries (e.g., "AI Assistant" badge vs. "Verified Case Status" badge).

## 7. Legal Sensitivity Considerations
- **Never use definitive outcome language** (e.g., "You are eligible for bail").
- Use advisory language (e.g., "Potential factors identified — a lawyer will review").
- Include persistent, unobtrusive disclaimers on AI-generated content.

## 8. Core Strategies
- **Accessibility by Default:** Exceed WCAG 2.1 AA. Design for high contrast, large touch targets, and screen reader semantic clarity from day one.
- **Mobile-First:** The vast majority of citizen users will access via budget Android smartphones. Layouts must prioritize a 360px width viewport.
- **Multilingual Parity:** Tamil and English are first-class citizens. UI components must accommodate text expansion in Tamil without breaking.
- **Voice-First Integration:** IVR is not an afterthought; it is a parallel journey. The web UI must reflect concepts and terms consistent with the IVR flow.
- **Human Escalation:** At any point of friction or confusion, escalating to a human (PLV or support) must be a single tap away.
