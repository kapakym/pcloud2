import { StatusBarItem } from '../StatusBarItem/StatusBarItem'
import { useLogsStore } from '@/stores/logs.store'
import React from 'react'

function TasksList() {
	const { tasks, completedTask } = useLogsStore(state => state)
	// console.log(tasks.map(item => item.id))
	console.log('render')
	return (
		<div className='w-full h-full overflow-auto'>
			{tasks.map(item => (
				<StatusBarItem
					task={item}
					key={item.id}
				/>
			))}
			{completedTask.map(item => (
				<StatusBarItem
					task={item}
					key={item.id}
				/>
			))}
		</div>
	)
}

export { TasksList }
