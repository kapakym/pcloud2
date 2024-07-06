import { AxiosError } from 'axios'
import { url } from 'inspector'
import Cookies from 'js-cookie'

import { IFolder } from '@/types/files.types'

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
}

export const filesService = new FilesService()
