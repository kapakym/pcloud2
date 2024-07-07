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

export type TypeFiles =
	| 'file'
	| 'folder'
	| 'upFolder'
	| 'image'
	| 'movie'
	| 'pdf'

export type TypeFilesActions =
	| 'copy'
	| 'download'
	| 'upload'
	| 'edit'
	| 'delete'
	| 'view'
	| 'move'
	| null
