import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { TypeFiles, TypeFilesActions } from '@/types/files.types'

export interface IFilesStore {
	name: string
	type: TypeFiles
}

export interface IFilesBuffer {
	action?: TypeFilesActions
	sourcePath: string
	items: IFilesStore[]
}

interface IFileActionsStore {
	selected: IFilesStore[]
	action: TypeFilesActions
	filesBuffer: IFilesBuffer | null
	path: string
	filesUpload: FileList | null
	setSelected: (payload: IFilesStore[]) => void
	setAction: (payload: TypeFilesActions) => void
	setBuffer: (payload: IFilesBuffer) => void
	setPath: (payload: string) => void
	setFilesUpload: (payload: FileList) => void
}

export const useFileActionsStore = create<IFileActionsStore>()(
	immer(set => ({
		selected: [],
		action: null,
		filesBuffer: null,
		path: '',
		filesUpload: null,
		setSelected: payload => set(() => ({ selected: payload })),
		setAction: payload => set(() => ({ action: payload })),
		setBuffer: payload =>
			set(() => ({
				filesBuffer: payload
			})),
		setPath: payload => set(() => ({ path: payload })),
		setFilesUpload: payload => set(() => ({ filesUpload: payload }))
	}))
)
