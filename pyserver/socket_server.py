import aiohttp
import socketio
import json
import find_faces

# Создание экземпляра Socket.IO сервера
sio = socketio.AsyncServer(cors_allowed_origins='*')
    # Создание экземпляра веб-сервера aiohttp

app = aiohttp.web.Application()
sio.attach(app)

def server_init():
   

    # Обработчик события подключения клиента
    @sio.event
    async def connect(sid, environ):
        print(f'Client connected: {sid}')
        await sio.send(sid, 'Welcome to the WebSocket server!')

    # Обработчик события получения сообщения
    @sio.event
    async def message(sid, data):
        print(f'Received message from {sid}: {data}')
        await sio.send(sid, 'test')
        if data['path']:
            await find_faces.findFaces(image_path=data['path'])


    # Обработчик события отключения клиента
    @sio.event
    async def disconnect(sid):
        print(f'Client disconnected: {sid}')

# Запуск веб-сервера
def run():
    aiohttp.web.run_app(app, port=9999)
