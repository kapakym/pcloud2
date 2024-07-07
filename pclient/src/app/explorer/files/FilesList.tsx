'use client'

import { filesService } from '@/services/files.service'
import { useFileActionsStore } from '@/stores/file-actions.store'
import { useQuery } from '@tanstack/react-query'
import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'

import FileActionBar from '@/components/FileActionBar/FileActionBar'
import { FileItemRow } from '@/components/ui/FileItems/FileItemRow'

import { TypeFiles } from '@/types/files.types'

function FilesList() {
	const { selected, setSelected, action } = useFileActionsStore(state => state)
	const [path, setPath] = useState('')

	const { data, error } = useQuery({
		queryKey: ['getFiles', path],
		queryFn: () => filesService.getFiles({ path })
	})

	useEffect(() => {
		if (action) {
			switch (action) {
				case 'copy':
					console.log(action)
					break
			}
			console.log(action, selected)
		}
	}, [action])

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

	return (
		<div className='w-full h-full flex flex-col select-none'>
			<FileActionBar countSelected={selected.length} />

			<div className='w-full  overflow-y-auto h-full p-4'>
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
