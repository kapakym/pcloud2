'use client'

import { filesService } from '@/services/files.service'
import { useFileActionsStore } from '@/stores/file-actions.store'
import { useQuery } from '@tanstack/react-query'

import FileActionBar from '@/components/FileActionBar/FileActionBar'
import { FileItemRow } from '@/components/ui/FileItems/FileItemRow'
import { ModalPreview } from '@/components/ui/ModalPreview/ModalPreview'

import { TypeFiles } from '@/types/files.types'

import { useDoubleTouchHook } from '@/hooks/use-double-touch.hook'
import { useFilesActions } from '@/hooks/use-files-actions.hook'

function UsersList() {
	return (
		<div className='w-full h-full flex flex-col select-none'>Users LIST</div>
	)
}

export { UsersList }
