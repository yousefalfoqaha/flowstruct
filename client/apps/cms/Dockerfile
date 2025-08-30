FROM node:20-alpine AS deps
WORKDIR /app

COPY client/package.json client/package-lock.json ./
COPY client/apps/cms/package.json ./apps/cms/
COPY client/packages/*/package.json ./packages/*/

RUN npm ci

FROM deps AS build

COPY client .
RUN npm run build:cms

FROM caddy:2.7-alpine AS runtime

COPY --from=build /app/apps/cms/dist /srv
COPY client/apps/cms/Caddyfile /etc/caddy/Caddyfile

COPY client/env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 80
