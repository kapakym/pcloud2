import { PropsWithChildren } from 'react'

interface SettingItemProps extends PropsWithChildren {
	title: string
}

export const SettingItem = (props: SettingItemProps) => {
	const { children, title } = props
	return (
		<div className='flex flex-col'>
			<h4 className='font-bold mb-2'>{title}</h4>
			{children}
		</div>
	)
}
