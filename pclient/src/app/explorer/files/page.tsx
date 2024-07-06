import { FilesList } from './FilesList'
import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'File list',
	...NO_INDEX_PAGE
}

export default function FilesPage() {
	return <FilesList />
}
