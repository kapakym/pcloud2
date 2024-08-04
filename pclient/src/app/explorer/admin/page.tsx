import { UsersList } from './UsersList'
import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Admin panel',
	...NO_INDEX_PAGE
}

export default function FilesPage() {
	return <UsersList />
}
