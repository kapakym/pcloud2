import { PeopleItem } from '../PeopleItem/PeopleItem'
import { PhotoItem } from '../PhotoItem/PhotoItem'
import { usePhotosStore } from '@/stores/photos.store'
import cn from 'clsx'

export const SortByPeoples = () => {
	const { peopleSelected } = usePhotosStore(state => state)
	console.log(peopleSelected)
	return (
		<>
			{!!peopleSelected.length &&
				peopleSelected.map(face => (
					<div key={face.faceId}>
						<div className=''>
							<div className='px-4 pt-4 flex flex-col justify-center items-center'>
								<div>
									<PeopleItem face={face} />
								</div>

								<h2 className=' pt-2'>{face.name}</h2>
							</div>
						</div>

						<div className={cn(`w-full l grid grid-cols-3 gap-4 p-2`)}>
							{face?.photos?.length &&
								face.photos.map(item => (
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
