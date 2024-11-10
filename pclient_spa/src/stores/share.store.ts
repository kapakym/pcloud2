import { IFilesStore } from './file-actions.store'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { IShareLink, TypeShareActions } from '@/types/share.types'

interface IShareStore {
	selected: IShareLink | null
	selectedShareLink: IFilesStore[]
	action: TypeShareActions
	selectMode: boolean
	path: string
	setSelected: (payload: IShareLink | null) => void
	setSelectedShareLink: (payload: IFilesStore[]) => void
	setAction: (payload: TypeShareActions) => void
	setPath: (payload: string) => void
	setSelectMode: (payload: boolean) => void
}

export const useShareStore = create<IShareStore>()(
	immer(set => ({
		selected: null,
		selectedShareLink: [],
		action: null,
		path: '',
		selectMode: false,
		setSelected: payload => set(() => ({ selected: payload })),
		setSelectedShareLink: payload =>
			set(() => ({ selectedShareLink: payload })),
		setAction: payload => set(() => ({ action: payload })),
		setPath: payload => set(() => ({ path: payload })),
		setSelectMode: payload =>
			set(() => ({
				selectMode: payload
			}))
	}))
)
