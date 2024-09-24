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
	userId: string
}

export interface IGetPhotosReq {
	limit: number
	offset: number
	sortBy?: TypeSortPhotos
	sortWay?: TypeSortWay
}

export interface IGetPeoplesReq {
	limit?: number
	offset?: number
	sortBy?: TypeSortPhotos
	sortWay?: TypeSortWay
}

export interface IGetPhotosRes extends IGetPhotosReq {
	photos: IPhoto[]
	total: number
}

export type TypePhotosActions =
	| 'scanAll'
	| 'scanFaces'
	| 'updateClusters'
	| 'preview'
	| 'show_faces'
	| 'clearCluster'
	| null

export type TypeSortPhotos = 'dateCreate' | 'peoples' | undefined
export type TypeSortWay = 'asc' | 'desc'

export interface IPeopleResponse {
	id: string
	name: string
	face: string
	faceId: string
	photos?: IPhoto[]
}
