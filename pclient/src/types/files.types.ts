import { IFilesStore } from '@/stores/file-actions.store'

export interface IFolder {
	files: IFile[]
	folders: IFolder[]
}

export interface IFolder {
	name: string
}

export interface IFile extends IFolder {
	type: string
	size: number
}

export interface IActionFilesReq {
	sourcePath: string
	destPath: string
	files: IFilesStore[]
}

export interface IActionFiles {
	filename: string
	status: string
	description?: string
}

export type TypeActionFilesRes = IActionFiles[]

export type TypeFiles =
	| 'file'
	| 'folder'
	| 'upFolder'
	| 'image'
	| 'movie'
	| 'pdf'

export type TypeFilesActions =
	| 'paste'
	| 'copy'
	| 'download'
	| 'upload'
	| 'edit'
	| 'delete'
	| 'view'
	| 'move'
	| 'selectAll'
	| null
