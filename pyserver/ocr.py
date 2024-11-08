from PIL import Image, UnidentifiedImageError
import pytesseract
import os

async def recog_text(images_path):
    try:
        # Проверяем, существует ли файл
        if not os.path.exists(images_path):
            return {"error": "Файл изображения не найден"}

        # Пытаемся открыть изображение
        image = Image.open(images_path)

        # Преобразуем изображение в режим RGB, если оно не в поддерживаемом формате
        if image.mode not in ('RGB', 'L'):  # RGB для цветных, L для черно-белых изображений
            image = image.convert('RGB')

        # Распознаем текст на изображении
        recognized_text = pytesseract.image_to_string(image, lang='rus')  # Замените 'rus' на 'eng' для английского текста

        # Выводим результат
        print("Распознанный текст:")
        print(recognized_text)
        return {"text": recognized_text, "status":"completed"}

    except UnidentifiedImageError:
        # Ошибка при попытке открыть или распознать изображение
        return {"error": "Не удалось идентифицировать файл изображения. Возможно, файл поврежден или имеет неподдерживаемый формат.", "status":"error"}

    except pytesseract.TesseractError as e:
        # Ошибка Tesseract OCR
        return {"error": f"Ошибка OCR: {str(e)}", "status":"error"}

    except TypeError as e:
        # Ошибка неподдерживаемого формата изображения
        return {"error": f"Неподдерживаемый формат изображения: {str(e)}", "status":"error"}

    except Exception as e:
        # Обработка всех других непредвиденных ошибок
        return {"error": f"Произошла непредвиденная ошибка: {str(e)}", "status":"error"}
