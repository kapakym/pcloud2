import { MediaItem } from '../MediaItem/MediaItem'
import { FaceIcon } from './FaceIcon'
import { useMediaStore } from '@/stores/media.store'
import cn from 'clsx'

export const SortByPeoples = () => {
	const { peopleSelected } = useMediaStore(state => state)
	return (
		<>
			{!!peopleSelected.length &&
				peopleSelected.map(face => (
					<div key={face.faceId}>
						<FaceIcon face={face} />
						<div className={cn(`w-full l grid grid-cols-3 gap-4 p-2`)}>
							{face?.photos?.length &&
								face.photos.map(item => (
									<div key={`${item.id}${item.path}`}>
										<MediaItem mediaFile={item}></MediaItem>
									</div>
								))}
						</div>
					</div>
				))}
		</>
	)
}
