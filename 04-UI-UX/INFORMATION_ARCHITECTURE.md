# Urimai Kaavalan — Information Architecture

> **Phase:** 2 — UI/UX Design System and User Experience
> **Source:** PRD §6 (Five Interfaces)

---

## 1. Public / Anonymous (Citizen)

The public unauthenticated view focuses strictly on onboarding, discovering rights, and checking case status.

```
Public Landing
├── Search Case (Requires ID / Identifiers)
├── Register New Case (Intake Form)
├── Know Your Rights (Legal Library)
│   ├── Arrest Rights
│   ├── Bail Rights
│   └── Prison Transfer Rules
├── AI LawBot (General Legal Info only, no case context)
├── About Urimai Kaavalan
└── Language Selector
```

## 2. Family / Case User (Authenticated)

Once a family member registers a case or logs in, they enter the Family Portal.

```
Family Portal (Dashboard)
├── Case Status (Hero Section)
│   ├── Next Action Needed
│   ├── Custody Status (if verified)
│   └── Assigned Lawyer (if applicable)
├── Case Timeline (Chronological History)
├── Documents Center
│   ├── Upload Document
│   └── View Processed Documents
├── Legal Screening Result (if available)
│   └── "What does this mean?" (Contextual AI explanation)
├── Request Legal Aid (Form)
├── Notifications (Alerts/Messages)
└── Profile & Settings (Language, Contact Info)
```

## 3. Para-Legal Volunteer (PLV)

PLVs focus on field work, data completion, and bridging the gap for low-literacy users.

```
PLV Portal (Dashboard)
├── My Assigned Cases
│   ├── Filter: Needs Intake Completion
│   ├── Filter: Needs Document Verification
│   └── Filter: Ready for Review
├── Case Detail View
│   ├── Complete Intake Form
│   ├── OCR Verification Interface
│   └── Contact Family
├── Register New Case (on behalf of family)
└── Notifications
```

## 4. Legal-Aid Lawyer

Lawyers focus on reviewing legal signals and taking action on assigned cases.

```
Lawyer Portal (Dashboard)
├── My Active Cases
│   └── Filter: Action Required, SLA Approaching
├── Case Detail View
│   ├── AI Screening Brief (With sources)
│   ├── Full Case Timeline
│   ├── Verified Documents
│   └── Human Review Interface (Agree/Override)
├── Case Actions
│   ├── Log Note/Action Taken
│   ├── Schedule Hearing
│   └── Resolve/Close Case
├── Legal Source Reference Library
└── Notifications
```

## 5. DLSA / SLSA Officer (Admin)

DLSA officers triage requests and manage resources for their district.

```
DLSA Portal (Dashboard)
├── Queue Management (Legal Aid Requests)
│   ├── Filter: Urgent, Overdue, New
│   ├── Match & Assign Workflow
│   └── Escalations
├── Professional Registry (Lawyers/PLVs)
│   └── Availability & Status
├── District Analytics
│   ├── SLA Compliance Rates
│   └── Case Volumes
├── URC Export Generation
└── Notifications (District-wide alerts)
```

## 6. Authorized Government User / System Auditor

Top-level monitoring without access to specific unanonymized family data (unless explicitly required for security audit).

```
Government & Audit Portal (Dashboard)
├── State / Aggregate Analytics
│   ├── Pilot KPI Dashboard
│   ├── Legal-Aid Resolution Metrics
│   └── AI Performance (Override Rates)
├── Pilot Configuration
├── Security & Audit Logs (Auditor only)
│   ├── Unauthorized Access Attempts
│   └── System Modifications
└── Legal Rule Management (Legal Reviewer only)
    ├── Source Registry Approval
    └── Rule Version Approval
```

## 7. Prison Officer (Restricted Channel)

```
Prison Confirmation Portal
├── Pending Custody Queries
│   └── Query Detail (Respond: Yes/No/Unknown)
└── Confirmation History
```
