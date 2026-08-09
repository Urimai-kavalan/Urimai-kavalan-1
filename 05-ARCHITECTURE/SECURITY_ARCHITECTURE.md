# Urimai Kaavalan — Security Architecture

> **Phase:** 3 — Application Architecture and Implementation Foundation

## 1. Boundary Defenses
- **CORS:** Strictly configured to only allow requests from the trusted frontend origin.
- **Helmet:** Sets secure HTTP headers (HSTS, X-Frame-Options, etc.).
- **Rate Limiting:** (To be implemented) Prevents brute-force attacks on auth endpoints.

## 2. Data Validation
- **Zod:** All incoming API payloads are validated against strict Zod schemas before reaching business logic.
- **Error Handling:** The centralized error handler scrubs stack traces from 500 responses in production.

## 3. Audit Logging
- **CaseEvents:** Crucial actions (status changes, human overrides of AI) are immutably written to the `CaseEvent` table for auditability.

## 4. File Uploads (Document UX)
- Uploads are not placed in public web directories. They will be stored securely (e.g., S3 or equivalent) and fetched via authenticated API requests.
