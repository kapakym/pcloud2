'use client'

import { usersService } from '@/services/users.service'
import { useUsersStore } from '@/stores/users.store'
import { useInfiniteQuery } from '@tanstack/react-query'

import UserActionBar from '@/components/UserActionBar/UserActionBar'
import { UserItem } from '@/components/ui/UserItem/UserItem'

import { IUser } from '@/types/auth.types'

import { useDoubleTouchHook } from '@/hooks/use-double-touch.hook'

function UsersList() {
	const { limit, offset, page, setSelected, selected, selectMode } =
		useUsersStore(state => state)
	const getUsers = async ({ pageParam }: { pageParam: number }) => {
		return (
			await usersService.getUsers({
				limit,
				offset: pageParam
			})
		).data
	}

	const { data, fetchNextPage } = useInfiniteQuery({
		queryKey: ['getUsers', page],
		queryFn: getUsers,
		initialPageParam: 0,
		getNextPageParam: (lastPage, pages) =>
			!lastPage.users.length ? undefined : lastPage.offset + 6
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

	return (
		<div className='w-full h-full flex flex-col select-none'>
			<UserActionBar />
			<div className='h-full w-full overflow-y-auto'>
				{!!data?.pages[page - 1]?.users?.length &&
					data?.pages[page - 1]?.users.map(item => (
						<UserItem
							data={item}
							key={item.id}
							onClick={event => handleSelected(event, item)}
							selected={!!isSelected(item.id)}
						/>
					))}
			</div>
		</div>
	)
}

export { UsersList }
