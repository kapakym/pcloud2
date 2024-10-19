import { filesService } from '@/services/files.service'
import { IFilesStore, useFileActionsStore } from '@/stores/file-actions.store'
import { useLogsStore } from '@/stores/logs.store'
import { usePreviewStore } from '@/stores/preivew.store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useEffect } from 'react'

import {
	IActionFilesReq,
	IDeleteFilesReq,
	IDownloadFilesReq,
	IFolder,
	IRenameFilesReq
} from '@/types/files.types'

export const useFilesActions = (
	data: AxiosResponse<IFolder, IFolder> | undefined
) => {
	const {
		selected,
		setSelected,
		action,
		setAction,
		setBuffer,
		path,
		filesBuffer,
		filesUpload,
		newName
	} = useFileActionsStore(state => state)

	const { addTask, setCompletedTask, setPercent } = useLogsStore(state => state)
	const { setPreviewFile, setOpen, setTitle } = usePreviewStore(state => state)

	const queryClient = useQueryClient()

	const { mutate: mutateCopyFiles } = useMutation({
		mutationKey: ['copyFiles'],
		mutationFn: (data: IActionFilesReq) => filesService.copyFiles(data),
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries({ queryKey: ['getFiles', path] })
			setCompletedTask({
				uuid: context.uuid,
				description: JSON.stringify(data.data, null, 2)
			})
		},
		onMutate: () => {
			const uuid = addTask({ title: 'copy files', completed: false })
			return { uuid: uuid }
		}
	})

	const { mutate: mutateMoveFiles } = useMutation({
		mutationKey: ['moveFiles'],
		mutationFn: (data: IActionFilesReq) => filesService.moveFiles(data),
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries({ queryKey: ['getFiles', path] })
			setCompletedTask({
				uuid: context.uuid,
				description: JSON.stringify(data.data, null, 2)
			})
		},
		onMutate: () => {
			const uuid = addTask({ title: 'move files', completed: false })
			return { uuid: uuid }
		}
	})

	const { mutate: mutateRenameFile } = useMutation({
		mutationKey: ['renameFile'],
		mutationFn: (data: IRenameFilesReq) => filesService.renameFile(data),
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries({ queryKey: ['getFiles', path] })
			setCompletedTask({
				uuid: context.uuid,
				description: JSON.stringify(data.data, null, 2)
			})
		},
		onMutate: () => {
			const uuid = addTask({ title: 'rename file', completed: false })
			return { uuid: uuid }
		}
	})

	const { mutate: deleteMutate } = useMutation({
		mutationKey: ['deleteFiles'],
		mutationFn: (data: IDeleteFilesReq) => filesService.deleteFiles(data),
		onSuccess: (data, variables, context) => {
			queryClient.invalidateQueries({ queryKey: ['getFiles', path] })
			setCompletedTask({
				uuid: context.uuid,
				description: JSON.stringify(data.data, null, 2)
			})
		},
		onMutate: () => {
			const uuid = addTask({ title: 'copy files', completed: false })
			return { uuid: uuid }
		}
	})

	const { mutate: mutateUploadFile } = useMutation({
		mutationKey: ['uploadFile'],
		mutationFn: (data: {
			formData: FormData
			progressFn: (percent: number) => void
		}) => filesService.uploadFile(data.formData, data.progressFn),
		onSuccess: data => {
			queryClient.invalidateQueries({ queryKey: ['getFiles', path] })
			setCompletedTask({
				uuid: data.data.uuid,
				description: JSON.stringify(data.data, null, 2)
			})
		}
	})

	const { mutate: mutatePreviewFile } = useMutation({
		mutationKey: ['downloadFile'],
		mutationFn: (data: {
			file: IDownloadFilesReq
			progressFn: (percent: number) => void
			uuid: string
		}) => filesService.downloadFile(data.file, data.progressFn),
		onMutate: variables => {
			return { uuid: variables.uuid, filename: variables.file.filename }
		},
		onSuccess: (data, variables, context) => {
			setCompletedTask({
				uuid: context.uuid
			})

			if (data.data instanceof Blob) {
				const url = window.URL.createObjectURL(new Blob([data.data]))
				setPreviewFile({ src: url, type: data.data.type })
				setTitle(`Preview file ${context.filename}`)
				setOpen(true)
			}
		}
	})

	const { mutate: mutateDownloadFile } = useMutation({
		mutationKey: ['downloadFile'],
		mutationFn: (data: {
			file: IDownloadFilesReq
			progressFn: (percent: number) => void
			uuid: string
		}) => filesService.downloadFile(data.file, data.progressFn),
		onMutate: variables => {
			return { uuid: variables.uuid, filename: variables.file.filename }
		},
		onSuccess: (data, variables, context) => {
			setCompletedTask({
				uuid: context.uuid
			})

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

	const handleUploadFiles = async () => {
		if (filesUpload?.length) {
			//@ts-ignore
			const files = [...filesUpload]
			files.forEach(file => {
				const taskUuid = addTask({
					title: 'upload file ' + file.name,
					completed: false
				})

				const progressFn = (percentComplete: number) => {
					setPercent({ percent: percentComplete, uuid: taskUuid })
				}

				const formData = new FormData()
				formData.append('file', file)
				formData.append('filename', encodeURI(file.name))
				formData.append('uuid', taskUuid)
				formData.append('path', encodeURI(path))
				mutateUploadFile({ formData, progressFn })
			})
		}
	}

	const handleDownloadFiles = async () => {
		selected.forEach(item => {
			if (item.type === 'file') {
				const taskUuid = addTask({
					title: 'download file ' + item.name,
					completed: false
				})

				const progressFn = (percentComplete: number) => {
					setPercent({ percent: percentComplete, uuid: taskUuid })
				}
				mutateDownloadFile({
					file: {
						path,
						filename: item.name
					},
					uuid: taskUuid,
					progressFn
				})
			}
		})
	}

	const handlePreviewFile = () => {
		if (selected[0].type === 'file') {
			const taskUuid = addTask({
				title: 'preview file ' + selected[0].name,
				completed: false
			})

			const progressFn = (percentComplete: number) => {
				setPercent({ percent: percentComplete, uuid: taskUuid })
			}
			mutatePreviewFile({
				file: {
					path,
					filename: selected[0].name
				},
				uuid: taskUuid,
				progressFn
			})
		}
	}

	useEffect(() => {
		setAction(null)
		if (action) {
			switch (action) {
				case 'view':
					handlePreviewFile()
					break
				case 'paste':
					if (filesBuffer?.action === 'copy') {
						mutateCopyFiles({
							sourcePath: filesBuffer.sourcePath,
							destPath: path,
							files: filesBuffer.items
						})
					}
					if (filesBuffer?.action === 'move') {
						mutateMoveFiles({
							sourcePath: filesBuffer.sourcePath,
							destPath: path,
							files: filesBuffer.items
						})
					}
					break
				case 'edit':
					mutateRenameFile({
						sourcePath: path,
						newName: newName || '',
						file: selected[0]
					})
					break
				case 'download':
					handleDownloadFiles()
					break
				case 'copy':
					setBuffer({
						action: 'copy',
						sourcePath: path,
						items: selected
					})
					break
				case 'move':
					setBuffer({
						action: 'move',
						sourcePath: path,
						items: selected
					})
					break
				case 'delete':
					deleteMutate({
						files: selected.map(item => ({ name: item.name, type: item.type })),
						path
					})
					setBuffer({
						action: 'delete',
						sourcePath: path,
						items: selected
					})
					break
				case 'selectAll':
					if (selected.length > 0) {
						setSelected([])
						break
					}
					if (data?.data) {
						const folders: IFilesStore[] = data.data?.folders.map(item => ({
							name: item.name,
							type: 'folder'
						}))

						const files: IFilesStore[] = data.data?.files.map(item => ({
							name: item.name,
							type: 'file'
						}))

						setSelected([...folders, ...files])
					}
					break
				case 'upload':
					handleUploadFiles()
					break
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [action])
}
