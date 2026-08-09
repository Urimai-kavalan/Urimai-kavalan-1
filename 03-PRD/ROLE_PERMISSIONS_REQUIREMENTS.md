# Urimai Kaavalan — Role & Permission Requirements

> **Phase:** 1 — PRD & Acceptance Criteria
> **Source:** 03-PRD/01_URIMAI_KAAVALAN_GOVERNMENT_PRD.pdf (§5, §21)
> **Principle:** Least privilege at all times (PRD §21)

---

## Roles Defined

| Role ID | Role Name | Interface | PRD Source |
|---|---|---|---|
| ROLE-01 | Family User | Family Portal | PRD §5 |
| ROLE-02 | PLV (Para-Legal Volunteer) | Legal-Aid Portal | PRD §5 |
| ROLE-03 | Legal-Aid Lawyer | Legal-Aid Portal | PRD §5 |
| ROLE-04 | DLSA / SLSA Officer | Admin / Legal-Aid Portal | PRD §5 |
| ROLE-05 | Prison Officer | Prison-side Channel (restricted) | PRD §5 |
| ROLE-06 | Legal Reviewer | Reviewer Portal | PRD §5 |
| ROLE-07 | State / District Admin | Admin Portal | PRD §5 |
| ROLE-08 | System Admin / Auditor | Restricted Admin | PRD §5 |
| ROLE-09 | Legal Aid Applicant | Family Portal (sub-state of ROLE-01) | PROPOSED |
| ROLE-10 | Platform Security Admin | Restricted Admin | PROPOSED |

> **Note:** ROLE-09 and ROLE-10 are proposed extensions of the 8 PRD roles to support implementation detail. They do not introduce new capabilities beyond the PRD.

---

## Role Matrix

### ROLE-01 — Family User

**Authentication:** Required (email/phone OTP or equivalent — method to be confirmed in Phase 3)

| Module | Permission |
|---|---|
| Landing page | VIEW (unauthenticated) |
| Case intake | CREATE own case |
| Case search | SEARCH own cases only |
| Case dashboard | VIEW own cases only |
| Document upload | UPLOAD to own cases |
| Document OCR | VIEW extracted fields for own documents; CORRECT own fields |
| Legal rights library | VIEW (all content) |
| AI assistant | QUERY (all legal topics) |
| Legal-aid application | SUBMIT for own case |
| Notification | VIEW own notifications |
| Voice/IVR | ACCESS (links to same case) |
| Surety navigator | VIEW |
| Audit logs | NO ACCESS |
| Admin dashboard | NO ACCESS |
| Prison confirmation | NO ACCESS (receives result only) |
| Lawyer profiles | VIEW assigned lawyer (name and contact only after assignment) |

**Data Visibility:**
- Own case records only.
- No visibility into other families' cases.
- No visibility into lawyer assignment queue.
- No visibility into AI internal scores or rule details.

**Escalation Path:** Family User → PLV → DLSA Officer

---

### ROLE-02 — PLV (Para-Legal Volunteer)

**Authentication:** Required (DLSA-managed credential)

| Module | Permission |
|---|---|
| Case intake | VIEW + COMPLETE assigned incomplete cases |
| Case search | SEARCH within assigned district |
| Case dashboard | VIEW assigned cases |
| Document upload | UPLOAD on behalf of family |
| Document OCR | VIEW + VERIFY fields for assigned cases |
| Legal rights library | VIEW |
| AI assistant | QUERY |
| Legal-aid application | SUBMIT on behalf of family |
| Notification | VIEW case notifications for assigned cases |
| Voice/IVR | N/A (PLV is the human fallback) |
| DLSA queue | VIEW (own assignments only) |
| Audit logs | VIEW own actions only |
| Admin dashboard | NO ACCESS |
| Prison confirmation | NO ACCESS |

**Data Visibility:**
- Cases assigned to them within their district.
- Family contact details for assigned cases (for field support).
- Not visible to other PLVs' assignments.

**Constraints:**
- PLV cannot approve their own intake completions.
- PLV cannot override legal screening results.
- PLV cannot reassign cases.

---

### ROLE-03 — Legal-Aid Lawyer

**Authentication:** Required (DLSA-managed credential with bar number)

| Module | Permission |
|---|---|
| Case queue | VIEW assigned cases |
| Case dashboard | VIEW assigned cases (full legal view) |
| Documents | VIEW all documents for assigned cases |
| AI brief | VIEW AI-generated brief for assigned case |
| Legal sources | VIEW all approved sources and citations |
| Screening result | VIEW + REVIEW + AGREE/OVERRIDE |
| Human review | SUBMIT review decisions |
| Tasks | CREATE + UPDATE legal tasks for own cases |
| Resolution | RECORD outcome for assigned cases |
| Notifications | VIEW case notifications |
| Admin dashboard | NO ACCESS |
| Other families | NO ACCESS |
| Audit logs | VIEW own actions |

**Override Rights:**
- May override AI screening signals for their assigned cases.
- Override requires documented reason.

**Constraints:**
- Cannot access cases not assigned to them by DLSA.
- Cannot modify lawyer registry or their own profile without DLSA approval.

---

### ROLE-04 — DLSA / SLSA Officer

**Authentication:** Required (government credential — mechanism to be defined)

| Module | Permission |
|---|---|
| Case queue | VIEW all cases in jurisdiction |
| Legal-aid requests | VIEW + TRIAGE + ASSIGN |
| Lawyer/PLV registry | VIEW + MANAGE (within jurisdiction) |
| SLA monitoring | VIEW + CONFIGURE (within district) |
| Escalation | TRIGGER escalation to supervisor |
| URC export | GENERATE |
| Admin dashboard | VIEW district analytics |
| Notifications | SEND to lawyers/PLVs in jurisdiction |
| Prison confirmation | REQUEST on behalf of case |
| AI audit metrics | VIEW override rate, abstention rate |
| Audit logs | VIEW all actions within jurisdiction |
| System configuration | NO (restricted to System Admin) |

**Data Visibility:**
- All cases and legal-aid requests within their district.
- Lawyer/PLV profiles within jurisdiction.
- Aggregated analytics for their district.

**Constraints:**
- Cannot access cases or data from other districts without escalation.
- Cannot modify legal source registry.

---

### ROLE-05 — Prison Officer

**Authentication:** Required (institutional credential — mechanism to be defined; GOV-APPROVAL required)

| Module | Permission |
|---|---|
| Prison confirmation channel | RESPOND to specific queries only |
| Case dashboard | NO ACCESS |
| Documents | NO ACCESS |
| AI results | NO ACCESS |
| Legal aid | NO ACCESS |
| Admin dashboard | NO ACCESS |

**Data Visibility:**
- Sees only the specific question asked: e.g., "Is [name / ID] currently in custody at this facility?"
- Does not see the full case record.
- Does not see the reason for the query.

**Constraints:**
- Strict read-query / write-response only.
- Cannot initiate any case action.
- All responses are logged.

---

### ROLE-06 — Legal Reviewer

**Authentication:** Required (legal authority credential)

| Module | Permission |
|---|---|
| Legal source registry | VIEW + APPROVE / REJECT sources |
| Rule versions | REVIEW + APPROVE / REJECT rule versions |
| AI disagreements | VIEW + REVIEW all AI-human disagreements |
| Screening results | VIEW all screening results |
| Audit logs | VIEW all AI and legal review audit events |
| Admin dashboard | VIEW AI performance metrics |
| Family case data | VIEW (anonymized unless specific review required) |
| System configuration | NO |

**Authority:**
- Legal source approval is a governance gate — no source may be used without legal reviewer sign-off.
- Rule version approval is a governance gate — no rule version may go live without sign-off.

---

### ROLE-07 — State / District Admin

**Authentication:** Required (government admin credential)

| Module | Permission |
|---|---|
| Admin dashboard | VIEW full state/district analytics |
| KPI dashboard | VIEW all KPIs |
| SLA policies | CONFIGURE for jurisdiction |
| Pilot management | VIEW + CONFIGURE pilot settings |
| Notifications | CONFIGURE system-wide templates |
| Audit logs | VIEW operational audit events |
| Legal source registry | NO (Legal Reviewer role) |
| Security config | NO (Security Admin role) |

---

### ROLE-08 — System Admin / Auditor

**Authentication:** Required (MFA mandatory) — restricted access

| Module | Permission |
|---|---|
| User management | CREATE / DEACTIVATE / MODIFY all user accounts |
| Role assignment | ASSIGN roles |
| System configuration | FULL |
| Audit logs | VIEW ALL (immutable) |
| Security alerts | VIEW + RESPOND |
| Data export | AUTHORIZED exports only |
| Legal rules | NO (Legal Reviewer role) |
| Case data | READ-ONLY access for support/audit purposes |

**Constraints:**
- All System Admin actions are logged immutably.
- No System Admin action can be taken without a logged reason.
- Dual-person authorization recommended for destructive actions (PROPOSED — requires security review).

---

### ROLE-10 — Platform Security Admin

**Authentication:** Required (MFA mandatory)

| Module | Permission |
|---|---|
| Security configuration | FULL |
| Audit logs (security) | VIEW + EXPORT |
| Incident management | MANAGE |
| Access revocation | EXECUTE |
| Penetration test results | VIEW |
| System Admin actions | NO (separate role) |

---

## Permission Summary Matrix

| Module | ROLE-01 | ROLE-02 | ROLE-03 | ROLE-04 | ROLE-05 | ROLE-06 | ROLE-07 | ROLE-08 |
|---|---|---|---|---|---|---|---|---|
| Landing | VIEW | VIEW | VIEW | VIEW | VIEW | VIEW | VIEW | VIEW |
| Case intake | CREATE | COMPLETE | NO | NO | NO | NO | NO | READ |
| Case search | OWN | DISTRICT | ASSIGNED | DISTRICT | NO | ANON | ALL | ALL |
| Case dashboard | OWN | ASSIGNED | ASSIGNED | DISTRICT | NO | READ | SUMMARY | READ |
| Document upload | OWN | ASSIGNED | NO | NO | NO | NO | NO | NO |
| Document view | OWN | ASSIGNED | ASSIGNED | DISTRICT | NO | ANON | NO | READ |
| AI assistant | QUERY | QUERY | QUERY | VIEW | NO | FULL | NO | NO |
| Human review | NO | LIMITED | FULL | VIEW | NO | FULL | NO | NO |
| Legal-aid queue | NO | VIEW | VIEW | FULL | NO | NO | SUMMARY | READ |
| Lawyer assign | NO | NO | NO | FULL | NO | NO | VIEW | NO |
| Prison confirm | NO | NO | NO | REQUEST | RESPOND | NO | NO | NO |
| Admin dashboard | NO | NO | NO | DISTRICT | NO | AI-VIEW | FULL | FULL |
| Audit logs | OWN | OWN | OWN | DISTRICT | OWN | AI-AUDIT | OPS | FULL |
| System config | NO | NO | NO | DISTRICT-SLA | NO | NO | PILOT | FULL |

---

## Authentication Requirements

| Role | Auth Method | MFA | Credential Issuer |
|---|---|---|---|
| Family User | Email/Phone OTP | Optional | Platform |
| PLV | Username/Password + OTP | Required | DLSA |
| Legal-Aid Lawyer | Username/Password + OTP | Required | DLSA |
| DLSA Officer | Government credential | Required | Government |
| Prison Officer | Institutional credential | Required | Government / GOV-APPROVAL |
| Legal Reviewer | Username/Password + OTP | Required | Platform / Legal authority |
| State Admin | Government credential | Required | Government |
| System Admin | Username/Password | MFA mandatory | Platform Security |

> **Note:** Specific authentication mechanism (OAuth, OTP, SSO) to be confirmed in Phase 3 (Foundation). PRD specifies "secure authentication/session management" (§21) without specifying the mechanism.

---

## Authorization Boundaries — Critical Rules

1. **Family user data isolation:** A family user must never be able to access another family's data under any circumstances.
2. **Prison officer restriction:** Prison officers see only the specific confirmation query — not the case record.
3. **Lawyer data isolation:** A lawyer sees only their assigned cases.
4. **DLSA district isolation:** DLSA officer sees only their jurisdiction; cross-district access requires explicit escalation.
5. **Role elevation prevention:** No role can self-elevate permissions.
6. **Audit immutability:** No role — including System Admin — can delete or modify audit logs.
7. **Legal source gate:** No legal content is published without Legal Reviewer sign-off.
8. **AI advisory enforcement:** No role can configure the AI to produce definitive legal decisions.
