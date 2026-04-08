import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.45, ease: [0.22, 1, 0.36, 1] as const, delay: delay / 1000 },
  }),
}

const heroSequence = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.45,
      staggerChildren: 0.22,
    },
  },
}

const heroItem = {
  hidden: { opacity: 0, y: 28, filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '42%'])

  return (
    <section className="hero" id="hero" ref={heroRef}>
      {/* ── Background ── */}
      <div className="hero-bg">
        <motion.img
          src="/assets/logos/hero.png"
          alt="Background"
          className="hero-bg-img"
          style={{ y: bgY }}
          initial={{ scale: 1.18 }}
          animate={{ scale: 1.08 }}
          transition={{ duration: 14, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <div className="hero-motion-layer" aria-hidden>
          <motion.div
            className="hero-motion-orb"
            animate={{ scale: [1, 1.06, 1], rotate: [0, 4, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="hero-depth-word"
            style={{ scaleY: 2 }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          >
            DRIVEN BY CURIOSITY
          </motion.div>
          <motion.div
            className="hero-swiss-grid"
            animate={{ x: [0, -22] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="hero-axis-line hero-axis-line-top"
            animate={{ x: ['-6%', '12%'] }}
            transition={{ duration: 11, repeat: Infinity, repeatType: 'mirror', ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="hero-axis-line hero-axis-line-bottom"
            animate={{ x: ['8%', '-10%'] }}
            transition={{ duration: 13, repeat: Infinity, repeatType: 'mirror', ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div className="hero-overlay" />
      </div>

      {/* ── Content grid ── */}
      <motion.div className="hero-content" initial="hidden" animate="visible" variants={heroSequence}>

        {/* Left col: display name (top) + tagline/CTA (bottom) */}
        <motion.div className="hero-left" variants={heroSequence}>

          {/* Big display name */}
          <div className="hero-name-block">
            <motion.h1
              className="hero-display-name"
              variants={heroItem}
            >
              Navya
            </motion.h1>
          </div>

          {/* Tagline + CTA pushed to bottom */}
          <div className="hero-text-main">
            <motion.div
              className="hero-tagline-block"
              variants={heroItem}
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
              variants={heroItem}
              whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
            >
              Resume ↗
            </motion.a>
          </div>
        </motion.div>

        {/* Right col: title */}
        <motion.div className="hero-right" variants={heroSequence}>
          <motion.h2
            className="hero-title"
            variants={heroItem}
          >
            UI/UX &amp;<br />Product Design
          </motion.h2>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 1.0 }}
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
