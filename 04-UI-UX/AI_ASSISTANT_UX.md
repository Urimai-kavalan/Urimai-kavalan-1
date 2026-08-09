# Urimai Kaavalan — AI Assistant UX (LawBot)

> **Phase:** 2 — UI/UX Design System and User Experience
> **Context:** Conversational interface for legal information (RAG).

---

## 1. Visual Distinction
- The AI chat interface must be visually distinct from official case updates and human messages.
- Use a distinct avatar (e.g., an abstract icon, not a human face, police badge, or judge's gavel).
- Use a distinct background color for AI messages (e.g., very light purple `--color-ai-bg`).

## 2. Onboarding & Expectations
- **Welcome Message:** "Hello. I am the Urimai Kaavalan Legal Assistant. I can help explain laws and rights based on official legal texts. I am not a lawyer, and I cannot give legal advice for your specific case."
- **Suggested Chips:** Provide 3-4 clickable chips for common questions (e.g., "What is a surety?", "How long can police investigate?") to guide users toward supported topics.

## 3. Anatomy of an AI Response
Every response from the AI MUST contain three parts:
1. **The Explanation:** Plain language text answering the question.
2. **The Source Citation:** A clearly delineated box or footer beneath the text. Example: 
   > 📄 **Source:** Code of Criminal Procedure (CrPC) Section 436A (Effective 2005)
3. **The Disclaimer:** Small, muted text at the very bottom of every bubble: *"AI-generated. Not legal advice."*

## 4. Communication of Uncertainty (Abstention)
When the AI cannot find a verified answer:
- **Tone:** Honest and helpful, not apologetic or robotic.
- **Message:** "I couldn't find a verified answer to that question in our legal sources. It's best to speak with a lawyer for this."
- **Action:** Immediately offer a "Contact PLV" or "Apply for Legal Aid" button beneath the refusal.

## 5. Trust and Feedback Mechanisms
- **Copy to Clipboard:** Allow users to easily copy the explanation and source.
- **Feedback:** Thumbs up / Thumbs down icons below each response.
- **Report:** A "Report Issue" flag. If clicked, it prompts: "Is this answer incorrect, confusing, or dangerous?" and logs the query for Admin review.
- **Escalation:** A persistent "Speak to a Human" button visible at all times within the chat view.
