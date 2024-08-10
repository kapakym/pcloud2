import Button from '../ui/Button/Button'
import { EButtonType } from '../ui/Button/button.enums'
import { InputField } from '../ui/Fields/InputField'
import { Modal } from '../ui/Modal/Modal'
import { VSeparator } from '../ui/VSeparator/VSeparator'
import { ModalDeleteShareLink } from './ModalDeleteShareLink/ModalDeleteShareLink'
import { shareService } from '@/services/share.service'
import { useFileActionsStore } from '@/stores/file-actions.store'
import { useShareStore } from '@/stores/share.store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
import { TypeShareActions } from '@/types/share.types'

export default function ShareActionBar() {
	const queryClient = useQueryClient()
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

	const { setAction, selected } = useShareStore(state => state)

	const { mutate: mutateDeleteShareLink } = useMutation({
		mutationKey: ['deleteShareLink'],
		mutationFn: (data: { id: string }) => shareService.deleteShare(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['queryGetHareLinks'] })
		}
	})

	const handleSetAction = (action: TypeShareActions) => {
		setAction(action)
	}

	const handleEdit = () => {}
	const handleDelete = () => {
		if (selected) {
			mutateDeleteShareLink({ id: selected?.id })
		}
		setOpen(false)
	}

	return (
		<div className='bg-gray-800 min-h-[46px] flex border-[1px] border-solid py-2 px-1 justify-between border-slate-600 rounded-b-xl'>
			<div className='flex space-x-2'>
				{selected && (
					<>
						<ClipboardCopy
							size={28}
							className='text-slate-400 hover:text-slate-200 cursor-pointer'
							onClick={() => setOpenShare(true)}
						/>
						<Edit
							size={28}
							className='text-slate-400 hover:text-slate-200 cursor-pointer'
							onClick={() => handleEdit()}
						/>
						<Trash
							size={28}
							className='text-slate-400 hover:text-slate-200 cursor-pointer'
							onClick={() => setOpen(true)}
						/>
					</>
				)}
			</div>
			<ModalDeleteShareLink
				filename={selected?.filename}
				onClick={handleDelete}
				onClose={() => setOpen(false)}
				open={open}
			/>
		</div>
	)
}