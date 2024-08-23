class DASHBOARD {
	private root = 'admin'

	HOME = this.root
	AUTH = '/auth'
	REGISTER = '/register'
	FILE_EXPLORER = '/explorer/files'
	PHOTOS_EXPLORER = '/explorer/photos'
	ADMIN_EXPLORER = '/explorer/admin'
	SETTINGS_EXPLORER = '/explorer/settings'
	SHARE_EXPLORER = '/explorer/share'
}

export const DASHBOARD_PAGES = new DASHBOARD()

export const AUTH_IGNORE_PAGES = [DASHBOARD_PAGES.AUTH]
