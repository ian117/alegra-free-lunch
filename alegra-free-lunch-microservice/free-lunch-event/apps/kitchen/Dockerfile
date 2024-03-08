FROM node:alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -g pnpm

RUN pnpm install

COPY apps/kitchen apps/kitchen
COPY libs libs

RUN cd apps/kitchen && pnpm install

RUN pnpm run build kitchen