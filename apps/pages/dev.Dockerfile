FROM node:22.16.0-alpine AS deps
WORKDIR /app

COPY package.json        package-lock.json  ./
COPY apps/pages/package.json  ./apps/pages/

COPY packages/* ./packages/*

RUN npm install --workspace=apps/pages

FROM node:22.16.0-alpine AS runner
WORKDIR /app

COPY --from=deps /app/node_modules  ./node_modules
COPY apps/pages ./apps/pages

COPY tsconfig.base.json ./

WORKDIR /app/apps/pages

EXPOSE 5173
CMD ["npm", "run", "dev"]
