FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY apps/*/package.json ./apps/*/
COPY packages/*/package.json ./packages/*/

RUN npm ci

COPY . .

RUN npm run build --workspace=${NPM_WORKSPACE}

CMD ["npm", "run", "--workspace=${NPM_WORKSPACE}", "preview", "--", "--host", "--port", "${PREVIEW_PORT}"]
