import { motion } from 'framer-motion'
import { GitBranch, LineChart, Bell } from 'lucide-react'
import styles from '../styles/HowItWorks.module.css'

const STEPS = [
  {
    num: '01',
    icon: GitBranch,
    color: '#6366f1',
    title: 'Connect your stack',
    desc: 'Authorize Cadence with GitHub, GitLab, or Bitbucket — and link your CI provider. OAuth only. Takes under 5 minutes. No code changes, no agents to install.',
  },
  {
    num: '02',
    icon: LineChart,
    color: '#8b5cf6',
    title: 'We build your baseline',
    desc: 'Cadence analyzes your team\'s historical event data to compute a deployment frequency baseline and cycle time average. Anomalies become obvious immediately.',
  },
  {
    num: '03',
    icon: Bell,
    color: '#22d3ee',
    title: 'Ship with confidence',
    desc: 'Get a Slack alert when your cycle time trends above baseline — before the deadline slips, not after. Your dashboard updates in real time as events come in.',
  },
]

export default function HowItWorks() {
  return (
    <section className="section" id="how-it-works">
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">How it works</span>
          <h2 className={styles.title}>
            Three steps to knowing<br />
            <span className="gradient-text">exactly how your team ships.</span>
          </h2>
        </motion.div>

        <div className={styles.steps}>
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.num}
                className={styles.step}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.14 }}
              >
                <div className={styles.stepLeft}>
                  <div
                    className={styles.stepIcon}
                    style={{ background: `${step.color}15`, boxShadow: `0 0 24px ${step.color}20`, color: step.color }}
                  >
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  {i < STEPS.length - 1 && <div className={styles.connector} />}
                </div>

                <div className={styles.stepContent}>
                  <span className={styles.stepNum}>{step.num}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
