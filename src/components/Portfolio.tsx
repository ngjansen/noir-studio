import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import BlurText from './BlurText'

const CASES = [
  {
    name: 'Finlytic',
    category: 'SaaS Dashboard',
    result: '+340% trial signups in 60 days',
    accent: '#7C3AED',
    bg: 'linear-gradient(135deg, #1a0533 0%, #0d0020 100%)',
    tag: 'Redesign',
  },
  {
    name: 'Wealthr',
    category: 'Wealth Management',
    result: '4.9★ App Store rating at launch',
    accent: '#059669',
    bg: 'linear-gradient(135deg, #001f12 0%, #000e09 100%)',
    tag: 'New website',
  },
  {
    name: 'Apex Ventures',
    category: 'VC Fund',
    result: '2× inbound deal flow from LPs',
    accent: '#D97706',
    bg: 'linear-gradient(135deg, #1f0e00 0%, #0e0600 100%)',
    tag: 'Brand identity',
  },
]

export default function Portfolio() {
  return (
    <section className="px-6 lg:px-24 py-32">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="liquid-glass rounded-full px-3.5 py-1 inline-flex mb-4">
              <span className="text-white text-xs font-medium font-body">Selected Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white leading-[0.9]">
              <BlurText text="Results speak." delay={80} />
            </h2>
          </div>
          <p className="text-white/40 font-body font-light text-sm max-w-xs">
            Every project ships with a measurable outcome. Here's what our clients saw.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CASES.map((c) => (
            <motion.div
              key={c.name}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ background: c.bg, border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(ellipse at top left, ${c.accent}22, transparent 60%)` }} />

              <div className="p-7 flex flex-col" style={{ minHeight: '320px' }}>
                <div className="flex items-start justify-between mb-auto">
                  <span className="rounded-full px-3 py-1 text-xs font-body font-medium"
                    style={{ background: `${c.accent}22`, color: c.accent }}>
                    {c.tag}
                  </span>
                  <ArrowUpRight size={16} className="text-white/20 group-hover:text-white/60 transition-colors" />
                </div>

                <div className="mt-16">
                  <div className="w-10 h-10 rounded-xl mb-5 flex items-center justify-center"
                    style={{ background: `${c.accent}22` }}>
                    <div className="w-3 h-3 rounded-full" style={{ background: c.accent }} />
                  </div>
                  <p className="text-xs text-white/30 font-body uppercase tracking-widest mb-1">{c.category}</p>
                  <h3 className="text-2xl font-heading italic text-white mb-3">{c.name}</h3>
                  <p className="text-sm font-body font-light" style={{ color: c.accent }}>{c.result}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
