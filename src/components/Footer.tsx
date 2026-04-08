import { motion } from 'framer-motion'

const LINKEDIN_URL = 'https://www.linkedin.com/in/navyagrover/'
const BEHANCE_URL = 'https://www.behance.net/navyagrover5'

const links = [
  { label: 'LinkedIn', href: LINKEDIN_URL, external: true },
  { label: 'Gmail', href: 'mailto:grovnavya@gmail.com', external: false },
  { label: 'Behance', href: BEHANCE_URL, external: true },
  { label: 'Resume', href: '#', external: false },
]

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-left">
            <motion.p
              className="footer-eyebrow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.5, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
            >
              Contact
            </motion.p>
            <motion.h2
              className="footer-heading"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Let's connect
            </motion.h2>
            <motion.a
              href="tel:+919931982799"
              className="footer-phone"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ opacity: 1 }}
            >
              +91 99319 82799
            </motion.a>
          </div>

          <div className="footer-right">
            <div className="footer-links">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noreferrer' : undefined}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 0.6, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ opacity: 1 }}
                >
                  {link.label} ↗
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4, transition: { duration: 0.8, delay: 0.4 } }}
          viewport={{ once: true }}
        >
          <span>© 2025 Navya Grover. All rights reserved.</span>
          <span>Noora Template — Jakke</span>
        </motion.div>
      </div>
    </footer>
  )
}
