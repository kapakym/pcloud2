import { useShareStore } from '@/stores/share.store'
import cn from 'clsx'

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
				'flex  justify-between items-center hover:bg-slate-700 cursor-pointer p-2 w-full space-x-1 border-b-[1px] border-b-solid border-b-slate-700',
				selected ? 'bg-slate-600' : 'even:bg-slate-800'
			)}
		>
			<div>{link.filename}</div>
			<div>{link.path}</div>
			<div>{link.timeLive}</div>
		</div>
	)
}
