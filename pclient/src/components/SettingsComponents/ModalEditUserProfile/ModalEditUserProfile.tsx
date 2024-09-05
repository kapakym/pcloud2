import { usersService } from '@/services/users.service'
import { useFileActionsStore } from '@/stores/file-actions.store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/components/ui/Button/Button'
import { EButtonType } from '@/components/ui/Button/button.enums'
import { InputField } from '@/components/ui/Fields/InputField'
import { Modal } from '@/components/ui/Modal/Modal'

import { IUser, IUserUpdate } from '@/types/auth.types'
import { IShareLink } from '@/types/share.types'

interface ModalEditUserProfileProps {
	setOpen: (value: boolean) => void
	open: boolean
	data?: IUser
}

interface FormTypes {
	name?: string
	email?: string
	oldPassword?: string
	password?: string
	retryPassword?: string
}

export const ModalEditUserProfile = (props: ModalEditUserProfileProps) => {
	const { open, setOpen, data } = props

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		setError,
		reset
	} = useForm<FormTypes>({
		mode: 'onChange'
	})

	const queryClient = useQueryClient()

	const { data: dataUpdateProfile, mutate: mutateUpdateUser } = useMutation({
		mutationKey: ['updateUserProfile'],
		mutationFn: (data: IUserUpdate) => usersService.updateProfile(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['getUserProfile'] })
		}
	})

	useEffect(() => {
		if (open) {
			reset()
		}
		if (data) {
			setValue('name', data?.name)
			setValue('email', data?.email)
		}
	}, [open, data, register, setValue, reset])

	const handleClose = () => {
		setOpen(false)
	}

	const onSubmit: SubmitHandler<FormTypes> = async formData => {
		if (
			formData?.oldPassword &&
			(!formData.password || formData?.password?.length < 3)
		) {
			setError('password', { message: 'Enter new password' })
			return
		}

		if (formData?.oldPassword && formData.password !== formData.retryPassword) {
			setError('retryPassword', { message: 'Passwords dont match' })
			return
		}

		mutateUpdateUser({
			email: formData.email ? formData.email : undefined,
			name: formData.name ? formData.name : undefined,
			oldPassword: formData.oldPassword ? formData.oldPassword : undefined,
			newPassword: formData.password ? formData.password : undefined
		})
		setOpen(false)
	}

	return (
		<Modal
			open={open}
			onClose={handleClose}
			title={'Edit profile'}
		>
			<form
				className=' flex flex-col w-full px-2 text-left justify-between h-full'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div>
					<InputField
						label='Enter name'
						placeholder='Name'
						{...register('name')}
						error={errors.name?.message}
					/>
					<InputField
						label='Email'
						placeholder='Enter email'
						{...register('email')}
						error={errors.email?.message}
					/>
					<InputField
						type='password'
						label='Current password'
						placeholder='Enter current password'
						{...register('oldPassword')}
						error={errors.oldPassword?.message}
					/>
					<InputField
						type='password'
						label='New password'
						placeholder='Enter new password'
						{...register('password')}
						error={errors.password?.message}
					/>
					<InputField
						type='password'
						label='Retry new password'
						placeholder='Retry new password'
						{...register('retryPassword')}
						error={errors.retryPassword?.message}
					/>
				</div>

				<div className='flex space-x-2'>
					<Button onClick={handleClose}>Cancel</Button>
					<Button
						typeButton={EButtonType.WARNING}
						type='submit'
					>
						Update
					</Button>
				</div>
			</form>
		</Modal>
	)
}
