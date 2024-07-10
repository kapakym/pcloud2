import { VSeparator } from '../VSepartor/VSeparator'
import { useLogsStore } from '@/stores/logs.store'
import { ScrollText } from 'lucide-react'
import { useMemo } from 'react'

function StatusBar() {
	const { tasks } = useLogsStore(state => state)
	const countWorkingTasks = useMemo(
		() => tasks.filter(item => !item.completed),
		[tasks]
	)
	return (
		<div className='bg-gray-800 p-2  border-t-[1px] border-solid border-slate-600 flex justify-between items-center'>
			<div className='flex flex-col'>
				<div className='text-sm min-h-[3px]'>
					{!!countWorkingTasks.length &&
						`[ ${countWorkingTasks.length} ] working...`}
				</div>
				{!!countWorkingTasks.length && <span className='loader'></span>}
			</div>
			<div className='flex space-x-2 h-full'>
				<VSeparator />
				<ScrollText
					size={28}
					className='text-slate-400 hover:text-slate-200 cursor-pointer'
				/>
			</div>
		</div>
	)
}

export { StatusBar }
