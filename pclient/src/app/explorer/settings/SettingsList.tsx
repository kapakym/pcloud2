'use client'

import { usePhotosStore } from '@/stores/photos.store'
import { FileScan, ScanFace, UserSearch } from 'lucide-react'

import { SettingUserProfile } from '@/components/SettingsComponents/SettingUserProfile/SettingUserProfile'
import { SettingItem } from '@/components/ui/SettingItem/SettingItem'

import { TypePhotosActions } from '@/types/photos.types'

function SettingsList() {
	const {
		setSortBy,
		setSortWay,
		sortWay,
		sortBy,
		setOpenPeoplesBar,
		openPeoplesBar,
		setShowPeople,
		showPeople,
		setAction
	} = usePhotosStore(state => state)

	const handleSetAction = (action: TypePhotosActions) => {
		setAction(action)
	}
	return (
		<div className='w-full h-full flex flex-col select-none'>
			<div className='w-full  overflow-y-auto h-full '>
				<div className='flex flex-col p-4 space-y-4'>
					<SettingItem title='User profile'>
						<SettingUserProfile />
					</SettingItem>
					<SettingItem title='Photos tools'>
						<div className='flex flex-col space-y-2'>
							<div className='flex flex-row items-center space-x-4'>
								<UserSearch
									size={38}
									className='text-slate-400 hover:text-slate-200 cursor-pointer '
									onClick={() => handleSetAction('updateClusters')}
								/>
								<div className='text-sm'>Update clusters</div>
							</div>

							<div className='flex flex-row items-center space-x-4 '>
								<ScanFace
									size={38}
									className='text-slate-400 hover:text-slate-200 cursor-pointer'
									onClick={() => handleSetAction('scanFaces')}
								/>
								<div className='text-sm'>Scan faces</div>
							</div>

							<div className='flex flex-row items-center space-x-4 '>
								<FileScan
									size={38}
									className='text-slate-400 hover:text-slate-200 cursor-pointer'
									onClick={() => handleSetAction('scanAll')}
								/>
								<div className='text-sm'>Scan media</div>
							</div>
						</div>
					</SettingItem>
				</div>
			</div>
		</div>
	)
}

export { SettingsList }
