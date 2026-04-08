import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

import SectionTag, { AboutIcon } from './SectionTag'

const bioText = "I am a lifestyle-oriented product designer also specializing in UI/UX design. I'm passionate about creating intuitive and engaging user experiences."
export default function About() {
  const imageRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(imageRef, { once: true, margin: '-100px' })

  return (
    <section className="section about" id="about">
      <div className="container">
        <SectionTag label="About" icon={<AboutIcon />} align="center" className="about-tag" />

        <div className="about-hero">
          <motion.div
            className="about-visual"
            ref={imageRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="about-accent" aria-hidden="true" />
            <img
              src="https://framerusercontent.com/images/5v6LYuo0lCrG85IgnWHCWsFaZU.png"
              alt="Navya Grover"
              className="about-img"
            />
            <div className="about-copy">
              <motion.h2
                className="about-hello"
                initial={{ opacity: 0, x: 18 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Hello!
              </motion.h2>
              <motion.p
                className="about-summary"
                initial={{ opacity: 0, x: 18 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {bioText}
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
