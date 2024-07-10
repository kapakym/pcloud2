import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { TypeStatusLogs } from '@/types/logs.types'

export interface ITaskStore {
	title: string
	createTime?: Date
	completedTime?: Date
	description?: string
	completed: boolean
	percent?: number
	id?: string
	status?: TypeStatusLogs
}
;``
interface ILogsStore {
	tasks: ITaskStore[]
	completedTask: ITaskStore[]
	addTask: (payload: ITaskStore) => string
	setCompletedTask: (payload: string) => void
	setPercent: (payload: { percent: number; uuid: string }) => void
}

export const useLogsStore = create<ILogsStore>()(
	immer(set => ({
		tasks: [],
		completedTask: [],
		addTask: (payload: ITaskStore) => {
			if (!payload?.id) payload.id = uuidv4()
			payload.status = 'in progress'
			payload.createTime = new Date()
			set(state => {
				state.tasks.push(payload)
			})
			return payload.id
		},
		setCompletedTask: async (payload: string) => {
			set(state => {
				const task = state.tasks.find(item => item.id === payload)
				if (task) {
					task.percent = 100
					task.completedTime = new Date()
					task.status = 'completed'
				}
			})
		},
		setPercent: async payload => {
			set(state => {
				const task = state.tasks.find(item => (item.id = payload.uuid))
				if (task) {
					task.percent = payload.percent
					if (payload.percent >= 100) {
						state.setCompletedTask(payload.uuid)
					}
				}
			})
		}
	}))
)
