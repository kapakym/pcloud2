'use client'

import { photosService } from '@/services/photos.service'
import { useMutation, useQuery } from '@tanstack/react-query'

import Button from '@/components/ui/Button/Button'

import { IScanPhotosReq } from '@/types/photos.types'

export default function PhotosList() {
	const { mutate: mutateScanPhotos } = useMutation({
		mutationKey: ['scanPhotos'],
		mutationFn: (data: IScanPhotosReq) => photosService.scanPhotos(data)
	})

	const { data } = useQuery({
		queryKey: ['getPhotos'],
		queryFn: () => photosService.getPhotos({ offset: 1 })
	})

	console.log(data?.data)
	return (
		<div>
			PhotosList
			<Button onClick={() => mutateScanPhotos({ uuidTask: '11111' })}>
				Scan
			</Button>
			{!!data?.data.photos.length &&
				data?.data.photos.map(item => <div key={item.id}>{item.path}</div>)}
		</div>
	)
}

export { PhotosList }
