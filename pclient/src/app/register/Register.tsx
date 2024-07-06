'use client'

import { authService } from '@/services/auth-token.service'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/components/ui/Button/Button'
import { InputField } from '@/components/ui/Fields/InputField'
import Link from '@/components/ui/Link/Link'

import { regexpEmail } from '@/constants/regexp.constants'

import { IAuthFrom, IAuthRegister } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/page-url.config'

function Register() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		setError
	} = useForm<IAuthRegister>({
		mode: 'onChange'
	})

	const { push } = useRouter()

	const { mutate, isError, error, data } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: IAuthFrom) => authService.register(data),
		onSuccess: () => {
			reset()
			// push(DASHBOARD_PAGES.HOME)
		}
	})

	const onSubmit: SubmitHandler<IAuthRegister> = formData => {
		if (formData.password !== formData.repeatPassword) {
			setError('repeatPassword', {
				message: 'Password mismatch',
				type: 'manual'
			})
			return
		}
		mutate(formData)
	}

	return (
		<div className='flex min-h-screen min-w-screen md:w-1/2 px-4 md:px-0 m-auto  justify-center items-center '>
			<form
				className='bg-slate-800 shadow p-4 rounded-2xl flex flex-col space-y-4 min-w-full border-slate-600 text-slate-600 border-[1px] border-solid'
				onSubmit={handleSubmit(onSubmit)}
			>
				<h2>Register in pCloud2</h2>
				<InputField
					label='Email'
					placeholder='Enter email'
					{...register('email', {
						required: 'required field',
						pattern: {
							message: 'incorrect email',
							value: regexpEmail
						}
					})}
					error={errors?.email?.message}
				/>
				<InputField
					type='password'
					label='Password'
					placeholder='Enter password'
					{...register('password', { required: 'required field' })}
					error={errors?.password?.message}
				/>
				<InputField
					type='password'
					label='Repeat password'
					placeholder='Repeat password'
					{...register('repeatPassword', { required: 'required field' })}
					error={errors?.repeatPassword?.message}
				/>
				<div className='text-red-400'>{isError && error.message}</div>
				<div className='text-green-400'>{data && 'Register success!'}</div>

				<Button type='submit'>Login</Button>
				<Link to={DASHBOARD_PAGES.AUTH}>Login page</Link>
			</form>
		</div>
	)
}

export { Register }
