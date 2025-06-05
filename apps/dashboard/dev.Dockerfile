FROM node:22.16.0-alpine AS deps
WORKDIR /app

COPY package.json        package-lock.json  ./
COPY apps/dashboard/package.json ./apps/dashboard/

COPY packages/* ./packages/*

RUN npm install --workspace=apps/dashboard

FROM node:22.16.0-alpine AS runner
WORKDIR /app

COPY --from=deps /app/node_modules  ./node_modules
COPY apps/dashboard ./apps/dashboard

WORKDIR /app/apps/dashboard

EXPOSE 5173
CMD ["npm", "run", "dev"]
