import { getAccessToken } from '@/services/auth-token.service'
import { mediaService } from '@/services/media.service'
import { IPreviewFile, usePreviewStore } from '@/stores/preivew.store'
import { XCircle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { tv } from 'tailwind-variants'

import { HSeparator } from '@/components/HSepartor/HSeparator'

const drawerClass = tv({
	base: '  fixed top-1/2 left-1/2  bg-slate-800 transition-all duration-500 flex flex-col p-3 -translate-x-1/2 -translate-y-1/2 rounded-xl',
	variants: {
		state: {
			open: ' lg:w-1/2 w-[95%] h-[95%]  lg:m-0 lg:h-full scale-100',
			close: 'w-0 h-0 scale-0 invisible'
		}
	}
})

const accessToken = getAccessToken()

function ModalPreview() {
	const { onClose, open, title, previewFile } = usePreviewStore(state => state)
	const [showImage, setShowImage] = useState(false)
	const videoRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		if (!open) {
			setShowImage(false)
		}
	}, [open])

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
					ref={videoRef}
				/>
			)
		}

		if (allowPdf.includes(src.type)) {
			window.open(src.src)

			return <div>PDF - файл открыт в новой вкладке</div>
		}

		return <div>Формат файла не поддерживается</div>
	}

	const handleTransitionEnd = async () => {
		if (open) setShowImage(true)
	}

	return (
		<>
			{open && (
				<div
					className='h-full w-full fixed top-0 left-0 bg-black opacity-40 '
					onClick={onClose}
				></div>
			)}
			<div
				className={drawerClass({ state: open ? 'open' : 'close' })}
				onTransitionEnd={handleTransitionEnd}
			>
				<>
					<div className='flex justify-between items-center'>
						<h2 className='text-nowrap text-ellipsis overflow-hidden'>
							{title}
						</h2>

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
						{open && showImage && <ShowContent src={previewFile} />}
					</div>
				</>
			</div>
		</>
	)
}

export { ModalPreview }
