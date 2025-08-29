FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/${NPM_WORKSPACE}/package.json ./apps/${NPM_WORKSPACE}/
COPY packages/*/package.json ./packages/*/

RUN npm ci

COPY . .

RUN npm run build --workspace=${NPM_WORKSPACE}

FROM caddy:2.7-alpine

COPY --from=builder /app/apps/${NPM_WORKSPACE}/dist /srv
COPY client/Caddyfile /etc/caddy/Caddyfile

EXPOSE 80
