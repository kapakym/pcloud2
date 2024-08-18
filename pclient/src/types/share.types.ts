import { IFolder } from './files.types'

export interface IShareLink {
	filename: string
	id: string
	path: string
	timeLive: string
	type: string
}

export type TypeShareActions =
	| 'edit'
	| 'delete'
	| 'download'
	| 'selectAll'
	| null

export interface IShareFolder extends IFolder {
	status?: string
	token?: string
}

export interface IDownloadShareFilesReq {
	id: string
	path: string
	filename: string
}
