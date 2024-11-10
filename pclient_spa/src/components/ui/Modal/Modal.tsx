import { XCircle } from 'lucide-react'
import { PropsWithChildren, ReactNode } from 'react'
import { tv } from 'tailwind-variants'

import { HSeparator } from '@/components/HSepartor/HSeparator'

interface ModalProps extends PropsWithChildren {
	open: boolean
	onClose: () => void
	title?: string
	renderButtons?: () => ReactNode
}

const drawerClass = tv({
	base: '  fixed top-1/2 left-1/2  bg-slate-800 transition-all duration-500 flex flex-col p-3 -translate-x-1/2 -translate-y-1/2 rounded-xl',
	variants: {
		state: {
			open: ' lg:w-1/2 w-[95%] h-[95%]  lg:m-0 lg:h-auto scale-100 z-30',
			close: 'w-0 h-0 scale-0 invisible'
		}
	}
})

function Modal(props: ModalProps) {
	const { onClose, open, title, children, renderButtons: RenderButtons } = props

	return (
		<>
			{open && (
				<div
					className='h-full w-full fixed top-0 left-0 bg-black opacity-40 z-30'
					onClick={onClose}
				></div>
			)}

			<div className={drawerClass({ state: open ? 'open' : 'close' })}>
				<>
					<div className='flex justify-between items-center'>
						<h2 className='text-nowrap'>{title}</h2>

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
					<div className='w-full my-4'>
						<HSeparator />
					</div>
					<div className='h-full overflow-hidden flex justify-center items-center text-center'>
						{children}
					</div>
					{RenderButtons && (
						<div>
							<div className='py-4 w-full'>
								<HSeparator />
							</div>

							<RenderButtons />
						</div>
					)}
				</>
			</div>
		</>
	)
}

export { Modal }
