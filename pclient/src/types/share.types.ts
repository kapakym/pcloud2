export interface IShareLink {
	filename: string
	id: string
	path: string
	timeLive: string
	type: string
}

export type TypeShareActions = 'edit' | 'delete' | null
