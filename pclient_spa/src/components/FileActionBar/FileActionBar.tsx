import Button from '../ui/Button/Button'
import { EButtonType } from '../ui/Button/button.enums'
import { InputField } from '../ui/Fields/InputField'
import { Modal } from '../ui/Modal/Modal'
import { VSeparator } from '../ui/VSeparator/VSeparator'
import { ModalAddShare } from './ModalAddEditShare/ModalAddShare'
import { useFileActionsStore } from '@/stores/file-actions.store'
import cn from 'clsx'
import {
	Check,
	CheckCheck,
	ClipboardCopy,
	ClipboardPaste,
	DownloadCloud,
	Edit,
	Eye,
	Move,
	Share2,
	Trash,
	UploadCloud
} from 'lucide-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { TypeFilesActions } from '@/types/files.types'

export default function FileActionBar() {
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
	const [openShare, setOpenShare] = useState(false)

	const handleClose = () => setOpen(false)
	const handleCloseRename = () => setOpenRename(false)

	const {
		setAction,
		filesBuffer,
		selected,
		setFilesUpload,
		setSelectMode,
		selectMode,
		setNewName
	} = useFileActionsStore(state => state)

	const handleSetAction = (action: TypeFilesActions) => {
		setAction(action)
	}

	const handleUploadFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setFilesUpload(event.target.files)
			setAction('upload')
		}
	}

	const handleDeleteFiles = () => {
		setAction('delete')
		handleClose()
	}

	const onSubmit: SubmitHandler<{ name: string }> = formData => {
		// mutate(formData)
		setNewName(formData.name)
		handleSetAction('edit')
		setOpenRename(false)
	}

	const handleRename = () => {
		setValue('name', selected[0].name)
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
					onClick={() => handleSetAction('selectAll')}
				/>
				<VSeparator />
			</div>

			<div className='flex space-x-2'>
				{selected.length === 1 && (
					<>
						<Share2
							size={28}
							className='text-slate-400 hover:text-slate-200 cursor-pointer'
							onClick={() => setOpenShare(true)}
						/>
						<Eye
							size={28}
							className='text-slate-400 hover:text-slate-200 cursor-pointer'
							onClick={() => handleSetAction('view')}
						/>
						<Edit
							size={28}
							className='text-slate-400 hover:text-slate-200 cursor-pointer'
							onClick={() => handleRename()}
						/>
					</>
				)}
				<VSeparator />
				<label htmlFor={'upload-media'}>
					<UploadCloud
						size={28}
						className='text-slate-400 hover:text-slate-200 cursor-pointer'
						onClick={() => handleSetAction('upload')}
					/>
				</label>
				<input
					multiple
					type='file'
					onChange={e => handleUploadFiles(e)}
					id='upload-media'
					className='hidden'
				/>

				{!!filesBuffer?.items.length && (
					<>
						<ClipboardPaste
							size={28}
							className='text-slate-400 hover:text-slate-200 cursor-pointer'
							onClick={() => handleSetAction('paste')}
						/>
						<Move
							size={28}
							className='text-slate-400 hover:text-slate-200 cursor-pointer'
							onClick={() => handleSetAction('move')}
						/>
					</>
				)}

				{selected.length > 0 && (
					<>
						<DownloadCloud
							size={28}
							className='text-slate-400 hover:text-slate-200 cursor-pointer'
							onClick={() => handleSetAction('download')}
						/>
						<VSeparator />
						<ClipboardCopy
							size={28}
							className='text-slate-400 hover:text-slate-200 cursor-pointer'
							onClick={() => handleSetAction('copy')}
						/>

						<Trash
							size={28}
							className='text-slate-400 hover:text-slate-200 cursor-pointer'
							onClick={() => setOpen(true)}
						/>
					</>
				)}
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
				Do you really want to delete the selected {selected.length} files
				(folder)?
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
			<ModalAddShare
				open={openShare}
				setOpen={setOpenShare}
			/>
		</div>
	)
}
