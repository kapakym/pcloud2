/** @type {import('next').NextConfig} */

const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/:path*', // Прокси все запросы, начинающиеся с /api
				destination:
					process.env.NODE_ENV === 'production'
						? 'http://server:5554/api/:path*'
						: 'http://localhost:5555/api/:path*' // Прокси запросы на NestJS контейнер,
			},
			{
				source: '/socket.io/:path*', // Прокси все запросы, начинающиеся с /api
				destination:
					process.env.NODE_ENV === 'production'
						? 'http://server:5554/tasks/:path*'
						: 'http://localhost:5555/tasks/:path*' // Прокси запросы на NestJS контейнер,
			}
		]
	},

	async headers() {
		return [
			{
				// Добавляем заголовки для обработки WebSocket-запросов
				source: '/socket.io/:path*',
				headers: [
					{
						key: 'Connection',
						value: 'Upgrade'
					},
					{
						key: 'Upgrade',
						value: 'websocket'
					}
				]
			}
		]
	},

	webpackDevMiddleware: config => {
		config.watchOptions = {
			poll: 1000,
			aggregateTimeout: 300
		}
		return config
	},

	async onProxyInit(proxy) {
		proxy.on('proxyReqWs', (proxyReq, req, socket, options, head) => {
			// Обработка WebSocket соединений
			console.log('WebSocket proxy initiated')
		})
	}
}

export default nextConfig
