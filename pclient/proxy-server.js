// proxy-server.js
const http = require('http')
const httpProxy = require('http-proxy')

// Настраиваем HTTP-прокси для проксирования запросов на NestJS WebSocket сервер
const proxy = httpProxy.createProxyServer({
	target: 'http://localhost:5555', // NestJS WebSocket сервер
	ws: true // Включаем поддержку WebSocket
})

// Создаем HTTP сервер для проксирования WebSocket
const server = http.createServer((req, res) => {
	// Прокси HTTP запросов (если необходимо)
	proxy.web(req, res, { target: 'http://localhost:5555' })
})

// Обработка WebSocket соединений
server.on('upgrade', (req, socket, head) => {
	// Прокси WebSocket соединений
	proxy.ws(req, socket, head)
})

server.listen(9000, () => {
	console.log('WebSocket proxy server is listening on port 9000')
})
