import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { TypeFiles, TypeFilesActions } from '@/types/files.types'
import { IPhoto, TypePhotosActions } from '@/types/photos.types'

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
	action: TypePhotosActions
	limit: number
	offset: number
	total: number
	photoList: IPhoto[]
	selectMode: boolean
	previewPhoto: string | null

	setLimit: (payload: number) => void
	setOffset: (payload: number) => void
	setTotal: (payload: number) => void
	setPhotoList: (payload: IPhoto[]) => void
	setAction: (payload: TypePhotosActions) => void
	setSelectMode: (payload: boolean) => void
	setPreviewPhoto: (payload: string) => void
}

export const usePhotosStore = create<IFileActionsStore>()(
	immer(set => ({
		action: null,
		limit: 6,
		offset: 0,
		total: 0,
		photoList: [],
		selectMode: false,
		previewPhoto: null,

		setLimit: payload => set(() => ({ limit: payload })),
		setTotal: payload => set(() => ({ total: payload })),
		setOffset: payload => set(() => ({ offset: payload })),
		setPhotoList: payload => set(() => ({ photoList: payload })),
		setAction: payload => set(() => ({ action: payload })),
		setSelectMode: payload => set(() => ({ selectMode: payload })),
		setPreviewPhoto: payload => set(() => ({ previewPhoto: payload }))
	}))
)
