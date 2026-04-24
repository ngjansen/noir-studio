import { ArrowUpRight } from 'lucide-react'
import BlurText from './BlurText'
import feature1 from '../assets/feature-1.gif'
import feature2 from '../assets/feature-2.gif'

interface ChessRowProps {
  reverse?: boolean
  title: string
  body: string
  btnLabel: string
  gif: string
}

function ChessRow({ reverse, title, body, btnLabel, gif }: ChessRowProps) {
  return (
    <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}>
      {/* Text side */}
      <div className="flex-1 flex flex-col gap-6">
        <h3 className="text-3xl md:text-4xl font-heading italic text-white leading-[0.95] tracking-tight">
          <BlurText text={title} delay={80} />
        </h3>
        <p className="text-white/60 font-body font-light text-sm md:text-base leading-relaxed">
          {body}
        </p>
        <button className="liquid-glass-strong rounded-full px-5 py-2.5 flex items-center gap-2 text-white font-body font-medium text-sm w-fit hover:bg-white/10 transition-colors">
          {btnLabel} <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Image side */}
      <div className="flex-1 liquid-glass rounded-2xl overflow-hidden">
        <img src={gif} alt={title} className="w-full h-auto object-cover" />
      </div>
    </div>
  )
}

export default function FeaturesChess() {
  return (
    <section className="px-8 lg:px-24 py-24 flex flex-col gap-20">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-4">
        <div className="liquid-glass rounded-full px-3.5 py-1">
          <span className="text-white text-xs font-medium font-body">Capabilities</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
          Pro features. Zero complexity.
        </h2>
      </div>

      {/* Row 1 */}
      <ChessRow
        title="Designed to convert. Built to perform."
        body="Every pixel is intentional. Our AI studies what works across thousands of top sites — then builds yours to outperform them all."
        btnLabel="Learn more"
        gif={feature1}
      />

      {/* Row 2 */}
      <ChessRow
        reverse
        title="It gets smarter. Automatically."
        body="Your site evolves on its own. AI monitors every click, scroll, and conversion — then optimizes in real time. No manual updates. Ever."
        btnLabel="See how it works"
        gif={feature2}
      />
    </section>
  )
}
