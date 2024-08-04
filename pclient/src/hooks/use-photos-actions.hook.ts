import { photosService } from '@/services/photos.service'
import { useLogsStore } from '@/stores/logs.store'
import { usePhotosStore } from '@/stores/photos.store'
import { usePreviewStore } from '@/stores/preivew.store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Vibrate } from 'lucide-react'
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { IScanPhotosReq } from '@/types/photos.types'

export const usePhotosActions = () => {
	const { action, setAction, previewPhoto } = usePhotosStore(state => state)
	const { setPreviewFile, setOpen, setTitle } = usePreviewStore(state => state)

	const { addTask, setCompletedTask, setPercent } = useLogsStore(state => state)

	const queryClient = useQueryClient()

	const { mutate: mutateScanPhotos } = useMutation({
		mutationKey: ['scanPhotos'],
		mutationFn: (data: IScanPhotosReq = { uuidTask: '' }) =>
			photosService.scanPhotos(data)
	})

	const { mutate: mutateScanFace } = useMutation({
		mutationKey: ['mutateScanFace'],
		mutationFn: (data: { uuidTask: string }) => photosService.scanFaces(data)
	})

	const { mutate: mutateUpdateClusters } = useMutation({
		mutationKey: ['mutateUpdateClusters'],
		mutationFn: (data: { uuidTask: string }) =>
			photosService.updateClusters(data)
	})

	useEffect(() => {
		setAction(null)
		if (action) {
			const uuid = uuidv4()
			switch (action) {
				case 'scanAll':
					addTask({
						completed: false,
						title: 'scan photos',
						id: uuid,
						typeProgress: 'infinity'
					})
					mutateScanPhotos({ uuidTask: uuid })
					break
				case 'scanFaces':
					addTask({
						completed: false,
						title: 'scan faces',
						id: uuid,
						typeProgress: 'infinity'
					})
					mutateScanFace({ uuidTask: uuid })
					break
				case 'updateClusters':
					addTask({
						completed: false,
						title: 'update clusters',
						id: uuid,
						typeProgress: 'infinity'
					})
					mutateUpdateClusters({ uuidTask: uuid })
					break
			}
		}
	}, [action])
}
