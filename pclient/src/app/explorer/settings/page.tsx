import { SettingsList } from './SettingsList'
import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Settings panel',
	...NO_INDEX_PAGE
}

export default function FilesPage() {
	return <SettingsList />
}
