import Button from '../../ui/Button/Button'
import { EButtonType } from '../../ui/Button/button.enums'
import { InputField } from '../../ui/Fields/InputField'
import { Modal } from '../../ui/Modal/Modal'
import { VSeparator } from '../../ui/VSeparator/VSeparator'
import { useMediaStore } from '@/stores/media.store'
import cn from 'clsx'
import {
	ArrowDownAZ,
	ArrowUpAZ,
	Calendar,
	CalendarSearch,
	Image as ImageIco,
	Laugh,
	PanelBottomOpen,
	Settings
} from 'lucide-react'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { TypeMediaActions } from '@/types/media.types'

import { DASHBOARD_PAGES } from '@/config/page-url.config'

export default function MediaActionFacesBar() {
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
		showPeople,
		setAction
	} = useMediaStore(state => state)

	const [open, setOpen] = useState(false)
	const [openRename, setOpenRename] = useState(false)

	const handleClose = () => setOpen(false)
	const handleCloseRename = () => setOpenRename(false)

	const handleSetAction = (action: TypeMediaActions) => {
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

	const handleGetFaces = async () => {
		setOpenPeoplesBar(!openPeoplesBar)
	}

	const handleSetDateRange = async () => {}
	return (
		<div className='bg-gray-800 min-h-[46px] flex border-[1px] border-solid py-2 px-1 justify-between border-slate-600 rounded-b-xl'>
			<div className='flex space-x-2'>
				<CalendarSearch
					size={28}
					className={cn(
						'  cursor-pointer ',
						showPeople
							? 'text-green-500'
							: 'text-slate-400 hover:text-slate-200'
					)}
					onClick={() => handleSetDateRange()}
				/>
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

				<VSeparator />

				<>
					<Settings
						size={28}
						className='text-slate-400 hover:text-slate-200 cursor-pointer'
						onClick={() =>
							window.location.replace(DASHBOARD_PAGES.SETTINGS_EXPLORER)
						}
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
