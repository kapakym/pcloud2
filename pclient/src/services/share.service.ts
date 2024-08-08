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
	TypeActionFilesRes
} from '@/types/files.types'
import { IShareLink } from '@/types/share.types'

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
}

export const shareService = new ShareService()
