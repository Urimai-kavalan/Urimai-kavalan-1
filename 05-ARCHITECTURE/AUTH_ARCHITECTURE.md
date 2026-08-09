# Urimai Kaavalan — Auth Architecture

> **Phase:** 3 — Application Architecture and Implementation Foundation

## 1. Authentication Flow
- **Mechanism:** JSON Web Tokens (JWT).
- **Primary Identifier:** `phoneNumber`.
- **Flow:** User authenticates via password (or OTP). The server validates and returns a short-lived JWT. The client stores the JWT (e.g., in memory or HttpOnly cookie) and attaches it as a `Bearer` token to subsequent API requests.

## 2. Role-Based Access Control (RBAC)
- **Enforcement:** Middleware (`requireRole`) on the Express backend intercepts requests.
- **Roles:** Defined strictly by the `Role` enum in the Prisma schema (CITIZEN, LAWYER, PLV, ADMIN, etc.).
- **Response:** Unauthorized accesses return standard `401 Unauthorized` or `403 Forbidden` JSON responses.

## 3. Security Measures
- **Hashing:** bcrypt is used for all passwords (salt rounds = 12).
- **Token Secret:** Managed via environment variable `JWT_SECRET`. Never hardcoded.
