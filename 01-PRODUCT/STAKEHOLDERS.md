# Urimai Kaavalan — Stakeholders & User Roles

> **Source:** 03-PRD/01_URIMAI_KAAVALAN_GOVERNMENT_PRD.pdf (Section 5 — Target Users & Roles)
> **Phase:** 0 — Governance & Research

---

## User Roles

*(Source: PRD Section 5 — Target Users & Roles)*

### 1. Family User

| Attribute | Detail |
|---|---|
| Primary needs | Case status, rights, documents, legal aid, updates, voice |
| Access / Interface | Family Portal (web, mobile, voice) |
| Responsibilities | Provide case information, upload documents, request legal aid |
| Important permissions | View own case(s) only; upload documents; receive notifications |
| Human-review responsibility | Verify extracted document fields; confirm case facts |

---

### 2. PLV (Para-Legal Volunteer)

| Attribute | Detail |
|---|---|
| Primary needs | Assisted intake, verification, case completion, field support |
| Access / Interface | Legal-Aid Portal |
| Responsibilities | Assist family with intake; complete incomplete cases; verify documents in field |
| Important permissions | View assigned cases; complete/verify case intake on behalf of family |
| Human-review responsibility | Verify document extractions; confirm facts before case progresses |

---

### 3. Legal-Aid Lawyer

| Attribute | Detail |
|---|---|
| Primary needs | Case queue, documents, AI brief, sources, tasks, review |
| Access / Interface | Legal-Aid Portal |
| Responsibilities | Review assigned cases; review AI-generated brief with cited sources; take legal action |
| Important permissions | View assigned case queue; access AI brief; record outcomes; override AI signals |
| Human-review responsibility | Review and agree/override AI screening signals; record reasons for override |

---

### 4. DLSA/SLSA Officer

| Attribute | Detail |
|---|---|
| Primary needs | Triage, allocation, SLA monitoring, reports, oversight |
| Access / Interface | Admin/Legal-Aid Portal |
| Responsibilities | Triage incoming requests; allocate lawyers/PLVs; monitor SLA compliance; escalate |
| Important permissions | View district/state queue; allocate assignments; configure SLA policies |
| Human-review responsibility | Escalation decisions; override allocation; SLA breach response |

---

### 5. Prison Officer

| Attribute | Detail |
|---|---|
| Primary needs | Restricted custody and case fact confirmation |
| Access / Interface | Prison-side Channel (restricted) |
| Responsibilities | Confirm custody, transfer, arrest and release-related facts upon request |
| Important permissions | Confirm or deny specific factual queries only; no write access to case data |
| Human-review responsibility | All confirmations are human-verified; no AI auto-confirmation of custody facts |

---

### 6. Legal Reviewer

| Attribute | Detail |
|---|---|
| Primary needs | Verify legal sources and rules; review AI disagreements |
| Access / Interface | Reviewer Portal |
| Responsibilities | Approve/reject legal sources in registry; review AI-human disagreements; evaluate rule accuracy |
| Important permissions | Legal source registry management; AI disagreement review queue; rule version approval |
| Human-review responsibility | Source verification; rule version sign-off; disagreement audit |

---

### 7. State/District Admin

| Attribute | Detail |
|---|---|
| Primary needs | Operational analytics and governance |
| Access / Interface | Admin Portal |
| Responsibilities | Monitor system health, queue status, SLA compliance, district-level metrics |
| Important permissions | Read-only analytics; export reports; configure district-level settings |
| Human-review responsibility | Operational oversight; escalation response |

---

### 8. System Admin / Auditor

| Attribute | Detail |
|---|---|
| Primary needs | Security, audit, configuration |
| Access / Interface | Restricted Admin |
| Responsibilities | Manage system configuration; review security audit logs; manage user accounts |
| Important permissions | Full system access within security controls; audit log access |
| Human-review responsibility | Security incident review; access control audit |

---

## Role Boundaries

- Roles are **strictly separated** (RBAC / least privilege — PRD Section 21)
- Prison officers have **read-only, query-response access** — no general case data access
- AI signals are **advisory only** — no role can delegate consequential decisions solely to AI
- Legal reviewer is distinct from legal-aid lawyer — serves governance, not case representation

---

## Roles NOT in Scope

The following roles are **not defined in the PRD** and must not be invented:

- Judges
- Police investigators
- Court registrars
- Bail bondsmen
- Any government official beyond those listed above

---

## Source Reference

PRD Section 5, Table: "Target Users & Roles" — Role, Primary needs, Access columns.
