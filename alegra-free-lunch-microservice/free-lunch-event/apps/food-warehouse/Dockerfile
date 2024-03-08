FROM node:alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -g pnpm

RUN pnpm install

COPY apps/food-warehouse apps/food-warehouse
COPY libs libs

RUN cd apps/food-warehouse && pnpm install

RUN pnpm run build food-warehouse