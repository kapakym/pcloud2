'use client'

import { filesService } from '@/services/files.service'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { FileItemRow } from '@/components/ui/FileItems/FileItemRow'

function FilesList() {
	const [path, setPath] = useState('')

	const { data, error } = useQuery({
		queryKey: ['getFiles', path],
		queryFn: () => filesService.getFiles({ path })
	})

	console.log(data, error)

	const handleEnterFolder = (folderName: string) => {
		setPath(path + '/' + folderName)
	}

	const handleExitFolder = () => {
		const pathSplit = path.split('/')
		pathSplit.pop()
		setPath(pathSplit.join('/'))
	}

	return (
		<div className='w-full h-full flex flex-col'>
			<div className='bg-gray-800 p-2'>Path: {path}</div>
			<div className='w-full  overflow-y-auto h-full p-4'>
				{path && (
					<FileItemRow
						file={{ name: '..' }}
						key={'..'}
						typeFile={'folder'}
						onClick={() => handleExitFolder()}
					/>
				)}

				{data?.data?.folders?.map(item => (
					<FileItemRow
						file={item}
						key={item.name}
						typeFile={'folder'}
						onClick={() => handleEnterFolder(item.name)}
					/>
				))}
				{data?.data?.files?.map(item => (
					<FileItemRow
						file={item}
						key={item.name}
						typeFile={'file'}
					/>
				))}
			</div>
		</div>
	)
}

export { FilesList }
