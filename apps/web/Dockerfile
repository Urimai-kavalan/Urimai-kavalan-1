# Base Node image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy root package.json and workspace configurations
COPY package.json package-lock.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/validation/package.json ./packages/validation/

# Install dependencies (only for web and its shared packages)
RUN npm ci

# Copy the rest of the web and validation source
COPY apps/web ./apps/web
COPY packages/validation ./packages/validation

# Build the web app
RUN npm run build -w apps/web

# Production server stage (using Nginx)
FROM nginx:alpine

# Copy the built assets from the builder stage
COPY --from=builder /app/apps/web/dist /usr/share/nginx/html

# Copy custom Nginx configuration (enables /api/ proxy and SPA routing)
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
