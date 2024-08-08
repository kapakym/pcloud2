'use client'

import { shareService } from '@/services/share.service'
import { useShareStore } from '@/stores/share.store'
import { useQuery } from '@tanstack/react-query'
import cn from 'clsx'

import ShareActionBar from '@/components/ShareActionBar/ShareActionBar'
import { ShareLinkItem } from '@/components/ui/ShareLinkItem/ShareLinkItem'

import { IShareLink } from '@/types/share.types'

function ShareList() {
	const { selected } = useShareStore(state => state)
	const { data } = useQuery({
		queryKey: ['queryGetHareLinks'],
		queryFn: () => shareService.getShare()
	})
	console.log(data?.data)
	return (
		<div className='w-full h-full flex flex-col select-none'>
			<ShareActionBar />
			<div
				className={cn(
					'flex  justify-between items-center  cursor-pointer p-2 w-full space-x-1 border-b-[1px] border-b-solid border-b-slate-700 bg-slate-600'
				)}
			>
				<div>File name</div>
				<div>Path</div>
				<div>Time live</div>
			</div>
			<div className='w-full  overflow-y-auto h-full '>
				{!!data?.data.length &&
					data.data.map(item => (
						<ShareLinkItem
							key={item.id}
							link={item}
							selected={selected?.id === item.id}
						/>
					))}
			</div>
		</div>
	)
}

export { ShareList }
