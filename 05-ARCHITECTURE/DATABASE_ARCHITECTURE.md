# Urimai Kaavalan — Database Architecture

> **Phase:** 3 — Application Architecture and Implementation Foundation

---

## 1. Relational Design
The platform uses PostgreSQL, orchestrated via Prisma ORM. The relational model enforces referential integrity across the core domains (Users, Cases, Documents).

## 2. Core Entities
- **User:** Represents all actors in the system. The `role` enum strictly controls permissions.
- **Case:** The central entity. All case progress, events, and documents are bound to a Case.
- **Document:** Secure references to files in object storage, along with metadata (e.g., OCR verification status).
- **CaseEvent:** The immutable audit trail for a case. Captures *who* did *what* and *when*.

## 3. Privacy & Security Constraints
- **Passwords:** `passwordHash` is used where applicable. OTP-only accounts (for citizens) leave this null.
- **PII:** Sensitive case facts are currently modeled minimally in this schema. Extended fields will be added iteratively.

## 4. Migration Strategy
Prisma handles database schema migrations. A shadow database is used during development to detect drift.
