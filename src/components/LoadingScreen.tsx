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
          <span>Designer Portfolio</span>
        </motion.div>

        <div className="loading-foreground-copy" aria-label="Designer Portfolio">
          <div className="loading-reveal-line">
            <motion.span
              className="loading-foreground-word"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.05, delay: 0.12, ease: revealEase }}
            >
              Designer
            </motion.span>
          </div>
          <div className="loading-reveal-line">
            <motion.span
              className="loading-foreground-word"
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.05, delay: 0.3, ease: revealEase }}
            >
              Portfolio
            </motion.span>
          </div>
        </div>

        <motion.div
          className="loading-ng-badge"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.55, ease: revealEase }}
        >
          <svg className="loading-ng-logo" viewBox="0 0 220 220" role="img" aria-label="NG logo">
            <rect x="0" y="0" width="220" height="220" fill="#111111" />
            <path
              fill="#F4F4F4"
              d="M46 34h40l58 85V34h34v152h-38l-60-88v88H46z"
            />
            <path
              fill="#F4F4F4"
              d="M174 34c-33 0-55 16-72 43l22 31c9-23 24-34 50-34h20V34z"
            />
            <path
              fill="#F4F4F4"
              d="M194 126h-44V98h44v88h-20c-42 0-72-30-72-72h34c0 24 16 40 38 40h20z"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}
