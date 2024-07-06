import { LucideIcon, icons } from 'lucide-react'
import { Folder, Image } from 'lucide-react'

import { DASHBOARD_PAGES } from '@/config/page-url.config'

export interface IRoute {
	name?: string
	path: string
	icon: LucideIcon
}

export const ROUTERS: IRoute[] = [
	{
		name: 'Explorer',
		path: DASHBOARD_PAGES.FILE_EXPLORER,
		icon: Folder
	},
	{
		name: 'Photos',
		path: DASHBOARD_PAGES.PHOTOS_EXPLORER,
		icon: Image
	}
] as const
