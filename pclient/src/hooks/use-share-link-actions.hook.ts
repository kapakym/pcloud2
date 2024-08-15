import { shareService } from '@/services/share.service'
import { IFilesStore } from '@/stores/file-actions.store'
import { usePreviewStore } from '@/stores/preivew.store'
import { useShareStore } from '@/stores/share.store'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { IDownloadShareFilesReq } from '@/types/share.types'

export const useShareLinkActions = (idShareLink: string) => {
	const { selectedShareLink, path, setAction, action } = useShareStore(
		state => state
	)

	const { setPreviewFile, setOpen, setTitle } = usePreviewStore(state => state)

	// const { mutate: mutatePreviewFile } = useMutation({
	// 	mutationKey: ['downloadFile'],
	// 	mutationFn: (data: {
	// 		file: IDownloadFilesReq
	// 		progressFn: (percent: number) => void
	// 		uuid: string
	// 	}) => filesService.downloadFile(data.file, data.progressFn),
	// 	onMutate: variables => {
	// 		return { uuid: variables.uuid, filename: variables.file.filename }
	// 	},
	// 	onSuccess: (data, variables, context) => {
	// 		setCompletedTask({
	// 			uuid: context.uuid
	// 		})

	// 		if (data.data instanceof Blob) {
	// 			const url = window.URL.createObjectURL(new Blob([data.data]))
	// 			setPreviewFile({ src: url, type: data.data.type })
	// 			setTitle(`Preview file ${context.filename}`)
	// 			setOpen(true)
	// 		}
	// 	}
	// })

	const { mutate: mutateDownloadFile } = useMutation({
		mutationKey: ['downloadShareFile'],
		mutationFn: (data: IDownloadShareFilesReq) =>
			shareService.downloadFile(data),
		onMutate: variables => {
			return { filename: variables.filename }
		},
		onSuccess: (data, variables, context) => {
			if (data.data instanceof Blob) {
				const url = window.URL.createObjectURL(new Blob([data.data]))
				const link = document.createElement('a')
				link.href = url
				link.setAttribute('download', context.filename)
				document.body.appendChild(link)
				link.click()
				link.remove()
			}
		}
	})

	const handleDownloadFiles = async () => {
		selectedShareLink.forEach(item => {
			if (item.type === 'file') {
				mutateDownloadFile({
					path,
					filename: item.name,
					id: idShareLink
				})
			}
		})
	}

	// const handlePreviewFile = () => {
	// 	if (selected[0].type === 'file') {
	// 		const taskUuid = addTask({
	// 			title: 'preview file ' + selected[0].name,
	// 			completed: false
	// 		})

	// 		const progressFn = (percentComplete: number) => {
	// 			setPercent({ percent: percentComplete, uuid: taskUuid })
	// 		}
	// 		mutatePreviewFile({
	// 			file: {
	// 				path,
	// 				filename: selected[0].name
	// 			},
	// 			uuid: taskUuid,
	// 			progressFn
	// 		})
	// 	}
	// }

	useEffect(() => {
		setAction(null)
		if (action) {
			switch (action) {
				// case 'view':
				// 	handlePreviewFile()
				// 	break
				case 'download':
					handleDownloadFiles()
					break
			}
		}
	}, [action])
}
