FROM node:18 AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY frontend/package.json frontend/pnpm-lock.yaml* ./

RUN pnpm install --no-frozen-lockfile

COPY frontend .

RUN pnpm build

FROM nginx:alpine

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html