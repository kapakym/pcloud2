import { MediaItem } from '../MediaItem/MediaItem'
import { MediaItemVideo } from '../MediaItem/MediaItemVideo'

import { IGetMediaRes, IMedia } from '@/types/media.types'

export const SortNotFilter = ({ data }: { data: IGetMediaRes | undefined }) => {
	return (
		<>
			{!!data?.files?.length && (
				<div className='w-full  grid grid-cols-2 md:grid-cols-3 gap-4 p-2'>
					{data?.files?.map((item: IMedia) =>
						item.type === 'image' ? (
							<MediaItem
								key={item.id + 'media'}
								mediaFile={item}
							></MediaItem>
						) : (
							<MediaItemVideo
								key={item.id + 'media'}
								mediaFile={item}
							></MediaItemVideo>
						)
					)}
				</div>
			)}
		</>
	)
}
