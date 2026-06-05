import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ScrollShowcase from './components/ScrollShowcase'
import Gallery from './components/Gallery'
import About from './components/About'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => { lenis.raf(time * 1000) })
    }
  }, [])

  return (
    <div className="bg-[#080808] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <ScrollShowcase />
      <Gallery />
      <About />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}
