import { Check, ArrowUpRight } from 'lucide-react'
import BlurText from './BlurText'

const TIERS = [
  {
    name: 'Launch',
    price: '$5,900',
    description: 'For founders who need a sharp, fast website without the agency price tag.',
    features: [
      'Up to 5 pages',
      'AI-generated wireframes',
      'Custom design system',
      'Responsive development',
      '2 rounds of revisions',
      '30-day post-launch support',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Studio',
    price: '$14,900',
    description: 'For brands ready to compete at the highest level. Everything, done right.',
    features: [
      'Up to 12 pages',
      'Full brand identity system',
      'Motion & interaction design',
      'CMS integration',
      'Unlimited revisions',
      '90-day post-launch support',
      'SEO & analytics setup',
      'Performance optimization',
    ],
    cta: 'Book a Call',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Large-scale builds, ongoing retainers, and white-label partnerships.',
    features: [
      'Unlimited pages',
      'Dedicated design team',
      'Custom AI tooling',
      'Priority turnaround',
      'SLA guarantee',
      'Quarterly CRO reviews',
    ],
    cta: 'Contact Us',
    highlight: false,
  },
]

interface PricingProps {
  onOpenModal: () => void
}

export default function Pricing({ onOpenModal }: PricingProps) {
  return (
    <section className="px-6 lg:px-24 section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="liquid-glass rounded-full px-3.5 py-1 inline-flex mb-4">
            <span className="text-white text-xs font-medium font-body">Pricing</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white leading-[0.9]">
            <BlurText text="Transparent. Simple." delay={80} />
          </h2>
          <p className="text-white/40 font-body font-light text-sm mt-4 max-w-sm mx-auto">
            One price. One team. No surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-7 flex flex-col relative overflow-hidden ${
                tier.highlight ? 'liquid-glass-strong' : 'liquid-glass'
              }`}
              style={tier.highlight ? { border: '1px solid rgba(255,255,255,0.25)' } : {}}
            >
              {tier.highlight && (
                <div className="absolute top-0 left-0 right-0 h-[1.5px]"
                  style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.65) 40%, rgba(255,255,255,0.65) 60%, transparent 95%)' }} />
              )}
              {tier.highlight && (
                <span className="absolute top-4 right-4 text-xs font-body font-medium bg-white text-black rounded-full px-3 py-1">
                  Most Popular
                </span>
              )}

              <div className="mb-6">
                <p className="text-xs text-white/30 font-body uppercase tracking-widest mb-1">{tier.name}</p>
                <p className="text-5xl font-heading italic text-white mb-3 leading-none">{tier.price}</p>
                <p className="text-sm text-white/50 font-body font-light leading-relaxed">{tier.description}</p>
              </div>

              <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check size={14} className="text-white/60 mt-0.5 shrink-0" />
                    <span className="text-sm text-white/70 font-body font-light">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onOpenModal}
                className={`w-full rounded-full py-3 flex items-center justify-center gap-2 text-sm font-body font-semibold transition-colors ${
                  tier.highlight
                    ? 'bg-white text-black hover:bg-white/90'
                    : 'liquid-glass text-white hover:bg-white/10'
                }`}
              >
                {tier.cta} <ArrowUpRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
