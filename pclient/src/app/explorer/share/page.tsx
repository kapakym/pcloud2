import { ShareList } from './ShareList'
import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Share panel',
	...NO_INDEX_PAGE
}

export default function FilesPage() {
	return <ShareList />
}
