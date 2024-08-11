'use client'

import { filesService } from '@/services/files.service'
import { shareService } from '@/services/share.service'
import { useShareStore } from '@/stores/share.store'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

export const ShareLink = () => {
	const { id } = useParams<{ id: string }>()
	const { path } = useShareStore(state => state)
	const {
		data,
		error,
		mutate: mutateGetShareFiles
	} = useMutation({
		mutationKey: ['getShareFiles'],
		mutationFn: (data: { path: string; id: string; password?: string }) =>
			shareService.getFiles(data)
	})

	console.log({ data, id })

	if (data) {
		console.log(data.data.status)
	}

	useEffect(() => {
		if (id) {
			console.log({ id })
			mutateGetShareFiles({ id, path })
		}
	}, [id])

	return <div>User ID: {id}</div>
}
