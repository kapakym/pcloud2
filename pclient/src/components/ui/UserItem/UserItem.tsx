import cn from 'clsx'

import { EnumRoles, IUser } from '@/types/auth.types'

interface UserItemProps {
	data: IUser
	selected?: boolean
}

export const UserItem = (props: UserItemProps) => {
	const { data, selected = false } = props
	return (
		<div
			className={cn(
				'grid grid-cols-4 hover:bg-slate-700 cursor-pointer p-2 w-full space-x-1 border-b-[1px] border-b-solid border-b-slate-700',
				selected ? 'bg-slate-600' : 'even:bg-slate-800'
			)}
		>
			<div>{data.name || 'noname'}</div>
			<div>{data.email}</div>
			<div>{data.active}</div>
			<div>{EnumRoles[data.roles]}</div>
		</div>
	)
}
