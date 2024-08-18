import { Checkbox } from '../Checkbox/Checkbox'
import { usersService } from '@/services/users.service'
import { useMutation } from '@tanstack/react-query'
import cn from 'clsx'

import { EnumRoles, IUser } from '@/types/auth.types'
import { IUserActive } from '@/types/users.types'

interface UserItemProps {
	data: IUser
	selected?: boolean
}

export const UserItem = (props: UserItemProps) => {
	const { data, selected = false } = props
	const { data: dataActivate, mutate: mutateSetActivate } = useMutation({
		mutationKey: ['setActivateMutation'],
		mutationFn: (data: IUserActive) => usersService.setActiveUser(data)
	})

	const handleChangeActivate = () => {
		mutateSetActivate({ id: data.id, active: !data.active })
	}

	return (
		<div
			className={cn(
				'grid grid-cols-4 hover:bg-slate-700 cursor-pointer p-2 w-full space-x-1 border-b-[1px] border-b-solid border-b-slate-700',
				selected ? 'bg-slate-600' : 'even:bg-slate-800'
			)}
		>
			<div>{data.name || 'noname'}</div>
			<div>{data.email}</div>
			<div>
				<Checkbox
					label={data.active ? 'active' : 'not active'}
					onChange={handleChangeActivate}
					checked={data.active}
				/>
			</div>
			<div>{EnumRoles[data.roles]}</div>
		</div>
	)
}
