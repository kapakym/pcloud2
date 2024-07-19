import { IPreviewFile, usePreviewStore } from '@/stores/preivew.store'
import { XCircle } from 'lucide-react'
import { PropsWithChildren, ReactNode } from 'react'
import { tv } from 'tailwind-variants'

import { HSeparator } from '@/components/HSepartor/HSeparator'

const drawerClass = tv({
	base: '  fixed top-1/2 left-1/2  bg-slate-800 transition-all duration-500 flex flex-col p-3 -translate-x-1/2 -translate-y-1/2 rounded-xl',
	variants: {
		state: {
			open: ' w-[95%] h-[95%] '
		}
	}
})

function ModalPreview() {
	const { onClose, open, title, previewFile } = usePreviewStore(state => state)

	const ShowContent = ({ src }: { src: IPreviewFile | null }) => {
		const allowImages = ['image/png', 'image/jpeg', 'image/gif']
		const allowVideo = ['video/mp4', 'video/quicktime']
		const allowPdf = ['application/pdf']
		if (!src) return

		if (allowImages.includes(src.type)) {
			return (
				<img
					src={src.src}
					alt=''
					className='h-full object-contain'
				/>
			)
		}

		if (allowVideo.includes(src.type)) {
			return (
				<video
					src={src.src}
					className='h-full object-contain'
					autoPlay={true}
					controls={true}
				/>
			)
		}

		if (allowPdf.includes(src.type)) {
			console.log(src)
			window.open(src.src)

			return <div>PDF - файл открыт в новой вкладке</div>
		}

		return <div>Формат файла не поддерживается</div>
	}

	return (
		<>
			{open && (
				<div
					className='h-full w-full fixed top-0 left-0 bg-black opacity-40 '
					onClick={onClose}
				></div>
			)}
			{open && (
				<div className={drawerClass({ state: 'open' })}>
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
							<ShowContent src={previewFile} />
						</div>
					</>
				</div>
			)}
		</>
	)
}

export { ModalPreview }
