FROM node:20-alpine AS deps
WORKDIR /app

COPY client/package.json client/package-lock.json ./
COPY client/apps/content/package.json ./apps/content/
COPY client/packages/ ./packages/

RUN npm ci

FROM deps AS build

COPY client/apps/content ./apps/content
COPY client/tsconfig.base.json ./

RUN npm run build:content

FROM deps AS runtime

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/apps/content/dist ./dist

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD node ./dist/server/entry.mjs
