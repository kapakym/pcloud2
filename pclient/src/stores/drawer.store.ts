import { ReactElement, ReactNode } from 'react'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface IDrawerStore {
	open: boolean
	childrenDrawer: ReactNode | null
	title: string
	setOpen: (payload: boolean) => void
	onClose: () => void
	setChildrenDrawer: (payload: ReactNode | null) => void
	setTitle: (payload: string) => void
}

export const useDrawerStore = create<IDrawerStore>()(
	immer(set => ({
		open: false,
		childrenDrawer: null,
		title: '',
		onClose: () =>
			set(state => ({
				open: false,
				childrenDrawer: null
			})),
		setOpen: payload =>
			set(state => ({
				open: payload
			})),
		setChildrenDrawer: payload =>
			set(state => ({
				childrenDrawer: payload
			})),
		setTitle: payload =>
			set(state => ({
				title: payload
			}))
	}))
)
