import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

import SectionTag, { WorkIcon } from './SectionTag'

interface Project {
  name: string
  desc: string
  tag: string
  image: string
  offset?: boolean
}

const BASE = 'https://framerusercontent.com/images/'

const projects: Project[] = [
  {
    name: 'Saanjh',
    desc: 'A Digital Experience for Craft-Led Lighting',
    tag: 'UI/UX',
    image: `${BASE}hIMdQAU8hOgi8GFT4vPLwwAILz0.png`,
  },
  {
    name: 'Pawzo',
    desc: 'A trusted stay platform for pet owners',
    tag: 'Product',
    image: `${BASE}n4liRTOFULOzrRSiz5FpMfnQdhM.png`,
    offset: true,
  },
  {
    name: 'NeuroVisoX',
    desc: 'A futuristic smart helmet with automated visor system',
    tag: 'Industrial',
    image: `${BASE}g7XqvCI9pFeszONDlK6OO4qtYY.png`,
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
        <div className="project-tag">{project.tag}</div>
      </motion.div>
      <div className="project-tile-info">
        <h3>{project.name}</h3>
        <p>{project.desc}</p>
        <motion.a
          href="#"
          className="project-link"
          whileHover={{ gap: '8px' }}
        >
          View Case Study ↗
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
              Featured work between ©2024–25
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
              href="#"
              className="btn btn-outline"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Discover all projects →
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
