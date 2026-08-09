# Urimai Kaavalan — Notification Requirements

> **Phase:** 1 — PRD & Acceptance Criteria
> **Source:** 03-PRD/01_URIMAI_KAAVALAN_GOVERNMENT_PRD.pdf (§8, §10, §31)

---

## Notification Principles

Notifications keep families informed without requiring them to constantly check the platform. They are critical for engagement and reducing anxiety, but must be culturally appropriate, clear, and respect user privacy.

---

## URM-NOT-001 — Supported Channels

**Priority:** P0 | **PRD Section:** §8 | **Status:** CONFIRMED

### Requirements
- The primary notification channel for families is SMS (or equivalent widely accessible mobile messaging, such as WhatsApp, pending government pilot constraints). **[PROPOSED: Default to SMS for maximum reach on feature phones]**
- The platform must also support in-app notifications (visible in the Family Portal or Legal-Aid Portal).
- Email notifications must be supported for professional roles (Lawyers, DLSA Officers, Admins).

---

## URM-NOT-002 — Language Personalization

**Priority:** P0 | **PRD Section:** §8, §23 | **Status:** CONFIRMED

### Requirements
- Notifications sent to family users must be delivered in the `language_preference` specified during intake or in their profile.
- Templates must be managed centrally and translated professionally (not auto-translated on the fly).

---

## URM-NOT-003 — Trigger Events

**Priority:** P0 | **PRD Section:** §8, §9, §10 | **Status:** CONFIRMED

### Requirements
The system must trigger notifications for the following events:
- **Case Created:** Acknowledgment to family (Family).
- **Intake Completed:** PLV completes intake; family notified (Family).
- **Document Request:** Information or document needed (Family).
- **Screening Complete & Reviewed:** Advisory signal ready for viewing (Lawyer, then Family).
- **Legal Aid Requested:** Confirmation (Family); alert to DLSA (DLSA).
- **Lawyer Assigned:** Family notified with contact details; Lawyer notified of new case (Family, Lawyer).
- **Hearing Scheduled:** Reminder sent to family (Family).
- **SLA Escalation:** Alert triggered when SLA is approaching breach (DLSA, Supervisor).
- **Prison Confirmation:** Notification that custody status has been updated (Family).

---

## URM-NOT-004 — Privacy in Notifications

**Priority:** P0 | **PRD Section:** §21 | **Status:** PROPOSED

### Requirements
- Notifications (especially SMS) must NOT include highly sensitive PII or specific legal allegations in plain text.
- Standard format: *"Update on Case [ID]: A lawyer has been assigned. Log in or call to view details."*
- Links in SMS must be secure and require authentication or verification to access case details.

---

## URM-NOT-005 — Notification Delivery Tracking

**Priority:** P1 | **PRD Section:** §31 | **Status:** CONFIRMED

### Requirements
- The system must track the status of notifications (Sent, Delivered, Failed).
- Notification delivery success rate is a key KPI (PRD §31).
- If SMS delivery fails, the system must log the failure and rely on the in-app notification fallback.
- Retry logic must be implemented for transient gateway errors.
