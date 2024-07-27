from deepface import DeepFace
import socket_server

# WebSocket сервер, который запускает скрипты для распознавания лиц
def main():
    socket_server.server_init()
    socket_server.run()

if __name__ == '__main__' :
    main()