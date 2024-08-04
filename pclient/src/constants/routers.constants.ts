import { LucideIcon, icons } from 'lucide-react'
import { Folder, Image, Settings, Share, UserCog } from 'lucide-react'

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
	},
	{
		name: 'Share',
		path: DASHBOARD_PAGES.SHARE_EXPLORER,
		icon: Share
	},
	{
		name: 'Settings',
		path: DASHBOARD_PAGES.SETTINGS_EXPLORER,
		icon: Settings
	},
	{
		name: 'Admin',
		path: DASHBOARD_PAGES.ADMIN_EXPLORER,
		icon: UserCog
	}
] as const
