import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styles from '../styles/CustomCursor.module.css'

export default function CustomCursor() {
  const [pos, setPos]     = useState({ x: -200, y: -200 })
  const [hover, setHover] = useState(false)
  const [click, setClick] = useState(false)

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    const over  = (e) => setHover(!!e.target.closest('a,button,[role="button"]'))
    const down  = () => setClick(true)
    const up    = () => setClick(false)

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup',   up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup',   up)
    }
  }, [])

  return (
    <>
      {/* Tiny sharp dot — snaps instantly */}
      <motion.div
        className={styles.dot}
        animate={{ x: pos.x - 5, y: pos.y - 5, scale: click ? 0.4 : 1 }}
        transition={{ type: 'spring', stiffness: 2000, damping: 50, mass: 0.3 }}
      />
      {/* Trailing ring — lags for depth */}
      <motion.div
        className={`${styles.ring} ${hover ? styles.ringHover : ''} ${click ? styles.ringClick : ''}`}
        animate={{ x: pos.x - 22, y: pos.y - 22 }}
        transition={{ type: 'spring', stiffness: 150, damping: 22, mass: 0.5 }}
      />
    </>
  )
}
