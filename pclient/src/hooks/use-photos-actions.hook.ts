import { photosService } from '@/services/photos.service'
import { useLogsStore } from '@/stores/logs.store'
import { usePhotosStore } from '@/stores/photos.store'
import { usePreviewStore } from '@/stores/preivew.store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Vibrate } from 'lucide-react'
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { IScanPhotosReq, TypePhotosActions } from '@/types/photos.types'

export const usePhotosActions = () => {
	const { action, setAction, previewPhoto } = usePhotosStore(state => state)
	const { setPreviewFile, setOpen, setTitle } = usePreviewStore(state => state)

	const { addTask, setCompletedTask, setPercent } = useLogsStore(state => state)

	const queryClient = useQueryClient()

	const actionsFunctions: Record<string, (uuid: string) => void> = {
		scanAll: uuid => {
			addTask({
				completed: false,
				title: 'scan photos',
				id: uuid,
				typeProgress: 'infinity'
			})
			mutateScanPhotos({ uuidTask: uuid })
		},
		scanFaces: uuid => {
			addTask({
				completed: false,
				title: 'scan faces',
				id: uuid,
				typeProgress: 'infinity'
			})
			mutateScanFace({ uuidTask: uuid })
		},
		updateClusters: uuid => {
			addTask({
				completed: false,
				title: 'update clusters',
				id: uuid,
				typeProgress: 'infinity'
			})
			mutateUpdateClusters({ uuidTask: uuid })
		},

		clearCluster: uuid => {
			addTask({
				completed: false,
				title: 'clear clusters',
				id: uuid,
				typeProgress: 'infinity'
			})
			mutateClearCluster()
		},

		clearPhotos: uuid => {
			addTask({
				completed: false,
				title: 'clear clusters',
				id: uuid,
				typeProgress: 'infinity'
			})
			mutateClearPhotos()
		},

		clearFaces: uuid => {
			addTask({
				completed: false,
				title: 'clear clusters',
				id: uuid,
				typeProgress: 'infinity'
			})
			mutateClearFaces()
		}
	}

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

	const { mutate: mutateClearCluster } = useMutation({
		mutationKey: ['mutateClearClusters'],
		mutationFn: () => photosService.clearCluster()
	})

	const { mutate: mutateClearPhotos } = useMutation({
		mutationKey: ['mutateClearPhotos'],
		mutationFn: () => photosService.clearPhotos()
	})

	const { mutate: mutateClearFaces } = useMutation({
		mutationKey: ['mutateClearFaces'],
		mutationFn: () => photosService.clearFaces()
	})

	useEffect(() => {
		setAction(null)
		if (action) {
			const uuid = uuidv4()
			actionsFunctions[action](uuid)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [action])
}
