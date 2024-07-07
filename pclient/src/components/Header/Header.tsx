'use client'

import { NavigationMenu } from '../NavigationMenu/NavigationMenu'
import { useDrawerStore } from '@/stores/drawer.store'
import { LucideCloudy, Menu } from 'lucide-react'

function Header() {
	const { setOpen, setChildrenDrawer, setTitle } = useDrawerStore(
		state => state
	)

	const handleOpenMenu = () => {
		setChildrenDrawer(<NavigationMenu />)
		setTitle('Menu')
		setOpen(true)
	}

	return (
		<div className='w-full flex justify-between p-2 items-center bg-gray-800'>
			<div className='flex space-x-1'>
				<LucideCloudy size={34} />
				<h2>pCloud2</h2>
			</div>
			<div
				className='cursor-pointer lg:hidden block'
				onClick={handleOpenMenu}
			>
				<Menu
					size={32}
					className='text-slate-300'
				/>
			</div>
		</div>
	)
}

export { Header }
