import { useEffect, useId, useLayoutEffect, useRef, useState, type RefObject } from 'react'
import {
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'

/*
 * Landing hero:
 * - giant "NAVYA GROVER" ticker looping behind the profile stack
 * - "Designing experiences!" heading + "UX/UI Design" pill above the avatar card
 * - flip-on-hover avatar card (desktop), tagline + resume CTA below it
 * - floating 3D tool logos that pop out from behind the avatar card once the
 *   loader finishes, then settle into a gentle bob with scroll parallax
 *   (Framer-style speed: 100 = moves with the page, >100 faster, <100 slower)
 */

const NAME = 'NAVYA GROVER '

const RESUME_URL = '/Navya-Grover-Resume.pdf'

// Avatar illustration shown on the front of the flip card
const AVATAR = '/assets/hero-avatar.webp'

// Framer's default component spring in the template (damping 60, stiffness 500)
const SPRING = { type: 'spring', damping: 60, stiffness: 500, mass: 1 } as const

type LogoDef = {
  key: string
  alt: string
  speed: number
  loop: number
  rotate?: number
}

// Placement lives in CSS (.ch-shape--<key>): left column = figma / procreate /
// illustrator, right column = photoshop / blender / autocad.
const LOGOS: LogoDef[] = [
  { key: 'figma', alt: 'Figma', speed: 140, loop: 2.4, rotate: -10 },
  { key: 'procreate', alt: 'Procreate', speed: 150, loop: 2 },
  { key: 'illustrator', alt: 'Adobe Illustrator', speed: 160, loop: 2.8 },
  { key: 'photoshop', alt: 'Adobe Photoshop', speed: 140, loop: 2.8 },
  { key: 'blender', alt: 'Blender', speed: 150, loop: 2 },
  { key: 'autocad', alt: 'AutoCAD', speed: 160, loop: 2.4 },
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
 * Flip card. Front: avatar illustration on lilac, tilted 10° (legs cropped by
 * the card on purpose). Hover (desktop only): the front spins to -180° and the
 * frosted "scroll down" back swings in to -10°.
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
      target="_blank"
      rel="noreferrer"
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
          animate={{ right: active ? 0 : -78, rotate: active ? -90 : 180 }}
          transition={SPRING}
        >
          <ArrowDown />
        </motion.span>
      </motion.span>
    </a>
  )
}

function Logo({
  logo,
  index,
  phone,
  reduce,
  ready,
  originRef,
}: {
  logo: LogoDef
  index: number
  phone: boolean
  reduce: boolean
  ready: boolean
  originRef: RefObject<HTMLDivElement>
}) {
  const popRef = useRef<HTMLDivElement>(null)
  const y = useParallax(reduce ? 100 : phone ? 90 : logo.speed)

  // Pop out from behind the avatar card: start small at the card's centre,
  // then spring out (with a little overshoot) to the logo's resting spot.
  useLayoutEffect(() => {
    const el = popRef.current
    if (!ready || !el) return
    const origin = originRef.current

    if (reduce || !origin) {
      const fadeOnly = animate(el, { opacity: 1 }, { duration: 0.25, delay: index * 0.02 })
      return () => fadeOnly.stop()
    }

    const a = el.getBoundingClientRect()
    const o = origin.getBoundingClientRect()
    const dx = o.left + o.width / 2 - (a.left + a.width / 2)
    const dy = o.top + o.height / 2 - (a.top + a.height / 2)
    const delay = index * 0.025

    const move = animate(
      el,
      { x: [dx, 0], y: [dy, 0], scale: [0.2, 1], rotate: [index % 2 ? 25 : -25, 0] },
      { type: 'spring', stiffness: 170, damping: 14, mass: 1, delay },
    )
    const fade = animate(el, { opacity: [0, 1] }, { duration: 0.25, delay })
    return () => {
      move.stop()
      fade.stop()
    }
  }, [ready, reduce, index, originRef])

  return (
    <div className={`ch-shape ch-shape--${logo.key}`}>
      <div ref={popRef} className="ch-shape-pop" style={{ opacity: 0 }}>
        <motion.div className="ch-shape-parallax" style={{ y }}>
          <motion.img
            src={`/assets/tools/${logo.key}.webp`}
            alt={logo.alt}
            draggable={false}
            style={{ scale: 0.8, rotate: logo.rotate ?? 0, transformPerspective: 1200 }}
            animate={reduce ? undefined : { y: [0, 12] }}
            transition={{ duration: logo.loop, ease: 'linear', repeat: Infinity, repeatType: 'mirror' }}
          />
        </motion.div>
      </div>
    </div>
  )
}

/* ── hero ────────────────────────────────────────────────────────────────── */

/** `ready` flips to true once the loading screen has gone, which starts the logo pop-out. */
export default function Hero({ ready = true }: { ready?: boolean }) {
  const phone = useMedia('(max-width: 809.98px)')
  const desktop = useMedia('(min-width: 1200px)')
  const reduce = !!useReducedMotion()
  const photoRef = useRef<HTMLDivElement>(null)

  // Speeds: [desktop/tablet, phone]
  const s = (base: number, onPhone: number) => (reduce ? 100 : phone ? onPhone : base)
  const yTagline = useParallax(s(90, 95))
  const yHeading = useParallax(s(130, 95))
  const ySubtitle = useParallax(s(130, 95))
  const yPhoto = useParallax(s(140, 110))
  const yCta = useParallax(s(90, 95))

  return (
    <section className="ch-hero" id="hero">
      <div className="ch-top">
        {!phone && <NameTicker text={NAME} speed={60} />}

        <div className="ch-profile">
          <motion.h1 className="ch-hi" style={{ x: '-50%', y: yHeading }}>
            Designing <span>experiences</span>!
          </motion.h1>

          <motion.div className="ch-skills-wrap" style={{ x: '-50%', y: ySubtitle }}>
            <p className="ch-subtitle">UX/UI Design</p>
          </motion.div>

          <motion.div
            ref={photoRef}
            className="ch-photo-wrap"
            style={{ y: yPhoto, originY: 0, transformPerspective: 1200 }}
          >
            <PhotoCard canFlip={desktop && !reduce} />
          </motion.div>

          <motion.p className="ch-tagline" style={{ x: '-50%', y: yTagline }}>
            Turning insights into interactions.
          </motion.p>

          <motion.div className="ch-cta-wrap" style={{ x: '-50%', y: yCta }}>
            <CtaButton label={phone ? 'My Resume' : 'Check out my resume!'} href={RESUME_URL} />
          </motion.div>
        </div>

        <div className="ch-shapes">
          {LOGOS.map((logo, i) => (
            <Logo
              key={logo.key}
              logo={logo}
              index={i}
              phone={phone}
              reduce={reduce}
              ready={ready}
              originRef={photoRef}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
