import { Register } from './Register'
import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Register',
	...NO_INDEX_PAGE
}

export default function AuthPage() {
	return <Register />
}
