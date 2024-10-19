import {
	IGetMediaReq,
	IGetMediaRes,
	IGetPeoplesReq,
	IPeopleResponse,
	IScanMediaReq
} from '@/types/media.types'

import { requestBuilder } from '@/api/requestBuilder'

class MediaService {
	async getPlayById(params: { id: string }) {
		return await requestBuilder<unknown, Blob>({
			url: `media/play/${params.id}`,
			method: 'get',
			options: {
				isAuth: true,
				responseType: 'blob',
				headers: {
					Accept: 'video/mp4;charset=UTF-8'
				}
			}
		})
	}

	async getPeoples(data?: IGetPeoplesReq) {
		const response = await requestBuilder<IGetPeoplesReq, IPeopleResponse[]>({
			url: 'media/peoples',
			method: 'post',
			options: {
				isAuth: true,
				data,
				responseType: 'blob'
			}
		})
		return response
	}

	async getMediaFiles(data: IGetMediaReq) {
		const response = await requestBuilder<IGetMediaReq, IGetMediaRes>({
			url: 'media/get',
			method: 'post',
			options: {
				isAuth: true,
				data
			}
		})
		return response
	}

	async scanFaces(data: { uuidTask: string }) {
		const response = await requestBuilder<{ uuidTask: string }, IGetMediaRes>({
			url: 'media/scan_faces',
			method: 'post',
			options: {
				isAuth: true,
				data
			}
		})
		return response
	}

	async updateClusters(data: { uuidTask: string }) {
		const response = await requestBuilder<{ uuidTask: string }, IGetMediaRes>({
			url: 'media/update_clusters',
			method: 'post',
			options: {
				isAuth: true,
				data
			}
		})
		return response
	}

	async getMediaFileById(data: { id: string }) {
		const response = await requestBuilder<{ id: string }, Blob>({
			url: 'media/get_by_id',
			method: 'post',
			options: {
				isAuth: true,
				data,
				responseType: 'blob'
			}
		})
		return response
	}

	async getFaceById(data: { id: string }) {
		const response = await requestBuilder<{ id: string }, Blob>({
			url: 'media/get_face_by_id',
			method: 'post',
			options: {
				isAuth: true,
				data,
				responseType: 'blob'
			}
		})
		return response
	}

	async scanFiles(data: IScanMediaReq) {
		const response = await requestBuilder<IScanMediaReq, string>({
			url: 'media/scan',
			method: 'post',
			options: {
				isAuth: true,
				data
			}
		})
		return response
	}

	async clearCluster() {
		const response = await requestBuilder<unknown, any>({
			url: 'media/clear_cluster',
			method: 'post',
			options: {
				isAuth: true
			}
		})
		return response
	}

	async clearMedia() {
		const response = await requestBuilder<unknown, any>({
			url: 'media/clear_media',
			method: 'post',
			options: {
				isAuth: true
			}
		})
		return response
	}

	async clearFaces() {
		const response = await requestBuilder<unknown, any>({
			url: 'media/clear_faces',
			method: 'post',
			options: {
				isAuth: true
			}
		})
		return response
	}
}

export const mediaService = new MediaService()
