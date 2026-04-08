import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function BentoCard({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const [glow, setGlow] = useState({ x: 0, y: 0, active: false })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setGlow({ x: e.clientX - r.left, y: e.clientY - r.top, active: true })
  }

  const handleMouseLeave = () => setGlow(g => ({ ...g, active: false }))

  return (
    <motion.div
      className={`bento-card ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: glow.active
          ? `radial-gradient(circle at ${glow.x}px ${glow.y}px, rgba(126,25,176,0.06) 0%, #fff 60%)`
          : '#fff',
      }}
    >
      {children}
    </motion.div>
  )
}

function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div className="progress-bar-wrapper" ref={ref}>
      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          initial={{ width: '0%' }}
          animate={isInView ? { width: '72%' } : { width: '0%' }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
        >
          <div className="progress-nod" />
        </motion.div>
      </div>
      <div className="progress-labels">
        <span>Start simple</span>
        <span>Expand as you go</span>
      </div>
    </div>
  )
}

export default function Benefits() {
  return (
    <section className="section benefits" id="benefits">
      <div className="container">
        <div className="section-header">
          <motion.div
            className="tag"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            Benefits
          </motion.div>
          <div className="section-title-col">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              From Thought to Experience — My design perspective
            </motion.h2>
            <motion.p
              className="section-body"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I don't just design interfaces—I design experiences rooted in real human behavior. I question, observe, and translate insights into solutions that feel natural, intuitive, and emotionally resonant.
            </motion.p>
          </div>
        </div>

        <div className="bento-grid">
          <BentoCard delay={0}>
            <div className="bento-top">
              <div className="tag small">Visual Design</div>
              <p className="bento-heading">Bridging user needs with objectives through data-led research</p>
            </div>
            <div className="bento-bottom">
              <div className="bento-stat-label">Overthinking?</div>
              <div className="bento-stat">It's Research</div>
              <ProgressBar />
            </div>
          </BentoCard>

          <BentoCard className="bento-card--center" delay={0.1}>
            <div className="bento-top">
              <div className="tag small">Design Thinking</div>
              <p className="bento-heading">Developing high fidelity interfaces that balance beauty and usability.</p>
            </div>
            <div className="bento-phone-wrapper">
              <div className="who-label">Who am I?</div>
              <div className="phone-mockup">
                <motion.img
                  src="https://framerusercontent.com/images/VVk3DTLnb0BfhXcrU889AhfO6w4.png"
                  alt="Phone mockup"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="notification-card">
                  <div className="notif-header">
                    <div className="notif-left">
                      <div className="notif-logo" />
                      <span>WHY DID I CHOOSE DESIGN?</span>
                    </div>
                    <span className="notif-time">1m ago</span>
                  </div>
                  <p>[...] After all this time? Always.</p>
                </div>
              </div>
            </div>
          </BentoCard>

          <BentoCard className="bento-card--passion" delay={0.2}>
            <img
              src="https://framerusercontent.com/images/r1iWk48Uxe3ayq7tGpYIc5oxNw.png"
              alt="Passion"
              className="bento-passion-img"
            />
            <div className="bento-top" style={{ position: 'relative', zIndex: 1 }}>
              <div className="tag small tag--muted">Fast turnarounds</div>
              <p className="bento-heading">Passionate about something.</p>
            </div>
            <div className="bento-bottom" style={{ position: 'relative', zIndex: 1 }}>
              <div className="bento-stat-label">Details?</div>
              <motion.div
                className="bento-stat bento-stat--large"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 20 }}
              >
                I OBSESS
              </motion.div>
            </div>
            <div className="bento-deco-circle" />
          </BentoCard>
        </div>
      </div>
    </section>
  )
}
