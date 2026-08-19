import { Zap, Github, Twitter } from 'lucide-react'
import styles from '../styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <a href="#" className={styles.logo} aria-label="Cadence home">
            <div className={styles.logoIcon}><Zap size={14} strokeWidth={2.5} /></div>
            <span>Cadence</span>
          </a>
          <p className={styles.tagline}>
            Developer velocity intelligence.<br />Built for engineering leads who care.
          </p>
          <div className={styles.socials}>
            <a href="#" aria-label="GitHub" className={styles.socialLink}><Github size={16} /></a>
            <a href="#" aria-label="Twitter" className={styles.socialLink}><Twitter size={16} /></a>
          </div>
        </div>

        <div className={styles.links}>
          <div className={styles.col}>
            <span className={styles.colTitle}>Product</span>
            <a href="#product">Live demo</a>
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
          </div>
          <div className={styles.col}>
            <span className={styles.colTitle}>Company</span>
            <a href="#">About</a>
            <a href="#">Blog</a>
            <a href="#">Contact</a>
          </div>
          <div className={styles.col}>
            <span className={styles.colTitle}>Legal</span>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>© 2026 Cadence. Built in public.</span>
        <span className={styles.hint}>Psst — try the Konami code 👀</span>
      </div>
    </footer>
  )
}
