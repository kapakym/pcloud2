FROM node:18-alpine AS build

# Обновляем пакеты и устанавливаем ffmpeg
RUN apk update && apk add ffmpeg

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --legacy-peer-deps

COPY . .

# # Генерация Prisma Client
RUN npx prisma generate

RUN npm run build



RUN mkdir -p /var/share

CMD ["sh", "-c",  "npx prisma db push && npm run start:prod"]