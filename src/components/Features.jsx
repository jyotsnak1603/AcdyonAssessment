import { motion } from 'framer-motion'
import { Webhook, BellRing, Lock } from 'lucide-react'
import styles from '../styles/Features.module.css'

const FEATURES = [
  {
    icon: Webhook,
    color: '#6366f1',
    title: 'Webhook-driven, zero polling',
    desc: 'Cadence listens to GitHub, GitLab, and CI events in real time. No polling loops, no delayed dashboards. The moment your team merges a PR, the metric moves.',
  },
  {
    icon: BellRing,
    color: '#8b5cf6',
    title: 'Alerts before the slowdown hits',
    desc: 'We calculate your team\'s historical baseline and alert you in Slack when your cycle time starts drifting above it — before velocity drops, not after.',
  },
  {
    icon: Lock,
    color: '#22d3ee',
    title: 'Your data stays in your pipeline',
    desc: 'Cadence never stores your source code or PR diffs. We process event metadata only, and you can revoke access in under 60 seconds from any integration screen.',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } }
}

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Features</span>
          <h2 className={styles.title}>
            Built for the signal,<br />
            <span className="gradient-text">not the noise.</span>
          </h2>
          <p className={styles.sub}>
            Every feature in Cadence exists because an engineering lead asked for it.
            Nothing was added to make the marketing page look busy.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <motion.div key={f.title} className={styles.card} variants={item}>
                <div
                  className={styles.iconWrap}
                  style={{ background: `${f.color}15`, boxShadow: `0 0 24px ${f.color}20` }}
                >
                  <Icon size={22} color={f.color} strokeWidth={1.8} />
                </div>
                <h3 className={styles.cardTitle}>{f.title}</h3>
                <p className={styles.cardDesc}>{f.desc}</p>
                <div className={styles.cardLine} style={{ background: `linear-gradient(to right, ${f.color}, transparent)` }} />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
