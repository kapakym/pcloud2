'use client'

import { shareService } from '@/services/share.service'
import { useShareStore } from '@/stores/share.store'
import { useMutation } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ModalEnterPasswordShare } from '@/components/FileActionBar/ModalEnterPasswordShare/ModalEnterPasswordShare'
import { FileItemRow } from '@/components/ui/FileItems/FileItemRow'

import { TypeFiles } from '@/types/files.types'

import { useDoubleTouchHook } from '@/hooks/use-double-touch.hook'

export const ShareLink = () => {
	const { id } = useParams<{ id: string }>()
	const { path, setPath, setSelectedShareLink, selectedShareLink } =
		useShareStore(state => state)
	const {
		data,
		error,
		mutate: mutateGetShareFiles
	} = useMutation({
		mutationKey: ['getShareFiles', path, id],
		mutationFn: (data: { path: string; id: string; password?: string }) =>
			shareService.getFiles(data)
	})
	const [open, setOpen] = useState(false)
	const [password, setPassword] = useState<string | undefined>()

	useEffect(() => {
		if (id) {
			console.log({ id })
			mutateGetShareFiles({ id, path })
		}
	}, [id, path])

	useEffect(() => {
		if (data?.data.status) {
			switch (data?.data?.status) {
				case 'access_denied':
					setOpen(true)
					break
			}
		}
	}, [data])

	useEffect(() => {
		if (password) {
			mutateGetShareFiles({
				password,
				id,
				path
			})
		}
	}, [password])

	const handleEnterFolder = (folderName: string) => {
		setPath(path + '/' + folderName)
		setSelectedShareLink(null)
	}

	const handleExitFolder = () => {
		const pathSplit = path.split('/')
		pathSplit.pop()
		setPath(pathSplit.join('/'))
	}

	const doubleTouchHook = useDoubleTouchHook()

	const handleTouch = (
		event: React.TouchEvent<HTMLDivElement>,
		folderName: string
	) => {
		if (doubleTouchHook()) {
			handleEnterFolder(folderName)
		}
	}

	const handleSelected = (
		event: React.MouseEvent<HTMLElement, MouseEvent>,
		name: string,
		type: TypeFiles
	) => {
		setSelectedShareLink({ name, type })
	}

	return (
		<div className='overflow-y-auto h-full'>
			<div>User ID: {id}</div>
			{path && (
				<FileItemRow
					file={{ name: '..' }}
					key={'..'}
					typeFile={'upFolder'}
					onDoubleClick={() => handleExitFolder()}
					handleTouch={() => handleExitFolder()}
				/>
			)}

			{data?.data?.folders?.map(item => (
				<FileItemRow
					file={item}
					key={item.name}
					typeFile={'folder'}
					handleTouch={event => handleTouch(event, item.name)}
					onDoubleClick={() => handleEnterFolder(item.name)}
					onClick={event => handleSelected(event, item.name, 'folder')}
					selected={selectedShareLink?.name === item.name}
				/>
			))}
			{data?.data?.files?.map(item => (
				<FileItemRow
					file={item}
					key={item.name}
					typeFile={'file'}
					selected={selectedShareLink?.name === item.name}
					onClick={event => handleSelected(event, item.name, 'file')}
				/>
			))}
			<ModalEnterPasswordShare
				open={open}
				setOpen={setOpen}
				setPassword={setPassword}
			/>
		</div>
	)
}
