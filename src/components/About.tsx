import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

import SectionTag, { AboutIcon } from './SectionTag'

const bioText = "I am a lifestyle-oriented product designer specializing in UI/UX design, focused on creating intuitive and engaging experiences. My approach is rooted in research-led discovery to turn insights into thoughtful, impactful products."

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
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="about-media-accent" aria-hidden="true" />
            <img src="/assets/portfolio pic.png" alt="Navya Grover" className="about-portrait" />
          </motion.figure>

          <motion.div
            className="about-copy-col"
            initial={{ opacity: 0, x: 36 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="about-title">Hello!</h2>
            <p className="about-intro-line">
              I am <span className="about-name">Navya Grover</span>
            </p>
            <p className="about-script">Product Designer</p>
            <p className="about-bio">{bioText}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
