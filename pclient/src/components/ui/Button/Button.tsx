import { EButtonType } from './button.enums'
import cn from 'clsx'
import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

interface PropsButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	typeButton?: EButtonType
}

export default function Button({
	children,
	className,
	typeButton = EButtonType.PRIMARY,
	...rest
}: PropsWithChildren<PropsButton>) {
	const generateColor = () => {
		if (typeButton === EButtonType.WARNING)
			return ' bg-red-500 dark:bg-red-500 dark:hover:bg-red-800 hover:bg-red-800'
		if (typeButton === EButtonType.ALTERNATIVE)
			return ' bg-green-500 dark:bg-green-500 dark:hover:bg-green-800 hover:bg-green-800'
		return ' bg-blue-700  hover:bg-blue-800 '
	}

	return (
		<button
			className={cn(
				'text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none dark:focus:ring-gray-800 ' +
					generateColor(),
				className
			)}
			{...rest}
		>
			{children}
		</button>
	)
}
