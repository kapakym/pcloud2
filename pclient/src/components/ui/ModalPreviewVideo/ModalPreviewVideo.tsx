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

function ModalPreviewVideo() {
	const { onCloseVideoPlayer, openVideoPlayer, title, previewFile } =
		usePreviewStore(state => state)
	const [showImage, setShowImage] = useState(false)
	const [playVideoUrl, setPlayVideoUrl] = useState('')
	const videoRef = useRef<HTMLVideoElement>(null)

	console.log(previewFile)
	useEffect(() => {
		if (!openVideoPlayer) {
			setShowImage(false)
		}

		if (openVideoPlayer && previewFile?.mode === 'stream') {
			mediaService.getPlayById({ id: previewFile.src }).then(response => {
				const videoBlob = new Blob([response.data], { type: 'video/mp4' })
				const url = URL.createObjectURL(videoBlob)
				setPlayVideoUrl(url)
				console.log(url)
				// if (videoRef.current) {
				// 	videoRef.current.src = url
				// }
			})
		}

		return () => {
			if (videoRef.current) {
				setPlayVideoUrl('')
				const videoElement = videoRef.current
				if (videoElement) {
					// Останавливаем воспроизведение
					videoElement.pause()

					// Сбрасываем источник видео
					videoElement.src = ''

					// Освобождаем объект URL, если использовался createObjectURL
					if (videoElement.srcObject) {
						videoElement.srcObject = null
					}

					// Можно также очистить буфер MediaSource (если используется)
					if (window.URL && window.URL.revokeObjectURL) {
						window.URL.revokeObjectURL(videoElement.src)
					}

					// Сбрасываем текущее время
					videoElement.currentTime = 0

					console.log('Поток видео очищен')
				}
			}
		}
	}, [openVideoPlayer])

	const handleTransitionEnd = async () => {
		if (openVideoPlayer) setShowImage(true)
		// if (open && previewFile?.mode === 'stream') {
		// 	const response = await mediaService.getPlayById({ id: previewFile.src })
		// 	const videoBlob = new Blob([response.data], { type: 'video/mp4' })
		// 	const url = URL.createObjectURL(videoBlob)
		// 	setPlayVideoUrl(url)
		// 	if (videoRef.current) {
		// 		videoRef.current.src = url
		// 	}
		// }
	}

	return (
		<>
			{openVideoPlayer && (
				<div
					className='h-full w-full fixed top-0 left-0 bg-black opacity-40 '
					onClick={onCloseVideoPlayer}
				></div>
			)}
			<div
				className={drawerClass({ state: openVideoPlayer ? 'open' : 'close' })}
				onTransitionEnd={handleTransitionEnd}
			>
				<>
					<div className='flex justify-between items-center'>
						<h2 className='text-nowrap text-ellipsis overflow-hidden'>
							{title}
						</h2>

						<div
							className='w-full flex justify-end items-center'
							onClick={onCloseVideoPlayer}
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
						{openVideoPlayer && showImage && (
							<video
								src={playVideoUrl}
								className='h-full object-contain'
								autoPlay={true}
								controls={true}
								ref={videoRef}
							/>
						)}
					</div>
				</>
			</div>
		</>
	)
}

export { ModalPreviewVideo }
