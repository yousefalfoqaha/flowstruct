FROM node:22.16.0-alpine
WORKDIR /gjuplans

COPY package*.json ./
COPY tsconfig.base.json ./

COPY packages/ ./packages

COPY apps/dashboard/package.json ./apps/dashboard/package.json
COPY apps/pages/package.json ./apps/pages/package.json

RUN npm install
