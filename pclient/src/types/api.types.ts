import { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

export type AxiosRequestHeaders = {
	[x: string]: string | number | boolean
}

export interface PropsRequestBuilder<Req, Params> {
	url: string
	method?: string
	options?: {
		isNotRequest?: boolean
		data?: Req
		headers?: AxiosRequestHeaders
		id?: string
		isAuth?: boolean
		params?: Params
	}
	progressFnUp?: (process: number) => void
	progressFnDw?: (process: number) => void
}

export interface RBAxiosRequestConfig extends AxiosRequestConfig {
	isAuth?: boolean
}

export interface AxiosCustomConfig extends InternalAxiosRequestConfig {
	isAuth?: boolean
}
