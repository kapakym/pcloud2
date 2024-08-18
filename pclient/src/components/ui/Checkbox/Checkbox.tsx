import React, { useState } from 'react'

interface CheckboxProps {
	label: string
	checked: boolean
	onChange: (checked: boolean) => void
}

export const Checkbox: React.FC<CheckboxProps> = ({
	label,
	checked,
	onChange
}) => {
	return (
		<label className='flex items-center cursor-pointer select-none'>
			<input
				type='checkbox'
				checked={checked}
				onChange={e => onChange(e.target.checked)}
				className='hidden'
			/>
			<span
				className={`w-6 h-6 inline-flex items-center justify-center border-2 rounded-md transition-colors ${
					checked ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'
				}`}
			>
				{checked && (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-4 w-4 text-white'
						viewBox='0 0 20 20'
						fill='currentColor'
					>
						<path
							fillRule='evenodd'
							d='M16.707 5.293a1 1 0 00-1.414-1.414l-7 7-2.5-2.5a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l8-8z'
							clipRule='evenodd'
						/>
					</svg>
				)}
			</span>
			<span className='ml-2'>{label}</span>
		</label>
	)
}
