export interface IScanPhotosReq {
	path?: string
	uuidTask: string
}

export interface IPhoto {
	id: string
	path: string
}

export interface IGetPhotosReq {
	limit?: number
	offset?: number
}

export interface IGetPhotosRes extends IGetPhotosReq {
	photos: IPhoto[]
	total: number
}
