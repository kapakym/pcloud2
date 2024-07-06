'use client'

import { Header } from '../Header/Header'
import { NavigationMenu } from '../NavigationMenu/NavigationMenu'
import { Drawer } from '../ui/Drawer/Drawer'
import { useDrawerStore } from '@/stores/drawer.store'
import { type PropsWithChildren } from 'react'

function ExplorerLayout({ children }: PropsWithChildren<unknown>) {
	const { open, childrenDrawer, onClose, title } = useDrawerStore(
		state => state
	)

	return (
		<div className=' min-h-screen  flex flex-col h-screen max-h-screen overflow-hidden'>
			<Header />
			<div className='flex h-full  overflow-hidden'>
				<div className='hidden lg:flex w-1/4 bg-gray-800 '>
					<NavigationMenu />
				</div>
				<div className='h-full overflow-hidden relative  w-full '>
					{children}
				</div>
			</div>
			<Drawer
				open={open}
				onClose={onClose}
				title={title}
			>
				{childrenDrawer}
			</Drawer>
		</div>
	)
}

export { ExplorerLayout }
