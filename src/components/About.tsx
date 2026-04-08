import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

import SectionTag, { AboutIcon } from './SectionTag'

const bioText = "I am a lifestyle-oriented product designer also specializing in UI/UX design. I'm passionate about creating intuitive and engaging user experiences."

const focusAreas = [
  'Research-led discovery',
  'Interface systems',
  'Human-centered storytelling',
]

export default function About() {
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLElement>(null)
  const contentInView = useInView(contentRef, { once: true, margin: '-80px' })
  const isInView = useInView(imageRef, { once: true, margin: '-100px' })

  return (
    <section className="section about" id="about">
      <div className="container">
        <SectionTag label="About" icon={<AboutIcon />} align="center" className="about-tag" />

        <div className="about-shell">
          <motion.div
            className="about-content"
            ref={contentRef}
            initial={{ opacity: 0, y: 40 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="about-kicker">Designing for people, not screens.</p>
            <motion.h2
              className="about-heading"
              initial={{ opacity: 0, y: 24 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Creating digital products that feel
              <span> effortless and alive.</span>
            </motion.h2>
            <motion.p
              className="about-summary"
              initial={{ opacity: 0, y: 24 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {bioText}
            </motion.p>
            <motion.ul
              className="about-focus"
              initial={{ opacity: 0, y: 24 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.34, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {focusAreas.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </motion.ul>
            <motion.a
              href="#projects"
              className="btn btn-primary about-cta"
              initial={{ opacity: 0, y: 24 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.46, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore work
            </motion.a>
          </motion.div>

          <motion.figure
            className="about-visual"
            ref={imageRef}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="about-accent" aria-hidden="true" />
            <div className="about-image-wrap">
              <img
                src="https://framerusercontent.com/images/5v6LYuo0lCrG85IgnWHCWsFaZU.png"
                alt="Navya Grover"
                className="about-img"
              />
            </div>
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
                className="about-caption"
                initial={{ opacity: 0, x: 18 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                UI/UX & Product Designer
              </motion.p>
            </div>
          </motion.figure>
        </div>
      </div>
    </section>
  )
}
