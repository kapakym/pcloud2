'use client'

import { shareService } from '@/services/share.service'
import { useQuery } from '@tanstack/react-query'

function ShareList() {
	const { data } = useQuery({
		queryKey: ['queryGetHareLinks'],
		queryFn: () => shareService.getShare()
	})
	console.log(data?.data)
	return <div className='w-full h-full flex flex-col select-none'></div>
}

export { ShareList }
