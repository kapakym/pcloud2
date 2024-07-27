import json
import face_recognition
import cv2
from datetime import datetime
import socket_server
import uuid

async def findFaces(image_path):
    if image_path:
        await socket_server.sio.emit('message', json.dumps({'message:':f'{image_path}', 'status':'process', 'time':f'{datetime.now()}'}))
    else:
        await socket_server.sio.emit('message', json.dumps({'message:':'file not found', 'status':'error', 'time':f'{datetime.now()}'}))
        return

    await socket_server.sio.emit('message', json.dumps({'message':'read file', 'status':'process', 'time':f'{datetime.now()}'}))

    image = cv2.imread(image_path)

    await socket_server.sio.emit('message', json.dumps({'message:':'convert to BGR', 'status':'process', 'time':f'{datetime.now()}'}))

    rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    await socket_server.sio.emit('message', json.dumps({'message:':'searching faces...', 'status':'process', 'time':f'{datetime.now()}'}))

    face_locations = face_recognition.face_locations(rgb_image)

    await socket_server.sio.emit('message', json.dumps({'message:':'Save faces...', 'status':'process', 'time':f'{datetime.now()}'}))
    # Проход по всем найденным лицам
    for i, face_location in enumerate(face_locations):
        top, right, bottom, left = face_location
    
        # Извлечение лица
        face_image = image[top:bottom, left:right]
    
        # Сохранение лица в файл
        face_filename = f"temp_faces/{uuid.uuid4()}.jpg"
        cv2.imwrite(face_filename, face_image)
        #print(f"Сохранено лицо {i+1} в файл {face_filename}")

    await socket_server.sio.emit('message', json.dumps({'message:':'task completed', 'status':'completed', 'time':f'{datetime.now()}'}))

