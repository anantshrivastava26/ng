import { motion } from 'framer-motion'

const links = ['LinkedIn', 'Dribbble', 'Behance', 'Resume']

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
              Let's connect
            </motion.p>
            <motion.h2
              className="footer-heading"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Have a project in mind?
            </motion.h2>
            <motion.a
              href="mailto:navya@example.com"
              className="btn btn-primary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              Get in touch ↗
            </motion.a>
          </div>

          <div className="footer-right">
            <div className="footer-links">
              {links.map((link, i) => (
                <motion.a
                  key={link}
                  href="#"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 0.6, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ opacity: 1 }}
                >
                  {link} ↗
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
