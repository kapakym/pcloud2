import Button from '../../ui/Button/Button'
import { EButtonType } from '../../ui/Button/button.enums'
import { InputField } from '../../ui/Fields/InputField'
import { Modal } from '../../ui/Modal/Modal'
import { VSeparator } from '../../ui/VSeparator/VSeparator'
import { usePhotosStore } from '@/stores/photos.store'
import { useQueryClient } from '@tanstack/react-query'
import cn from 'clsx'
import {
	ArrowUpDown,
	Calendar,
	Check,
	CheckCheck,
	FileScan,
	Laugh,
	PanelBottomOpen,
	ScanFace,
	SortAsc,
	UserSearch
} from 'lucide-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

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

	const {
		setSortBy,
		setSortWay,
		sortWay,
		sortBy,
		setOpenPeoplesBar,
		openPeoplesBar,
		setShowPeople,
		showPeople
	} = usePhotosStore(state => state)

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

	const handleSortByDate = () => {
		setSortBy('dateCreate')
	}

	const handleSortBy = () => {
		setSortBy(undefined)
	}

	const handleSortWay = () => {
		sortWay === 'asc' ? setSortWay('desc') : setSortWay('asc')
	}

	const handleGetFaces = async () => {
		setOpenPeoplesBar(!openPeoplesBar)
	}

	const handleSetSortPeoples = async () => {
		setShowPeople(!showPeople)
	}
	return (
		<div className='bg-gray-800 min-h-[46px] flex border-[1px] border-solid py-2 px-1 justify-between border-slate-600 rounded-b-xl'>
			<div className='flex space-x-2'>
				<Laugh
					size={28}
					className={cn(
						'  cursor-pointer ',
						showPeople
							? 'text-green-500'
							: 'text-slate-400 hover:text-slate-200'
					)}
					onClick={() => handleSetSortPeoples()}
				/>
				{showPeople && (
					<PanelBottomOpen
						size={28}
						className={cn(
							'  cursor-pointer ',
							openPeoplesBar
								? 'text-green-500'
								: 'text-slate-400 hover:text-slate-200'
						)}
						onClick={() => handleGetFaces()}
					/>
				)}

				<VSeparator />
				<ArrowUpDown
					size={28}
					className='text-slate-400 hover:text-slate-200 cursor-pointer'
					onClick={() => handleSortWay()}
				/>
				<SortAsc
					size={28}
					className={cn(
						'  cursor-pointer ',
						!sortBy ? 'text-green-500' : 'text-slate-400 hover:text-slate-200'
					)}
					onClick={() => handleSortBy()}
				/>
				<Calendar
					size={28}
					className={cn(
						'  cursor-pointer ',
						sortBy === 'dateCreate'
							? 'text-green-500'
							: 'text-slate-400 hover:text-slate-200'
					)}
					onClick={() => handleSortByDate()}
				/>
				<VSeparator />
				<>
					<UserSearch
						size={28}
						className='text-slate-400 hover:text-slate-200 cursor-pointer'
						onClick={() => handleSetAction('updateClusters')}
					/>

					<ScanFace
						size={28}
						className='text-slate-400 hover:text-slate-200 cursor-pointer'
						onClick={() => handleSetAction('scanFaces')}
					/>

					<FileScan
						size={28}
						className='text-slate-400 hover:text-slate-200 cursor-pointer'
						onClick={() => handleSetAction('scanAll')}
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
