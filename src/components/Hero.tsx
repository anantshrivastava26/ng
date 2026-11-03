import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

/*
 * Landing hero modelled on the "Cohesion" Framer template:
 * - giant name ticker running behind the profile stack
 * - "Hi, I'm …" heading, auto-cycling skills pill, flip-on-hover avatar card
 * - CTA pill whose arrow slides in on hover
 * - floating 3D shapes with a mirrored bob loop
 * - per-element scroll parallax using the template's Framer "speed" values
 *   (100 = moves with the page, >100 moves faster, <100 lags behind)
 */

const NAME = 'NAVYA GROVER '
const FIRST_NAME = 'Navya'

const SKILLS = [
  'UI/UX Design',
  'Research-led Discovery',
  'Product Design',
  'Interface Systems',
  'Human-centred Storytelling',
]

const TOOLS = [
  { src: '/assets/logos/figma.svg', alt: 'Figma' },
  { src: '/assets/logos/framer.svg', alt: 'Framer' },
  { src: '/assets/logos/illustrator.svg', alt: 'Illustrator' },
]

// Avatar illustration shown on the front of the flip card
const AVATAR = '/assets/hero-avatar.png'

// Framer's default component spring in the template (damping 60, stiffness 500)
const SPRING = { type: 'spring', damping: 60, stiffness: 500, mass: 1 } as const

type ShapeDef = {
  key: string
  speed: number
  loop: number
  rotate?: number
}

const SHAPES: ShapeDef[] = [
  { key: 'orange-pyramid', speed: 140, loop: 2.4, rotate: 10 },
  { key: 'purple-sphere', speed: 150, loop: 2 },
  { key: 'blue-cylinder', speed: 160, loop: 2.8, rotate: -55 },
  { key: 'turquoise-star', speed: 140, loop: 2.8 },
  { key: 'green-element', speed: 150, loop: 2 },
  { key: 'yellow-cube', speed: 160, loop: 2.4 },
]

/* ── helpers ─────────────────────────────────────────────────────────────── */

function useMedia(query: string) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

/** Framer-style scroll parallax: speed 100 = normal scroll. */
function useParallax(speed: number) {
  const { scrollY } = useScroll()
  const speedRef = useRef(speed)
  speedRef.current = speed
  return useTransform(scrollY, (v) => v * (1 - speedRef.current / 100))
}

/* ── pieces ──────────────────────────────────────────────────────────────── */

function NameTicker({ text, speed }: { text: string; speed: number }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const itemRef = useRef<HTMLDivElement>(null)
  const [itemWidth, setItemWidth] = useState(0)
  const [copies, setCopies] = useState(2)
  const x = useMotionValue(0)
  const reduce = useReducedMotion()

  useLayoutEffect(() => {
    const measure = () => {
      const w = itemRef.current?.offsetWidth ?? 0
      const cw = wrapRef.current?.offsetWidth ?? 0
      setItemWidth(w)
      if (w > 0) setCopies(Math.ceil(cw / w) + 1)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (wrapRef.current) ro.observe(wrapRef.current)
    if (itemRef.current) ro.observe(itemRef.current)
    document.fonts?.ready.then(measure).catch(() => {})
    return () => ro.disconnect()
  }, [])

  useAnimationFrame((_, delta) => {
    if (!itemWidth || reduce) return
    let next = x.get() - (speed * delta) / 1000
    if (next <= -itemWidth) next += itemWidth
    x.set(next)
  })

  return (
    <div ref={wrapRef} className="ch-ticker" aria-hidden="true" style={{ opacity: itemWidth ? 1 : 0 }}>
      <motion.div className="ch-ticker-track" style={{ x }}>
        {Array.from({ length: copies }, (_, i) => (
          <div key={i} ref={i === 0 ? itemRef : undefined} className="ch-ticker-item">
            {text}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

function SkillsList() {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % SKILLS.length), 3000)
    return () => window.clearTimeout(t)
  }, [index, reduce])

  return (
    <div className="ch-skills">
      <motion.ul className="ch-skills-list" animate={{ y: -32 * index }} transition={SPRING}>
        {SKILLS.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </motion.ul>
    </div>
  )
}

function ArcText({ text }: { text: string }) {
  const id = `arc-${useId().replace(/:/g, '')}`
  const reduce = useReducedMotion()
  const r = 58
  return (
    <motion.svg
      className="ch-arc"
      viewBox="0 0 140 140"
      aria-hidden="true"
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    >
      <defs>
        <path id={id} d={`M ${70 - r},70 a ${r},${r} 0 1,1 ${2 * r},0 a ${r},${r} 0 1,1 ${-2 * r},0`} />
      </defs>
      <text>
        <textPath href={`#${id}`} textLength={Math.floor(2 * Math.PI * r) - 4} lengthAdjust="spacing">
          {text}
        </textPath>
      </text>
    </motion.svg>
  )
}

function ArrowDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="none" aria-hidden="true">
      <line x1="128" y1="40" x2="128" y2="216" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <polyline
        points="56 144 128 216 200 144"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * The template's flip card. Front: avatar illustration on lavender, tilted 10°.
 * Hover (desktop only): the front spins to -180° and the frosted "scroll down"
 * back swings in to -10°, using the template's values and spring.
 * If the avatar image is missing, only the back face is shown (no flip).
 */
function PhotoCard({ canFlip }: { canFlip: boolean }) {
  const [hovered, setHovered] = useState(false)
  const [hasAvatar, setHasAvatar] = useState(true)
  const reduce = useReducedMotion()
  const flip = canFlip && hasAvatar
  const flipped = flip && hovered

  const backState = !hasAvatar
    ? canFlip
      ? { rotateY: 10 }
      : { rotateY: 0 }
    : !flip
      ? { rotateY: 0 }
      : flipped
        ? { rotateY: -10, backgroundColor: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(15px)' }
        : { rotateY: 180, backgroundColor: 'rgba(255, 255, 255, 1)', backdropFilter: 'blur(0px)' }

  const frontState = !flip ? { rotateY: 0 } : flipped ? { rotateY: -180 } : { rotateY: 10 }

  return (
    <div
      className="ch-photo-card"
      style={{ cursor: flip ? 'pointer' : 'default' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="ch-photo-back"
        initial={false}
        animate={backState}
        transition={SPRING}
        style={{ transformPerspective: 500 }}
      >
        <div className="ch-circle ch-circle--big" />
        <div className="ch-circle ch-circle--small" />
        <ArcText text={'✦  SCROLL DOWN  ✦ AND KNOW ME BETTER  '} />
        <motion.div
          className="ch-photo-arrow"
          animate={reduce ? undefined : { y: [0, 12] }}
          transition={{ duration: 1, ease: 'linear', repeat: Infinity, repeatType: 'mirror' }}
        >
          <ArrowDown />
        </motion.div>
      </motion.div>

      {hasAvatar && (
        <motion.div
          className="ch-photo-front"
          initial={false}
          animate={frontState}
          transition={SPRING}
          style={{ transformPerspective: 500 }}
        >
          <img
            src={AVATAR}
            alt="Illustrated avatar of Navya"
            className="ch-photo-img"
            draggable={false}
            onError={() => setHasAvatar(false)}
          />
        </motion.div>
      )}
    </div>
  )
}

function CtaButton({ label, href }: { label: string; href: string }) {
  const [active, setActive] = useState(false)
  return (
    <a
      className="ch-cta"
      href={href}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <motion.span
        className="ch-cta-inner"
        initial={false}
        animate={{ paddingRight: active ? 99 : 48 }}
        transition={SPRING}
      >
        <span className="ch-cta-label">{label}</span>
        <motion.span
          className="ch-cta-icon"
          initial={false}
          animate={{ right: active ? 0 : -78, rotate: active ? 0 : 180 }}
          transition={SPRING}
        >
          <ArrowDown />
        </motion.span>
      </motion.span>
    </a>
  )
}

function Shape({ shape, phone, reduce }: { shape: ShapeDef; phone: boolean; reduce: boolean }) {
  const y = useParallax(reduce ? 100 : phone ? 90 : shape.speed)
  return (
    <div className={`ch-shape ch-shape--${shape.key}`}>
      <motion.div className="ch-shape-parallax" style={{ y }}>
        <motion.img
          src={`/assets/hero3d/${shape.key}.png`}
          alt=""
          draggable={false}
          style={{ scale: 0.8, rotate: shape.rotate ?? 0, transformPerspective: 1200 }}
          animate={reduce ? undefined : { y: [0, 12] }}
          transition={{ duration: shape.loop, ease: 'linear', repeat: Infinity, repeatType: 'mirror' }}
        />
      </motion.div>
    </div>
  )
}

/* ── hero ────────────────────────────────────────────────────────────────── */

export default function Hero() {
  const phone = useMedia('(max-width: 809.98px)')
  const desktop = useMedia('(min-width: 1200px)')
  const reduce = !!useReducedMotion()

  // Template speeds: [desktop/tablet, phone]
  const s = (base: number, onPhone: number) => (reduce ? 100 : phone ? onPhone : base)
  const yClients = useParallax(s(90, 95))
  const yHeading = useParallax(s(130, 95))
  const ySkills = useParallax(s(130, 95))
  const yPhoto = useParallax(s(140, 110))
  const yCta = useParallax(s(90, 95))

  return (
    <section className="ch-hero" id="hero">
      <div className="ch-top">
        {!phone && <NameTicker text={NAME} speed={60} />}

        <div className="ch-profile">
          <motion.div className="ch-clients" style={{ y: yClients }}>
            {TOOLS.map((tool, i) => (
              <span key={tool.alt} className="ch-avatar" style={{ left: i * 28 }}>
                <img src={tool.src} alt={tool.alt} />
              </span>
            ))}
            <p>Tools I live in</p>
          </motion.div>

          <motion.h1 className="ch-hi" style={{ x: '-50%', y: yHeading }}>
            Hi, I&apos;m <span>{FIRST_NAME}</span>!
          </motion.h1>

          <motion.div className="ch-skills-wrap" style={{ x: '-50%', y: ySkills }}>
            <SkillsList />
          </motion.div>

          <motion.div
            className="ch-photo-wrap"
            style={{ y: yPhoto, originY: 0, transformPerspective: 1200 }}
          >
            <PhotoCard canFlip={desktop && !reduce} />
          </motion.div>

          <motion.div className="ch-cta-wrap" style={{ x: '-50%', y: yCta }}>
            <CtaButton label={phone ? 'Contact Me' : "Let's Work Together!"} href="#contact" />
          </motion.div>
        </div>

        <div className="ch-shapes" aria-hidden="true">
          {SHAPES.map((shape) => (
            <Shape key={shape.key} shape={shape} phone={phone} reduce={reduce} />
          ))}
        </div>
      </div>
    </section>
  )
}
