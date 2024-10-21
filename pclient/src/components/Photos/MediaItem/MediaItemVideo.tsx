'use client'

import { mediaService } from '@/services/media.service'
import { usePreviewStore } from '@/stores/preivew.store'
import { useQuery } from '@tanstack/react-query'
import { PlayCircle } from 'lucide-react'
import { memo, useEffect, useState } from 'react'

import { IMedia } from '@/types/media.types'

// eslint-disable-next-line react/display-name
export const MediaItemVideo = memo(({ mediaFile }: { mediaFile: IMedia }) => {
	const { setPreviewFile, setOpen, setTitle } = usePreviewStore(state => state)

	const { data, isLoading } = useQuery({
		queryKey: ['getThumbFileById', mediaFile.id],
		queryFn: () => mediaService.getThumbFileById({ id: mediaFile?.id })
	})

	const [mediaUrl, setMediaUrl] = useState('')

	console.info(mediaFile)
	useEffect(() => {
		if (data?.data instanceof Blob) {
			const url = window.URL.createObjectURL(new Blob([data.data]))
			setMediaUrl(url)
		}
	}, [data])

	const handlePreview = (url: string, type: string, mode?: string) => {
		setPreviewFile({ src: url, type, mode })
		setTitle(`Preview file ${mediaFile.path}`)
		setOpen(true)
	}

	return (
		<div
			onClick={() => handlePreview(`${mediaFile.id}`, 'video/mp4', 'stream')}
			className='cursor-pointer border-[1px] border-solid border-slate-400 rounded-xl flex justify-center items-center overflow-hidden object-cover  relative aspect-square'
		>
			<img
				className='w-full h-full object-cover hover:scale-110 scale-100 duration-300 transition-all '
				src={mediaUrl}
				alt=''
			/>
			<PlayCircle className='w-16 h-16 text-white absolute translate-x-[1/2] translate-y-[1/2]' />
			{isLoading && (
				<div className='p-4 w-full h-full flex justify-center items-center'>
					<span className='loader '></span>
				</div>
			)}
			{mediaFile?.dateCreate && (
				<div className='absolute bottom-2 left-2 text-sm bg-gray-700 p-1 rounded-lg opacity-65'>
					{new Date(mediaFile.dateCreate).toLocaleString()}
				</div>
			)}
		</div>
	)
})
