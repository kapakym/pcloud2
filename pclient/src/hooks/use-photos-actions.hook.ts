import { filesService } from '@/services/files.service'
import { photosService } from '@/services/photos.service'
import { IFilesStore, useFileActionsStore } from '@/stores/file-actions.store'
import { useLogsStore } from '@/stores/logs.store'
import { usePhotosStore } from '@/stores/photos.store'
import { usePreviewStore } from '@/stores/preivew.store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useEffect } from 'react'
import { Stream } from 'stream'

import {
	IActionFilesReq,
	IDeleteFilesReq,
	IDownloadFilesReq,
	IFolder,
	IRenameFilesReq
} from '@/types/files.types'
import { IScanPhotosReq } from '@/types/photos.types'

export const usePhotosActions = () => {
	const { action, setAction } = usePhotosStore(state => state)

	const { addTask, setCompletedTask, setPercent } = useLogsStore(state => state)

	const queryClient = useQueryClient()

	const { mutate: mutateScanPhotos } = useMutation({
		mutationKey: ['scanPhotos'],
		mutationFn: (data: IScanPhotosReq) => photosService.scanPhotos(data),
		onMutate: variables => {
			addTask({ completed: false, title: 'scan photos' })
		}
	})

	useEffect(() => {
		setAction(null)
		if (action) {
			switch (action) {
				case 'scanAll':
					mutateScanPhotos({ uuidTask: '1' })
					break
			}
		}
	}, [action])
}
