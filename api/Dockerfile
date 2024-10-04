FROM node:21-alpine AS base

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base as build
COPY . ./
RUN pnpm run build

FROM build AS run
COPY . ./

CMD ["pnpm", "run", "start:prod"]