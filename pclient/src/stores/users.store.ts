import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { TypePhotosActions } from '@/types/photos.types'

interface IUsersStore {
	action: TypePhotosActions
	limit: number
	offset: number
	total: number
	selectMode: boolean
	page: number

	setLimit: (payload: number) => void
	setOffset: (payload: number) => void
	setTotal: (payload: number) => void
	setAction: (payload: TypePhotosActions) => void
	setSelectMode: (payload: boolean) => void
	setPage: (payload: number) => void
}

export const useUsersStore = create<IUsersStore>()(
	immer(set => ({
		action: null,
		limit: 6,
		offset: 0,
		total: 0,
		page: 1,
		selectMode: false,

		setLimit: payload => set(() => ({ limit: payload })),
		setTotal: payload => set(() => ({ total: payload })),
		setOffset: payload => set(() => ({ offset: payload })),
		setAction: payload => set(() => ({ action: payload })),
		setSelectMode: payload => set(() => ({ selectMode: payload })),
		setPage: payload => set(() => ({ showPeople: payload }))
	}))
)
