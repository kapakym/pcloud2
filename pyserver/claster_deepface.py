from deepface import DeepFace
import numpy as np
from sklearn.cluster import DBSCAN
import json
import os

# Путь к папке с изображениями
images_path = 'temp_faces'

# Получение эмбеддингов лиц
def extract_face_embeddings(image_paths):
    embeddings = []
    for image_path in image_paths:
        try:
            result = DeepFace.represent(img_path=image_path, model_name='VGG-Face', enforce_detection=False)
            if isinstance(result, list) and len(result) > 0 and 'embedding' in result[0]:
                embeddings.append(result[0]['embedding'])
            else:
                print(f"No embeddings found for {image_path}")
        except Exception as e:
            print(f"Error processing {image_path}: {e}")
    return np.array(embeddings)

# Получение списка путей к изображениям
image_paths = [os.path.join(images_path, f) for f in os.listdir(images_path) if os.path.isfile(os.path.join(images_path, f))]

# Извлечение эмбеддингов
embeddings = extract_face_embeddings(image_paths)

# Кластеризация с использованием DBSCAN
clustering = DBSCAN(eps=0.5, min_samples=2, metric='euclidean').fit(embeddings)

# Получение меток кластеров
labels = clustering.labels_

# Создание словаря для хранения кластеров
clusters = {}
for label, file_name in zip(labels, image_paths):
    label_str = str(label)
    if label_str not in clusters:
        clusters[label_str] = []
    clusters[label_str].append(file_name)

# Сохранение кластеров в файл JSON
with open('face_clusters.json', 'w') as f:
    json.dump(clusters, f, indent=4)

print("Clustering completed and saved to face_clusters.json")
