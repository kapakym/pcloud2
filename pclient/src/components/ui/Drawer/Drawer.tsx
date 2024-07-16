'use client'

import { XCircle } from 'lucide-react'
import React, { PropsWithChildren } from 'react'
import { tv } from 'tailwind-variants'

interface DrawerProps {
	open: boolean
	title?: string
	onClose: () => void
}

const drawerClass = tv({
	base: ' w-full lg:w-1/2 h-screen fixed top-0 left-0 bg-slate-800 transition-all duration-500 flex flex-col p-3',
	variants: {
		state: {
			open: 'lg:translate-x-0 translate-y-10 rounded-t-xl lg:rounded-none lg:translate-y-0',
			close: 'lg:-translate-x-full lg:translate-y-0 translate-y-full'
		}
	}
})

function Drawer({
	open,
	onClose,
	title,
	children
}: PropsWithChildren<DrawerProps>) {
	return (
		<>
			{open && (
				<div
					className='h-full w-full fixed top-0 left-0 bg-black opacity-40 '
					onClick={onClose}
				></div>
			)}

			<div className={drawerClass({ state: open ? 'open' : 'close' })}>
				<div className='flex justify-between items-center'>
					<h2>{title}</h2>
					<div
						className='w-full flex justify-end items-center'
						onClick={onClose}
					>
						<XCircle
							size={28}
							color='white'
							className='cursor-pointer'
						/>
					</div>
				</div>

				<div className='h-full overflow-hidden'>{open && children}</div>
			</div>
		</>
	)
}

export { Drawer }
