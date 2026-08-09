# Urimai Kaavalan — Voice UX (IVR)

> **Phase:** 2 — UI/UX Design System and User Experience
> **Context:** Interactive Voice Response for feature phone users.

---

## 1. Voice Persona
- **Tone:** Professional, calm, empathetic, and clear.
- **Pacing:** Slower than conversational speech. Pause slightly longer after numbers (like case IDs or sections).
- **Language Level:** Grade 4-5 vocabulary.

## 2. Interaction Model
- **Primary Input:** DTMF (Keypad) for robust reliability.
- **Secondary Input:** Speech-to-Text (STT) for ease of use (e.g., "Say your case number or enter it on the keypad").
- **Barge-in:** Users must be able to press a key at any time to interrupt the prompt and move forward.

## 3. Error Recovery (The "Three Strikes" Rule)
1. **First Failure (No input or STT failure):** Re-prompt with clearer instructions. *"I didn't catch that. Please enter the number using your keypad."*
2. **Second Failure:** Re-prompt with an example. *"Please enter your 5-digit case ID, like 1-2-3-4-5, followed by the hash key."*
3. **Third Failure:** Graceful exit to human fallback. *"Let me connect you to someone who can help."* (Routes to PLV).

## 4. State Management
- **Listening State:** (Internal to IVR) Audio cue (brief tone) to indicate the system is waiting for speech.
- **Processing State:** If an API call (like fetching AI RAG response) takes > 2 seconds, play a comfort audio cue (e.g., "Checking our records...").

## 5. Mandatory Disclaimers
Before delivering any legal information (e.g., reading a rights card via TTS), the IVR must play a short, unskippable prefix:
> *"The following is legal information, not advice for your specific case."*

## 6. Language Switching
- Language choice is the very first node of the IVR tree.
- "For Tamil, press 1. For English, press 2." (Spoken in their respective languages).
- A persistent escape key (e.g., `*`) should always return the user to the main menu where language can be changed.
