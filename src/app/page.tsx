'use client'
import dynamic from 'next/dynamic'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import Stats from '@/components/Stats'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import Journey from '@/components/Journey'
import Studio from '@/components/Studio'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

const ParticleField = dynamic(() => import('@/components/ParticleField'), { ssr: false })

export default function Home() {
  return (
    <SmoothScrollProvider>
      <ParticleField />
      <Navigation />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Stats />
        <About />
        <Testimonials />
        <Journey />
        <Studio />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
