import { VSeparator } from '../VSepartor/VSeparator'
import { useFileActionsStore } from '@/stores/file-actions.store'
import {
	Check,
	Copy,
	DownloadCloud,
	Edit,
	Eye,
	Move,
	Trash,
	UploadCloud
} from 'lucide-react'
import { useActionState } from 'react'

import { TypeFilesActions } from '@/types/files.types'

interface FileActionBarProps {
	countSelected: number
}

export default function FileActionBar({ countSelected }: FileActionBarProps) {
	const { setAction } = useFileActionsStore(state => state)

	const handleSetAction = (action: TypeFilesActions) => {
		setAction(action)
	}

	return (
		<div className='bg-gray-800 min-h-[46px] flex border-[1px] border-solid py-2 px-1 justify-between border-slate-600 rounded-b-xl'>
			<div className='flex items-center space-x-1'>
				<Check size={28} />
				<div>{countSelected > 0 && countSelected}</div>
			</div>

			<div className='flex space-x-2'>
				{countSelected === 1 && (
					<>
						<Eye
							size={28}
							className='text-slate-400 hover:text-slate-200 cursor-pointer'
							onClick={() => handleSetAction('view')}
						/>
						<Edit
							size={28}
							className='text-slate-400 hover:text-slate-200 cursor-pointer'
							onClick={() => handleSetAction('edit')}
						/>
					</>
				)}
				<VSeparator />
				<UploadCloud
					size={28}
					className='text-slate-400 hover:text-slate-200 cursor-pointer'
					onClick={() => handleSetAction('upload')}
				/>
				{countSelected > 0 && (
					<>
						<DownloadCloud
							size={28}
							className='text-slate-400 hover:text-slate-200 cursor-pointer'
							onClick={() => handleSetAction('download')}
						/>
						<VSeparator />
						<Copy
							size={28}
							className='text-slate-400 hover:text-slate-200 cursor-pointer'
							onClick={() => handleSetAction('copy')}
						/>
						<Move
							size={28}
							className='text-slate-400 hover:text-slate-200 cursor-pointer'
							onClick={() => handleSetAction('move')}
						/>
						<Trash
							size={28}
							className='text-slate-400 hover:text-slate-200 cursor-pointer'
							onClick={() => handleSetAction('delete')}
						/>
					</>
				)}
			</div>
		</div>
	)
}
