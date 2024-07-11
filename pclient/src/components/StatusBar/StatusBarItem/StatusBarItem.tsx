import { ITaskStore } from '@/stores/logs.store'
import cn from 'clsx'

import { TypeStatusLogs } from '@/types/logs.types'

interface StatusBarItemProps {
	task: ITaskStore
}

function StatusBarItem({ task }: StatusBarItemProps) {
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
				// <span className='loader'></span>
				<div className='h-[10px] w-full border-[1px] border-solid border-slate-400 my-2 rounded-xl overflow-hidden animate-pulse'>
					<div
						className='h-full bg-green-600 rounded-xl'
						style={{ width: `${task.percent}%` }}
					></div>
				</div>
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
				{task.description && <div>description: {task.description}</div>}
			</div>
		</div>
	)
}

export { StatusBarItem }
