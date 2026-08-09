# Urimai Kaavalan — Phase 3 Testing Strategy

> **Phase:** 3 — Application Architecture and Implementation Foundation

---

## 1. Unit Testing
- **Framework:** Vitest.
- **Frontend (`apps/web`):** React components are tested using `@testing-library/react`. We verify accessibility roles, text content, and button states.
- **Backend (`apps/api`):** Services and utility functions (e.g., auth, hashing) are tested in isolation.
- **Validation (`packages/validation`):** Zod schemas are tested directly against positive and negative payloads.

## 2. API Integration Testing
- **Framework:** Supertest.
- **Scope:** Verifies the Express routes, middlewares, error handler, and RBAC implementation.
- **Database:** Uses a separate test database or mocked Prisma client.

## 3. End-to-End Testing (Future)
- **Framework:** Playwright (to be implemented in Phase 4/5).
- **Scope:** Full user journeys (e.g., citizen intake, lawyer override).

## 4. CI/CD Integration
- Tests must pass before any merge to the `main` branch.
- Test coverage reports will be generated.
