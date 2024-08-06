import { ShareList } from '@/app/explorer/share/ShareList'
import { filesService } from '@/services/files.service'
import { shareService } from '@/services/share.service'
import { useFileActionsStore } from '@/stores/file-actions.store'
import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Clipboard } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/components/ui/Button/Button'
import { EButtonType } from '@/components/ui/Button/button.enums'
import { InputField } from '@/components/ui/Fields/InputField'
import { Modal } from '@/components/ui/Modal/Modal'

import { ICreateShareLinkReq } from '@/types/files.types'

interface ModalAddEditShareProps {
	setOpen: (value: boolean) => void
	open: boolean
}

interface FormTypes {
	password?: string
	retryPassword?: string
	timeLive?: string
}

export const ModalAddEditShare = (props: ModalAddEditShareProps) => {
	const { open, setOpen } = props

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormTypes>({
		mode: 'onChange'
	})

	const [shareUrl, setShareUrl] = useState<string | null>(null)

	const { selected, path } = useFileActionsStore(state => state)

	const { mutate: mutateCreateShareLink, data } = useMutation({
		mutationKey: ['mutateCreateShareLink'],
		mutationFn: (data: ICreateShareLinkReq) =>
			shareService.createFileShareLink(data)
	})

	const handleClose = () => {
		setShareUrl(null)
		setOpen(false)
	}

	useEffect(() => {
		if (data) {
			setShareUrl(data.data.url)
		}
	}, [data])

	const onSubmit: SubmitHandler<FormTypes> = async formData => {
		const data: ICreateShareLinkReq = {
			password: formData.password
				? formData.password === formData.retryPassword
					? formData.password
					: undefined
				: undefined,
			path,
			filename: selected[0].name,
			timeLive: formData.timeLive
				? dayjs(formData.timeLive).toString()
				: undefined,
			type: selected[0].type
		}

		mutateCreateShareLink(data)

		// mutate(formData)
		// setNewName(formData.name)
		// handleSetAction('edit')
		// setOpen(false)
	}

	const handleCopyToClipboard = (value: string) => {
		navigator.clipboard.writeText(value)
	}
	return (
		<Modal
			open={open}
			onClose={handleClose}
			title={'Share'}
		>
			{shareUrl && (
				<div className='flex flex-col space-y-4'>
					<div className='flex space-x-2'>
						<div>{`${window.location.host}/share/${shareUrl}`}</div>
						<Clipboard
							size={28}
							className='text-slate-400 hover:text-slate-200 cursor-pointer'
							onClick={() =>
								handleCopyToClipboard(
									`${window.location.host}/share/${shareUrl}`
								)
							}
						></Clipboard>
					</div>

					<Button onClick={handleClose}>Close</Button>
				</div>
			)}
			{!shareUrl && (
				<form
					className=' flex flex-col w-full px-2 text-left'
					onSubmit={handleSubmit(onSubmit)}
				>
					<div>{selected[0]?.name}</div>
					<InputField
						type={'date'}
						label='Active to'
						placeholder='Enter password'
						{...register('timeLive', {})}
						error={errors.timeLive?.message}
					/>
					<InputField
						label='Password'
						placeholder='Enter password'
						{...register('password', {})}
						error={errors.password?.message}
					/>
					<InputField
						label='Retry password'
						placeholder='Retry password'
						{...register('retryPassword', {})}
						error={errors.retryPassword?.message}
					/>

					<div className='flex space-x-2'>
						<Button onClick={handleClose}>Cancel</Button>
						<Button
							typeButton={EButtonType.WARNING}
							type='submit'
						>
							Share
						</Button>
					</div>
				</form>
			)}
		</Modal>
	)
}
