import { useShareStore } from '@/stores/share.store'
import cn from 'clsx'
import dayjs from 'dayjs'

import { IShareLink } from '@/types/share.types'

export const ShareLinkItem = ({
	link,
	selected
}: {
	link: IShareLink
	selected?: boolean
}) => {
	const { setSelected } = useShareStore(state => state)

	const handleSetSelected = () => {
		setSelected(link)
	}

	return (
		<div
			onClick={handleSetSelected}
			key={link.id}
			className={cn(
				'grid grid-cols-3  justify-between items-center hover:bg-slate-700 cursor-pointer p-2 w-full space-x-1 border-b-[1px] border-b-solid border-b-slate-700',
				selected ? 'bg-slate-600' : 'even:bg-slate-800'
			)}
		>
			<div>{link.filename}</div>
			<div>{link.path}</div>
			<div>
				{link.timeLive ? dayjs(link.timeLive).format('DD-MM-YYYY') : 'infinity'}
			</div>
		</div>
	)
}
