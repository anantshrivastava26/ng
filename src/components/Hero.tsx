import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as const, delay: delay / 1000 },
  }),
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])

  return (
    <section className="hero" id="hero" ref={heroRef}>
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
        <div className="hero-overlay" />
      </div>

      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-text-main">
            <motion.p
              className="hero-tagline"
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeUp}
            >
              Designing experiences that feel as good as they function
            </motion.p>
            <motion.a
              href="#contact"
              className="btn btn-outline hero-btn"
              initial="hidden"
              animate="visible"
              custom={200}
              variants={fadeUp}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Resume ↗
            </motion.a>
          </div>
        </div>

        <div className="hero-right">
          <motion.h2
            className="hero-title"
            initial="hidden"
            animate="visible"
            custom={100}
            variants={fadeUp}
          >
            UI/UX &amp; Product Design
          </motion.h2>
          <motion.div
            className="hero-card"
            initial="hidden"
            animate="visible"
            custom={300}
            variants={fadeUp}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <div className="hero-card-inner">
              <div className="hero-card-label">Featured Project</div>
              <div className="hero-card-name">Saanjh</div>
              <div className="hero-card-desc">A Digital Experience for Craft-Led Lighting</div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
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
