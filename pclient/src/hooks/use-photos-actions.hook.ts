import { photosService } from '@/services/photos.service'
import { useLogsStore } from '@/stores/logs.store'
import { usePhotosStore } from '@/stores/photos.store'
import { usePreviewStore } from '@/stores/preivew.store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

import { IScanPhotosReq } from '@/types/photos.types'

export const usePhotosActions = () => {
	const { action, setAction, previewPhoto } = usePhotosStore(state => state)
	const { setPreviewFile, setOpen, setTitle } = usePreviewStore(state => state)

	const { addTask, setCompletedTask, setPercent } = useLogsStore(state => state)

	const queryClient = useQueryClient()

	const { mutate: mutateScanPhotos } = useMutation({
		mutationKey: ['scanPhotos'],
		mutationFn: (data: IScanPhotosReq) => photosService.scanPhotos(data),
		onMutate: variables => {
			addTask({ completed: false, title: 'scan photos' })
		}
	})

	const { mutate: mutateScanFace } = useMutation({
		mutationKey: ['mutateScanFace'],
		mutationFn: (data: { id: string }) => photosService.scanFaces(data),
		onMutate: () => {
			const uuid = addTask({ completed: false, title: 'scan faces' })
			return { uuid }
		}
	})

	const { mutate: mutateUpdateClusters } = useMutation({
		mutationKey: ['mutateUpdateClusters'],
		mutationFn: (data: { id: string }) => photosService.updateClusters(data),
		onMutate: () => {
			const uuid = addTask({ completed: false, title: 'update clusters' })
			return { uuid }
		}
	})

	const handlePreviewFile = () => {
		if (previewPhoto) {
			// setPreviewFile({ src: url, type: data.data.type })
			// setTitle(`Preview file ${context.filename}`)
			setOpen(true)
		}
	}

	useEffect(() => {
		setAction(null)
		if (action) {
			switch (action) {
				case 'scanAll':
					mutateScanPhotos({ uuidTask: '1' })
					break
				case 'scanFaces':
					mutateScanFace({ id: 'sdsddsfsdf' })
					break
				case 'updateClusters':
					mutateUpdateClusters({ id: 'sdsddsfsdf' })
					break
			}
		}
	}, [action])
}
