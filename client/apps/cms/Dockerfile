FROM node:20-alpine AS deps
WORKDIR /app

COPY client/package.json client/package-lock.json ./
COPY client/apps/cms/package.json ./apps/cms/
COPY client/packages/ ./packages/

RUN npm ci

FROM deps AS build

COPY client/apps/cms/ ./apps/cms/
COPY client/tsconfig.base.json ./

RUN npm run build:cms

FROM caddy:2.7-alpine AS runtime

ENV ASSET_DIR=/srv
ENTRYPOINT ["/docker-entrypoint.sh"]

COPY --from=build /app/apps/cms/dist /srv
COPY client/apps/cms/Caddyfile /etc/caddy/Caddyfile

COPY client/env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

EXPOSE 80
