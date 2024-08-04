import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { TypeFiles, TypeFilesActions } from '@/types/files.types'
import {
	IPeopleResponse,
	IPhoto,
	TypePhotosActions,
	TypeSortPhotos,
	TypeSortWay
} from '@/types/photos.types'

interface IPhotoActionsStore {
	action: TypePhotosActions
	limit: number
	offset: number
	total: number
	photoList: IPhoto[]
	selectMode: boolean
	previewPhoto: string | null
	sortBy: TypeSortPhotos
	sortWay: TypeSortWay
	openPeoplesBar: boolean
	peopleSelected: IPeopleResponse[] | []
	showPeople: boolean

	setLimit: (payload: number) => void
	setOffset: (payload: number) => void
	setTotal: (payload: number) => void
	setPhotoList: (payload: IPhoto[]) => void
	setAction: (payload: TypePhotosActions) => void
	setSelectMode: (payload: boolean) => void
	setPreviewPhoto: (payload: string) => void
	setSortBy: (payload: TypeSortPhotos) => void
	setSortWay: (payload: TypeSortWay) => void
	setOpenPeoplesBar: (payload: boolean) => void
	setPeoplesSelected: (payload: IPeopleResponse[]) => void
	setShowPeople: (payload: boolean) => void
}

export const usePhotosStore = create<IPhotoActionsStore>()(
	immer(set => ({
		action: null,
		limit: 6,
		offset: 0,
		total: 0,
		photoList: [],
		selectMode: false,
		previewPhoto: null,
		sortBy: undefined,
		sortWay: 'asc',
		peopleSelected: [],
		openPeoplesBar: true,
		showPeople: false,

		setLimit: payload => set(() => ({ limit: payload })),
		setTotal: payload => set(() => ({ total: payload })),
		setOffset: payload => set(() => ({ offset: payload })),
		setPhotoList: payload => set(() => ({ photoList: payload })),
		setAction: payload => set(() => ({ action: payload })),
		setSelectMode: payload => set(() => ({ selectMode: payload })),
		setPreviewPhoto: payload => set(() => ({ previewPhoto: payload })),
		setSortBy: payload => set(() => ({ sortBy: payload })),
		setSortWay: payload => set(() => ({ sortWay: payload })),
		setOpenPeoplesBar: payload => set(() => ({ openPeoplesBar: payload })),
		setPeoplesSelected: payload => set(() => ({ peopleSelected: payload })),
		setShowPeople: payload => set(() => ({ showPeople: payload }))
	}))
)