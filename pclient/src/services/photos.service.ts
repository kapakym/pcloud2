import {
	IActionFilesReq,
	IDeleteFilesReq,
	IDownloadFilesReq,
	IRenameFilesReq,
	TypeActionFilesRes
} from '@/types/files.types'
import {
	IGetPhotosReq,
	IGetPhotosRes,
	IScanPhotosReq
} from '@/types/photos.types'

import { requestBuilder } from '@/api/requestBuilder'

class PhotosService {
	async getPhotos(data: IGetPhotosReq) {
		const response = await requestBuilder<IGetPhotosReq, IGetPhotosRes>({
			url: 'photos/get',
			method: 'post',
			options: {
				isAuth: true,
				data
			}
		})
		return response
	}

	async scanFaces(data: { id: string }) {
		const response = await requestBuilder<{ id: string }, IGetPhotosRes>({
			url: 'photos/scan_faces',
			method: 'post',
			options: {
				isAuth: true,
				data
			}
		})
		return response
	}

	async updateClusters(data: { id: string }) {
		const response = await requestBuilder<{ id: string }, IGetPhotosRes>({
			url: 'photos/update_clusters',
			method: 'post',
			options: {
				isAuth: true,
				data
			}
		})
		return response
	}

	async getPhotosById(data: { id: string }) {
		const response = await requestBuilder<{ id: string }, Blob>({
			url: 'photos/getById',
			method: 'post',
			options: {
				isAuth: true,
				data,
				responseType: 'blob'
			}
		})
		return response
	}

	async scanPhotos(data: IScanPhotosReq) {
		const response = await requestBuilder<IScanPhotosReq, string>({
			url: 'photos/scan',
			method: 'post',
			options: {
				isAuth: true,
				data
			}
		})
		return response
	}
}

export const photosService = new PhotosService()
