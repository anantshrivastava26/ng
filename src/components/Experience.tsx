import { motion } from 'framer-motion'

/*
 * Experience & Internships — light gradient band with a 3-column card grid.
 * Each card: logo chip, role, company • location, period pill, divider,
 * bullet highlights, and a faint oversized watermark of the logo behind it.
 *
 * To use a real company logo/photo, drop the file in /public/assets/experience/
 * and set `logo` on the entry; otherwise the `mark` monogram is shown.
 * With neither, the card has no chip and no watermark.
 */

type ExperienceItem = {
  title: string
  company: string
  location: string
  period: string
  mark?: string
  logo?: string
  highlights: string[]
}

const EXPERIENCE: ExperienceItem[] = [
  {
    title: 'UX | UI Intern',
    company: "McDonald's India (North and East)",
    location: 'On-site',
    period: 'May 2026 – July 2026',
    mark: 'M',
    logo: '/assets/experience/mcdonalds.png',
    highlights: [
      "Developed UI elements based on UX principles for an upcoming redesign of the official McDonald's website.",
      'Worked with interface hierarchy and navigation while maintaining a consistent visual direction.',
      'Translated UX requirements into clear interface components for a large, customer-facing brand.',
    ],
  },
  {
    title: 'Graphic Design Intern',
    company: 'Aarav Ethnics',
    location: 'Remote',
    period: 'Jun 2025 – Aug 2025',
    mark: 'AE',
    logo: '/assets/experience/aarav-ethnics.png',
    highlights: [
      'Developed digital textile motifs and marketing strategies for a major retail brand.',
      'Refined visuals based on feedback to improve usability and brand consistency.',
    ],
  },
  {
    title: 'Freelance Visual Designer',
    company: 'Independent',
    location: 'Remote',
    period: 'Jun 2025 – Present',
    logo: '/assets/experience/freelance.png',
    highlights: [
      'Created brand-consistent digital promotional assets.',
      'Managed projects from concept to final delivery with design consistency.',
    ],
  },
]

const EASE = [0.22, 1, 0.36, 1] as const

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
}

/** Word-by-word fade/slide reveal when scrolled into view. */
function Reveal({
  as = 'p',
  text,
  className,
  delay = 0,
  stagger = 0.05,
}: {
  as?: 'p' | 'h2' | 'h3' | 'span'
  text: string
  className?: string
  delay?: number
  stagger?: number
}) {
  const Tag = motion[as]
  const words = text.split(' ')
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: {}, visible: { transition: { delayChildren: delay, staggerChildren: stagger } } }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="xp-word"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
          }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </Tag>
  )
}

function Mark({ item, className }: { item: ExperienceItem; className: string }) {
  if (!item.logo && !item.mark) return null
  return item.logo ? (
    <img src={item.logo} alt="" className={className} loading="lazy" />
  ) : (
    <span className={`${className} xp-monogram`}>{item.mark}</span>
  )
}

export default function Experience() {
  return (
    <section className="xp" id="experience">
      <div className="container">
        <motion.div
          className="xp-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <p className="xp-eyebrow">Professional Journey</p>
          <Reveal as="h2" text="Experience & Internships" className="xp-title" delay={0.14} stagger={0.08} />
          <Reveal
            text="Hands-on work across UI, UX and visual design — from a customer-facing website redesign to textile motifs and freelance brand assets."
            className="xp-intro"
            delay={0.2}
            stagger={0.035}
          />
        </motion.div>

        <motion.div
          className="xp-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={gridVariants}
        >
          {EXPERIENCE.map((item) => (
            <motion.article key={item.company + item.title} className="xp-card" variants={cardVariants} whileHover={{ y: -6 }}>
              {(item.logo || item.mark) && (
                <div className="xp-watermark" aria-hidden="true">
                  <Mark item={item} className="xp-watermark-mark" />
                </div>
              )}

              <div className="xp-card-body">
                {(item.logo || item.mark) && (
                  <div className="xp-chip">
                    <Mark item={item} className="xp-chip-mark" />
                  </div>
                )}

                <h3 className="xp-role">{item.title}</h3>
                <p className="xp-meta">
                  <span className="xp-company">{item.company}</span>
                  <span className="xp-dot" aria-hidden="true">•</span>
                  <span>{item.location}</span>
                </p>
                <span className="xp-period">{item.period}</span>

                <div className="xp-divider" />

                <ul className="xp-list">
                  {item.highlights.map((h) => (
                    <li key={h}>
                      <span className="xp-bullet" aria-hidden="true">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.p
          className="xp-footnote"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          Open to UI/UX and product design opportunities.
        </motion.p>
      </div>
    </section>
  )
}
