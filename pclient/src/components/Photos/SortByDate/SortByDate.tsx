import { PhotoItem } from '../PhotoItem/PhotoItem'
import { InfiniteData } from '@tanstack/react-query'
import cn from 'clsx'
import dayjs from 'dayjs'

import { IGetPhotosRes, IPhoto } from '@/types/photos.types'

export const SortByDate = ({ data }: { data: IGetPhotosRes | undefined }) => {
	const groupedItems = data?.photos?.reduce(
		(acc, item) => {
			const date = dayjs(item.dateCreate).format('DD-MM-YYYY')

			if (!acc[date]) {
				acc[date] = []
			}
			if (!acc[date].find(el => el.id === item.id)) {
				acc[date].push(item)
			}
			return acc
		},
		{} as Record<string, IPhoto[]>
	)
	return (
		<>
			{groupedItems &&
				Object.entries(groupedItems).map(([date, items]) => (
					<div key={date}>
						<div className=''>
							<h2 className='px-4 pt-4'>{date}</h2>
						</div>

						<div
							className={cn(
								`w-full  grid grid-cols-2 md:grid-cols-3 gap-4 p-2`
							)}
						>
							{items.map(item => (
								<div key={`${item.id}${item.path}`}>
									<PhotoItem photo={item}></PhotoItem>
								</div>
							))}
						</div>
					</div>
				))}
		</>
	)
}
