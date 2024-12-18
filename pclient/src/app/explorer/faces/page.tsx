import { MediaList } from './MediaList'
import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Faces list',
	...NO_INDEX_PAGE
}

export default function FilesPage() {
	return <MediaList />
}
