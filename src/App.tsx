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

  useEffect(() => {
    const timer = window.setTimeout(() => setShowLoader(false), 2500)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <SmoothScroll />
      <AnimatePresence>
        {showLoader && <LoadingScreen />}
      </AnimatePresence>
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
  )
}
