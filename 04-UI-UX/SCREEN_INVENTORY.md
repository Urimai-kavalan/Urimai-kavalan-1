# Urimai Kaavalan — Screen Inventory

> **Phase:** 2 — UI/UX Design System and User Experience
> **Context:** Master list of all unique screens and views required for the platform.

---

## 1. Public & Onboarding (PUB)
| ID | Screen Name | Description | Key Components |
|---|---|---|---|
| PUB-01 | Landing Page | Main entry point, public value prop, major CTAs | Hero, CTAs, Feature Cards, Disclaimer |
| PUB-02 | Language Selector | Full-screen overlay or modal for initial language choice | Radio list, Confirm button |
| PUB-03 | Login / OTP | Authentication entry | Phone/Email input, OTP input, Resend |
| PUB-04 | About / Help | Static info about the platform | Accordion FAQs, Support Contact |

## 2. Family Portal (FAM)
| ID | Screen Name | Description | Key Components |
|---|---|---|---|
| FAM-01 | Case Dashboard | Primary view of case status and next actions | Status Badge, Action Card, Alerts |
| FAM-02 | Case Intake (Wizard) | Multi-step form to register a new case | Stepper, Inputs, Help Text |
| FAM-03 | Case Timeline | Chronological view of all case events | Vertical Timeline, Icons, Timestamps |
| FAM-04 | Document Center | List of uploaded documents and upload CTA | Document Cards, Status Badges |
| FAM-05 | Document Upload | Interface for uploading files/photos | File Dropzone, Camera Trigger, Progress |
| FAM-06 | Legal Aid Application | Form to request legal aid | Textarea, Language Pref, Urgency Select |
| FAM-07 | Rights Library | Browseable cards of legal rights | Grid, Audio Player, Flip Cards |
| FAM-08 | AI LawBot Chat | Conversational interface for legal questions | Chat Bubbles, Suggested Prompts, Disclaimer |
| FAM-09 | AI Screening Detail | Detailed view of the advisory screening result | Confidence Band, Extracted Facts, Source Links |
| FAM-10 | Notifications | Inbox of alerts and messages | List, Unread Badges, Timestamps |
| FAM-11 | User Profile | Settings and personal info | Form, Edit Toggle, Language Select |

## 3. Professional Portal (PRO) — (PLV, Lawyer, DLSA)
| ID | Screen Name | Description | Key Components |
|---|---|---|---|
| PRO-01 | Dashboard | High-level metrics and urgent tasks | Stat Cards, SLA Warnings, Charts |
| PRO-02 | Global Queue | Filterable list of all cases/requests in jurisdiction | Data Table, Filters, Search, Pagination |
| PRO-03 | Case Detail (Full) | Comprehensive view of a case for professionals | Tabs (Timeline, Docs, AI, Notes) |
| PRO-04 | OCR Verification | Interface to review and correct extracted data | Split View (Image left, Form right), Confidence indicators |
| PRO-05 | AI Review & Override | Interface for lawyers to agree/override screening | Diff View, Reason Textarea, Submit |
| PRO-06 | Assignment Triage | DLSA interface to match cases to lawyers | Split View (Request details, Lawyer List), Match Score |
| PRO-07 | Registry Management | View and manage PLVs/Lawyers in district | Data Table, Status Toggles |

## 4. Admin & Government (ADM)
| ID | Screen Name | Description | Key Components |
|---|---|---|---|
| ADM-01 | State Analytics | Aggregate metrics across districts | Map (optional), Bar Charts, Key Metrics |
| ADM-02 | AI Performance | Monitoring AI abstention, override, hallucination rates | Trend Graphs, Data Table |
| ADM-03 | Audit Log Viewer | Secure interface to view immutable system logs | Advanced Filters, Export Button, Code View |
| ADM-04 | Legal Source Manager | Interface to add and approve legal sources | Form, Status Workflow, Version History |
| ADM-05 | Rule Engine Config | Interface to view active legal rules (Read Only UI) | JSON Viewer, Version Diff |

## 5. Auxiliary / Edge (AUX)
| ID | Screen Name | Description | Key Components |
|---|---|---|---|
| AUX-01 | Prison Confirmation | Restricted view for prison officers | Single Question Card, Yes/No/Unknown Buttons |
| AUX-02 | Error State (404/500) | Generic fallback screen | Illustration, Plain Text, Go Home CTA |
| AUX-03 | Empty State | Used when lists/queues are empty | Illustration, Helper Text |
