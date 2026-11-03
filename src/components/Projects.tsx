import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useMotionValue, useSpring } from 'framer-motion'

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
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
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
  linkLabel?: string
  imagePosition?: string
}

const BASE = 'https://framerusercontent.com/images/'
const SAANJH_PROJECT = 'https://www.behance.net/gallery/247285389/Saanjh-A-Digital-Experience-for-Craft-Led-Lighting'
const PAWZO_PROJECT = 'https://www.behance.net/gallery/247289205/Pawzo-A-Pet-Stay-App'
const NEUROVISOR_PROJECT = 'https://www.behance.net/gallery/246681547/NEUROVISOR-X-A-Futuristic-Smart-Helmet'
const TREND_FORECASTING_PDF = '/misc/trend%20forecasting.pdf'
const TREND_FORECASTING_COVER = '/misc/cover.webp'
const COFFEE_TABLE_BOOK_PDF = '/misc/coffee%20table%20book.pdf'
const COFFEE_TABLE_BOOK_COVER = '/misc/coverrr.webp'
const TRASH_BASH_PROJECT = 'public/assets/TRASH BASH.pdf'

const projects: Project[] = [
  {
    name: 'Trash Bash',
    desc: 'A community cleanup initiative',
    tags: ['Campaign', 'Research'],
    image: '/assets/trash-bash.webp',
    link: TRASH_BASH_PROJECT,
    downloadFileName: 'TRASH BASH.pdf',
    linkLabel: 'View Project ↗',
  },
  {
    name: 'Pawzo',
    desc: 'A trusted stay platform for pet owners',
    tags: ['UX Design', 'Interface Design'],
    image: `${BASE}n4liRTOFULOzrRSiz5FpMfnQdhM.png`,
    link: PAWZO_PROJECT,
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
    name: 'Saanjh',
    desc: 'A Digital Experience for Craft-Led Lighting',
    tags: ['Product Design', 'UI Design'],
    image: `${BASE}hIMdQAU8hOgi8GFT4vPLwwAILz0.png`,
    link: SAANJH_PROJECT,
  },
  {
    name: 'Trend Forecasting',
    desc: 'Lifestyle and design trend study with insights, material signals, and future-facing direction.',
    tags: ['Research', 'Forecasting'],
    image: TREND_FORECASTING_COVER,
    link: TREND_FORECASTING_PDF,
    downloadFileName: 'trend forecasting.pdf',
    imagePosition: '0% center',
  },
  {
    name: 'Coffee Table Book',
    desc: 'A curated visual narrative exploring form, mood, and storytelling through editorial-style layouts.',
    tags: ['Editorial', 'Visual Design'],
    image: COFFEE_TABLE_BOOK_COVER,
    link: COFFEE_TABLE_BOOK_PDF,
    downloadFileName: 'coffee table book.pdf',
    imagePosition: 'center center',
  },
]

function ProjectTile({ project, index, hideTitle = false }: { project: Project; index: number; hideTitle?: boolean }) {
  const imgRef = useRef<HTMLDivElement>(null)
  // Motion values (not state) so tilting doesn't re-render the tile on every mousemove
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateY = useSpring(tiltX, { stiffness: 200, damping: 25 })
  const rotateX = useSpring(tiltY, { stiffness: 200, damping: 25 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    tiltX.set(x * 8)
    tiltY.set(-y * 8)
  }

  const handleMouseLeave = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

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
        href={encodeURI(project.link)}
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
            rotateY,
            rotateX,
            transformPerspective: 800,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          whileHover={{ scale: 0.97 }}
        >
          <img
            src={project.image}
            alt={project.name}
            className="project-tile-photo"
            loading="lazy"
            decoding="async"
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
        {!hideTitle && <h3>{project.name}</h3>}
        <p>{project.desc}</p>
        <motion.a
          href={encodeURI(project.link)}
          className="project-link"
          download={project.downloadFileName}
          target={project.downloadFileName ? undefined : '_blank'}
          rel={project.downloadFileName ? undefined : 'noreferrer'}
          whileHover={{ gap: '8px' }}
        >
          {project.linkLabel ?? (project.downloadFileName ? 'Download Project ↓' : 'View Project ↗')}
        </motion.a>
      </div>
    </motion.div>
  )
}

const formatProjectNumber = (index: number) => String(index + 1).padStart(2, '0')

// Number slides up when scrolling down, and down when scrolling back up
const projectNumberVariants = {
  enter: (direction: number) => ({ y: direction > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { y: '0%', opacity: 1 },
  exit: (direction: number) => ({ y: direction > 0 ? '-100%' : '100%', opacity: 0 }),
}

function ProjectScrollItem({
  project,
  index,
  onActive,
}: {
  project: Project
  index: number
  onActive: (index: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  // True while this item crosses the vertical centre of the viewport
  const isCentered = useInView(ref, { margin: '-50% 0px -50% 0px' })

  useEffect(() => {
    if (isCentered) onActive(index)
  }, [isCentered, index, onActive])

  return (
    <div ref={ref} className="projects-scroll-item">
      {/* Inline number + title, shown only on mobile where the sticky column is hidden */}
      <div className="projects-scroll-inline-head">
        <span className="projects-scroll-inline-number">{formatProjectNumber(index)}</span>
        <h3 className="projects-scroll-title">{project.name}</h3>
      </div>
      <ProjectTile project={project} index={0} hideTitle />
    </div>
  )
}

function ProjectsStickyScroll() {
  const [active, setActive] = useState({ index: 0, direction: 1 })

  const handleActive = useCallback((index: number) => {
    setActive((prev) => (prev.index === index ? prev : { index, direction: index > prev.index ? 1 : -1 }))
  }, [])

  const activeProject = projects[active.index]

  return (
    <div className="projects-scroll">
      <div className="projects-scroll-left">
        <div className="projects-scroll-sticky">
          <div className="projects-scroll-number-wrap" aria-hidden="true">
            <AnimatePresence initial={false} custom={active.direction}>
              <motion.span
                key={active.index}
                className="projects-scroll-number"
                custom={active.direction}
                variants={projectNumberVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {formatProjectNumber(active.index)}
              </motion.span>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.h3
              key={activeProject.name}
              className="projects-scroll-title"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeProject.name}
            </motion.h3>
          </AnimatePresence>
        </div>
      </div>

      <div className="projects-scroll-right">
        {projects.map((project, i) => (
          <ProjectScrollItem key={project.name} project={project} index={i} onActive={handleActive} />
        ))}
      </div>
    </div>
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

        <ProjectsStickyScroll />
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
