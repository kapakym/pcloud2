import { filesService } from '@/services/files.service'
import { IFilesStore, useFileActionsStore } from '@/stores/file-actions.store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useEffect } from 'react'

import { IActionFilesReq, IFolder } from '@/types/files.types'

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
		setPath,
		filesBuffer
	} = useFileActionsStore(state => state)

	const invalidateQuery = useQueryClient()

	const { mutate: mutateCopyFiles } = useMutation({
		mutationKey: ['copyFiles'],
		mutationFn: (data: IActionFilesReq) => filesService.copyFiles(data),
		onSuccess: () => {
			invalidateQuery.invalidateQueries({ queryKey: ['getFiles', path] })
		}
	})

	const { mutate: mutateMoveFiles } = useMutation({
		mutationKey: ['moveFiles'],
		mutationFn: (data: IActionFilesReq) => filesService.moveFiles(data),
		onSuccess: () => {
			invalidateQuery.invalidateQueries({ queryKey: ['getFiles', path] })
		}
	})

	useEffect(() => {
		setAction(null)
		if (action) {
			switch (action) {
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
			}
		}
	}, [action])
}
