import HlsVideo from './HlsVideo'
import BlurText from './BlurText'

const HLS_URL = 'https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8'

const STATS = [
  { value: '200+', label: 'Sites launched' },
  { value: '98%', label: 'Client satisfaction' },
  { value: '3.2x', label: 'More conversions' },
  { value: '5 days', label: 'Average delivery' },
]

export default function Stats() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: '500px' }}>
      {/* HLS video background (desaturated) */}
      <HlsVideo
        src={HLS_URL}
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ filter: 'saturate(0)' }}
      />

      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
        style={{ height: '200px', background: 'linear-gradient(to bottom, black, transparent)' }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{ height: '200px', background: 'linear-gradient(to top, black, transparent)' }}
      />

      {/* Content */}
      <div className="relative z-20 flex items-center justify-center px-8 lg:px-24 py-32" style={{ minHeight: '500px' }}>
        <div className="liquid-glass rounded-3xl p-12 md:p-16 w-full max-w-5xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-2 items-center text-center">
                <span className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white">
                  <BlurText text={value} delay={60} />
                </span>
                <span className="text-white/60 font-body font-light text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
