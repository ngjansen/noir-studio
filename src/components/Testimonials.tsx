import BlurText from './BlurText'

const TESTIMONIALS = [
  {
    quote: "A complete rebuild in five days. The result outperformed everything we'd spent months building before.",
    name: 'Sarah Chen',
    role: 'CEO, Luminary',
  },
  {
    quote: "Conversions up 4x. That's not a typo. The design just works differently when it's built on real data.",
    name: 'Marcus Webb',
    role: 'Head of Growth, Arcline',
  },
  {
    quote: "They didn't just design our site. They defined our brand. World-class doesn't begin to cover it.",
    name: 'Elena Voss',
    role: 'Brand Director, Helix',
  },
]

export default function Testimonials() {
  return (
    <section className="px-8 lg:px-24 section-padding flex flex-col gap-12">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="liquid-glass rounded-full px-3.5 py-1">
          <span className="text-white text-xs font-medium font-body">What They Say</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
          <BlurText text="Don't take our word for it." delay={80} />
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map(({ quote, name, role }) => (
          <div key={name} className="liquid-glass rounded-2xl p-8 flex flex-col gap-5 relative overflow-hidden group card-shimmer">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 20% 0%, rgba(255,255,255,0.04) 0%, transparent 60%)' }}
            />

            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="11" height="11" viewBox="0 0 12 12" fill="rgba(255,255,255,0.55)">
                  <path d="M6 .5 7.545 4.09 11.5 4.5 8.75 7.09l.795 3.91L6 9l-3.545 2 .795-3.91L-.5 4.5l3.955-.41z"/>
                </svg>
              ))}
            </div>

            <p className="text-white/70 font-body font-light text-sm leading-[1.75] flex-1">
              "{quote}"
            </p>

            <div
              className="flex items-center gap-3 pt-4"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div className="w-8 h-8 rounded-full liquid-glass-strong flex items-center justify-center shrink-0">
                <span className="text-white/60 font-body font-medium text-xs">
                  {name.split(' ').map((n: string) => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="text-white font-body font-medium text-sm leading-tight">{name}</p>
                <p className="text-white/40 font-body font-light text-xs">{role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
