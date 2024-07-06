import type { PropsWithChildren } from 'react'

import { ExplorerLayout } from '@/components/ExplorerLayout/ExplorerLayout'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return <ExplorerLayout>{children}</ExplorerLayout>
}
