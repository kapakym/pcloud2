'use client'

import { filesService } from '@/services/files.service'
import { usersService } from '@/services/users.service'
import { useFileActionsStore } from '@/stores/file-actions.store'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import FileActionBar from '@/components/FileActionBar/FileActionBar'
import UserActionBar from '@/components/UserActionBar/UserActionBar'
import { FileItemRow } from '@/components/ui/FileItems/FileItemRow'
import { ModalPreview } from '@/components/ui/ModalPreview/ModalPreview'
import { UserItem } from '@/components/ui/UserItem/UserItem'

import { IUser } from '@/types/auth.types'
import { TypeFiles } from '@/types/files.types'

import { useDoubleTouchHook } from '@/hooks/use-double-touch.hook'
import { useFilesActions } from '@/hooks/use-files-actions.hook'

function UsersList() {
	const [limit, setLimit] = useState(5)
	const [currentPage, setCurrentPage] = useState(1)

	const getUsers = async ({ pageParam }: { pageParam: number }) => {
		return (
			await usersService.getUsers({
				limit,
				offset: pageParam
			})
		).data
	}

	const { data, fetchNextPage } = useInfiniteQuery({
		queryKey: ['getUsers'],
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
				{!!data?.pages[currentPage - 1]?.users?.length &&
					data?.pages[currentPage - 1]?.users?.map(item => (
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
