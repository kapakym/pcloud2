import { photosService } from '@/services/photos.service'
import { usePhotosStore } from '@/stores/photos.store'
import { useQuery } from '@tanstack/react-query'
import cn from 'clsx'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

import { IPeopleResponse } from '@/types/photos.types'

interface FaceItemProps {
	face: IPeopleResponse
}

export const PeopleItem = ({ face }: FaceItemProps) => {
	const { peopleSelected, setPeoplesSelected } = usePhotosStore(state => state)

	const { data, isLoading } = useQuery({
		queryKey: ['getFaceById', face.faceId],
		queryFn: () => photosService.getFaceById({ id: face.faceId })
	})

	const [photoUrl, setPhotoUrl] = useState('')

	useEffect(() => {
		if (data?.data instanceof Blob) {
			const url = window.URL.createObjectURL(new Blob([data.data]))
			setPhotoUrl(url)
		}
	}, [data])

	const isExistPeople = useMemo(
		() => peopleSelected.find(item => item.face === face.face),
		[peopleSelected, face.face]
	)

	const handleClickPeople = () => {
		isExistPeople
			? setPeoplesSelected(
					peopleSelected.filter(item => item.face !== face.face)
				)
			: setPeoplesSelected([...peopleSelected, face])
	}

	return (
		<div
			className={cn(
				' rounded-full overflow-hidden border-[2px] h-[80px] min-w-[80px] border-solid  aspect-square',
				isExistPeople ? 'border-green-600' : 'border-white'
			)}
		>
			{isLoading && <span className='loader'></span>}
			{!isLoading && (
				<img
					onClick={handleClickPeople}
					src={photoUrl}
					alt=''
					className=' h-full w-full object-contain aspect-square'
				/>
			)}
		</div>
	)
}
