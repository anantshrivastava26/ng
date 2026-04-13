import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import SectionTag, { WorkIcon } from './SectionTag'

const projectsHeading = 'Projects'
const projectsSubheading = '(Selected Works)'
const projectsDescription = 'Projects that highlight my process—from research and ideation to execution—showcasing both strategic thinking and craft.'

const projectsHeadingWords = projectsHeading.split(' ')
const projectsSubheadingWords = projectsSubheading.split(' ')
const projectsDescriptionWords = projectsDescription.split(' ')

const revealContainerVariants = {
  hidden: {},
  visible: (delay = 0) => ({
    transition: {
      delayChildren: delay,
      staggerChildren: 0.09,
    },
  }),
}

const revealWordVariants = {
  hidden: { opacity: 0, y: 10, filter: 'blur(3px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const },
  },
}

interface Project {
  name: string
  desc: string
  tags: string[]
  image: string
  link: string
  offset?: boolean
  downloadFileName?: string
  imagePosition?: string
}

const BASE = 'https://framerusercontent.com/images/'
const SAANJH_PROJECT = 'https://www.behance.net/gallery/247285389/Saanjh-A-Digital-Experience-for-Craft-Led-Lighting'
const PAWZO_PROJECT = 'https://www.behance.net/gallery/247289205/Pawzo-A-Pet-Stay-App'
const NEUROVISOR_PROJECT = 'https://www.behance.net/gallery/246681547/NEUROVISOR-X-A-Futuristic-Smart-Helmet'
const TREND_FORECASTING_PDF = '/misc/trend%20forecasting.pdf'
const TREND_FORECASTING_COVER = '/misc/cover.png'

const projects: Project[] = [
  {
    name: 'Saanjh',
    desc: 'A Digital Experience for Craft-Led Lighting',
    tags: ['Product Design', 'UI Design'],
    image: `${BASE}hIMdQAU8hOgi8GFT4vPLwwAILz0.png`,
    link: SAANJH_PROJECT,
  },
  {
    name: 'Pawzo',
    desc: 'A trusted stay platform for pet owners',
    tags: ['UX Design', 'Interface Design'],
    image: `${BASE}n4liRTOFULOzrRSiz5FpMfnQdhM.png`,
    link: PAWZO_PROJECT,
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

const miscellaneousProjects: Project[] = [
  {
    name: 'Trend Forecasting',
    desc: 'Lifestyle and design trend study with insights, material signals, and future-facing direction.',
    tags: ['Research', 'Forecasting'],
    image: TREND_FORECASTING_COVER,
    link: TREND_FORECASTING_PDF,
    downloadFileName: 'trend forecasting.pdf',
    imagePosition: '0% center',
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
      <a
        href={project.link}
        className="project-tile-image-link"
        download={project.downloadFileName}
        target={project.downloadFileName ? undefined : '_blank'}
        rel={project.downloadFileName ? undefined : 'noreferrer'}
        aria-label={`Open ${project.name} project`}
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
          <img
            src={project.image}
            alt={project.name}
            className="project-tile-photo"
            style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
          />
          <div className="project-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="project-tag">{tag}</span>
            ))}
          </div>
        </motion.div>
      </a>
      <div className="project-tile-info">
        <h3>{project.name}</h3>
        <p>{project.desc}</p>
        <motion.a
          href={project.link}
          className="project-link"
          download={project.downloadFileName}
          target={project.downloadFileName ? undefined : '_blank'}
          rel={project.downloadFileName ? undefined : 'noreferrer'}
          whileHover={{ gap: '8px' }}
        >
          {project.downloadFileName ? 'Download Project ↓' : 'View Project ↗'}
        </motion.a>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [isProjectsModalOpen, setProjectsModalOpen] = useState(false)

  useEffect(() => {
    if (!isProjectsModalOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isProjectsModalOpen])

  useEffect(() => {
    if (!isProjectsModalOpen) return undefined

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setProjectsModalOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isProjectsModalOpen])

  return (
    <>
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
              variants={revealContainerVariants}
              custom={0.1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {projectsHeadingWords.map((word, index) => (
                <motion.span key={`${word}-${index}`} className="projects-reveal-word" variants={revealWordVariants}>
                  {word}
                </motion.span>
              ))}
            </motion.h2>
            <motion.p
              className="section-body"
              variants={revealContainerVariants}
              custom={0.2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {projectsSubheadingWords.map((word, index) => (
                <motion.span key={`${word}-${index}`} className="projects-reveal-word" variants={revealWordVariants}>
                  {word}
                </motion.span>
              ))}
            </motion.p>
            <motion.p
              className="section-desc"
              variants={revealContainerVariants}
              custom={0.3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {projectsDescriptionWords.map((word, index) => (
                <motion.span key={`${word}-${index}`} className="projects-reveal-word" variants={revealWordVariants}>
                  {word}
                </motion.span>
              ))}
            </motion.p>
            <motion.button
              type="button"
              className="btn btn-outline projects-cta"
              onClick={() => setProjectsModalOpen(true)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              View all projects →
            </motion.button>
          </div>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <ProjectTile key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
    <AnimatePresence>
      {isProjectsModalOpen && (
        <motion.div
          className="projects-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => setProjectsModalOpen(false)}
        >
          <motion.div
            className="projects-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="projects-modal-title"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="projects-modal-head">
              <h3 id="projects-modal-title">Miscellaneous Projects</h3>
              <div className="projects-modal-actions">
                <button type="button" onClick={() => setProjectsModalOpen(false)}>
                  Close
                </button>
              </div>
            </div>
            <div className="projects-modal-body">
              <div className="projects-grid projects-grid--modal">
                {miscellaneousProjects.map((project, i) => (
                  <ProjectTile key={`modal-${project.name}`} project={project} index={i} />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
