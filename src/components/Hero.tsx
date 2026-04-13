import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

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

type HeroProps = {
  startReveal: boolean
}

const RESUME_IMAGE_URL = '/resume.png'

export default function Hero({ startReveal }: HeroProps) {
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
          loading="eager"
          fetchPriority="high"
          style={{ y: bgY }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1.04 }}
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
            style={{ scaleY: 1 }}
          >
            PORTFOLIO
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
      <motion.div
        className="hero-content"
        initial="hidden"
        animate={startReveal ? 'visible' : 'hidden'}
        variants={heroSequence}
      >

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
              href={RESUME_IMAGE_URL}
              download="resume.png"
              className="btn btn-outline hero-btn"
              variants={heroItem}
              whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
            >
              Resume ↗
            </motion.a>
          </div>
        </motion.div>

      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: startReveal ? 1 : 0 }}
        transition={{ delay: startReveal ? 2.1 : 0, duration: 1.0 }}
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
