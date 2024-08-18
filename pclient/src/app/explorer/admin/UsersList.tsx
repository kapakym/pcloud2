'use client'

import { usersService } from '@/services/users.service'
import { useUsersStore } from '@/stores/users.store'
import { useInfiniteQuery } from '@tanstack/react-query'

import UserActionBar from '@/components/UserActionBar/UserActionBar'
import { UserItem } from '@/components/ui/UserItem/UserItem'

function UsersList() {
	const { limit, offset, page } = useUsersStore(state => state)
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

	console.log(data)

	return (
		<div className='w-full h-full flex flex-col select-none'>
			<UserActionBar />
			<div className='h-full w-full overflow-y-auto'>
				{!!data?.pages[page - 1]?.users?.length &&
					data?.pages[page - 1]?.users.map(item => (
						<UserItem
							data={item}
							key={item.id}
						/>
					))}
			</div>
		</div>
	)
}

export { UsersList }
