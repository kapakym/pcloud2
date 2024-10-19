import { mediaService } from '@/services/media.service'
import { useLogsStore } from '@/stores/logs.store'
import { useMediaStore } from '@/stores/media.store'
import { usePreviewStore } from '@/stores/preivew.store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { IScanMediaReq } from '@/types/media.types'

export const useMediaActions = () => {
	const { action, setAction, previewPhoto } = useMediaStore(state => state)
	const { setPreviewFile, setOpen, setTitle } = usePreviewStore(state => state)

	const { addTask, setCompletedTask, setPercent } = useLogsStore(state => state)

	const queryClient = useQueryClient()

	const actionsFunctions: Record<string, (uuid: string) => void> = {
		scanAll: uuid => {
			addTask({
				completed: false,
				title: 'scan media',
				id: uuid,
				typeProgress: 'infinity'
			})
			mutateScanMedia({ uuidTask: uuid })
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

		clearMedia: uuid => {
			addTask({
				completed: false,
				title: 'clear clusters',
				id: uuid,
				typeProgress: 'infinity'
			})
			mutateClearMedia()
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

	const { mutate: mutateScanMedia } = useMutation({
		mutationKey: ['scanFiles'],
		mutationFn: (data: IScanMediaReq = { uuidTask: '' }) =>
			mediaService.scanFiles(data)
	})

	const { mutate: mutateScanFace } = useMutation({
		mutationKey: ['mutateScanFace'],
		mutationFn: (data: { uuidTask: string }) => mediaService.scanFaces(data)
	})

	const { mutate: mutateUpdateClusters } = useMutation({
		mutationKey: ['mutateUpdateClusters'],
		mutationFn: (data: { uuidTask: string }) =>
			mediaService.updateClusters(data)
	})

	const { mutate: mutateClearCluster } = useMutation({
		mutationKey: ['mutateClearClusters'],
		mutationFn: () => mediaService.clearCluster()
	})

	const { mutate: mutateClearMedia } = useMutation({
		mutationKey: ['mutateClearMedia'],
		mutationFn: () => mediaService.clearMedia()
	})

	const { mutate: mutateClearFaces } = useMutation({
		mutationKey: ['mutateClearFaces'],
		mutationFn: () => mediaService.clearFaces()
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
