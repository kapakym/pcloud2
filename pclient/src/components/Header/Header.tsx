'use client'

import { NavigationMenu } from '../NavigationMenu/NavigationMenu'
import { useDrawerStore } from '@/stores/drawer.store'
import { Menu } from 'lucide-react'

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
			<h2>pCloud2</h2>
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
