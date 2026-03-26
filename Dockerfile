FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-slim
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.js ./
COPY --from=build /app/db.js ./
RUN mkdir -p /app/data/uploads
VOLUME /app/data
EXPOSE 3001
ENV NODE_ENV=production
CMD ["node", "server.js"]
