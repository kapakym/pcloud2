'use client'

import { authService } from '@/services/auth-token.service'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/components/ui/Button/Button'
import { InputField } from '@/components/ui/Fields/InputField'
import Link from '@/components/ui/Link/Link'

import { regexpEmail } from '@/constants/regexp.constants'

import { IAuthFrom } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/page-url.config'

function Auth() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IAuthFrom>({
		mode: 'onChange'
	})

	const { push } = useRouter()

	const { mutate, isError, error, data } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: IAuthFrom) => authService.login(data),
		onSuccess: data => {
			reset()
			push(DASHBOARD_PAGES.FILE_EXPLORER)
			if (data.data.user) {
				localStorage.setItem('role', data.data.user.roles)
				localStorage.setItem('name', data.data.user.name)
			}
		}
	})

	const onSubmit: SubmitHandler<IAuthFrom> = formData => {
		mutate(formData)
	}

	return (
		<div className='flex min-h-screen min-w-screen  px-4 md:px-0 m-auto  justify-center items-center bg-[url("/cloud.webp")] bg-cover '>
			{/* <img
				src='/pCloud.jpeg'
				alt=''
			/> */}
			<form
				className='bg-slate-800 shadow p-4 md:w-1/2 w-[80%] rounded-2xl flex flex-col space-y-4  border-slate-600 text-slate-600 border-[1px] border-solid opacity-90'
				onSubmit={handleSubmit(onSubmit)}
			>
				<h2>Login in pCloud2</h2>
				<InputField
					label='Email'
					placeholder='Enter email'
					{...register('email', {
						required: 'field required',
						pattern: {
							message: 'incorrect email',
							value: regexpEmail
						}
					})}
					error={errors.email?.message}
				/>
				<InputField
					label='Password'
					placeholder='Enter password'
					{...register('password', { required: 'filed required' })}
					error={errors.password?.message}
					type='password'
				/>
				<div className='text-red-400'>{isError && error.message}</div>
				<Button type='submit'>Login</Button>
				<Link to={DASHBOARD_PAGES.REGISTER}>Register page</Link>
			</form>
		</div>
	)
}

export { Auth }
