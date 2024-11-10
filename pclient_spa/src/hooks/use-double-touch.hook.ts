import { useRef } from 'react'

export const useDoubleTouchHook = (delay = 300) => {
	const lastTime = useRef(Date.now())

	return () => {
		const delta = Date.now() - lastTime.current
		lastTime.current = Date.now()
		if (delta < delay) return true
		else return false
	}
}
