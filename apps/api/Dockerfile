FROM node:20-slim AS base
WORKDIR /repo

COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages/db/package.json packages/db/package.json
RUN npm ci

COPY packages/db packages/db
COPY apps/api apps/api

RUN npm run generate --workspace=packages/db
RUN npm run build --workspace=apps/api

EXPOSE 4000
CMD ["sh", "-c", "npx prisma migrate deploy --schema packages/db/prisma/schema.prisma && node apps/api/dist/main.js"]
