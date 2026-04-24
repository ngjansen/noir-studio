import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'motion/react'
import HlsVideo from './HlsVideo'

const HLS_URL = 'https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8'

const STATS = [
  { value: '200+', label: 'Sites launched' },
  { value: '98%', label: 'Client satisfaction' },
  { value: '3.2x', label: 'More conversions' },
  { value: '5 days', label: 'Avg. delivery' },
]

function StatNumber({ value }: { value: string }) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const match = value.match(/^([\d.]+)(.*)$/)
  const num = match ? parseFloat(match[1]) : 0
  const suffix = match ? match[2] : ''
  const isDecimal = value.includes('.')
  const count = useMotionValue(0)
  const display = useTransform(count, (v) =>
    isDecimal ? v.toFixed(1) : Math.round(v).toString()
  )

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight) { setInView(true); return }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView || !match) return
    const controls = animate(count, num, { duration: 1.8, ease: [0.16, 1, 0.3, 1] })
    return controls.stop
  }, [inView])

  return (
    <span ref={ref}>
      {match ? <><motion.span>{display}</motion.span>{suffix}</> : value}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: '420px' }}>
      <HlsVideo
        src={HLS_URL}
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'saturate(0)' }}
      />
      <div
        className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
        style={{ height: '200px', background: 'linear-gradient(to bottom, black, transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{ height: '200px', background: 'linear-gradient(to top, black, transparent)' }}
      />
      <div className="relative z-20 flex items-center justify-center px-8 lg:px-24 section-padding" style={{ minHeight: '420px' }}>
        <div className="liquid-glass rounded-3xl w-full max-w-5xl">
          <div
            className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            {STATS.map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-2 items-center text-center px-8 py-10">
                <span className="text-5xl md:text-6xl lg:text-7xl font-heading italic text-white leading-none">
                  <StatNumber value={value} />
                </span>
                <span className="text-white/50 font-body font-light text-xs tracking-[0.08em] uppercase mt-1">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
