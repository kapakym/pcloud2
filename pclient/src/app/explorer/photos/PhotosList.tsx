'use client'

import { photosService } from '@/services/photos.service'
import { usePhotosStore } from '@/stores/photos.store'
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { off } from 'process'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import PhotoActionBar from '@/components/Photos/PhotoActionBar/PhotoActionBar'
import { PhotoItem } from '@/components/Photos/PhotoItem/PhotoItem'
import Button from '@/components/ui/Button/Button'

import { IScanPhotosReq } from '@/types/photos.types'

import { usePhotosActions } from '@/hooks/use-photos-actions.hook'

export default function PhotosList() {
	const { limit, offset, total, setLimit, setOffset } = usePhotosStore(
		state => state
	)
	const { ref, inView, entry } = useInView({
		/* Optional options */
		threshold: 1,
		trackVisibility: true,
		delay: 100
	})

	const { mutate: mutateScanPhotos } = useMutation({
		mutationKey: ['scanPhotos'],
		mutationFn: (data: IScanPhotosReq) => photosService.scanPhotos(data)
	})

	const getPhotos = async ({ pageParam }: { pageParam: number }) => {
		console.log({ data })
		return (await photosService.getPhotos({ limit, offset: pageParam })).data
	}

	const { data, fetchNextPage } = useInfiniteQuery({
		queryKey: ['getPhotos', offset],
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

	return (
		<div className='w-full h-full flex flex-col'>
			<PhotoActionBar />
			<div className='h-full w-full overflow-y-auto flex-1'>
				<div className='w-full min-h-full grid grid-cols-3 gap-4 p-2'>
					{!!data?.pages.length &&
						data?.pages.map(item =>
							item.photos.map(item => (
								<PhotoItem
									key={item.id}
									photo={item}
								></PhotoItem>
							))
						)}
				</div>
				<div
					ref={ref}
					className='h-[50px] w-full '
				></div>
				<div className='h-[10px]'></div>
			</div>
		</div>
	)
}

export { PhotosList }
