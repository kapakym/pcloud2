import Button from '../ui/Button/Button'
import { EButtonType } from '../ui/Button/button.enums'
import { Modal } from '../ui/Modal/Modal'
import { VSeparator } from '../ui/VSeparator/VSeparator'
import { shareService } from '@/services/share.service'
import { usersService } from '@/services/users.service'
import { useUsersStore } from '@/stores/users.store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import cn from 'clsx'
import { Check, CheckCheck, Trash } from 'lucide-react'
import { useState } from 'react'

import { EnumRoles } from '@/types/auth.types'
import { TypeUserActions } from '@/types/users.types'

export default function UserActionBar() {
	const queryClient = useQueryClient()
	const isAccess = localStorage.getItem('role') === EnumRoles.admin

	const [open, setOpen] = useState(false)

	const handleClose = () => setOpen(false)

	const { setAction, selected, setSelectMode, selectMode, offset, limit } =
		useUsersStore(state => state)

	const { mutate: mutateDeleteUser } = useMutation({
		mutationKey: ['deleteUser'],
		mutationFn: (data: { id: string }) => usersService.deleteUser(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['getUsers', offset, limit] })
		}
	})

	const handleSetAction = (action: TypeUserActions) => {
		setAction(action)
	}

	const handleDeleteUsers = () => {
		selected.forEach(item => {
			mutateDeleteUser({ id: item.id })
		})
	}

	const handleOpenDeleteModal = () => {
		if (selected.length > 0) setOpen(true)
	}

	return (
		<div className='bg-gray-800 min-h-[46px] flex border-[1px] border-solid py-2 px-1 justify-between border-slate-600 rounded-b-xl'>
			<div className='flex space-x-2'>
				{isAccess && (
					<>
						<div className='flex items-center space-x-1'>
							<Check
								size={28}
								className={cn(
									'  cursor-pointer ',
									selectMode
										? 'text-green-500'
										: 'text-slate-400 hover:text-slate-200'
								)}
								onClick={() => setSelectMode(!selectMode)}
							/>

							<CheckCheck
								size={28}
								className='text-slate-400 hover:text-slate-200 cursor-pointer'
								onClick={() => handleSetAction('selectAll')}
							/>
							<VSeparator />
						</div>
						<Trash
							size={28}
							className='text-slate-400 hover:text-slate-200 cursor-pointer'
							onClick={handleOpenDeleteModal}
						/>
					</>
				)}
			</div>
			<Modal
				open={open}
				onClose={handleClose}
				title={'Delete users'}
				renderButtons={() => (
					<div className='flex space-x-2'>
						<Button onClick={handleClose}>Cancel</Button>
						<Button
							typeButton={EButtonType.WARNING}
							onClick={handleDeleteUsers}
						>
							Delete
						</Button>
					</div>
				)}
			>
				Do you really want to delete the selected {selected?.length} users ?
			</Modal>
		</div>
	)
}
