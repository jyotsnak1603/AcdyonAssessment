import { motion } from 'framer-motion'
import styles from '../styles/SocialProof.module.css'

const TOOLS = ['GitHub', 'GitLab', 'Bitbucket', 'CircleCI', 'GitHub Actions', 'Slack', 'Linear', 'Jira']

export default function SocialProof() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>Integrates with the tools your team already uses</p>
      <div className={styles.track}>
        <motion.div
          className={styles.inner}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        >
          {[...TOOLS, ...TOOLS].map((tool, i) => (
            <div key={i} className={styles.pill}>{tool}</div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
