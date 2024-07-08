import { AxiosError } from 'axios'
import { url } from 'inspector'
import Cookies from 'js-cookie'

import { IActionFilesReq, IFolder } from '@/types/files.types'

import { requestBuilder } from '@/api/requestBuilder'

class FilesService {
	async getFiles(data: { path: string }) {
		const response = await requestBuilder<{ path: string }, IFolder>({
			url: 'files',
			method: 'post',
			options: {
				isAuth: true,
				data
			}
		})
		return response
	}

	async copyFiles(data: IActionFilesReq) {
		const response = await requestBuilder<IActionFilesReq, IActionFilesReq>({
			url: 'files/copy',
			method: 'post',
			options: {
				isAuth: true,
				data
			}
		})
		return response
	}

	async moveFiles(data: IActionFilesReq) {
		const response = await requestBuilder<IActionFilesReq, IActionFilesReq>({
			url: 'files/move',
			method: 'post',
			options: {
				isAuth: true,
				data
			}
		})
		return response
	}
}

export const filesService = new FilesService()
