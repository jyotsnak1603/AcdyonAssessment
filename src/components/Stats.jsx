import { motion } from 'framer-motion'
import useCountUp from '../hooks/useCountUp'
import styles from '../styles/Stats.module.css'

const STATS = [
  { target: 47, suffix: '+', label: 'Teams\non waitlist', note: 'As of Aug 2026' },
  { target: 4,  suffix: '',  label: 'DORA\nmetrics',    note: 'All four. Nothing else.' },
  { target: 5,  suffix: 'm', prefix: '<', label: 'Setup\ntime',   note: 'To your first metric' },
  { target: 0,  suffix: '',  label: 'Lines of code\nwe store', note: 'Metadata only' },
]

function Stat({ target, suffix, prefix = '', label, note, index }) {
  const { count, ref } = useCountUp(target, 1800)
  return (
    <motion.div
      ref={ref}
      className={styles.stat}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      <div className={styles.number}>
        {prefix}<span className={styles.numVal}>{count}</span>{suffix}
      </div>
      <div className={styles.labelWrap}>
        <span className={styles.label}>{label.split('\n').map((l, i) => <span key={i}>{l}{i === 0 && <br />}</span>)}</span>
        <span className={styles.note}>{note}</span>
      </div>
    </motion.div>
  )
}

export default function Stats() {
  return (
    <section className={styles.section}>
      <div className={styles.track}>
        {STATS.map((s, i) => <Stat key={i} {...s} index={i} />)}
      </div>
      <div className={styles.dividerLine} aria-hidden="true" />
    </section>
  )
}
