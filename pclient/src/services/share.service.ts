import { AxiosError } from 'axios'
import { url } from 'inspector'
import Cookies from 'js-cookie'

import {
	IActionFilesReq,
	ICreateShareLinkReq,
	IDeleteFilesReq,
	IDownloadFilesReq,
	IFolder,
	IRenameFilesReq,
	IUpdateShareLinkReq,
	TypeActionFilesRes
} from '@/types/files.types'
import { IShareFolder, IShareLink } from '@/types/share.types'

import { requestBuilder } from '@/api/requestBuilder'

class ShareService {
	async createFileShareLink(data: ICreateShareLinkReq) {
		const response = requestBuilder<ICreateShareLinkReq, { url: string }>({
			url: 'share/create',
			method: 'post',
			options: {
				isAuth: true,
				data
			}
		})
		return response
	}

	async getShare() {
		const response = await requestBuilder<unknown, IShareLink[]>({
			url: 'share',
			method: 'get',
			options: {
				isAuth: true
			}
		})
		return response
	}

	async deleteShare(data: { id: string }) {
		const response = await requestBuilder<{ id: string }, string>({
			url: 'share',
			method: 'delete',
			options: {
				isAuth: true,
				data
			}
		})
		return response
	}

	async updateShare(data: IUpdateShareLinkReq) {
		const response = await requestBuilder<IUpdateShareLinkReq, string>({
			url: 'share',
			method: 'put',
			options: {
				isAuth: true,
				data
			}
		})
		return response
	}

	async getFiles(data: { path: string; password?: string; id: string }) {
		const response = await requestBuilder<
			{ path: string; password?: string; id: string },
			IShareFolder
		>({
			url: 'share/files',
			method: 'post',
			options: {
				data
			}
		})
		return response
	}
}

export const shareService = new ShareService()
