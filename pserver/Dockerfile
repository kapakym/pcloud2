FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --legacy-peer-deps

COPY . .

RUN apt install ffmpeg

# # Генерация Prisma Client
RUN npx prisma generate

RUN npm run build



RUN mkdir -p /var/share

CMD ["sh", "-c",  "npx prisma db push && npm run start:prod"]