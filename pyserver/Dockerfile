# Используем официальный образ Python 3.9 на базе slim для меньшего размера
FROM python:3.9-slim

RUN pip install --upgrade pip
# Устанавливаем зависимости системы, необходимые для dlib и face_recognition

# Установим системные зависимости
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    libsm6 \
    libxext6 \
    libxrender-dev \
    build-essential \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libboost-python-dev \
    tesseract-ocr \
    tesseract-ocr-rus \
    && rm -rf /var/lib/apt/lists/*

# Создаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файлы зависимостей
COPY requirements.txt .

# Устанавливаем зависимости Python
RUN pip install --no-cache-dir -r requirements.txt

# Копируем файлы приложения
COPY . .

# Указываем команду для запуска сервера
# CMD ["uvicorn", "rest_server:app", "--host", "0.0.0.0", "--port", "6000"]
# Команда для запуска Quart через hypercorn
CMD ["hypercorn", "rest_server:app", "--bind", "0.0.0.0:6000"]

# Открываем порт 8000 для доступа
EXPOSE 6000
