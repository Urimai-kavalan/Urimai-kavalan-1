# Urimai Kaavalan — Form Design

> **Phase:** 2 — UI/UX Design System and User Experience
> **Context:** Guidelines for data entry and user input.

---

## 1. Input Fields
- **Labels:** Always use visible labels positioned *above* the input field. Do not rely solely on placeholder text (which disappears on typing and harms accessibility).
- **Help Text:** Positioned below the input for contextual guidance (e.g., "Enter the 10-digit number without spaces").
- **Touch Target:** Minimum height of 44px for all inputs on mobile.

## 2. Validation & Error Handling
- **Inline Validation:** Validate fields `onBlur` (when the user leaves the field). Do not yell at the user with red text while they are actively typing.
- **Error Display:** Highlight the input border in Red. Display the error message in Red text *below* the input, accompanied by a small warning icon.
- **Plain Language Errors:** Use "Please enter a valid phone number" instead of "RegEx mismatch."

## 3. Required vs. Optional
- **Marking:** Mark required fields explicitly (e.g., with an `*`).
- **Rule of Thumb:** Ask for the absolute minimum data required to proceed.

## 4. Mobile Keyboards
- Set appropriate HTML `type` and `inputmode` attributes.
- Use `type="tel"` or `inputmode="numeric"` for phone numbers to trigger the number pad on mobile devices.
- Use `type="email"` for email addresses.

## 5. Submission States
- **Loading:** When the user clicks "Submit", the button must enter a loading state (e.g., showing a spinner and disabling the button) to prevent duplicate submissions.
- **Success/Confirmation:** Provide clear feedback (toast notification or redirect to a success page) upon successful submission.
