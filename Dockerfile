FROM node:20-alpine AS deps
WORKDIR /app

# Install dependencies (including dev) for build step
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Install production dependencies only
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy built app
COPY --from=build /app/dist ./dist

EXPOSE 4000
CMD ["node", "dist/angular-shop/server/server.mjs"]
