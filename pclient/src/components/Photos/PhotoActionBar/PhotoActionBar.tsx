import Button from '../../ui/Button/Button'
import { EButtonType } from '../../ui/Button/button.enums'
import { InputField } from '../../ui/Fields/InputField'
import { Modal } from '../../ui/Modal/Modal'
import { VSeparator } from '../../ui/VSeparator/VSeparator'
import { useFileActionsStore } from '@/stores/file-actions.store'
import { usePhotosStore } from '@/stores/photos.store'
import cn from 'clsx'
import {
	Check,
	CheckCheck,
	ClipboardCopy,
	ClipboardPaste,
	DownloadCloud,
	Edit,
	Eye,
	FileScan,
	Move,
	Trash,
	UploadCloud
} from 'lucide-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { TypeFilesActions } from '@/types/files.types'
import { TypePhotosActions } from '@/types/photos.types'

export default function PhotoActionBar() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		setValue
	} = useForm<{ name: string }>({
		mode: 'onChange'
	})

	const [open, setOpen] = useState(false)
	const [openRename, setOpenRename] = useState(false)

	const handleClose = () => setOpen(false)
	const handleCloseRename = () => setOpenRename(false)

	const { setAction, selectMode, setSelectMode } = usePhotosStore(
		state => state
	)

	const handleSetAction = (action: TypePhotosActions) => {
		setAction(action)
	}

	const handleUploadFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
		}
	}

	const handleDeleteFiles = () => {
		handleClose()
	}

	const onSubmit: SubmitHandler<{ name: string }> = formData => {
		// mutate(formData)
		setOpenRename(false)
	}

	const handleRename = () => {
		setOpenRename(true)
	}

	return (
		<div className='bg-gray-800 min-h-[46px] flex border-[1px] border-solid py-2 px-1 justify-between border-slate-600 rounded-b-xl'>
			<div className='flex items-center space-x-1'>
				<Check
					size={28}
					className={cn(
						'  cursor-pointer ',
						selectMode
							? 'text-green-500'
							: 'text-slate-400 hover:text-slate-200'
					)}
					onClick={() => setSelectMode(!selectMode)}
				/>

				<CheckCheck
					size={28}
					className='text-slate-400 hover:text-slate-200 cursor-pointer'
					onClick={() => handleSetAction(null)}
				/>
				<VSeparator />
			</div>

			<div className='flex space-x-2'>
				<>
					<Eye
						size={28}
						className='text-slate-400 hover:text-slate-200 cursor-pointer'
						onClick={() => handleSetAction(null)}
					/>
					<Edit
						size={28}
						className='text-slate-400 hover:text-slate-200 cursor-pointer'
						onClick={() => handleRename()}
					/>
				</>
				<VSeparator />
				<label htmlFor={'upload-photo'}>
					<UploadCloud
						size={28}
						className='text-slate-400 hover:text-slate-200 cursor-pointer'
						onClick={() => handleSetAction(null)}
					/>
				</label>
				<input
					multiple
					type='file'
					onChange={e => handleUploadFiles(e)}
					id='upload-photo'
					className='hidden'
				/>

				<ClipboardPaste
					size={28}
					className='text-slate-400 hover:text-slate-200 cursor-pointer'
					onClick={() => handleSetAction(null)}
				/>

				<>
					<DownloadCloud
						size={28}
						className='text-slate-400 hover:text-slate-200 cursor-pointer'
						onClick={() => handleSetAction(null)}
					/>
					<VSeparator />
					<ClipboardCopy
						size={28}
						className='text-slate-400 hover:text-slate-200 cursor-pointer'
						onClick={() => handleSetAction(null)}
					/>

					<FileScan
						size={28}
						className='text-slate-400 hover:text-slate-200 cursor-pointer'
						onClick={() => handleSetAction('scanAll')}
					/>
					<Trash
						size={28}
						className='text-slate-400 hover:text-slate-200 cursor-pointer'
						onClick={() => setOpen(true)}
					/>
				</>
			</div>

			<Modal
				open={open}
				onClose={handleClose}
				title={'Delete files (folders)'}
				renderButtons={() => (
					<div className='flex space-x-2'>
						<Button onClick={handleClose}>Cancel</Button>
						<Button
							typeButton={EButtonType.WARNING}
							onClick={handleDeleteFiles}
						>
							Delete
						</Button>
					</div>
				)}
			>
				Do you really want to delete the selected files (folder)?
			</Modal>
			<Modal
				open={openRename}
				onClose={handleCloseRename}
				title={'Rename'}
			>
				<form
					className=' flex flex-col w-full px-2 text-left'
					onSubmit={handleSubmit(onSubmit)}
				>
					<InputField
						label='New name'
						placeholder='Enter new name'
						{...register('name', {
							required: 'field required'
						})}
						error={errors.name?.message}
					/>
					<div className='flex space-x-2'>
						<Button onClick={handleCloseRename}>Cancel</Button>
						<Button
							typeButton={EButtonType.WARNING}
							type='submit'
						>
							Rename
						</Button>
					</div>
				</form>
			</Modal>
		</div>
	)
}
