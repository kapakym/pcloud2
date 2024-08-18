import { EnumRoles, IUser } from './auth.types'

export interface IGetUsersReq {
	limit: number
	offset: number
}

export interface IGetUsersResponse extends IGetUsersReq {
	count: number
	users: IUser[]
}

export interface IUserActive {
	id: string
	active?: boolean
	roles?: EnumRoles
}
