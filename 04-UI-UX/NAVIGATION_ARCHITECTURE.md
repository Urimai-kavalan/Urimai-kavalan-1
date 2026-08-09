# Urimai Kaavalan — Navigation Architecture

> **Phase:** 2 — UI/UX Design System and User Experience
> **Context:** Mobile-first approach for family users; Desktop/Tablet optimized for professional roles.

---

## 1. Family Portal Navigation (Mobile-First)

Given that family users will primarily access the platform via mobile devices, a Bottom Navigation bar is used for primary wayfinding, ensuring core actions are always reachable by thumb.

### Bottom Navigation (Mobile)
- **Home:** Dashboard, status, next actions.
- **Timeline:** Full chronological history.
- **Documents:** Upload and view files.
- **Rights:** Access to the rights library and AI assistant.
- **More (Hamburger):** Profile, settings, language, logout.

### Top App Bar (Mobile)
- **Left:** Urimai Kaavalan Logo (Home link).
- **Right:** Notification Bell (with unread badge), Language Switcher.

### Desktop Adaptation (Family Portal)
- Bottom navigation moves to a top-horizontal navigation bar.
- Notifications and Profile remain top-right.

---

## 2. Professional Portal Navigation (PLV, Lawyer, DLSA)

Professional users require access to multiple queues, filters, and dense information. A persistent left-hand sidebar (collapsible) is the standard pattern.

### Sidebar Navigation (Desktop/Tablet)
- **Dashboard:** Overview metrics and urgent alerts.
- **My Queue / Cases:** The primary workspace.
- **Requests:** (DLSA only) Unassigned legal aid requests.
- **Registry:** (DLSA only) Lawyer/PLV management.
- **Legal Library:** Access to approved sources and rules.
- **Reports:** (DLSA/Admin only) URC exports and analytics.

### Top App Bar (Professional)
- **Left:** Hamburger menu (to collapse/expand sidebar), Current Context (e.g., "District 4 DLSA").
- **Right:** Global Search, Notification Bell, User Avatar/Profile Dropdown.

### Mobile Adaptation (Professional Portal)
- Sidebar collapses into a full-screen hamburger menu overlay.
- Complex data tables in the "Queue" view stack into card-based lists for mobile consumption.

---

## 3. Contextual Navigation & Breadcrumbs

### Breadcrumbs
Breadcrumbs are mandatory on desktop for any page deeper than 1 level.
- Example: `Queue > Case #12345 > Document Verification`
- On mobile, breadcrumbs are replaced by a distinct "← Back" button in the Top App Bar, indicating the parent view.

### Sticky Action Bars
For long forms (e.g., Case Intake, Lawyer Assignment, Human Review Override):
- The primary Call to Action (e.g., "Submit", "Approve") must stick to the bottom of the viewport on mobile so it is always accessible without scrolling back up.
- On desktop, this action bar can stick to the bottom of the content container.

---

## 4. Accessibility & Navigation Controls

- **Skip to Content:** The very first focusable element on every page must be a hidden "Skip to main content" link for screen reader and keyboard users.
- **Focus Order:** Navigation order must logically follow the visual flow (Top-Left to Bottom-Right, or top-to-bottom for bottom-nav).
- **Language Switching:** Changing language must NOT navigate the user away from their current page or clear form state. It is an in-place content swap.
