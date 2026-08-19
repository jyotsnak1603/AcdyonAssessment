import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useKonami from '../hooks/useKonami'
import styles from '../styles/EasterEgg.module.css'

export default function EasterEgg() {
  const [visible, setVisible] = useState(false)

  const activate = useCallback(() => setVisible(true), [])
  useKonami(activate)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setVisible(false)}
        >
          <motion.div
            className={styles.card}
            initial={{ scale: 0.6, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 18, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.emoji}>🎉</div>
            <h2>You found the easter egg!</h2>
            <p>
              ↑ ↑ ↓ ↓ ← → ← → B A — the classic Konami code.<br />
              Whoever you are, we'd love to have you on the team.
            </p>
            <div className={styles.badge}>Built with attention to detail</div>
            <button className={styles.close} onClick={() => setVisible(false)}>
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
