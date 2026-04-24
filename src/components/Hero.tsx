import { ArrowUpRight, Play } from 'lucide-react'
import { motion } from 'motion/react'
import BlurText from './BlurText'

const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4'
const PARTNERS = ['Stripe', 'Vercel', 'Linear', 'Notion', 'Figma']

interface HeroProps {
  onOpenModal: () => void
}

export default function Hero({ onOpenModal }: HeroProps) {
  return (
    <section className="relative overflow-visible" style={{ minHeight: '100vh' }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero_bg.jpeg"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-70"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/5 z-0 pointer-events-none" />
      <div
        className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none"
        style={{ height: '300px', background: 'linear-gradient(to bottom, transparent, black)' }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6" style={{ paddingTop: 'clamp(130px, 18vh, 200px)' }}>
        <div className="liquid-glass rounded-full px-1 py-1 flex items-center gap-2 mb-8">
          <span className="bg-white text-black rounded-full px-3 py-1 text-xs font-semibold font-body">Now</span>
          <span className="text-white/80 text-sm font-body pr-3">Accepting Q3 clients.</span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white leading-[0.88] max-w-xl tracking-[-2px] mb-6">
          <BlurText text="The Website Your Brand Deserves" delay={100} />
        </h1>

        <motion.p
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-sm md:text-base text-white/80 font-body font-light leading-relaxed max-w-sm mb-8"
        >
          Noir Studio builds for founders who refuse to blend in. AI precision, human taste, results you can measure.
        </motion.p>

        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center gap-4 mb-24"
        >
          <button
            onClick={onOpenModal}
            className="liquid-glass-strong rounded-full px-5 py-2.5 flex items-center gap-2 text-white font-body font-medium text-sm hover:bg-white/10 transition-colors"
          >
            Get Started <ArrowUpRight size={16} />
          </button>
          <button className="flex items-center gap-2 text-white/70 font-body font-light text-sm hover:text-white transition-colors">
            <Play size={14} fill="currentColor" /> Watch the Film
          </button>
        </motion.div>

        <div className="flex flex-col items-center gap-5 pb-16">
          <span className="text-white/30 text-xs font-body font-medium tracking-[0.14em] uppercase">Trusted by the teams behind</span>
          <div className="flex items-center gap-8 md:gap-10 flex-wrap justify-center">
            {PARTNERS.map((p) => (
              <span key={p} className="text-xs font-body font-medium tracking-[0.14em] uppercase text-white/30 hover:text-white/55 transition-colors duration-300">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
