import { PhotoItem } from '../PhotoItem/PhotoItem'

import { IGetPhotosRes, IPhoto } from '@/types/photos.types'

export const SortNotFilter = ({
	data
}: {
	data: IGetPhotosRes | undefined
}) => {
	return (
		<>
			{!!data?.photos?.length && (
				<div className='w-full  grid grid-cols-2 md:grid-cols-3 gap-4 p-2'>
					{data?.photos?.map((item: IPhoto) => (
						<PhotoItem
							key={item.id + 'photo'}
							photo={item}
						></PhotoItem>
					))}
				</div>
			)}
		</>
	)
}
