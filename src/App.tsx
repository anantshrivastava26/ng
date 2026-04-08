import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Benefits from './components/Benefits'
import Projects from './components/Projects'
import Methodology from './components/Methodology'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import SmoothScroll from './components/SmoothScroll'

export default function App() {
  const [showLoader, setShowLoader] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setShowLoader(false), 2500)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <SmoothScroll />
      <AnimatePresence onExitComplete={() => setShowContent(true)}>
        {showLoader && <LoadingScreen />}
      </AnimatePresence>
      {showContent && (
        <>
          <Cursor />
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Benefits />
            <Projects />
            <Methodology />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
