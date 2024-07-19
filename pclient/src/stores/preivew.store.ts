import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface IPreviewFile {
	src: string
	type: string
}

interface IDrawerStore {
	open: boolean
	previewFile: IPreviewFile | null
	title: string
	setOpen: (payload: boolean) => void
	onClose: () => void
	setPreviewFile: (payload: IPreviewFile | null) => void
	setTitle: (payload: string) => void
}

export const usePreviewStore = create<IDrawerStore>()(
	immer(set => ({
		open: false,
		previewFile: null,
		title: '',
		onClose: () =>
			set(() => ({
				open: false,
				childrenDrawer: null
			})),
		setOpen: payload =>
			set(() => ({
				open: payload
			})),
		setPreviewFile: payload =>
			set(() => ({
				previewFile: payload
			})),
		setTitle: payload =>
			set(() => ({
				title: payload
			}))
	}))
)
