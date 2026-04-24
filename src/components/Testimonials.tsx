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
    <section className="px-8 lg:px-24 py-24 flex flex-col gap-12">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-4">
        <div className="liquid-glass rounded-full px-3.5 py-1">
          <span className="text-white text-xs font-medium font-body">What They Say</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
          <BlurText text="Don't take our word for it." delay={80} />
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map(({ quote, name, role }) => (
          <div key={name} className="liquid-glass rounded-2xl p-8 flex flex-col gap-6">
            <p className="text-white/80 font-body font-light text-sm italic leading-relaxed flex-1">
              "{quote}"
            </p>
            <div className="flex flex-col gap-0.5">
              <span className="text-white font-body font-medium text-sm">{name}</span>
              <span className="text-white/50 font-body font-light text-xs">{role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
