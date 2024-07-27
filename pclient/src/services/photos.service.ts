import { AxiosError } from 'axios'
import { url } from 'inspector'
import Cookies from 'js-cookie'

import {
	IActionFilesReq,
	IDeleteFilesReq,
	IDownloadFilesReq,
	IFolder,
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

	async detectFaces(data: { id: string }) {
		const response = await requestBuilder<{ id: string }, IGetPhotosRes>({
			url: 'photos/detect',
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

	async moveFiles(data: IActionFilesReq) {
		const response = await requestBuilder<IActionFilesReq, TypeActionFilesRes>({
			url: 'files/move',
			method: 'post',
			options: {
				isAuth: true,
				data
			}
		})
		return response
	}

	async renameFile(data: IRenameFilesReq) {
		const response = await requestBuilder<IRenameFilesReq, TypeActionFilesRes>({
			url: 'files/rename',
			method: 'post',
			options: {
				isAuth: true,
				data
			}
		})
		return response
	}

	async deleteFiles(data: IDeleteFilesReq) {
		const response = await requestBuilder<IDeleteFilesReq, TypeActionFilesRes>({
			url: 'files/delete',
			method: 'post',
			options: {
				isAuth: true,
				data
			}
		})
		return response
	}

	async downloadFile(
		data: IDownloadFilesReq,
		progressFnDw: (progress: number) => void
	) {
		const response = await requestBuilder<IDownloadFilesReq, Blob>({
			url: 'files/download',
			method: 'post',
			progressFnDw,
			options: {
				isAuth: true,
				data,
				responseType: 'blob'
			}
		})
		return response
	}

	async uploadFile(data: FormData, progressFnUp: (progress: number) => void) {
		const response = await requestBuilder<
			FormData,
			{ uuid: string; status: string; description?: string }
		>({
			url: 'files/upload',
			method: 'post',
			progressFnUp,

			options: {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				isAuth: true,
				data
			}
		})
		return response
	}
}

export const photosService = new PhotosService()
