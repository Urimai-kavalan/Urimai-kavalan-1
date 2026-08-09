# Urimai Kaavalan — Technology Decisions

> **Phase:** 3 — Application Architecture and Implementation Foundation
> **Status:** Approved for Foundation

This document outlines the core technology stack chosen for Urimai Kaavalan based on the requirements from Phases 0–2.

---

## 1. Monorepo Architecture
- **Tool:** npm workspaces (built-in to Node) + Turborepo (optional for caching, but sticking to standard npm workspaces for simplicity first).
- **Rationale:** The system requires a distinct API backend (for integration flexibility, AI processing, and strict security) and a frontend SPA. A monorepo ensures shared types, validation schemas (Zod), and configuration are easily managed across the boundary.

## 2. Frontend Stack
- **Core Framework:** React 18 + TypeScript.
- **Build Tool:** Vite.
- **Rationale:** React is the industry standard with massive ecosystem support. Vite provides a significantly faster developer experience than Create React App or Webpack. TypeScript is mandatory for type safety across the monorepo.
- **Routing:** React Router v6.
- **Styling:** Tailwind CSS.
- **Rationale for Tailwind:** Allows rapid implementation of the strict design tokens defined in Phase 2 without writing sprawling custom CSS. It maps perfectly to the CSS variables in `DESIGN_TOKENS.md`.

## 3. Backend Stack
- **Runtime:** Node.js (v20+ LTS).
- **Framework:** Express.js + TypeScript.
- **Rationale:** Express is mature, heavily audited, and straightforward. While NestJS was considered, Express allows for a more minimal, custom adapter architecture (required by URM-INT-001) without heavy opinionated boilerplate.

## 4. Database & ORM
- **Database:** PostgreSQL.
- **Rationale:** The relational nature of the data (Cases → Events → Documents → Users) requires a robust RDBMS. PostgreSQL is open-source, government-friendly, and supports `pgvector` for future AI/RAG embeddings.
- **ORM:** Prisma.
- **Rationale:** Provides excellent TypeScript integration and schema migration management.

## 5. Validation & Types
- **Schema Validation:** Zod.
- **Rationale:** Zod allows us to define a schema once and infer TypeScript types from it. We will share these schemas in the `packages/validation` workspace so both the React frontend and Express backend use the exact same validation logic.

## 6. Authentication & Security
- **Auth Flow:** JWT-based session management (stateless or db-backed sessions, to be finalized in Auth architecture) + bcrypt for password hashing.
- **Security Middleware:** Helmet, express-rate-limit.

## 7. Testing
- **Unit/Integration:** Vitest (Frontend + Backend).
- **API Testing:** Supertest.
- **Rationale:** Vitest is much faster than Jest and integrates natively with Vite configurations.

## 8. Summary of Dependencies
*We are explicitly avoiding unnecessary heavy libraries. We are NOT installing complex state management (like Redux) until proven necessary (React Context/Zustand will suffice).*
