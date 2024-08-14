import type { PropsWithChildren } from 'react'

import { ShareLayout } from '@/components/ShareLayout/ShareLayout'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return <ShareLayout>{children}</ShareLayout>
}
