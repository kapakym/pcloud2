'use client'

import { usersService } from '@/services/users.service'
import { useUsersStore } from '@/stores/users.store'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

import Pagination from '@/components/Pagination/Pagination'
import UserActionBar from '@/components/UserActionBar/UserActionBar'
import { UserItem } from '@/components/ui/UserItem/UserItem'

import { IUser } from '@/types/auth.types'

import { useDoubleTouchHook } from '@/hooks/use-double-touch.hook'

function UsersList() {
	const { limit, offset, page, setSelected, selected, selectMode } =
		useUsersStore(state => state)

	const { data } = useQuery({
		queryKey: ['getUsers', offset, limit],
		queryFn: () => usersService.getUsers({ limit, offset })
	})

	const handleSelected = (
		event: React.MouseEvent<HTMLElement, MouseEvent>,
		user: IUser
	) => {
		if (event.shiftKey || selectMode) {
			selected.find(item => item.id === user.id)
				? setSelected(selected.filter(item => item.id !== user.id))
				: setSelected([...selected, user])
		} else {
			selected.find(item => item.id === user.id)
				? setSelected([])
				: setSelected([user])
		}
	}

	const isSelected = (id: string) => {
		return selected.find(item => item.id === id)
	}

	const totalPage = useMemo(() => {
		console.log(data?.data.count ? Math.round(data?.data.count / limit) : 0)
		return data?.data.count ? Math.round(data?.data.count / limit) : 0
	}, [data?.data.count])

	const handleChangePage = (page: number) => {}

	return (
		<div className='w-full h-full flex flex-col select-none'>
			<UserActionBar />
			<div className=' grid-cols-4 p-2 bg-slate-600 hidden md:grid'>
				<div>Name</div>
				<div>E-mail</div>
				<div>Status</div>
				<div>Role</div>
			</div>
			<div className='h-full w-full overflow-y-auto'>
				{!!data?.data?.users?.length &&
					data?.data?.users.map(item => (
						<UserItem
							data={item}
							key={item.id}
							onClick={event => handleSelected(event, item)}
							selected={!!isSelected(item.id)}
						/>
					))}
			</div>
			<Pagination
				currentPage={page}
				totalPages={totalPage}
				onPageChange={handleChangePage}
			/>
		</div>
	)
}

export { UsersList }
