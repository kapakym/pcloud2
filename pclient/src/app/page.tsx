'use client'

import { authService } from '@/services/auth-token.service'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default function Home() {
	redirect('/auth')
	return <></>
}
