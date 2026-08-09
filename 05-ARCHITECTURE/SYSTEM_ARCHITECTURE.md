# Urimai Kaavalan — System Architecture

> **Phase:** 3 — Application Architecture and Implementation Foundation

## Overview
Urimai Kaavalan uses a modern decoupled architecture structured as a monorepo (npm workspaces).

### 1. Frontend (apps/web)
- **Stack:** React, TypeScript, Vite, Tailwind CSS.
- **Role:** The client-side application. Uses React Router for navigation. Communicates with the backend exclusively via REST APIs.

### 2. Backend (apps/api)
- **Stack:** Node.js, Express, TypeScript, Prisma.
- **Role:** The API server. Manages business logic, database connections, and external integrations (future adapters for ICJS/e-Courts).

### 3. Database (prisma)
- **Stack:** PostgreSQL.
- **Role:** The source of truth for cases, users, and audit logs.

### 4. Shared Packages (packages/*)
- **`@urimai/validation`:** Zod schemas shared between frontend and backend to guarantee consistent validation rules.
