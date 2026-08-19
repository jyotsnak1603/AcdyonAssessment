import { useState, useCallback } from 'react'

export default function useParallax(strength = 12) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const onMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    setTilt({ x: dx * strength, y: -dy * (strength * 0.6) })
  }, [strength])

  const onMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 })
  }, [])

  return { tiltX: tilt.x, tiltY: tilt.y, onMouseMove, onMouseLeave }
}
