import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

import SectionTag, { WorkIcon } from './SectionTag'

interface Project {
  name: string
  desc: string
  tags: string[]
  image: string
  link: string
  offset?: boolean
}

const BASE = 'https://framerusercontent.com/images/'
const BEHANCE_PROFILE = 'https://www.behance.net/navyagrover5'
const NEUROVISOR_PROJECT = 'https://www.behance.net/gallery/246681547/NEUROVISOR-X-A-Futuristic-Smart-Helmet'

const projects: Project[] = [
  {
    name: 'Saanjh',
    desc: 'A Digital Experience for Craft-Led Lighting',
    tags: ['Product Design', 'UI Design'],
    image: `${BASE}hIMdQAU8hOgi8GFT4vPLwwAILz0.png`,
    link: BEHANCE_PROFILE,
  },
  {
    name: 'Pawzo',
    desc: 'A trusted stay platform for pet owners',
    tags: ['UX Design', 'Interface Design'],
    image: `${BASE}n4liRTOFULOzrRSiz5FpMfnQdhM.png`,
    link: BEHANCE_PROFILE,
    offset: true,
  },
  {
    name: 'NeurovisorX',
    desc: 'A futuristic smart helmet with automated visor system',
    tags: ['Product Experience'],
    image: `${BASE}g7XqvCI9pFeszONDlK6OO4qtYY.png`,
    link: NEUROVISOR_PROJECT,
  },
]

function ProjectTile({ project, index }: { project: Project; index: number }) {
  const imgRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    setTilt({ x: x * 8, y: -y * 8 })
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <motion.div
      className={`project-tile${project.offset ? ' project-tile--mid' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={imgRef}
        className="project-tile-img"
        style={{
          rotateY: tilt.x,
          rotateX: tilt.y,
          transformPerspective: 800,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        whileHover={{ scale: 0.97 }}
      >
        <img src={project.image} alt={project.name} className="project-tile-photo" />
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>
      </motion.div>
      <div className="project-tile-info">
        <h3>{project.name}</h3>
        <p>{project.desc}</p>
        <motion.a
          href={project.link}
          className="project-link"
          target="_blank"
          rel="noreferrer"
          whileHover={{ gap: '8px' }}
        >
          View Projects ↗
        </motion.a>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section className="section projects" id="projects">
      <div className="bg-lines" aria-hidden="true">
        <div className="bg-line" />
        <div className="bg-line" />
        <div className="bg-line" />
      </div>

      <div className="container">
        <div className="section-header">
          <SectionTag label="Work" icon={<WorkIcon />} />
          <div className="section-title-col">
            <motion.h2
              className="section-title display"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Projects
            </motion.h2>
            <motion.p
              className="section-body"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              (Selected Works)
            </motion.p>
            <motion.p
              className="section-desc"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Projects that highlight my process—from research and ideation to execution—showcasing both strategic thinking and craft.
            </motion.p>
            <motion.a
              href={BEHANCE_PROFILE}
              className="btn btn-outline projects-cta"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              View projects →
            </motion.a>
          </div>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectTile key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
