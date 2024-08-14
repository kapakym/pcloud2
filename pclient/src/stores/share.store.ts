import { IFilesStore } from './file-actions.store'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { TypeFiles, TypeFilesActions } from '@/types/files.types'
import { IShareLink, TypeShareActions } from '@/types/share.types'

interface IShareStore {
	selected: IShareLink | null
	selectedShareLink: IFilesStore | null
	action: TypeShareActions
	path: string
	setSelected: (payload: IShareLink | null) => void
	setSelectedShareLink: (payload: IFilesStore | null) => void
	setAction: (payload: TypeShareActions) => void
	setPath: (payload: string) => void
}

export const useShareStore = create<IShareStore>()(
	immer(set => ({
		selected: null,
		selectedShareLink: null,
		action: null,
		path: '',
		setSelected: payload => set(() => ({ selected: payload })),
		setSelectedShareLink: payload =>
			set(() => ({ selectedShareLink: payload })),
		setAction: payload => set(() => ({ action: payload })),
		setPath: payload => set(() => ({ path: payload }))
	}))
)
