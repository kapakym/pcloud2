import { useRouter } from 'next/navigation'
import React, { PropsWithChildren } from 'react'

interface LinkProps {
	to: string
}

export default function Link({ children, to }: PropsWithChildren<LinkProps>) {
	const { push } = useRouter()

	const handleNavigateTo = () => {
		push(to)
	}
	return (
		<div
			className='hover:underline text-lg cursor-pointer text-slate-200'
			onClick={handleNavigateTo}
		>
			{children}
		</div>
	)
}
