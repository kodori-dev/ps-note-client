FROM public.ecr.aws/docker/library/node:20.11.1-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY /public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --chown=nextjs:nodejs .next/standalone ./
COPY --chown=nextjs:nodejs .next/static ./.next/static

RUN addgroup -S nextjs && adduser -S nextjs -G nextjs -u 1001

RUN --mount=type=secret,id=NEXT_PUBLIC_API_BASE_URL \
    --mount=type=secret,id=NEXT_PUBLIC_SERVER_URL \
    --mount=type=secret,id=NEXT_PUBLIC_FRONT_URL \
    --mount=type=secret,id=NEXT_PUBLIC_SESSION_PW \
    --mount=type=secret,id=NEXT_PUBLIC_ADMIN_ID1 \
    --mount=type=secret,id=NEXT_PUBLIC_ADMIN_ID2 \
    --mount=type=secret,id=NEXT_PUBLIC_RELEASE \
    --mount=type=secret,id=SENTRY_AUTH_TOKEN \
    --mount=type=secret,id=NEXT_PUBLIC_CDN_URL \
    chown nextjs:nodejs /run/secrets/* && \
    chmod 400 /run/secrets/*


USER nextjs

EXPOSE 3000

ENV PORT 3000

# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

RUN --mount=type=secret,id=NEXT_PUBLIC_API_BASE_URL \
    export NEXT_PUBLIC_API_BASE_URL=$(cat /run/secrets/NEXT_PUBLIC_API_BASE_URL) && \
    echo "API URL Loaded"

RUN --mount=type=secret,id=NEXT_PUBLIC_SERVER_URL \
    export NEXT_PUBLIC_SERVER_URL=$(cat /run/secrets/NEXT_PUBLIC_SERVER_URL) && \
    echo "Server URL Loaded"

RUN --mount=type=secret,id=NEXT_PUBLIC_FRONT_URL \
    export NEXT_PUBLIC_FRONT_URL=$(cat /run/secrets/NEXT_PUBLIC_FRONT_URL) && \
    echo "Front URL Loaded"

RUN --mount=type=secret,id=NEXT_PUBLIC_SESSION_PW \
    export NEXT_PUBLIC_SESSION_PW=$(cat /run/secrets/NEXT_PUBLIC_SESSION_PW) && \
    echo "Session PW Loaded"

RUN --mount=type=secret,id=NEXT_PUBLIC_ADMIN_ID1 \
    export NEXT_PUBLIC_ADMIN_ID1=$(cat /run/secrets/NEXT_PUBLIC_ADMIN_ID1) && \
    echo "Admin ID1 Loaded"

RUN --mount=type=secret,id=NEXT_PUBLIC_ADMIN_ID2 \
    export NEXT_PUBLIC_ADMIN_ID2=$(cat /run/secrets/NEXT_PUBLIC_ADMIN_ID2) && \
    echo "Admin ID2 Loaded"

RUN --mount=type=secret,id=NEXT_PUBLIC_RELEASE \
    export NEXT_PUBLIC_RELEASE=$(cat /run/secrets/NEXT_PUBLIC_RELEASE) && \
    echo "Release Loaded"

RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN \
    export SENTRY_AUTH_TOKEN=$(cat /run/secrets/SENTRY_AUTH_TOKEN) && \
    echo "Sentry Auth Token Loaded"

RUN --mount=type=secret,id=NEXT_PUBLIC_CDN_URL \
    export NEXT_PUBLIC_CDN_URL=$(cat /run/secrets/NEXT_PUBLIC_CDN_URL) && \
    echo "CDN URL Loaded"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]