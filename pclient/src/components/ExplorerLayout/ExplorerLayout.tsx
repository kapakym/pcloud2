'use client'

import { Header } from '../Header/Header'
import { NavigationMenu } from '../NavigationMenu/NavigationMenu'
import { StatusBar } from '../StatusBar/StatusBar'
import Button from '../ui/Button/Button'
import { Drawer } from '../ui/Drawer/Drawer'
import { useDrawerStore } from '@/stores/drawer.store'
import { type PropsWithChildren, useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:5555/tasks')

function ExplorerLayout({ children }: PropsWithChildren<unknown>) {
	const { open, childrenDrawer, onClose, title } = useDrawerStore(
		state => state
	)

	const [messages, setMessages] = useState([])

	useEffect(() => {
		socket.on('updateTask', data => {
			console.log(data)
		})
	}, [])

	return (
		<div className=' min-h-screen  flex flex-col h-screen max-h-screen overflow-hidden'>
			<Header />

			<div className='flex h-full  overflow-hidden'>
				<div className='hidden lg:flex w-1/4 bg-gray-800 border-[1px] border-solid border-slate-600 rounded-lb-xl'>
					<NavigationMenu />
				</div>
				<div className='h-full overflow-hidden relative  w-full '>
					{children}
				</div>
			</div>
			<StatusBar />
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
