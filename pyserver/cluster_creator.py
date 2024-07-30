import face_recognition
import os
import numpy as np
from sklearn.cluster import DBSCAN
import json
from datetime import datetime

async def create_clusters(images_path):
    # Путь к папке с изображениями
    images_path = f"{images_path}/temp_faces/"
    print(images_path)
    # Инициализация пустых списков для кодировок лиц и имен файлов
    face_encodings = []
    file_names = []
    
    # Перебор всех изображений в папке
    for file_name in os.listdir(images_path):
        image_path = os.path.join(images_path, file_name)
        try:
            image = face_recognition.load_image_file(image_path)
        except:
            print("error")
        encodings = face_recognition.face_encodings(image)
    
        if encodings:
            # Предполагаем, что на каждом изображении только одно лицо
            first_face_encoding = encodings[0]
            face_encodings.append(first_face_encoding)
            file_names.append(file_name)
    
    # Преобразование в numpy массив
    face_encodings = np.array(face_encodings)
    
    # Кластеризация с использованием DBSCAN
    clustering = DBSCAN(eps=0.5, min_samples=2, metric='euclidean').fit(face_encodings)
    
    # Получение меток кластеров
    labels = clustering.labels_
    
    # Создание словаря для хранения кластеров
    clusters = {}
    for label, file_name in zip(labels, file_names):
        label_str = str(label)
        if label_str not in clusters:
            clusters[label_str] = []
        clusters[label_str].append(file_name)
    
    # Сохранение кластеров в файл
    clusters_file = 'face_clusters.json'
    with open(clusters_file, 'w') as f:
        json.dump(clusters, f, indent=4)
    
    print("Clustering completed and saved to", clusters_file)
    
    for label, files in clusters.items():
        print(f"Cluster {label}: {files}")

    return {'message:':'task completed', 'status':'completed', 'type':'create_clusters', 'time':f'{datetime.now()}', 'clusters': clusters}
    # Вывод кластеров
   
