export interface IScanPhotosReq {
	path?: string
	uuidTask: string
}

export interface IPhoto {
	id: string
	path: string
	lat?: string
	lon?: string
	dateCreate?: string
}

export interface IGetPhotosReq {
	limit: number
	offset: number
}

export interface IGetPhotosRes extends IGetPhotosReq {
	photos: IPhoto[]
	total: number
}

export type TypePhotosActions = 'scanAll' | null
