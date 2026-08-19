import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Loader2 } from 'lucide-react'
import styles from '../styles/CTA.module.css'

export default function CTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const btnRef = useRef(null)

  const onMouseMove = useCallback((e) => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    btnRef.current.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`
  }, [])

  const onMouseLeave = useCallback(() => {
    if (!btnRef.current) return
    btnRef.current.style.transform = 'translate(0, 0)'
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setSubmitted(true) }, 1200)
  }

  return (
    <section className={`section ${styles.section}`} id="cta">
      <div className={styles.glow1} aria-hidden="true" />
      <div className={styles.glow2} aria-hidden="true" />

      <div className="container">
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.cardInner}>
            {!submitted ? (
              <>
                <span className="section-label">Early access</span>
                <h2 className={styles.title}>
                  Ready to see your<br />
                  <span className="gradient-text">team's cadence?</span>
                </h2>
                <p className={styles.sub}>
                  Join 47 engineering teams already on the waitlist.
                  No credit card. No commitment. First 50 teams get lifetime free access.
                </p>

                <form className={styles.form} onSubmit={handleSubmit} id="cta-form">
                  <input
                    id="cta-email"
                    type="email"
                    className={styles.input}
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email address"
                  />
                  <div
                    className={styles.btnWrap}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                  >
                    <button
                      ref={btnRef}
                      type="submit"
                      className={styles.btn}
                      id="cta-submit"
                      disabled={loading}
                      style={{ transition: 'transform 0.15s ease-out, box-shadow 0.2s ease, opacity 0.2s ease' }}
                    >
                      {loading
                        ? <Loader2 size={16} className={styles.spinner} />
                        : <><span>Get early access</span> <ArrowRight size={15} /></>
                      }
                    </button>
                  </div>
                </form>

                <p className={styles.privacy}>
                  No spam, ever. We'll only email you when Cadence is ready for your team.
                </p>
              </>
            ) : (
              <motion.div
                className={styles.success}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 16 }}
              >
                <div className={styles.successIcon}>🚀</div>
                <h3>You're on the list.</h3>
                <p>We'll reach out at <strong>{email}</strong> when your slot is ready.</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
