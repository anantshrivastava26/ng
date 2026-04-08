import { motion } from 'framer-motion'

import SectionTag, { MethodologyIcon } from './SectionTag'

const tools = [
  'Figma', 'Adobe Photoshop', 'Adobe Illustrator',
  'Adobe InDesign', 'AutoCAD', '3Ds Max', 'Blender', 'Framer',
]

const logos = [
  {
    name: 'Figma',
    src: '/assets/logos/figma.svg',
  },
  {
    name: 'Adobe Photoshop',
    src: '/assets/logos/photoshop.svg',
  },
  {
    name: 'Adobe Illustrator',
    src: '/assets/logos/illustrator.svg',
  },
  {
    name: 'Blender',
    src: '/assets/logos/blender.svg',
  },
  {
    name: 'Framer',
    src: '/assets/logos/framer.svg',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

const logoVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}

export default function Methodology() {
  return (
    <section className="section methodology" id="methodology">
      <div className="method-bg">
        <div className="method-noise" />
      </div>

      <div className="container">
        <div className="section-header">
          <SectionTag label="Methodology" icon={<MethodologyIcon />} className="tag--light" />
          <div className="section-title-col">
            <motion.h2
              className="section-title light"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              The best results don't come from guesswork. They come from a proven process.
            </motion.h2>

            <div className="tools-block">
              <motion.p
                className="tools-label"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.7 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                DESIGN TOOLS I USE
              </motion.p>
              <motion.ul
                className="tools-list"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                {tools.map(tool => (
                  <motion.li key={tool} className="tool-item" variants={itemVariants}>
                    <span>{tool}</span>
                    <span className="tool-arrow">↗</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <div className="logo-grid">
              {logos.map((logo, i) => (
                <motion.div
                  key={logo.name}
                  className="logo-cell"
                  custom={i}
                  variants={logoVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  whileHover={{ background: 'rgba(255,255,255,0.15)', color: '#fff', scale: 1.05 }}
                >
                  <div className="logo-mark" aria-hidden="true">
                    <img src={logo.src} alt="" />
                  </div>
                  <span className="sr-only">{logo.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
