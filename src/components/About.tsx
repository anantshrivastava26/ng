import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'

const bioText = "I am a lifestyle-oriented product designer also specializing in UI/UX design. I'm passionate about creating intuitive and engaging user experiences."
const words = bioText.split(' ')

function WordSpan({
  word,
  progress,
  start,
  end,
}: {
  word: string
  progress: import('framer-motion').MotionValue<number>
  start: number
  end: number
}) {
  const color = useTransform(progress, [start, end], ['#D4D4D4', '#000000'])
  return (
    <motion.span className="word" style={{ color }}>
      {word}{' '}
    </motion.span>
  )
}

function WordReveal() {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.3'],
  })

  return (
    <p className="reveal-text" ref={ref}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = (i + 1) / words.length
        return (
          <WordSpan
            key={i}
            word={word}
            progress={scrollYProgress}
            start={start}
            end={end}
          />
        )
      })}
    </p>
  )
}

export default function About() {
  const imageRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(imageRef, { once: true, margin: '-100px' })

  return (
    <section className="section about" id="about">
      <div className="container">
        <motion.div
          className="tag"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          About
        </motion.div>

        <motion.div
          className="about-image-wrapper"
          ref={imageRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <img
            src="https://framerusercontent.com/images/5v6LYuo0lCrG85IgnWHCWsFaZU.png"
            alt="Navya Grover"
            className="about-img"
          />
          <motion.div
            className="about-hello"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Hello!
          </motion.div>
        </motion.div>

        <div className="about-text-reveal">
          <WordReveal />
        </div>
      </div>
    </section>
  )
}
