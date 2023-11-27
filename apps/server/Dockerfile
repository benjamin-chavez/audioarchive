# # src Dockerfile: https://github.com/vercel/turbo/blob/main/examples/with-docker/apps/server/Dockerfile
# FROM node:18-alpine AS alpine
# # FROM node:20.9.0-alpine3.18 AS alpine
# # FROM public.ecr.aws/docker/library/node:20.9.0-alpine3.18 AS alpine
# # FROM public.ecr.aws/docker/library/node:20.9.0-alpine3.18 AS apline

# # setup pnpm on the alpine base
# FROM alpine as base
# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"
# RUN corepack enable
# RUN pnpm install turbo --global

# FROM base AS builder
# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
# RUN apk update
# # Set working directory
# WORKDIR /app
# COPY . .
# RUN turbo prune --scope=server --docker

# # Add lockfile and package.json's of isolated subworkspace
# FROM base AS installer
# RUN apk add --no-cache libc6-compat
# RUN apk update
# WORKDIR /app

# # First install the dependencies (as they change less often)
# COPY .gitignore .gitignore
# COPY --from=builder /app/out/json/ .
# COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
# COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
# RUN pnpm install

# # Build the project
# COPY --from=builder /app/out/full/ .
# COPY turbo.json turbo.json

# # Uncomment and use build args to enable remote caching
# # ARG TURBO_TEAM
# # ENV TURBO_TEAM=$TURBO_TEAM

# # ARG TURBO_TOKEN
# # ENV TURBO_TOKEN=$TURBO_TOKEN

# RUN turbo run build --filter=server

# # use alpine as the thinest image
# # FROM alpine AS runner
# # WORKDIR /app

# # # Don't run production as root
# # RUN addgroup --system --gid 1001 nodejs
# # RUN adduser --system --uid 1001 nextjs
# # USER nextjs

# # COPY --from=installer /app/apps/server/next.config.js .
# # COPY --from=installer /app/apps/server/package.json .

# # # Automatically leverage output traces to reduce image size
# # # https://nextjs.org/docs/advanced-features/output-file-tracing
# # # COPY --from=installer --chown=nextjs:nodejs /app/apps/server/.next/standalone ./
# # # COPY --from=installer --chown=nextjs:nodejs /app/apps/server/.next/static ./apps/server/.next/static
# # # COPY --from=installer --chown=nextjs:nodejs /app/apps/server/public ./apps/server/public

# # CMD node apps/server/server.js

# FROM base AS runner
# WORKDIR /app

# # ENV NODE_ENV production

# # Don't run production as root
# RUN addgroup --system --gid 1001 expressjs
# RUN adduser --system --uid 1001 expressjs
# USER expressjs
# COPY --from=installer /app .

# EXPOSE 5000

# CMD node apps/server/dist/app.js

# apps/server/Dockerfile

# src Dockerfile: https://github.com/vercel/turbo/blob/main/examples/with-docker/apps/server/Dockerfile
# FROM node:18-alpine AS alpine
# FROM public.ecr.aws/docker/library/node:20.10.0-alpine AS apline
FROM public.ecr.aws/docker/library/node:18-alpine AS Alpine
# FROM public.ecr.aws/turbosoft/turbo:latest AS apline

# FROM node:18-alpine AS alpine

# setup pnpm on the alpine base
FROM alpine as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g corepack
RUN corepack enable
RUN pnpm install turbo --global

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
# RUN apt-get update && apt-get install -y libc6-compat
RUN apt-get update 
# RUN apk update
# Set working directory
WORKDIR /app
COPY . .
RUN turbo prune --scope=server --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apt-get update
# RUN apt-get update && apt-get install -y libc6-compat
# RUN apk add --no-cache libc6-compat
# RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN turbo run build --filter=server

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs
COPY --from=installer /app .


# ARG NODE_ENV
# ENV NODE_ENV=${NODE_ENV}
ENV NODE_ENV=production

EXPOSE 5000

CMD node apps/server/dist/src/server.js
