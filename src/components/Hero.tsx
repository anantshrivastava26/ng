import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as const, delay: delay / 1000 },
  }),
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section className="hero" id="hero" ref={heroRef}>
      {/* ── Background ── */}
      <div className="hero-bg">
        <motion.img
          src="https://framerusercontent.com/images/PkcMje8K9abiM4x9FIaeR5h65Y.png"
          alt="Background"
          className="hero-bg-img"
          style={{ y: bgY }}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <div className="hero-motion-layer" aria-hidden>
          <motion.div
            className="hero-orb hero-orb-one"
            animate={{ x: [0, 18, 0], y: [0, -24, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="hero-orb hero-orb-two"
            animate={{ x: [0, -20, 0], y: [0, 22, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="hero-orbit-ring"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          >
            <span className="hero-orbit-dot" />
          </motion.div>
          <motion.div
            className="hero-light-sweep"
            animate={{ x: ['-120%', '120%'] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="hero-overlay" />
      </div>

      {/* ── Content grid ── */}
      <div className="hero-content">

        {/* Left col: display name (top) + tagline/CTA (bottom) */}
        <div className="hero-left">

          {/* Big display name */}
          <div className="hero-name-block">
            <motion.h1
              className="hero-display-name"
              initial="hidden" animate="visible" custom={0} variants={fadeUp}
            >
              Navya
            </motion.h1>
            <motion.p
              className="hero-display-sub"
              initial="hidden" animate="visible" custom={140} variants={fadeUp}
            >
              Great begins here.
            </motion.p>
          </div>

          {/* Tagline + CTA pushed to bottom */}
          <div className="hero-text-main">
            <motion.div
              className="hero-tagline-block"
              initial="hidden" animate="visible" custom={260} variants={fadeUp}
            >
              <p className="hero-tagline">
                Designing experiences that feel as good as they function
              </p>
              <p className="hero-tagline-sub">
                Turning insights into intuitive interactions
              </p>
            </motion.div>
            <motion.a
              href="#contact"
              className="btn btn-outline hero-btn"
              initial="hidden" animate="visible" custom={380} variants={fadeUp}
              whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
            >
              Resume ↗
            </motion.a>
          </div>
        </div>

        {/* Right col: title + featured card, aligned to bottom */}
        <div className="hero-right">
          <motion.h2
            className="hero-title"
            initial="hidden" animate="visible" custom={160} variants={fadeUp}
          >
            UI/UX &amp;<br />Product Design
          </motion.h2>
          <motion.div
            className="hero-card"
            initial="hidden" animate="visible" custom={320} variants={fadeUp}
            whileHover={{ scale: 1.025, transition: { duration: 0.3 } }}
          >
            <img
              src="https://framerusercontent.com/images/hIMdQAU8hOgi8GFT4vPLwwAILz0.png"
              alt="Saanjh"
              className="hero-card-bg"
            />
            <div className="hero-card-inner">
              <div className="hero-card-label">Featured Project</div>
              <div className="hero-card-name">Saanjh</div>
              <div className="hero-card-desc">A Digital Experience for Craft-Led Lighting</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
        >
          <div className="scroll-line" />
          <span>Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  )
}
