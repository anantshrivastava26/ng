import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

import SectionTag, { AboutIcon } from './SectionTag'

const bioText = "I am a lifestyle-oriented product designer specializing in UI/UX design, focused on creating intuitive and engaging experiences. My approach is rooted in research-led discovery to turn insights into thoughtful, impactful products."
const bioWords = bioText.split(' ')
const aboutPills = ['Research-led discovery', 'Interface systems', 'Human-centered storytelling']

const bioContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.09,
    },
  },
}

const pillContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 1.35,
      staggerChildren: 0.24,
    },
  },
}

const pillVariants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const bioWordVariants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section className="section about" id="about">
      <div className="container" ref={sectionRef}>
        <SectionTag label="About" icon={<AboutIcon />} align="center" className="about-tag" />

        <div className="about-panel">
          <motion.figure
            className="about-media"
            initial={{ opacity: 0, x: -36 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="about-media-accent" aria-hidden="true" />
            <img src="/assets/portfolio pic.png" alt="Navya Grover" className="about-portrait" />
          </motion.figure>

          <motion.div
            className="about-copy-col"
            initial={{ opacity: 0, x: 36 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="about-title">Hello!</h2>
            <p className="about-intro-line">
              I am <span className="about-name">Navya Grover</span>
            </p>
            <p className="about-script">Product Designer</p>
            <motion.p
              className="about-bio"
              variants={bioContainerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {bioWords.map((word, index) => (
                <motion.span key={`${word}-${index}`} className="about-word" variants={bioWordVariants}>
                  {word}
                </motion.span>
              ))}
            </motion.p>

            <motion.div
              className="about-pills"
              variants={pillContainerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {aboutPills.map((pill) => (
                <motion.span key={pill} className="about-pill" variants={pillVariants}>
                  {pill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
