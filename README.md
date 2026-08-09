# Urimai Kaavalan 

**Protecting Legal Rights Through AI-Assisted Access**

Urimai Kaavalan is an AI-assisted legal-access and undertrial-support platform designed for citizens in India. It aims to bridge the legal literacy gap by providing verified, legally sound explanations of rights, and connecting families of undertrial prisoners with Para-Legal Volunteers (PLVs) and lawyers.

**Important**: This is a prototype system designed with strict safety boundaries. "AI assists. Verified law explains. Humans verify. Courts decide."

---

## System Architecture
This project is a monorepo utilizing npm workspaces:
- `apps/web`: React / Vite frontend using Tailwind CSS.
- `apps/api`: Express.js backend using Prisma ORM.
- `packages/validation`: Zod schemas shared across both web and api.

## Running the Application Locally (Docker)

The easiest way to run Urimai Kaavalan is using Docker Compose, which spins up the PostgreSQL database, the Express API, and the React frontend.

```bash
# 1. Copy the example environment file and fill in your own values
cp .env.example .env

# 2. Start the stack
docker-compose up --build
```

- **Frontend**: http://localhost:8080
- **Backend**: http://localhost:4000
- **Database**: `postgresql://postgres:<your_password>@localhost:5432/urimai_kaavalan`

> See `.env.example` for all required environment variables. The actual `.env` file must never be committed to version control.

Upon startup, the API container automatically applies Prisma migrations and runs a database seed script to provide **development/demo users** (not for production use):

| Role    | Phone        | Password     |
|---------|--------------|--------------|
| Admin   | `9999999999` | `password123` |
| Citizen | `9876543210` | `password123` |
| PLV     | `8888888888` | `password123` |

> ⚠️ **These are demo credentials for local development only.** Do not use them in any staging or production environment.

## Running Locally (Without Docker)

If you prefer to run services individually:

1. **Database**: Ensure you have PostgreSQL running. Copy `apps/api/.env.example` to `apps/api/.env` and fill in your `DATABASE_URL` and `JWT_SECRET`.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Database Setup**:
   ```bash
   cd apps/api
   npx prisma migrate dev
   npm run seed
   ```
4. **Start Development Servers**:
   ```bash
   # From the root directory
   npm run dev -w apps/api
   npm run dev -w apps/web
   ```

## Running Tests

```bash
# Run API integration tests
cd apps/api
npm run test
```

## Security & Disclaimers
This software explicitly prohibits exposing AI models as primary legal counsel. All LLM responses are injected with safety boundaries and disclaimers. 
