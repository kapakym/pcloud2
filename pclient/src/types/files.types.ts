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

export type TypeFiles = 'file' | 'folder'
