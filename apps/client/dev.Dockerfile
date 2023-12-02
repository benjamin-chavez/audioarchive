# # apps/client/dev.Dockerfile

# # src Dockerfile: https://github.com/vercel/turbo/blob/main/examples/with-docker/apps/client/Dockerfile
# FROM node:18-alpine AS alpine
# # FROM node:20.9.0-alpine3.18 AS alpine
# # FROM public.ecr.aws/docker/library/node:20.9.0-alpine AS apline

# # setup pnpm on the alpine base
# # FROM alpine as base
# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"
# RUN corepack enable
# RUN pnpm install turbo --global

# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# # RUN apk add --no-cache libc6-compat
# RUN apk add libc6-compat
# RUN apk update
# # Set working directory
# WORKDIR /app
# COPY . .
# RUN turbo prune --scope=client --docker

# RUN pnpm install

# # RUN turbo run build --filter=client

# ENV NEXT_TELEMETRY_DISABLED 1

# CMD turbo run dev
# # CMD pnpm --dir ./apps/client run dev

FROM node:18-alpine AS alpine
# FROM public.ecr.aws/docker/library/node:20.9.0-alpine3.18 AS apline

# setup pnpm on the alpine base
FROM alpine as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm install turbo --global
# RUN pnpm install nodemon --global

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
COPY . .
RUN turbo prune --scope=client --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
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

# RUN turbo run build --filter=client

FROM base AS dev
WORKDIR /app
COPY --from=installer /app .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_API_HOST='http://client:3000'
ENV NODE_ENV=development
ENV DOCKER_ENV=true

EXPOSE 3000
