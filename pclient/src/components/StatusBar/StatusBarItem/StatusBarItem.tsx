import { ITaskStore } from '@/stores/logs.store'
import cn from 'clsx'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'

import { TypeStatusLogs } from '@/types/logs.types'

interface StatusBarItemProps {
	task: ITaskStore
}

function StatusBarItem({ task }: StatusBarItemProps) {
	const [isCollapsed, setIsCollapsed] = useState(true)
	const generateTextColor = (status: TypeStatusLogs | undefined) => {
		switch (status) {
			case 'completed':
				return 'text-green-400'
			case 'error':
				return 'text-red-400'
			case 'in progress':
				return 'text-blue-400'
			default:
				'text-white'
		}
	}
	return (
		<div className='border-b-[1px] border-solid border-slate-600 p-2 text-wrap overflow-hidden even:bg-slate-800 bg-slate-700'>
			<h3>{task.title}</h3>
			{task.status === 'in progress' && (
				<>
					{task.typeProgress === 'infinity' && <span className='loader'></span>}
					{task.typeProgress === 'percent' && (
						<div className='h-[10px] w-full border-[1px] border-solid border-slate-400 my-2 rounded-xl overflow-hidden animate-pulse'>
							<div
								className='h-full bg-green-600 rounded-xl'
								style={{ width: `${task.percent}%` }}
							></div>
						</div>
					)}
				</>
			)}

			<div className='text-sm'>
				<div className='text-sm'>id: {task.id}</div>
				<div>create at: {task.createTime?.toLocaleString()}</div>
				{task?.completedTime && (
					<div>completed at: {task.completedTime?.toLocaleString()}</div>
				)}
				<div>
					status:{' '}
					<span className={cn(generateTextColor(task.status))}>
						{task.status}
					</span>
				</div>
				<div
					className='flex h-4 items-center my-2 cursor-pointer justify-between border-[1px] rounded-md border-solid p-3 border-slate-400'
					onClick={() => setIsCollapsed(!isCollapsed)}
				>
					<div>description:</div>{' '}
					<ChevronRight
						className={cn(
							'transition-transform duration-200 ease-in-out',
							isCollapsed ? 'rotate-0' : 'rotate-90'
						)}
					/>
				</div>
				{task.description && (
					<div
						className={cn(
							'text-wrap bg-slate-900 overflow-auto transition-[max-height] ease-in-out duration-500',
							isCollapsed ? 'max-h-0' : 'max-h-screen'
						)}
					>
						<pre>{task.description}</pre>
					</div>
				)}
			</div>
		</div>
	)
}

export { StatusBarItem }
