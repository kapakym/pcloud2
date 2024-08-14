import { shareService } from '@/services/share.service'
import { useFileActionsStore } from '@/stores/file-actions.store'
import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Clipboard } from 'lucide-react'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/components/ui/Button/Button'
import { EButtonType } from '@/components/ui/Button/button.enums'
import { InputField } from '@/components/ui/Fields/InputField'
import { Modal } from '@/components/ui/Modal/Modal'

import { IUpdateShareLinkReq } from '@/types/files.types'
import { IShareLink } from '@/types/share.types'

import { handleCopyToClipboard } from '@/utils/clipboard.utils'

interface ModalAddEditShareProps {
	setOpen: (value: boolean) => void
	open: boolean
	link: IShareLink | null
}

interface FormTypes {
	password?: string
	retryPassword?: string
	timeLive?: string
}

export const ModalEditShare = (props: ModalAddEditShareProps) => {
	const { open, setOpen, link } = props

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue
	} = useForm<FormTypes>({
		mode: 'onChange'
	})

	const { selected, path } = useFileActionsStore(state => state)

	const { mutate: mutateUpdateShareLink, data } = useMutation({
		mutationKey: ['mutateUpdateShareLink'],
		mutationFn: (data: IUpdateShareLinkReq) => shareService.updateShare(data)
	})

	useEffect(() => {
		if (link) {
			setValue('timeLive', link.timeLive)
		}
	}, [link])

	const handleClose = () => {
		setOpen(false)
	}

	const onSubmit: SubmitHandler<FormTypes> = async formData => {
		if (link) {
			const data: IUpdateShareLinkReq = {
				id: link.id,
				password: formData.password
					? formData.password === formData.retryPassword
						? formData.password
						: undefined
					: undefined,
				timeLive: formData.timeLive
					? dayjs(formData.timeLive).toISOString()
					: undefined
			}

			mutateUpdateShareLink(data)
		}
	}

	return (
		<Modal
			open={open}
			onClose={handleClose}
			title={'Share'}
		>
			{data?.data && link && (
				<div className='flex flex-col space-y-4'>
					<div className='flex space-x-2'>
						<div>{`${window.location.host}/share/${link.id}`}</div>
						<Clipboard
							size={28}
							className='text-slate-400 hover:text-slate-200 cursor-pointer'
							onClick={() =>
								handleCopyToClipboard(
									`${window.location.host}/share/${link.id}`
								)
							}
						></Clipboard>
					</div>

					<Button onClick={handleClose}>Close</Button>
				</div>
			)}
			{link && (
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
