import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/components/ui/Button/Button'
import { EButtonType } from '@/components/ui/Button/button.enums'
import { InputField } from '@/components/ui/Fields/InputField'
import { Modal } from '@/components/ui/Modal/Modal'

interface ModalEnterPasswordShareProps {
	setOpen: (value: boolean) => void
	setPassword: (pass: string | undefined) => void
	open: boolean
}

interface FormTypes {
	password?: string
}

export const ModalEnterPasswordShare = (
	props: ModalEnterPasswordShareProps
) => {
	const { open, setOpen, setPassword } = props

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormTypes>({
		mode: 'onChange'
	})

	const handleClose = () => {
		setOpen(false)
	}

	const onSubmit: SubmitHandler<FormTypes> = async formData => {
		setPassword(formData.password)
	}

	return (
		<Modal
			open={open}
			onClose={handleClose}
			title={'Auth'}
		>
			<form
				className=' flex flex-col w-full px-2 text-left h-full justify-between'
				onSubmit={handleSubmit(onSubmit)}
			>
				<InputField
					label='Password'
					placeholder='Enter password'
					{...register('password', {})}
					error={errors.password?.message}
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
		</Modal>
	)
}
