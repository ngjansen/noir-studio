import { useState } from 'react'
import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StartSection from './components/StartSection'
import FeaturesChess from './components/FeaturesChess'
import FeaturesGrid from './components/FeaturesGrid'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'
import CtaFooter from './components/CtaFooter'
import { useActiveSection } from './hooks/useActiveSection'

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const activeSection = useActiveSection()
  const openModal = () => setIsModalOpen(true)

  return (
    <div className="bg-black">
      <div className="relative z-10">
        <Navbar activeSection={activeSection} onOpenModal={openModal} />
        <section id="hero">
          <Hero onOpenModal={openModal} />
        </section>
        <div className="bg-black">
          <section id="process">
            <StartSection onOpenModal={openModal} />
          </section>
          <section id="services">
            <FeaturesChess />
            <FeaturesGrid />
          </section>
          <section id="work">{/* Portfolio — Task 6 */}</section>
          <Stats />
          <Testimonials />
          <section id="pricing">{/* Pricing — Task 7 */}</section>
          <CtaFooter onOpenModal={openModal} />
        </div>
      </div>
    </div>
  )
}
