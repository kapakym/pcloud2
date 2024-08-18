import React from 'react'
import Select, { ActionMeta, SingleValue, StylesConfig } from 'react-select'

export interface IOptionSelect {
	value: string
	label: string
}

interface CustomSelectProps {
	options: IOptionSelect[]
	value: SingleValue<IOptionSelect>
	onChange: (
		option: SingleValue<IOptionSelect>,
		actionMeta: ActionMeta<IOptionSelect>
	) => void
	placeholder?: string
}

const customStyles: StylesConfig<IOptionSelect, false> = {
	control: (provided, state) => ({
		...provided,
		borderColor: state.isFocused ? '#4A90E2' : '#E5E7EB',
		boxShadow: state.isFocused ? '0 0 0 1px #4A90E2' : undefined,
		'&:hover': {
			borderColor: state.isFocused ? '#4A90E2' : '#D1D5DB'
		}
	}),
	menu: provided => ({
		...provided,
		zIndex: 20
	}),
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isSelected
			? '#4A90E2'
			: state.isFocused
				? '#E5E7EB'
				: undefined,
		color: state.isSelected ? '#fff' : '#000',
		'&:active': {
			backgroundColor: '#4A90E2'
		}
	})
}

const CustomSelect: React.FC<CustomSelectProps> = ({
	options,
	value,
	onChange,
	placeholder
}) => {
	return (
		<Select
			value={value}
			onChange={onChange}
			options={options}
			placeholder={placeholder}
			styles={customStyles}
			className='w-full text-sm'
			classNamePrefix='react-select'
		/>
	)
}

export default CustomSelect
