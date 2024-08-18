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
	const { limit, offset } = useUsersStore(state => state)
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
			queryClient.invalidateQueries({ queryKey: ['getUsers', offset, limit] })
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
				' md:space-y-0 grid grid-cols-2 gap-2 md:grid-cols-4 hover:bg-slate-700 cursor-pointer p-2 w-full  border-b-[1px] border-b-solid border-b-slate-700',
				selected ? 'bg-slate-600' : 'even:bg-slate-800'
			)}
		>
			<div className='block md:hidden'>
				<h4>Name</h4>
			</div>
			<div>{data.name || 'noname'}</div>
			<div className='block md:hidden'>
				<h4>e-mail</h4>
			</div>
			<div>{data.email}</div>
			<div className='block md:hidden'>
				<h4>Status</h4>
			</div>

			<div>
				{isAccess && (
					<Checkbox
						label={data.active ? 'active' : 'not active'}
						onChange={handleChangeActivate}
						checked={data.active}
					/>
				)}
			</div>
			<div className='block md:hidden'>
				<h4>Role</h4>
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
