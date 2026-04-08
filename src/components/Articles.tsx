import { motion } from 'framer-motion'

const BASE = 'https://framerusercontent.com/images/'

const articles = [
  {
    tag: 'Branding',
    title: 'Why Your Brand Identity Matters More Than Your Logo',
    year: 'Jul 27, 2025',
    image: `${BASE}H7pmHxrsHkVjHKJY8oD7Oy6ck.png`,
  },
  {
    tag: 'Strategy',
    title: 'The Power of Storytelling in Branding',
    year: 'Jul 24, 2025',
    image: `${BASE}WLXVB4pWpJwh51oTL3zjz6VJyA.png`,
  },
]

export default function Articles() {
  return (
    <section className="section articles" id="articles">
      <div className="container">
        <div className="section-header">
          <motion.div
            className="tag"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            Insights
          </motion.div>
          <div className="section-title-col">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Articles &amp; Reflections
            </motion.h2>
          </div>
        </div>

        <div className="articles-grid">
          <motion.div
            className="articles-intro"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
          >
            <p>From practical advice on building better websites to honest takes on branding mistakes we see too often.</p>
            <motion.a
              href="#"
              className="btn btn-outline"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Discover all articles →
            </motion.a>
          </motion.div>

          {articles.map((article, i) => (
            <motion.article
              key={article.title}
              className="article-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
            >
              <div className="article-img-wrap">
                <img src={article.image} alt={article.title} className="article-img" />
              </div>
              <div className="article-tag">{article.tag}</div>
              <h3>{article.title}</h3>
              <div className="article-meta">
                <span className="article-date">{article.year}</span>
                <motion.a
                  href="#"
                  className="article-link"
                  whileHover={{ gap: '8px' }}
                >
                  Read →
                </motion.a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
