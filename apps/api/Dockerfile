# Base Node image
FROM node:20-alpine AS builder
RUN apk add --no-cache openssl

# Set working directory
WORKDIR /app

# Copy root package.json and workspace configurations
COPY package.json package-lock.json tsconfig.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/validation/package.json ./packages/validation/

# Install dependencies
RUN npm ci

# Copy the rest of the api and validation source
COPY apps/api ./apps/api
COPY packages/validation ./packages/validation

# Generate Prisma client and build
WORKDIR /app/apps/api
RUN npx prisma generate
RUN npx tsc
RUN npx tsc prisma/seed.ts

# Production stage
FROM node:20-alpine
RUN apk add --no-cache openssl

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/apps/api/package.json ./apps/api/
COPY --from=builder /app/packages/validation/package.json ./packages/validation/

# Install only production dependencies
RUN npm ci --omit=dev

# Copy compiled files and prisma schema
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma
COPY --from=builder /app/packages/validation ./packages/validation

# Generate prisma client for production
WORKDIR /app/apps/api
RUN npx prisma generate

EXPOSE 4000

# Start the API server
CMD ["node", "dist/server.js"]
