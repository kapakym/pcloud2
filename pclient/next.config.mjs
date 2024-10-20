/** @type {import('next').NextConfig} */

const nextConfig = {
	trailingSlash: true,
	async rewrites() {
		return [
			{
				source: '/api/:path*', // Прокси все запросы, начинающиеся с /api
				destination:
					process.env.NODE_ENV === 'production'
						? 'http://server:5554/api/:path*'
						: 'http://localhost:5555/api/:path*' // Прокси запросы на NestJS контейнер,
			}
		]
	}
}

export default nextConfig
