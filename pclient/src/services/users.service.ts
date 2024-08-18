import { IGetPeoplesReq, IPeopleResponse } from '@/types/photos.types'
import {
	IGetUsersReq,
	IGetUsersResponse,
	IUserActive
} from '@/types/users.types'

import { requestBuilder } from '@/api/requestBuilder'

class UsersService {
	async getUsers(data?: IGetUsersReq) {
		const response = await requestBuilder<IGetPeoplesReq, IGetUsersResponse>({
			url: 'user/list',
			method: 'post',
			options: {
				isAuth: true,
				data
			}
		})
		return response
	}

	async setActiveUser(data: IUserActive) {
		const response = await requestBuilder<IUserActive, boolean>({
			url: 'user/active',
			method: 'post',
			options: {
				isAuth: true,
				data
			}
		})
	}

	async deleteUser(data: { id: string }) {
		const response = await requestBuilder<{ id: string }, boolean>({
			url: 'user/delete',
			method: 'post',
			options: {
				isAuth: true,
				data
			}
		})
	}
}

export const usersService = new UsersService()
