# multi-stage Dockerfile for backend
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production
COPY . .

FROM node:18-alpine
WORKDIR /app
COPY --from=build /app /app
ENV NODE_ENV=production
ENV IN_DOCKER=true
EXPOSE 3000
CMD ["node", "server.js"]

HEALTHCHECK --interval=10s --timeout=3s --retries=3 CMD wget -qO- http://localhost:3000/api/demo || exit 1
