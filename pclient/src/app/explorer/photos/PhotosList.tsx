'use client'

import { photosService } from '@/services/photos.service'
import { usePhotosStore } from '@/stores/photos.store'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import Pagination from '@/components/Pagination/Pagination'
import { PeopleBar } from '@/components/Photos/PeopleBar/PeopleBar'
import PhotoActionBar from '@/components/Photos/PhotoActionBar/PhotoActionBar'
import { SortByDate } from '@/components/Photos/SortByDate/SortByDate'
import { SortByPeoples } from '@/components/Photos/SortByPeoples/SortByPeoples'
import { SortNotFilter } from '@/components/Photos/SortNotFilter.tsx/SortNotFilter'
import { ModalPreview } from '@/components/ui/ModalPreview/ModalPreview'

import { usePhotosActions } from '@/hooks/use-photos-actions.hook'

export default function PhotosList() {
	const {
		limit,
		offset,
		total,
		setLimit,
		setOffset,
		sortBy,
		sortWay,
		openPeoplesBar,
		showPeople
	} = usePhotosStore(state => state)

	const { data } = useQuery({
		queryKey: ['getPhotos', offset, sortBy, sortWay, limit],
		queryFn: () => photosService.getPhotos({ offset, sortBy, sortWay, limit })
	})

	const [page, setPage] = useState(1)

	usePhotosActions()

	const getContent = () => {
		if (showPeople) {
			return <SortByPeoples />
		}
		switch (sortBy) {
			case 'dateCreate':
				return <SortByDate data={data?.data} />

			default:
				return <SortNotFilter data={data?.data} />
		}
	}

	const totalPages = useMemo(
		() => Math.floor(data?.data?.total ? data?.data?.total / limit : 0),
		[data?.data?.total, limit]
	)

	const handleChangePage = (page: number) => {
		setOffset(limit * page)
		setPage(page)
	}

	return (
		<div className='w-full h-full flex flex-col'>
			<PhotoActionBar />
			<div className='h-full w-full overflow-y-auto flex-1'>
				<div className='w-full min-h-full grid gap-4 p-2'>{getContent()}</div>
				<div className='h-[10px]'></div>
			</div>
			<Pagination
				currentPage={page}
				totalPages={totalPages}
				onPageChange={handleChangePage}
			/>
			{showPeople && openPeoplesBar && <PeopleBar />}
			<ModalPreview />
		</div>
	)
}

export { PhotosList }
