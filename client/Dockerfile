FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY apps/*/package.json ./apps/*/
COPY packages/*/package.json ./packages/*/

RUN npm ci

COPY . .

RUN npm run build --workspace=${WORKSPACE_NAME}

CMD ["npm", "run", "--workspace=${WORKSPACE_NAME}", "preview", "--", "--host", "--port", "${PREVIEW_PORT}"]
