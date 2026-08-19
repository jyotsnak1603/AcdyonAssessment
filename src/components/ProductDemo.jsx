import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, TrendingDown, GitMerge, Clock, Boxes, BarChart2 } from 'lucide-react'
import styles from '../styles/ProductDemo.module.css'

function Spark({ data, color, height = 36 }) {
  const max = Math.max(...data), min = Math.min(...data)
  const range = max - min || 1
  const w = 100, h = height
  const step = w / (data.length - 1)
  const pts = data.map((v, i) => `${i * step},${h - ((v - min) / range) * h}`).join(' ')
  const area = `${pts} ${w},${h} 0,${h}`
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`g${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#g${color.replace('#','')})`} />
      <motion.polyline 
        points={pts} 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut", repeat: Infinity, repeatDelay: 4 }}
      />
    </svg>
  )
}

const DATA = {
  current: [
    { label: 'Deployments / week', value: '18', trend: '+33%', up: true, color: '#10b981', icon: Boxes, spark: [9, 12, 10, 14, 13, 16, 18] },
    { label: 'PR Cycle Time', value: '4.2h', trend: '-38%', up: true, color: '#6366f1', icon: Clock, spark: [10, 8, 7, 6, 6, 5, 4] },
    { label: 'Merged PRs', value: '64', trend: '+21%', up: true, color: '#8b5cf6', icon: GitMerge, spark: [40, 45, 48, 52, 57, 60, 64] },
    { label: 'Change Fail Rate', value: '3.1%', trend: '-55%', up: true, color: '#22d3ee', icon: BarChart2, spark: [8, 7, 6, 5, 4, 4, 3] },
  ],
  previous: [
    { label: 'Deployments / week', value: '12', trend: '-8%', up: false, color: '#10b981', icon: Boxes, spark: [10, 11, 9, 8, 10, 11, 12] },
    { label: 'PR Cycle Time', value: '6.8h', trend: '+12%', up: false, color: '#6366f1', icon: Clock, spark: [6, 7, 7, 8, 7, 7, 7] },
    { label: 'Merged PRs', value: '51', trend: '-5%', up: false, color: '#8b5cf6', icon: GitMerge, spark: [48, 50, 51, 49, 52, 50, 51] },
    { label: 'Change Fail Rate', value: '6.9%', trend: '+2%', up: false, color: '#22d3ee', icon: BarChart2, spark: [6, 7, 7, 8, 7, 7, 7] },
  ]
}

export default function ProductDemo() {
  const [period, setPeriod] = useState('current')
  const metrics = DATA[period]

  return (
    <section className={`section ${styles.section}`} id="product">
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Live product demo</span>
          <h2 className={styles.title}>
            Four metrics.<br />
            <span className="gradient-text">Everything you need.</span>
          </h2>
          <p className={styles.sub}>
            We don't track 200 things. We track the 4 signals that DORA research
            identified as the strongest predictors of engineering team health.
            Click the toggle — this is real data, not a screenshot.
          </p>

          <div className={styles.toggle} role="group" aria-label="Select time period">
            {['current', 'previous'].map((p) => (
              <button
                key={p}
                className={`${styles.toggleBtn} ${period === p ? styles.active : ''}`}
                onClick={() => setPeriod(p)}
                id={`demo-toggle-${p}`}
              >
                {p === 'current' ? 'This week' : 'Last week'}
              </button>
            ))}
          </div>
        </motion.div>

        <div className={styles.grid}>
          <AnimatePresence mode="wait">
            {metrics.map((m, i) => {
              const Icon = m.icon
              return (
                <motion.div
                  key={`${period}-${i}`}
                  className={styles.card}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  <div className={styles.cardTop}>
                    <div className={styles.cardIcon} style={{ background: `${m.color}18`, color: m.color }}>
                      <Icon size={14} />
                    </div>
                    <span className={styles.cardLabel}>{m.label}</span>
                  </div>

                  <div className={styles.cardValue}>{m.value}</div>

                  <div className={styles.cardBottom}>
                    <span className={`${styles.trend} ${m.up ? styles.positive : styles.negative}`}>
                      {m.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {m.trend} vs last week
                    </span>
                    <Spark data={m.spark} color={m.color} />
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        <motion.p
          className={styles.disclaimer}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          * Demo data generated from a synthetic engineering team baseline. Real integrations
          pull from your GitHub/GitLab webhooks and CI pipeline events.
        </motion.p>
      </div>
    </section>
  )
}
