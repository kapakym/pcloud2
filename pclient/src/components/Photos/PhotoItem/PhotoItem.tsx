'use client'

import { photosService } from '@/services/photos.service'
import { usePreviewStore } from '@/stores/preivew.store'
import { useQuery } from '@tanstack/react-query'
import { memo, useEffect, useState } from 'react'

import { IPhoto } from '@/types/photos.types'

// eslint-disable-next-line react/display-name
export const PhotoItem = memo(({ photo }: { photo: IPhoto }) => {
	const { setPreviewFile, setOpen, setTitle } = usePreviewStore(state => state)

	const { data, isLoading } = useQuery({
		queryKey: ['getPhotoById', photo.id],
		queryFn: () => photosService.getPhotosById({ id: photo?.id })
	})

	const [photoUrl, setPhotoUrl] = useState('')

	useEffect(() => {
		if (data?.data instanceof Blob) {
			const url = window.URL.createObjectURL(new Blob([data.data]))
			setPhotoUrl(url)
		}
	}, [data])

	const handlePreview = (url: string) => {
		setPreviewFile({ src: url, type: 'image/jpeg' })
		setTitle(`Preview file ${photo.path}`)
		setOpen(true)
	}

	return (
		<div className=' border-[1px] border-solid border-slate-400 rounded-xl flex justify-center items-center overflow-hidden object-cover  relative aspect-square'>
			{photoUrl && (
				<img
					onClick={() => handlePreview(photoUrl)}
					className='w-full h-full object-cover hover:scale-110 scale-100 duration-300 transition-all cursor-pointer'
					src={photoUrl}
					alt=''
				/>
			)}
			{isLoading && (
				<div className='p-4 w-full h-full flex justify-center items-center'>
					<span className='loader '></span>
				</div>
			)}
			{photo?.dateCreate && (
				<div className='absolute bottom-2 left-2 text-sm bg-gray-700 p-1 rounded-lg opacity-65'>
					{new Date(photo.dateCreate).toLocaleString()}
				</div>
			)}
		</div>
	)
})
