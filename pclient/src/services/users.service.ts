import { IGetPeoplesReq, IPeopleResponse } from '@/types/photos.types'
import { IGetUsersReq, IGetUsersResponse } from '@/types/users.types'

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
}

export const usersService = new UsersService()
