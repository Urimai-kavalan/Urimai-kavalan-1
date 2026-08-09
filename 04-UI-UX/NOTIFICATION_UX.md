# Urimai Kaavalan — Notification UX

> **Phase:** 2 — UI/UX Design System and User Experience
> **Context:** In-app and external alerts.

---

## 1. Notification Types
- **Transactional / Critical:** (e.g., "Lawyer Assigned", "Hearing Tomorrow"). Delivered via SMS (primary) and highlighted in-app.
- **Informational / Status:** (e.g., "Document Processed", "Review Complete"). Delivered in-app; SMS optional based on user preference to avoid spam.

## 2. In-App Notification Center
- **Access:** Bell icon in the Top App Bar with a red unread count badge.
- **Dropdown / Drawer:** Clicking opens a list of recent notifications.
- **States:** Unread notifications have a subtle background highlight. Read notifications have a transparent background.
- **Actions:** Clicking a notification navigates the user directly to the relevant case timeline or document.

## 3. Toast Notifications (Snackbars)
- **Purpose:** Brief feedback for user actions (e.g., "Changes saved", "Document uploaded").
- **Design:** Small rectangular popup at the bottom center (mobile) or top right (desktop) of the screen.
- **Behavior:** Auto-dismisses after 3-5 seconds. Does not interrupt user flow. Must not be used for critical information that requires permanent record.

## 4. SMS UX Copy
- **Constraint:** Limited characters, plain text.
- **Format:** `[Urimai Kaavalan] Case Update: A lawyer has been assigned to Case #12345. Log in for details or call 1800-XXX-XXXX.`
- **Privacy:** Never include sensitive PII (names, specific charges) in SMS payloads.
