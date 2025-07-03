# 1. Используем базовый образ Node.js под ARM64
FROM --platform=linux/arm64 node:20-bullseye-slim

# 2. Устанавливаем зависимости для node-gyp
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y python3 make g++ || cat /var/log/apt/* 

# 3. Рабочая директория
WORKDIR /app

# 4. Копируем package.json и package-lock.json
COPY package*.json ./

# 5. Установка зависимостей
RUN npm install

# 6. Копируем остальной код
COPY . .

# 7. Сборка TypeScript
RUN npm run build

# 8. Запуск
CMD ["node", "dist/main"]



