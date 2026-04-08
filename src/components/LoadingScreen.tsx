import { motion } from 'framer-motion'

const revealEase = [0.22, 1, 0.36, 1] as const

export default function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: revealEase } }}
    >
      <div className="loading-screen-bg" aria-hidden>
        <motion.div
          className="loading-aura-orb"
          initial={{ opacity: 0, scale: 0.72, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: revealEase }}
        />
        <motion.div
          className="loading-aura-orb loading-aura-orb-pulse"
          animate={{ scale: [1, 1.08, 1], rotate: [0, 4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="loading-core">
        <motion.div
          className="loading-outline-depth"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span>Portfolio</span>
        </motion.div>

        <div className="loading-foreground-copy" aria-label="Portfolio">
          <div className="loading-reveal-line">
            <motion.span
              className="loading-foreground-word"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.05, delay: 0.2, ease: revealEase }}
            >
              Navya Grover
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
