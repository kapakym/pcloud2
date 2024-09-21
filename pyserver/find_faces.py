import json
import face_recognition
import cv2
from datetime import datetime
import socket_server
import uuid

async def findFaces(image_path, dest_path, image_uuid, sid):
    print(image_path)
    if image_path:
        await socket_server.sio.emit('message',json.dumps({'message:':f'{image_path}', 'status':'process', 'time':f'{datetime.now()}'}))
    else:
        await socket_server.sio.emit('message', json.dumps({'message:':'file not found', 'status':'error', 'time':f'{datetime.now()}'}))
        return
    try:

        image = cv2.imread(image_path)


        rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    
        face_locations = face_recognition.face_locations(rgb_image)
        # face_locations2 = DeepFace.detectFace(image, detector_backend='opencv', enforce_detection=False)
        # face_locations = await asyncio.to_thread(face_recognition.face_locations, rgb_image)
        print(face_locations)

        # Проход по всем найденным лицам
        face_files = []
        for i, face_location in enumerate(face_locations):
            top, right, bottom, left = face_location
    
            # Извлечение лица
            face_image = image[top:bottom, left:right]
    
            # Сохранение лица в файл
            face_path=f"{dest_path}/temp_faces/"
            face_filename = f"{uuid.uuid4()}.jpg"
            face_files.append({'filename':face_filename, 'position':{'top':top, 'right':right, 'bottom':bottom, 'left':left}})
            cv2.imwrite(face_path+face_filename, face_image)
            #print(f"Сохранено лицо {i+1} в файл {face_filename}")

        await socket_server.sio.emit('message', json.dumps({'message:':'task completed', 'status':'completed', 'type':'find_faces', 'time':f'{datetime.now()}', 'faces': face_files, 'uuid':image_uuid}))
    except Exception as e:
        print(f"Error processing image {image_path}: {e}")
