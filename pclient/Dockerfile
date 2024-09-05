# Этап 1: Сборка приложения Next.js
FROM node:18 AS builder

# Установите рабочую директорию
WORKDIR /app

# Копируйте package.json и package-lock.json (или yarn.lock)
COPY package*.json ./

# Установите зависимости
RUN npm install

# Копируйте остальные файлы
COPY . .

# Постройте проект
RUN npm run build

# Откройте порт, который будет использоваться приложением
EXPOSE 3000

# Запустите приложение
CMD ["npm", "start"]
