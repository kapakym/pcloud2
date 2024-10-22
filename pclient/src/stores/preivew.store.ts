import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export interface IPreviewFile {
	src: string
	type: string
	mode?: string
}

interface IDrawerStore {
	open: boolean
	openVideoPlayer: boolean
	previewFile: IPreviewFile | null
	title: string
	setOpen: (payload: boolean) => void
	setOpenVideoPlayer: (payload: boolean) => void
	onClose: () => void
	onCloseVideoPlayer: () => void
	setPreviewFile: (payload: IPreviewFile | null) => void
	setTitle: (payload: string) => void
}

export const usePreviewStore = create<IDrawerStore>()(
	immer(set => ({
		open: false,
		openVideoPlayer: false,
		previewFile: null,
		title: '',
		onClose: () =>
			set(() => ({
				open: false,
				childrenDrawer: null
			})),
		onCloseVideoPlayer: () =>
			set(() => ({
				openVideoPlayer: false,
				childrenDrawer: null
			})),
		setOpen: payload =>
			set(() => ({
				open: payload
			})),
		setOpenVideoPlayer: payload =>
			set(() => ({
				openVideoPlayer: payload
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
