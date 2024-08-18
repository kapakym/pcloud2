import { Checkbox } from '../Checkbox/Checkbox'
import CustomSelect, { IOptionSelect } from '../CustomSelect/CustomSelect'
import { usersService } from '@/services/users.service'
import { useUsersStore } from '@/stores/users.store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import cn from 'clsx'
import { useState } from 'react'
import { SingleValue } from 'react-select'

import { EnumRoles, IUser, roleOptions } from '@/types/auth.types'
import { IUserActive } from '@/types/users.types'

interface UserItemProps {
	data: IUser
	selected?: boolean
	onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export const UserItem = (props: UserItemProps) => {
	const { data, selected = false, onClick } = props
	const { page } = useUsersStore(state => state)
	const [role, setRole] = useState<SingleValue<IOptionSelect>>(
		roleOptions.find(item => item.value === EnumRoles[data.roles]) || {
			value: '',
			label: ''
		}
	)
	const isAccess = localStorage.getItem('role') === EnumRoles.admin
	const queryClient = useQueryClient()
	const { data: dataActivate, mutate: mutateSetActivate } = useMutation({
		mutationKey: ['setActivateMutation'],
		mutationFn: (data: IUserActive) => usersService.setActiveUser(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['getUsers', page] })
		}
	})

	const handleChangeActivate = () => {
		mutateSetActivate({ id: data.id, active: !data.active })
	}
	const handleChangeRole = (value: SingleValue<IOptionSelect>) => {
		if (value?.value) {
			mutateSetActivate({ id: data.id, roles: value.value as EnumRoles })
			setRole(value)
		}
	}

	return (
		<div
			onClick={onClick}
			className={cn(
				'md:grid flex flex-col md:grid-cols-4 hover:bg-slate-700 cursor-pointer p-2 w-full space-x-1 border-b-[1px] border-b-solid border-b-slate-700',
				selected ? 'bg-slate-600' : 'even:bg-slate-800'
			)}
		>
			<div>{data.name || 'noname'}</div>
			<div>{data.email}</div>
			<div>
				{isAccess && (
					<Checkbox
						label={data.active ? 'active' : 'not active'}
						onChange={handleChangeActivate}
						checked={data.active}
					/>
				)}
			</div>
			<div>
				{isAccess && (
					<CustomSelect
						options={roleOptions}
						value={role}
						onChange={value => handleChangeRole(value)}
					/>
				)}
			</div>
		</div>
	)
}
