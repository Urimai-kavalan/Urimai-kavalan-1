# Urimai Kaavalan — Phase 0 Security Considerations

> **Source:** 03-PRD/01_URIMAI_KAAVALAN_GOVERNMENT_PRD.pdf (Section 21 — Security & Privacy)
> **Phase:** 0 — Governance & Research

---

## Important Note

This document covers **security principles only** for Phase 0. No security implementation has been created. Security implementation begins in Phase 13.

---

## Security Requirements from PRD

*(Source: PRD Section 21)*

| Requirement | Category | Notes |
|---|---|---|
| RBAC and least privilege | Access control | All roles have minimum required permissions |
| Private document storage with signed access | Storage security | Uploaded documents must not be publicly accessible |
| Encryption in transit | Transport security | All API and client communication encrypted |
| Encryption at rest | Data security | Database and file storage encrypted |
| Secure authentication / session management | Authentication | Not specified further; review needed in Phase 13 |
| Input validation | Application security | All user inputs validated server-side |
| Rate limiting | Application security | Protect against abuse and enumeration |
| Malware scanning for uploaded files | File security | Scan all uploaded documents before processing |
| Audit logs for sensitive access and changes | Audit | All security-relevant events logged |
| Backups and disaster recovery | Operations | Backup and recovery plan required for production |

---

## Data Security Principles

*(Source: PRD Section 21)*

- **Development phase:** Synthetic/composite data only — no real citizen data
- **Production phase:** Privacy, retention, consent/notice and data-sharing rules require formal legal/security review before any data is collected
- Document access requires signed URLs — no direct public storage links

---

## Privacy Principles

*(Source: PRD Section 21)*

| Principle | Description |
|---|---|
| Data minimization | Collect only what is needed for the stated workflow purpose |
| Purpose limitation | Data used only for the case management and legal-aid purposes defined in PRD |
| Consent/notice | Formal consent and notice mechanisms required before production — subject to legal review |
| Retention | Retention policies require formal legal/security review before implementation |

---

## Security Threat Areas (Phase 0 Identification Only)

The following threat areas are identified for future threat modeling (Phase 13):

| Threat Area | Risk Level | Notes |
|---|---|---|
| Unauthorized access to case data | Critical | RBAC is the primary control |
| Document exfiltration | High | Signed access URLs + audit logging |
| AI prompt injection | High | Input validation + output safety checks |
| OCR output tampering | Medium | Audit trail + user verification required |
| Legal-source registry manipulation | Critical | Legal reviewer approval gate |
| Denial of service on voice channel | Medium | Rate limiting |
| Session hijacking | High | Secure session management |
| Prison-side channel abuse | High | Restricted access; confirmation-only scope |

---

## Regulatory Considerations (Phase 0 Identification Only)

The following regulatory areas require formal legal review before production:

- India's Digital Personal Data Protection Act (DPDPA) 2023
- Government data-sharing and inter-operability standards
- Prison Act provisions relevant to data access by non-government entities
- NALSA SOP compliance for PLV and lawyer data
- State government cloud and infrastructure approval requirements

---

## Security Implementation Timeline

| Phase | Security Work |
|---|---|
| Phase 3 | Auth, RBAC skeleton, basic security baseline |
| Phase 13 | Full threat model, access control review, secure files, privacy, audit |
| Phase 15 | Pilot security review and sign-off |
| Phase 16 | Production security architecture (government-approved infrastructure) |
