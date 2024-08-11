import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { TypeFiles, TypeFilesActions } from '@/types/files.types'
import { IShareLink, TypeShareActions } from '@/types/share.types'

interface IShareStore {
	selected: IShareLink | null
	action: TypeShareActions
	path: string
	setSelected: (payload: IShareLink) => void
	setAction: (payload: TypeShareActions) => void
	setPath: (payload: string) => void
}

export const useShareStore = create<IShareStore>()(
	immer(set => ({
		selected: null,
		action: null,
		path: '',
		setSelected: payload => set(() => ({ selected: payload })),
		setAction: payload => set(() => ({ action: payload })),
		setPath: payload => set(() => ({ path: payload }))
	}))
)
