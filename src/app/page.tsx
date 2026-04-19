import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import CoreStrengths from '@/components/sections/CoreStrengths'
import TechStack from '@/components/sections/TechStack'
import Experience from '@/components/sections/Experience'
import Certs from '@/components/sections/Certs'
import Portfolio from '@/components/sections/Portfolio'
import Blog from '@/components/sections/Blog'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <main style={{ width: 'var(--container)', margin: '0 auto' }}>
        <Hero />
        <CoreStrengths />
        <TechStack />
        <Experience />
        <Certs />
        <Portfolio />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
