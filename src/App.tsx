import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Benefits from './components/Benefits'
import Projects from './components/Projects'
import Methodology from './components/Methodology'
import Articles from './components/Articles'
import Footer from './components/Footer'

export default function App() {
  return (
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
        <Articles />
      </main>
      <Footer />
    </>
  )
}
