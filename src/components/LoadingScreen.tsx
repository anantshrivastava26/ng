import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
    >
      <div className="loading-screen-bg" aria-hidden>
        <motion.div
          className="loading-glow loading-glow-one"
          animate={{ x: [0, 28, 0], y: [0, -14, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="loading-glow loading-glow-two"
          animate={{ x: [0, -32, 0], y: [0, 18, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 5.1, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="loading-core">
        <motion.div
          className="loading-ring"
          animate={{ rotate: 360 }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="loading-ring loading-ring-alt"
          animate={{ rotate: -360 }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="loading-logo"
          initial={{ y: 10, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>N</span>
          <span>G</span>
        </motion.div>
      </div>

      <motion.p
        className="loading-caption"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.8 }}
      >
        Designer Portfolio Loading
      </motion.p>
    </motion.div>
  )
}
