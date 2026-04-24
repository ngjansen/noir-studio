import { ArrowUpRight } from 'lucide-react'
import HlsVideo from './HlsVideo'
import BlurText from './BlurText'

const HLS_URL = 'https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8'

interface StartSectionProps {
  onOpenModal: () => void
}

export default function StartSection({ onOpenModal }: StartSectionProps) {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: '500px' }}>
      <HlsVideo src={HLS_URL} className="absolute inset-0 w-full h-full object-cover z-0" />
      <div
        className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
        style={{ height: '200px', background: 'linear-gradient(to bottom, black, transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{ height: '200px', background: 'linear-gradient(to top, black, transparent)' }}
      />
      <div className="relative z-20 flex flex-col items-center text-center justify-center px-6 py-32 gap-6" style={{ minHeight: '500px' }}>
        <div className="liquid-glass rounded-full px-3.5 py-1">
          <span className="text-white text-xs font-medium font-body">How It Works</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] max-w-2xl">
          <BlurText text="You dream it. We ship it." delay={100} />
        </h2>
        <p className="text-white/60 font-body font-light text-sm md:text-base max-w-md">
          Share your vision. Our AI handles the rest — wireframes, design, code, launch. All in days, not quarters.
        </p>
        <button
          onClick={onOpenModal}
          className="liquid-glass-strong rounded-full px-6 py-3 flex items-center gap-2 text-white font-body font-medium text-sm hover:bg-white/10 transition-colors"
        >
          Get Started <ArrowUpRight size={16} />
        </button>
      </div>
    </section>
  )
}
