import cn from 'clsx'
import { File, Folder, Undo2 } from 'lucide-react'
import { MouseEventHandler } from 'react'
import { useDoubleTap } from 'use-double-tap'

import { IFile, TypeFiles } from '@/types/files.types'

import { sizeFormat } from '@/utils/files.utils'

interface FileItemRowProps {
	file: Partial<IFile>
	typeFile: TypeFiles
	onDoubleClick?: () => void
	onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
	selected?: boolean
}

function FileItemRow({
	file,
	typeFile,
	onDoubleClick,
	selected,
	onClick
}: FileItemRowProps) {
	const getIconByType = (typeIcon: TypeFiles) => {
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
			case 'upFolder':
				return (
					<Undo2
						size={32}
						className='text-slate-400'
					/>
				)
		}
	}

	const bind = useDoubleTap(event => {
		// Your action here
		console.log('Double tapped')
	})

	return (
		<div
			{...bind}
			onDoubleClick={onDoubleClick}
			onClick={onClick}
			className={cn(
				'flex  justify-between items-center hover:bg-slate-700 cursor-pointer p-2 w-full space-x-1 border-b-[1px] border-b-solid border-b-slate-700',
				selected ? 'bg-slate-600' : 'even:bg-slate-800'
			)}
		>
			<div className=' space-x-4 flex items-center overflow-hidden  text-nowrap '>
				<div className='w-fit'>{getIconByType(typeFile)}</div>
				<div className='text-ellipsis overflow-hidden'>{file?.name}</div>
			</div>
			<div>{file?.size && sizeFormat(+file.size)}</div>
		</div>
	)
}

export { FileItemRow }
