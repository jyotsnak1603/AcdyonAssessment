import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, GitPullRequest, Zap, Activity, Shield } from 'lucide-react'
import useParallax from '../hooks/useParallax'
import styles from '../styles/Hero.module.css'

function Sparkline({ data, color = '#6366f1', height = 40 }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 120
  const h = height
  const step = w / (data.length - 1)
  const points = data.map((v, i) => `${i * step},${h - ((v - min) / range) * h}`).join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <motion.polyline 
        points={points} 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut", repeat: Infinity, repeatDelay: 5 }}
      />
    </svg>
  )
}

function PipelineVisualizer({ isDeploying, onComplete }) {
  useEffect(() => {
    if (isDeploying) {
      const timer = setTimeout(() => {
        onComplete()
      }, 2400) // 2.4s total animation time
      return () => clearTimeout(timer)
    }
  }, [isDeploying, onComplete])

  const nodes = ['Commit', 'Build', 'Test', 'Deploy']

  return (
    <div className={styles.pipelineWidget}>
      <div className={styles.pipelineHeader}>
        <span className={styles.pipelineLabel}>Live CI/CD Pipeline</span>
        <span className={`${styles.pipelineStatus} ${isDeploying ? styles.running : ''}`}>
          {isDeploying ? 'Deploying...' : 'Idle'}
        </span>
      </div>
      <div className={styles.pipelineTrackContainer}>
        <div className={styles.pipelineTrackBg} />
        <motion.div 
          className={styles.pipelineTrackFill}
          initial={{ width: '0%' }}
          animate={{ width: isDeploying ? '100%' : '0%' }}
          transition={{ duration: 2.4, ease: "linear" }}
        />
        <motion.div 
          className={styles.pipelineVehicle}
          initial={{ left: '0%', opacity: 0 }}
          animate={isDeploying ? { left: '100%', opacity: 1 } : { left: '0%', opacity: 0 }}
          transition={{ duration: 2.4, ease: "linear" }}
        >
          <Zap size={12} color="#fff" fill="#fff" />
        </motion.div>
        
        <div className={styles.pipelineNodes}>
           {nodes.map((step, i) => (
             <div key={step} className={styles.pipelineNodeWrap}>
                <motion.div 
                  className={styles.pipelineNode}
                  animate={isDeploying ? { 
                    borderColor: ['#475569', '#10b981', '#475569'],
                    backgroundColor: ['#16161f', '#10b981', '#16161f'],
                    scale: [1, 1.5, 1],
                    boxShadow: ['0 0 0px transparent', '0 0 12px #10b981', '0 0 0px transparent']
                  } : {
                    borderColor: '#475569',
                    backgroundColor: '#16161f',
                    scale: 1,
                    boxShadow: '0 0 0px transparent'
                  }}
                  transition={{ duration: 0.6, delay: i * (2.4 / 3) }}
                />
                <span className={styles.pipelineNodeLabel}>{step}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  )
}

function DashboardMockup({ deployCount, showBurst }) {
  return (
    <div className={styles.mockup}>
      <div className={styles.mockupHeader}>
        <div className={styles.mockupDots}>
          <span /><span /><span />
        </div>
        <div className={styles.mockupTitle}>
          <Activity size={12} />
          Team Dashboard — This Week
        </div>
        <div className={styles.liveIndicator}><span className={styles.liveDot} />Live</div>
      </div>

      <div className={styles.mockupGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricTop}>
            <span className={styles.metricLabel}>Deployments</span>
            <span className={styles.metricBadge} style={{ color: 'var(--color-green)' }}>
              +{Math.round(33 + (deployCount * 2.5))}%
            </span>
          </div>
          <div className={styles.metricValue}>
            {18 + deployCount}
            <AnimatePresence>
              {showBurst && (
                <motion.span 
                  className={styles.burst}
                  initial={{ opacity: 1, y: 0, scale: 0.8 }}
                  animate={{ opacity: 0, y: -30, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  +1
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <Sparkline data={[9, 12, 10, 15, 13, 16, 18 + deployCount]} color="#10b981" />
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricTop}>
            <span className={styles.metricLabel}>PR Cycle Time</span>
            <span className={styles.metricBadge} style={{ color: 'var(--color-green)' }}>-38%</span>
          </div>
          <div className={styles.metricValue}>4.2h</div>
          <Sparkline data={[11, 9, 8, 7, 6, 5, 4]} color="#6366f1" />
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricTop}>
            <span className={styles.metricLabel}>Coverage</span>
            <span className={styles.metricBadge} style={{ color: 'var(--color-accent)' }}>87%</span>
          </div>
          <div className={styles.metricValue}>↑</div>
          <div className={styles.coverageBar}>
            <div className={styles.coverageFill} style={{ width: '87%' }} />
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricTop}>
            <span className={styles.metricLabel}>DORA Score</span>
            <span className={styles.metricBadge} style={{ color: '#f59e0b' }}>Elite</span>
          </div>
          <div className={styles.metricValue} style={{ color: '#f59e0b' }}>A</div>
          <Sparkline data={[70, 74, 76, 80, 82, 85, 88]} color="#f59e0b" />
        </div>
      </div>

      <div className={styles.mockupAlertWrapper}>
        <div className={styles.mockupAlert}>
          <Shield size={12} style={{ color: 'var(--color-green)' }} className={styles.pulseIcon} />
          <motion.div 
            className={styles.alertTicker}
            animate={{ y: ['0%', '-80%'] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          >
            <span>Deployment frequency up {33 + (deployCount * 2)}% vs. last sprint</span>
            <span>Merged PR #892: Auth gateway hotfix</span>
            <span>Shipped core-api v2.4.1 to production</span>
            <span>DORA score improved to Elite status</span>
            <span>Deployment frequency up {33 + (deployCount * 2)}% vs. last sprint</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const { tiltX, tiltY, onMouseMove, onMouseLeave } = useParallax(8)
  const [isDeploying, setIsDeploying] = useState(false)
  const [deployCount, setDeployCount] = useState(0)
  const [showBurst, setShowBurst] = useState(false)

  const triggerDeploy = useCallback(() => {
    if (isDeploying) return
    setIsDeploying(true)
    setShowBurst(false)
  }, [isDeploying])

  const onDeployComplete = useCallback(() => {
    setIsDeploying(false)
    setDeployCount(c => c + 1)
    setShowBurst(true)
    setTimeout(() => setShowBurst(false), 2000)
  }, [])

  // Auto-run the animation every 7 seconds so the page feels alive
  useEffect(() => {
    const interval = setInterval(() => {
      triggerDeploy()
    }, 7000)
    return () => clearInterval(interval)
  }, [triggerDeploy])

  return (
    <section className={styles.hero} id="hero">
      {/* Three.js handles the background - no CSS orbs needed */}

      <div className={`container ${styles.content}`}>
        <motion.div
          className={styles.text}
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Now in beta — 47 engineering teams on the waitlist
          </div>

          <h1 className={styles.headline}>
            Your team has<br />
            a{' '}
            <span className={styles.glitch} data-text="rhythm.">rhythm.</span><br />
            <span className="gradient-text">Make it visible.</span>
          </h1>

          <p className={styles.sub}>
            Cadence gives engineering leads a real-time view of how their team ships —
            PR cycle time, deployment frequency, and code health —
            without the noise of a full APM tool.
          </p>

          <div className={styles.ctas}>
            <a href="#cta" className={styles.primaryCta} id="hero-primary-cta">
              Get early access <ArrowRight size={15} />
            </a>
            <button 
              onClick={triggerDeploy} 
              className={styles.simulateCta} 
              disabled={isDeploying}
              id="hero-simulate-cta"
            >
              <Zap size={15} className={isDeploying ? styles.zapSpin : ''} />
              {isDeploying ? 'Shipping...' : 'Simulate Deploy'}
            </button>
          </div>
          
          <PipelineVisualizer isDeploying={isDeploying} onComplete={onDeployComplete} />

          <div className={styles.socialRow}>
            <div className={styles.avatars}>
              {['#6366f1','#8b5cf6','#22d3ee','#10b981'].map((c, i) => (
                <div key={i} className={styles.avatar} style={{ background: c, zIndex: 4 - i }} />
              ))}
            </div>
            <span>Joined by engineers from Stripe, Vercel, and Linear</span>
          </div>
        </motion.div>

        <motion.div
          className={styles.mockupWrapper}
          initial={{ opacity: 0, y: 48, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{
            transform: `perspective(1200px) rotateY(${tiltX}deg) rotateX(${tiltY}deg)`,
            transition: 'transform 0.12s ease-out',
          }}
        >
          <DashboardMockup deployCount={deployCount} showBurst={showBurst} />
          <div className={styles.mockupGlow} aria-hidden="true" />
        </motion.div>
      </div>

      <div className={styles.scrollHint}>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className={styles.scrollDot}
        />
      </div>
    </section>
  )
}
