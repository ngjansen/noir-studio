import { Zap, Palette, BarChart3, Shield } from 'lucide-react'
import BlurText from './BlurText'

const FEATURES = [
  {
    icon: Zap,
    title: 'Days, Not Months',
    body: "Concept to launch at a pace that redefines fast. Because waiting isn't a strategy.",
  },
  {
    icon: Palette,
    title: 'Obsessively Crafted',
    body: 'Every detail considered. Every element refined. Design so precise, it feels inevitable.',
  },
  {
    icon: BarChart3,
    title: 'Built to Convert',
    body: 'Layouts informed by data. Decisions backed by performance. Results you can measure.',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    body: 'Enterprise-grade protection comes standard. SSL, DDoS mitigation, compliance. All included.',
  },
]

export default function FeaturesGrid() {
  return (
    <section className="px-8 lg:px-24 section-padding flex flex-col gap-12">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-4">
        <div className="liquid-glass rounded-full px-3.5 py-1">
          <span className="text-white text-xs font-medium font-body">Why Us</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
          <BlurText text="The difference is everything." delay={80} />
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map(({ icon: Icon, title, body }) => (
          <div key={title} className="liquid-glass rounded-2xl p-6 flex flex-col gap-4 group hover:bg-white/[0.05] transition-colors duration-300 cursor-default">
            <div className="liquid-glass-strong rounded-full w-10 h-10 flex items-center justify-center">
              <Icon size={18} className="text-white" />
            </div>
            <h3 className="text-white font-body font-medium text-base">{title}</h3>
            <p className="text-white/60 font-body font-light text-sm leading-relaxed">{body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
