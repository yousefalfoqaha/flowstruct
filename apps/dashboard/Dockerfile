FROM node:22.16.0-alpine
WORKDIR /app

# Copy package files relevant to your workspace
COPY package.json package-lock.json ./
COPY apps/dashboard/package.json ./apps/dashboard/
COPY packages ./packages

# Install dependencies at root
RUN npm install

EXPOSE 5173
WORKDIR /app/apps/dashboard

CMD ["npm", "run", "dev"]
