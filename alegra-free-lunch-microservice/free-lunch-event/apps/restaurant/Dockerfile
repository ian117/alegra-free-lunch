FROM node:alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY .sequelizerc ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -g pnpm

RUN pnpm install

COPY apps/restaurant apps/restaurant
COPY libs libs

RUN cd apps/restaurant && pnpm install

RUN pnpm run build restaurant