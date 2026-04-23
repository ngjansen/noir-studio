import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StartSection from './components/StartSection'
import FeaturesChess from './components/FeaturesChess'
import FeaturesGrid from './components/FeaturesGrid'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'
import CtaFooter from './components/CtaFooter'

export default function App() {
  return (
    <div className="bg-black">
      <div className="relative z-10">
        <Navbar />
        <section id="hero">
          <Hero />
        </section>
        <div className="bg-black">
          <section id="process">
            <StartSection />
          </section>
          <section id="services">
            <FeaturesChess />
            <FeaturesGrid />
          </section>
          <section id="work">{/* Portfolio — added in Task 6 */}</section>
          <Stats />
          <Testimonials />
          <section id="pricing">{/* Pricing — added in Task 7 */}</section>
          <CtaFooter />
        </div>
      </div>
    </div>
  )
}
