export interface IGetUsersReq {
	limit: number
	offset: number
}

export interface IUser {
	active: boolean
	email: string
	id: string
	roles: string
}

export interface IGetUsersResponse extends IGetUsersReq {
	count: number
	users: IUser[]
}
