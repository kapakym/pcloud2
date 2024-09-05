/** @type {import('next').NextConfig} */

const nextConfig = {}
// const nextConfig = {
// 	async rewrites() {
// 		return [
// 			{
// 				source: '/api/:path*', // Прокси все запросы, начинающиеся с /api
// 				destination:
// 					process.env.NODE_ENV === 'production'
// 						? 'http://server:5555/api/:path*'
// 						: 'http://localhost:5555/api/:path*' // Прокси запросы на NestJS контейнер,
// 			}
// 			// {
// 			// 	source: '/tasks', // Прокси все запросы, начинающиеся с /api
// 			// 	destination:
// 			// 		process.env.NODE_ENV === 'production'
// 			// 			? 'http://server:5555/tasks'
// 			// 			: 'http://localhost:5555/tasks' // Прокси запросы на NestJS контейнер,
// 			// }
// 		]
// 	},
// 	// webpack: (config, { isServer }) => {
// 	// 	// if (!isServer) {
// 	// 	// Прокси WebSocket соединений для клиентской части
// 	// 	config.devServer = {
// 	// 		...config.devServer,
// 	// 		proxy: {
// 	// 			'/tasks': {
// 	// 				target: 'http://localhost:5555', // Адрес вашего NestJS сервера
// 	// 				ws: true, // Включаем поддержку WebSocket
// 	// 				changeOrigin: true
// 	// 			}
// 	// 		}
// 	// 	}
// 	// 	// }
// 	// 	return config
// 	// }
// }

export default nextConfig
