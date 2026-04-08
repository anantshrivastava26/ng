import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 60], [0, 0.85])
  const borderOpacity = useTransform(scrollY, [0, 60], [0, 1])
  const paddingY = useTransform(scrollY, [0, 60], [20, 12])

  const navLinks = ['About', 'Work', 'Articles']

  const menuVariants = {
    closed: { opacity: 0, y: -20, pointerEvents: 'none' as const },
    open: { opacity: 1, y: 0, pointerEvents: 'all' as const },
  }

  const linkVariants = {
    closed: { opacity: 0, y: -10 },
    open: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07 } }),
  }

  return (
    <>
      <motion.nav
        className="navbar"
        style={{ paddingTop: paddingY, paddingBottom: paddingY }}
      >
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(241,241,241,1)',
            opacity: bgOpacity,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: -1,
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: '#D4D4D4',
            opacity: borderOpacity,
          }}
        />

        <div className="nav-inner">
          <a href="/" className="nav-logo">Navya<span>.</span></a>

          <div className="nav-links">
            {navLinks.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`}>{link}</a>
            ))}
            <a href="#contact" className="nav-cta">Contact</a>
          </div>

          <button
            className="hamburger"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {[...navLinks, 'Contact'].map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                custom={i}
                variants={linkVariants}
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
