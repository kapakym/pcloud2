import Cookies from 'js-cookie'

import { IAuthFrom, IAuthRes } from '@/types/auth.types'

import { requestBuilder } from '@/api/requestBuilder'

export enum EnumTokens {
	ACCESS_TOKEN = 'accessToken',
	REFRESH_TOKEN = 'refreshToken'
}

export const getAccessToken = () => Cookies.get(EnumTokens.ACCESS_TOKEN) || null

export const saveTokenStorage = (accessToken: string) => {
	Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
		domain: 'localhost',
		sameSite: 'strict',
		expires: 1
	})
}

export const removeToken = () => {
	Cookies.remove(EnumTokens.ACCESS_TOKEN)
}

class AuthService {
	async login(data: IAuthFrom) {
		const response = await requestBuilder<IAuthFrom, IAuthRes>({
			url: 'auth/login',
			method: 'post',
			options: {
				data
			}
		})

		if (response.data.accessToken) {
			saveTokenStorage(response.data.accessToken)
		}

		return response
	}

	async register(data: IAuthFrom) {
		const response = await requestBuilder<IAuthFrom, IAuthRes>({
			url: 'auth/register',
			method: 'post',
			options: {
				data
			}
		})

		if (response.data.accessToken) {
			saveTokenStorage(response.data.accessToken)
		}

		return response
	}
}

export const authService = new AuthService()
