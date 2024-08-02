'use client'

import { photosService } from '@/services/photos.service'
import { usePhotosStore } from '@/stores/photos.store'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

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
	const { ref, inView, entry } = useInView({
		/* Optional options */
		threshold: 1,
		trackVisibility: true,
		delay: 100
	})

	const getPhotos = async ({ pageParam }: { pageParam: number }) => {
		return (
			await photosService.getPhotos({
				limit,
				offset: pageParam,
				sortBy,
				sortWay
			})
		).data
	}

	const { data, fetchNextPage } = useInfiniteQuery({
		queryKey: ['getPhotos', offset, sortBy, sortWay],
		queryFn: getPhotos,
		initialPageParam: 0,
		getNextPageParam: (lastPage, pages) =>
			!lastPage.photos.length ? undefined : lastPage.offset + 6
	})

	useEffect(() => {
		if (inView) {
			fetchNextPage()
		}
	}, [inView, fetchNextPage])

	usePhotosActions()

	const getContent = () => {
		if (showPeople) {
			return <SortByPeoples />
		}
		switch (sortBy) {
			case 'dateCreate':
				return <SortByDate data={data} />

			default:
				return <SortNotFilter data={data} />
		}
	}

	return (
		<div className='w-full h-full flex flex-col'>
			<PhotoActionBar />
			<div className='h-full w-full overflow-y-auto flex-1'>
				<div className='w-full min-h-full grid gap-4 p-2'>{getContent()}</div>
				<div
					ref={ref}
					className='h-[50px] w-full'
				></div>
				<div className='h-[10px]'></div>
			</div>
			{showPeople && openPeoplesBar && <PeopleBar />}
			<ModalPreview />
		</div>
	)
}

export { PhotosList }
