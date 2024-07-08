'use client'

import { filesService } from '@/services/files.service'
import { IFilesStore, useFileActionsStore } from '@/stores/file-actions.store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TouchEventHandler, useEffect, useRef, useState } from 'react'

import FileActionBar from '@/components/FileActionBar/FileActionBar'
import { FileItemRow } from '@/components/ui/FileItems/FileItemRow'

import { IActionFilesReq, TypeFiles } from '@/types/files.types'

import { useDoubleTouchHook } from '@/hooks/use-double-touch.hook'
import { useFilesActions } from '@/hooks/use-files-actions'

function FilesList() {
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

	const { data, error } = useQuery({
		queryKey: ['getFiles', path],
		queryFn: () => filesService.getFiles({ path })
	})

	const handleEnterFolder = (folderName: string) => {
		setPath(path + '/' + folderName)
		setSelected([])
	}

	const handleExitFolder = () => {
		const pathSplit = path.split('/')
		pathSplit.pop()
		setPath(pathSplit.join('/'))
	}

	const handleSelected = (
		event: React.MouseEvent<HTMLElement, MouseEvent>,
		name: string,
		type: TypeFiles
	) => {
		if (event.shiftKey) {
			selected.find(item => item.name === name)
				? setSelected(selected.filter(item => item.name !== name))
				: setSelected([...selected, { name, type }])
		} else {
			selected.find(item => item.name === name)
				? setSelected([])
				: setSelected([{ name, type }])
		}
	}

	const myHook = useDoubleTouchHook()
	useFilesActions(data)

	const handleTouch = (event: React.TouchEvent<HTMLDivElement>) => {
		console.log(myHook())
		// console.log(event)
		// if (Date.now() - time.current < 300) {
		// 	console.log('double')
		// }
		// time.current = Date.now()
	}

	return (
		<div
			className='w-full h-full flex flex-col select-none'
			onTouchStart={handleTouch}
		>
			<FileActionBar />

			<div className='w-full  overflow-y-auto h-full '>
				{path && (
					<FileItemRow
						file={{ name: '..' }}
						key={'..'}
						typeFile={'upFolder'}
						onDoubleClick={() => handleExitFolder()}
					/>
				)}

				{data?.data?.folders?.map(item => (
					<FileItemRow
						file={item}
						key={item.name}
						typeFile={'folder'}
						onDoubleClick={() => handleEnterFolder(item.name)}
						onClick={event => handleSelected(event, item.name, 'folder')}
						selected={!!selected.find(itemFind => itemFind.name === item.name)}
					/>
				))}
				{data?.data?.files?.map(item => (
					<FileItemRow
						file={item}
						key={item.name}
						typeFile={'file'}
						onClick={event => handleSelected(event, item.name, 'file')}
						selected={!!selected.find(itemFind => itemFind.name === item.name)}
					/>
				))}
			</div>
			<div className='bg-gray-800 p-2 rounded-t-xl border-[1px] border-solid border-slate-600'>
				Path: {path}
			</div>
		</div>
	)
}

export { FilesList }
