import { ArrowUpRight } from 'lucide-react'

interface NavbarProps {
  activeSection: string
  onOpenModal: () => void
}

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
]

export default function Navbar({ activeSection, onOpenModal }: NavbarProps) {
  const activeHref = `#${activeSection}`

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-8 lg:px-16 py-3">
      <div className="flex items-center justify-between relative">
        {/* Logo */}
        <a href="#hero" className="flex items-center flex-shrink-0">
          <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center liquid-glass">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" fill="white" opacity="0.9"/>
              <circle cx="10" cy="10" r="4" fill="black" opacity="0.7"/>
            </svg>
          </div>
        </a>

        {/* Center nav — absolutely centered on desktop */}
        <div className="hidden md:flex items-center liquid-glass rounded-full px-1.5 py-1 gap-1 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={`px-3 py-2 text-sm font-medium font-body rounded-full transition-colors ${
                activeHref === href
                  ? 'text-white bg-white/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
            </a>
          ))}
          <button
            onClick={onOpenModal}
            className="flex items-center gap-1 bg-white text-black rounded-full px-3.5 py-1.5 text-sm font-medium font-body hover:bg-white/90 transition-colors"
          >
            Get Started <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Mobile CTA */}
        <div className="flex md:hidden">
          <button
            onClick={onOpenModal}
            className="flex items-center gap-1 bg-white text-black rounded-full px-4 py-2 text-sm font-medium font-body"
          >
            Get Started
          </button>
        </div>

        {/* Desktop right spacer to keep pill centered */}
        <div className="hidden md:flex" style={{ width: '48px' }} />
      </div>
    </nav>
  )
}
