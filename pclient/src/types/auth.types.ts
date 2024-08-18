export interface IAuthFrom {
	email: string
	password: string
}

export interface IAuthRegister extends IAuthFrom {
	repeatPassword: string
}

export enum EnumRoles {
	user = 'user',
	admin = 'admin'
}

export interface IUser {
	id: string
	email: string
	name: string
	active: boolean
	roles: EnumRoles
}

export type IUserUpdateReq = Partial<Omit<IUser, 'id'>>

export interface IAuthRes {
	accessToken: string
	user: IUser
}

export const roleOptions = Object.values(EnumRoles).map(role => ({
	value: role,
	label: role.charAt(0).toUpperCase() + role.slice(1) // Преобразуем первую букву в верхний регистр
}))
