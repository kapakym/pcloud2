import face_recognition
import cv2
from datetime import datetime
import uuid

async def findFaces(image_path, dest_path):

    image = cv2.imread(image_path)


    rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    
    face_locations = face_recognition.face_locations(rgb_image)

    # Проход по всем найденным лицам
    face_files = []
    for i, face_location in enumerate(face_locations):
        top, right, bottom, left = face_location
    
        # Извлечение лица
        face_image = image[top:bottom, left:right]
    
        # Сохранение лица в файл
        face_path=f"{dest_path}/"
        face_filename = f"{uuid.uuid4()}.jpg"
        face_files.append({'filename':face_filename, 'position':{'top':top, 'right':right, 'bottom':bottom, 'left':left}})
        cv2.imwrite(face_path+face_filename, face_image)

    return {'message:':'task completed', 'status':'completed', 'type':'find_faces', 'time':f'{datetime.now()}', 'faces': face_files}

