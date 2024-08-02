import { PhotoItem } from '../PhotoItem/PhotoItem'
import { InfiniteData } from '@tanstack/react-query'

import { IGetPhotosRes, IPhoto } from '@/types/photos.types'

export const SortNotFilter = ({
	data
}: {
	data: InfiniteData<IGetPhotosRes, unknown> | undefined
}) => {
	return (
		<>
			{!!data?.pages.length &&
				Object.entries(data.pages).map(([page, items]) => (
					<div key={page}>
						<h2>Страница - {+page + 1}</h2>
						<div className='w-full  grid grid-cols-3 gap-4 p-2'>
							{items?.photos?.map((item: IPhoto) => (
								<PhotoItem
									key={item.id + 'photo'}
									photo={item}
								></PhotoItem>
							))}
						</div>
					</div>
				))}
		</>
	)
}
