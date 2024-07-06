import { File, Folder } from 'lucide-react'

import { IFile, TypeFiles } from '@/types/files.types'

import { sizeFormat } from '@/utils/files.utils'

interface FileItemRowProps {
	file: Partial<IFile>
	typeFile: TypeFiles
	onClick: () => void
}

function FileItemRow({ file, typeFile, onClick }: FileItemRowProps) {
	const getIconByType = (typeIcon: string) => {
		switch (typeIcon) {
			case 'file':
				return (
					<File
						size={32}
						className='text-slate-400'
					/>
				)
			case 'folder':
				return (
					<Folder
						size={32}
						className='text-slate-400'
					/>
				)
		}
	}
	return (
		<div
			onClick={onClick}
			className='flex even:bg-slate-800 justify-between items-center hover:bg-slate-700 cursor-pointer p-2 w-full space-x-1'
		>
			<div className=' space-x-4 flex items-center overflow-hidden  text-nowrap'>
				<div className='w-fit'>{getIconByType(typeFile)}</div>
				<div className='text-ellipsis overflow-hidden'>{file?.name}</div>
			</div>
			<div>{file?.size && sizeFormat(+file.size)}</div>
		</div>
	)
}

export { FileItemRow }
