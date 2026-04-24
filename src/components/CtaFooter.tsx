import { ArrowUpRight } from 'lucide-react'
import HlsVideo from './HlsVideo'
import BlurText from './BlurText'

const HLS_URL = 'https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8'

interface CtaFooterProps {
  onOpenModal: () => void
}

export default function CtaFooter({ onOpenModal }: CtaFooterProps) {
  return (
    <section className="relative overflow-hidden">
      <HlsVideo src={HLS_URL} className="absolute inset-0 w-full h-full object-cover z-0" />
      <div
        className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
        style={{ height: '200px', background: 'linear-gradient(to bottom, black, transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{ height: '200px', background: 'linear-gradient(to top, black, transparent)' }}
      />
      <div className="relative z-20 flex flex-col items-center text-center px-8 lg:px-24 section-padding gap-6">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white leading-[0.85] max-w-3xl">
          <BlurText text="Your next website starts here." delay={80} />
        </h2>
        <p className="text-white/60 font-body font-light text-sm md:text-base max-w-md">
          Book a free strategy call. See what AI-powered design can do. No commitment, no pressure. Just possibilities.
        </p>
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={onOpenModal}
            className="liquid-glass-strong rounded-full px-6 py-3 flex items-center gap-2 text-white font-body font-medium text-sm hover:bg-white/10 transition-colors"
          >
            Book a Call <ArrowUpRight size={16} />
          </button>
          <a
            href="#pricing"
            className="bg-white text-black rounded-full px-6 py-3 font-body font-medium text-sm hover:bg-white/90 transition-colors inline-block"
          >
            View Pricing
          </a>
        </div>
        <div className="w-full mt-32 pt-8 border-t border-white/10 flex items-center justify-between">
          <span className="text-white/40 text-xs font-body">© 2026 Noir Studio. All rights reserved.</span>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Contact'].map((link) => (
              <a key={link} href="#" className="text-white/40 text-xs font-body hover:text-white/70 transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
