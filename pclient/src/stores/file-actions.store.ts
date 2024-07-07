import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { TypeFiles, TypeFilesActions } from '@/types/files.types'

interface IFilesStore {
	name: string
	type: TypeFiles
}
interface IFileActionsStore {
	selected: IFilesStore[]
	action: TypeFilesActions
	setSelected: (payload: IFilesStore[]) => void
	setAction: (payload: TypeFilesActions) => void
}

export const useFileActionsStore = create<IFileActionsStore>()(
	immer(set => ({
		selected: [],
		action: null,
		setSelected: payload => set(state => ({ selected: payload })),
		setAction: payload => set(state => ({ action: payload }))
	}))
)
