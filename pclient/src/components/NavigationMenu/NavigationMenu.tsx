'use client'

import { authService } from '@/services/auth-token.service'
import { useDrawerStore } from '@/stores/drawer.store'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { ROUTERS } from '@/constants/routers.constants'

function NavigationMenu() {
	const { push } = useRouter()
	const { onClose } = useDrawerStore(state => state)
	const handleClickMenuItem = (path: string) => {
		console.info(path)
		push(path)
		onClose()
	}

	const handleLogout = () => {
		authService.logout()
		push('/')
		onClose()
	}
	return (
		<div className='flex flex-col justify-start px-2 py-4 w-full'>
			{ROUTERS.map(item => (
				<div
					onClick={() => handleClickMenuItem(item.path)}
					key={item.path}
					className='flex space-x-3  items-center justify-start w-full hover:bg-slate-700 rounded-xl py-2 px-4 cursor-pointer'
				>
					<div className=''>
						<item.icon
							size={32}
							className='text-slate-300'
						/>
					</div>

					<div className=''>
						<h3 className='leading-8'>{item.name}</h3>
					</div>
				</div>
			))}
			<div
				onClick={() => handleLogout()}
				className='flex space-x-3  items-center justify-start w-full hover:bg-slate-700 rounded-xl py-2 px-4 cursor-pointer'
			>
				<div className=''>
					<LogOut
						size={32}
						className='text-slate-300'
					/>
				</div>

				<div className=''>
					<h3 className='leading-8'>Logout</h3>
				</div>
			</div>
		</div>
	)
}

export { NavigationMenu }
