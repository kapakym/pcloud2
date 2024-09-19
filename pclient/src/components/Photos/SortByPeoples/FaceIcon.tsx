import { PeopleItem } from '../PeopleItem/PeopleItem'
import { Edit, Save, XIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { InputField } from '@/components/ui/Fields/InputField'

import { IPeopleResponse } from '@/types/photos.types'

export const FaceIcon = ({ face }: { face: IPeopleResponse }) => {
	const [isEditName, setIsEditName] = useState(false)
	const {
		register,
		formState: { errors }
	} = useForm<{ name: string }>({
		defaultValues: {
			name: face.name
		}
	})
	return (
		<form>
			<div className=''>
				<div className='px-4 pt-4 flex flex-col justify-center items-center'>
					<div>
						<PeopleItem face={face} />
					</div>
					{!isEditName && (
						<div className='flex space-x-2 justify-center items-center'>
							<h2 className='pt-2'>{face.name}</h2>
							<Edit
								size={28}
								className='text-slate-400 hover:text-slate-200 cursor-pointer'
								onClick={() => setIsEditName(true)}
							/>
						</div>
					)}

					{isEditName && (
						<form className='flex space-x-1 justify-center items-center'>
							<InputField
								label='Name'
								placeholder='Enter name'
								{...register('name', {
									required: 'field required'
									// pattern: {
									// 	message: 'incorrect email',
									// 	value: regexpEmail
									// }
								})}
								error={errors.name?.message}
							/>

							<Save
								size={28}
								className='text-slate-400 hover:text-slate-200 cursor-pointer'
								onClick={() => setIsEditName(true)}
							/>
							<XIcon
								size={28}
								className='text-slate-400 hover:text-slate-200 cursor-pointer'
								onClick={() => setIsEditName(false)}
							/>
						</form>
					)}
				</div>
			</div>
		</form>
	)
}
