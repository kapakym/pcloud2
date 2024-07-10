import { v4 as uuidv4 } from 'uuid'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface ITaskStore {
	title: string
	createTime?: Date
	completedTime?: Date
	description?: string
	completed: boolean
	percent?: number
	id?: string
}
;``
interface ILogsStore {
	tasks: ITaskStore[]
	addTask: (payload: ITaskStore) => string
	setCompletedTask: (payload: string) => void
}

export const useLogsStore = create<ILogsStore>()(
	immer(set => ({
		tasks: [],
		addTask: (payload: ITaskStore) => {
			if (!payload?.id) payload.id = uuidv4()
			payload.createTime = new Date()
			set(state => {
				state.tasks = [payload, ...state.tasks]
			})
			return payload.id
		},
		setCompletedTask: (payload: string) => {
			set(state => {
				const task = state.tasks.find(item => item.id === payload)
				if (task) {
					task.completed = true
					task.percent = 100
					task.completedTime = new Date()
				}
			})
		}
	}))
)
