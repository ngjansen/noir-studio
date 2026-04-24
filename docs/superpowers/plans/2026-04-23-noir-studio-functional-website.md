# Noir Studio Functional Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the visual-only Noir Studio landing page into a fully functional agency website with smooth-scroll navigation, a 3-step qualifier modal with Formspree lead capture, a portfolio section, and a pricing section.

**Architecture:** Modal state lives in `App.tsx` as `isModalOpen` + `setIsModalOpen`, passed down as props. A `useActiveSection` hook drives navbar active-link highlighting via IntersectionObserver. No routing — single-page scroll with anchor IDs.

**Tech Stack:** React 19, Vite 8, Tailwind v4, motion/react, hls.js, Formspree (fetch POST), Cal.com (window.open link)

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/index.css` | Modify | Add `scroll-behavior: smooth` to `html` |
| `src/hooks/useActiveSection.ts` | Create | IntersectionObserver → returns active section id string |
| `src/components/Navbar.tsx` | Modify | Anchor `href` links, active-link highlight via prop |
| `src/components/BookingModal.tsx` | Create | 3-step qualifier modal, Formspree POST, Cal.com open |
| `src/App.tsx` | Modify | `isModalOpen` state, section IDs on wrappers, new sections |
| `src/components/Hero.tsx` | Modify | Updated copy, CTAs call `onOpenModal` prop |
| `src/components/StartSection.tsx` | Modify | CTA calls `onOpenModal` prop |
| `src/components/CtaFooter.tsx` | Modify | CTAs call `onOpenModal` prop |
| `src/components/Portfolio.tsx` | Create | `#work` section — 3 case study cards |
| `src/components/Pricing.tsx` | Create | `#pricing` section — 3 tier cards |

---

### Task 1: Smooth scroll + section IDs

**Files:**
- Modify: `src/index.css`
- Modify: `src/App.tsx`

- [ ] **Step 1: Add smooth scroll to CSS**

In `src/index.css`, add inside the existing `html, body` rule:

```css
html, body {
  background: #000;
  color: #fff;
  font-family: 'Barlow', sans-serif;
  -webkit-font-smoothing: antialiased;
  scroll-behavior: smooth;
}
```

- [ ] **Step 2: Add section IDs in App.tsx (minimal — no new imports yet)**

Replace the content of `src/App.tsx` with:

```tsx
import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StartSection from './components/StartSection'
import FeaturesChess from './components/FeaturesChess'
import FeaturesGrid from './components/FeaturesGrid'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'
import CtaFooter from './components/CtaFooter'

export default function App() {
  return (
    <div className="bg-black">
      <div className="relative z-10">
        <Navbar />
        <section id="hero">
          <Hero />
        </section>
        <div className="bg-black">
          <section id="process">
            <StartSection />
          </section>
          <section id="services">
            <FeaturesChess />
            <FeaturesGrid />
          </section>
          <section id="work">{/* Portfolio — added in Task 6 */}</section>
          <Stats />
          <Testimonials />
          <section id="pricing">{/* Pricing — added in Task 7 */}</section>
          <CtaFooter />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify dev server still compiles**

```bash
# Expected: dev server at http://localhost:5173 with no errors in terminal
# (Navbar/Hero/etc. prop warnings come later — existing signatures still match here)
```

- [ ] **Step 4: Commit**

```bash
git init  # if not already a git repo
git add src/index.css src/App.tsx
git commit -m "feat: add smooth scroll + section IDs"
```

---

### Task 2: useActiveSection hook

**Files:**
- Create: `src/hooks/useActiveSection.ts`

- [ ] **Step 1: Create the hook**

Create `src/hooks/useActiveSection.ts`:

```ts
import { useEffect, useState } from 'react'

const SECTION_IDS = ['hero', 'process', 'services', 'work', 'pricing']

export function useActiveSection(): string {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id)
        },
        { threshold: 0.3 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return activeSection
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useActiveSection.ts
git commit -m "feat: add useActiveSection IntersectionObserver hook"
```

---

### Task 3: Update Navbar with anchor links + active state

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/App.tsx` (wire the hook)

- [ ] **Step 1: Rewrite Navbar to accept activeSection + onOpenModal props**

Replace `src/components/Navbar.tsx` with:

```tsx
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
  const activeId = NAV_LINKS.find(l => l.href === `#${activeSection}`)?.href

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

        {/* Center nav — absolutely centered */}
        <div className="hidden md:flex items-center liquid-glass rounded-full px-1.5 py-1 gap-1 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={`px-3 py-2 text-sm font-medium font-body rounded-full transition-colors ${
                activeId === href
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

        {/* Desktop right spacer */}
        <div className="hidden md:flex" style={{ width: '48px' }} />
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Wire useActiveSection into App.tsx**

Update `src/App.tsx` — add hook import and pass to Navbar:

```tsx
import { useState } from 'react'
import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StartSection from './components/StartSection'
import FeaturesChess from './components/FeaturesChess'
import FeaturesGrid from './components/FeaturesGrid'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'
import CtaFooter from './components/CtaFooter'
import { useActiveSection } from './hooks/useActiveSection'

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const activeSection = useActiveSection()

  return (
    <div className="bg-black">
      <div className="relative z-10">
        <Navbar activeSection={activeSection} onOpenModal={() => setIsModalOpen(true)} />
        <section id="hero">
          <Hero onOpenModal={() => setIsModalOpen(true)} />
        </section>
        <div className="bg-black">
          <section id="process">
            <StartSection onOpenModal={() => setIsModalOpen(true)} />
          </section>
          <section id="services">
            <FeaturesChess />
            <FeaturesGrid />
          </section>
          <Stats />
          <Testimonials />
          <CtaFooter onOpenModal={() => setIsModalOpen(true)} />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify nav links scroll correctly in browser**

Open `http://localhost:5173`. Click "Process" → should smooth-scroll to "How It Works" section. Click "Services" → scrolls to Features area.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.tsx src/App.tsx
git commit -m "feat: navbar anchor links + active section highlight"
```

---

### Task 4: BookingModal — scaffold + Step 1

**Files:**
- Create: `src/components/BookingModal.tsx`

- [ ] **Step 1: Create BookingModal with Step 1 (project type)**

Create `src/components/BookingModal.tsx`:

```tsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ArrowRight, Check } from 'lucide-react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

const PROJECT_TYPES = [
  'New website',
  'Redesign',
  'Landing page',
  'Brand identity',
  'Ongoing CRO',
]

const BUDGETS = ['Under $5k', '$5k–$15k', '$15k–$50k', '$50k+']
const TIMELINES = ['ASAP', '1–3 months', '3–6 months', '6+ months']

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || 'demo'
const CAL_URL = 'https://cal.com/noir-studio/strategy'

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [projectTypes, setProjectTypes] = useState<string[]>([])
  const [budget, setBudget] = useState('')
  const [timeline, setTimeline] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1)
        setProjectTypes([])
        setBudget('')
        setTimeline('')
        setName('')
        setEmail('')
        setCompany('')
        setSubmitting(false)
        setSuccess(false)
      }, 300)
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  function toggleProjectType(type: string) {
    setProjectTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  async function handleSubmit() {
    setSubmitting(true)
    try {
      if (FORMSPREE_ID !== 'demo') {
        await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectType: projectTypes.join(', '), budget, timeline, name, email, company }),
        })
      } else {
        await new Promise(r => setTimeout(r, 800))
      }
      setSuccess(true)
      window.open(CAL_URL, '_blank')
    } catch {
      setSubmitting(false)
    }
  }

  const slideVariants = {
    enter: { x: 40, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -40, opacity: 0 },
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="liquid-glass rounded-3xl p-10 w-full max-w-lg relative overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            {/* Step indicator */}
            {!success && (
              <div className="flex gap-1.5 mb-8">
                {[1, 2, 3].map(s => (
                  <div
                    key={s}
                    className="h-0.5 flex-1 rounded-full transition-colors duration-300"
                    style={{ background: s <= step ? 'white' : 'rgba(255,255,255,0.15)' }}
                  />
                ))}
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* SUCCESS */}
              {success && (
                <motion.div
                  key="success"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center text-center gap-6 py-8"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Check size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-heading italic text-white mb-2">You're in.</p>
                    <p className="text-white/50 font-body font-light text-sm">
                      We'll be in touch within 24 hours. Check your inbox — and your Cal.com tab to book a time.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="liquid-glass-strong rounded-full px-6 py-2.5 text-white font-body text-sm"
                  >
                    Close
                  </button>
                </motion.div>
              )}

              {/* STEP 1 */}
              {!success && step === 1 && (
                <motion.div
                  key="step1"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-xs text-white/30 font-body uppercase tracking-widest mb-2">Step 1 of 3</p>
                  <h2 className="text-2xl font-heading italic text-white mb-1">What are you building?</h2>
                  <p className="text-white/40 font-body font-light text-sm mb-7">Select all that apply.</p>
                  <div className="flex flex-wrap gap-2.5 mb-10">
                    {PROJECT_TYPES.map(type => {
                      const selected = projectTypes.includes(type)
                      return (
                        <button
                          key={type}
                          onClick={() => toggleProjectType(type)}
                          className={`rounded-full px-4 py-2 text-sm font-body font-medium transition-all duration-150 ${
                            selected
                              ? 'bg-white text-black'
                              : 'liquid-glass text-white/70 hover:text-white'
                          }`}
                        >
                          {type}
                        </button>
                      )
                    })}
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    disabled={projectTypes.length === 0}
                    className="flex items-center gap-2 bg-white text-black rounded-full px-5 py-2.5 text-sm font-body font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/90 transition-colors"
                  >
                    Continue <ArrowRight size={14} />
                  </button>
                </motion.div>
              )}

              {/* STEP 2 */}
              {!success && step === 2 && (
                <motion.div
                  key="step2"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-xs text-white/30 font-body uppercase tracking-widest mb-2">Step 2 of 3</p>
                  <h2 className="text-2xl font-heading italic text-white mb-1">Scope it out.</h2>
                  <p className="text-white/40 font-body font-light text-sm mb-7">Helps us come prepared.</p>

                  <p className="text-xs text-white/40 font-body uppercase tracking-widest mb-3">Budget</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {BUDGETS.map(b => (
                      <button
                        key={b}
                        onClick={() => setBudget(b)}
                        className={`rounded-full px-4 py-2 text-sm font-body font-medium transition-all duration-150 ${
                          budget === b ? 'bg-white text-black' : 'liquid-glass text-white/70 hover:text-white'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>

                  <p className="text-xs text-white/40 font-body uppercase tracking-widest mb-3">Timeline</p>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {TIMELINES.map(t => (
                      <button
                        key={t}
                        onClick={() => setTimeline(t)}
                        className={`rounded-full px-4 py-2 text-sm font-body font-medium transition-all duration-150 ${
                          timeline === t ? 'bg-white text-black' : 'liquid-glass text-white/70 hover:text-white'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="text-white/40 font-body text-sm hover:text-white transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!budget || !timeline}
                      className="flex items-center gap-2 bg-white text-black rounded-full px-5 py-2.5 text-sm font-body font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/90 transition-colors"
                    >
                      Continue <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3 */}
              {!success && step === 3 && (
                <motion.div
                  key="step3"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25 }}
                >
                  <p className="text-xs text-white/30 font-body uppercase tracking-widest mb-2">Step 3 of 3</p>
                  <h2 className="text-2xl font-heading italic text-white mb-1">Where do we reach you?</h2>
                  <p className="text-white/40 font-body font-light text-sm mb-7">No spam. Ever.</p>

                  <div className="flex flex-col gap-3 mb-10">
                    {[
                      { placeholder: 'Full name', value: name, onChange: setName, type: 'text' },
                      { placeholder: 'Work email', value: email, onChange: setEmail, type: 'email' },
                      { placeholder: 'Company (optional)', value: company, onChange: setCompany, type: 'text' },
                    ].map(({ placeholder, value, onChange, type }) => (
                      <input
                        key={placeholder}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        className="w-full rounded-xl px-4 py-3 text-sm font-body text-white placeholder-white/25 outline-none focus:ring-1 focus:ring-white/20"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                      />
                    ))}
                  </div>

                  <div className="flex gap-3 items-center">
                    <button
                      onClick={() => setStep(2)}
                      className="text-white/40 font-body text-sm hover:text-white transition-colors"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!name || !email || submitting}
                      className="flex items-center gap-2 bg-white text-black rounded-full px-5 py-2.5 text-sm font-body font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/90 transition-colors"
                    >
                      {submitting ? 'Sending…' : 'Send + Book a Call →'}
                    </button>
                  </div>
                  <p className="text-white/20 font-body text-xs mt-4">
                    Submits to our inbox · Opens Cal.com to schedule your call
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/BookingModal.tsx
git commit -m "feat: BookingModal 3-step qualifier with Formspree + Cal.com"
```

---

### Task 5: Wire modal into App.tsx + all CTAs

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/StartSection.tsx`
- Modify: `src/components/CtaFooter.tsx`

- [ ] **Step 1: Add BookingModal to App.tsx**

Replace `src/App.tsx` with the final version:

```tsx
import { useState } from 'react'
import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StartSection from './components/StartSection'
import FeaturesChess from './components/FeaturesChess'
import FeaturesGrid from './components/FeaturesGrid'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'
import CtaFooter from './components/CtaFooter'
import BookingModal from './components/BookingModal'
import Portfolio from './components/Portfolio'
import Pricing from './components/Pricing'
import { useActiveSection } from './hooks/useActiveSection'

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const activeSection = useActiveSection()
  const openModal = () => setIsModalOpen(true)

  return (
    <div className="bg-black">
      <div className="relative z-10">
        <Navbar activeSection={activeSection} onOpenModal={openModal} />
        <section id="hero">
          <Hero onOpenModal={openModal} />
        </section>
        <div className="bg-black">
          <section id="process">
            <StartSection onOpenModal={openModal} />
          </section>
          <section id="services">
            <FeaturesChess />
            <FeaturesGrid />
          </section>
          <section id="work">
            <Portfolio />
          </section>
          <Stats />
          <Testimonials />
          <section id="pricing">
            <Pricing onOpenModal={openModal} />
          </section>
          <CtaFooter onOpenModal={openModal} />
        </div>
      </div>
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
```

- [ ] **Step 2: Update Hero.tsx to accept onOpenModal + update copy**

Replace `src/components/Hero.tsx` with:

```tsx
import { ArrowUpRight, Play } from 'lucide-react'
import { motion } from 'motion/react'
import BlurText from './BlurText'

const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4'
const PARTNERS = ['Stripe', 'Vercel', 'Linear', 'Notion', 'Figma']

interface HeroProps {
  onOpenModal: () => void
}

export default function Hero({ onOpenModal }: HeroProps) {
  return (
    <section className="relative overflow-visible" style={{ height: '1000px' }}>
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero_bg.jpeg"
        className="absolute left-0 w-full h-auto object-contain z-0 pointer-events-none"
        style={{ top: '20%' }}
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/5 z-0 pointer-events-none" />
      <div
        className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none"
        style={{ height: '300px', background: 'linear-gradient(to bottom, transparent, black)' }}
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6" style={{ paddingTop: '150px' }}>
        <div className="liquid-glass rounded-full px-1 py-1 flex items-center gap-2 mb-8">
          <span className="bg-white text-black rounded-full px-3 py-1 text-xs font-semibold font-body">Now</span>
          <span className="text-white/80 text-sm font-body pr-3">Accepting Q3 clients.</span>
        </div>

        <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.85] max-w-2xl tracking-[-4px] mb-6">
          <BlurText text="The Website Your Brand Deserves" delay={100} />
        </h1>

        <motion.p
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-sm md:text-base text-white font-body font-light leading-tight max-w-md mb-8"
        >
          Noir Studio builds for founders who refuse to blend in. AI precision, human taste, results you can measure.
        </motion.p>

        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center gap-4 mb-20"
        >
          <button
            onClick={onOpenModal}
            className="liquid-glass-strong rounded-full px-5 py-2.5 flex items-center gap-2 text-white font-body font-medium text-sm hover:bg-white/10 transition-colors"
          >
            Get Started <ArrowUpRight size={16} />
          </button>
          <button className="flex items-center gap-2 text-white font-body font-light text-sm hover:text-white/70 transition-colors">
            <Play size={16} fill="white" /> Watch the Film
          </button>
        </motion.div>

        <div className="flex flex-col items-center gap-4">
          <div className="liquid-glass rounded-full px-4 py-2">
            <span className="text-white/60 text-xs font-body">Trusted by the teams behind</span>
          </div>
          <div className="flex items-center gap-12 md:gap-16 flex-wrap justify-center">
            {PARTNERS.map((p) => (
              <span key={p} className="text-2xl md:text-3xl font-heading italic text-white">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Update StartSection.tsx to accept onOpenModal**

Replace `src/components/StartSection.tsx` with:

```tsx
import { ArrowUpRight } from 'lucide-react'
import HlsVideo from './HlsVideo'
import BlurText from './BlurText'

const HLS_URL = 'https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8'

interface StartSectionProps {
  onOpenModal: () => void
}

export default function StartSection({ onOpenModal }: StartSectionProps) {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: '500px' }}>
      <HlsVideo src={HLS_URL} className="absolute inset-0 w-full h-full object-cover z-0" />
      <div
        className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
        style={{ height: '200px', background: 'linear-gradient(to bottom, black, transparent)' }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
        style={{ height: '200px', background: 'linear-gradient(to top, black, transparent)' }}
      />
      <div className="relative z-20 flex flex-col items-center text-center justify-center px-6 py-32 gap-6" style={{ minHeight: '500px' }}>
        <div className="liquid-glass rounded-full px-3.5 py-1">
          <span className="text-white text-xs font-medium font-body">How It Works</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] max-w-2xl">
          <BlurText text="You dream it. We ship it." delay={100} />
        </h2>
        <p className="text-white/60 font-body font-light text-sm md:text-base max-w-md">
          Share your vision. Our AI handles the rest — wireframes, design, code, launch. All in days, not quarters.
        </p>
        <button
          onClick={onOpenModal}
          className="liquid-glass-strong rounded-full px-6 py-3 flex items-center gap-2 text-white font-body font-medium text-sm hover:bg-white/10 transition-colors"
        >
          Get Started <ArrowUpRight size={16} />
        </button>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Update CtaFooter.tsx to accept onOpenModal**

Replace `src/components/CtaFooter.tsx` with:

```tsx
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
      <div className="relative z-20 flex flex-col items-center text-center px-8 lg:px-24 py-32 gap-6">
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
```

- [ ] **Step 5: Verify modal opens from all CTAs**

Open `http://localhost:5173`. Click:
- Hero "Get Started" → modal opens on step 1
- Process section "Get Started" → modal opens
- Footer "Book a Call" → modal opens
- Complete all 3 steps → success screen shows
- Press Escape → modal closes
- Click backdrop → modal closes

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx src/components/Hero.tsx src/components/StartSection.tsx src/components/CtaFooter.tsx
git commit -m "feat: wire BookingModal to all CTAs + update hero copy"
```

---

### Task 6: Portfolio section

**Files:**
- Create: `src/components/Portfolio.tsx`

- [ ] **Step 1: Create Portfolio component**

Create `src/components/Portfolio.tsx`:

```tsx
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import BlurText from './BlurText'

const CASE_STUDIES = [
  {
    client: 'Finlytic',
    tag: 'Fintech SaaS',
    metric: '+180% trial conversions',
    description: 'Full platform redesign for the fastest-growing fintech analytics tool in Europe. Launched in 5 days.',
    gradient: 'linear-gradient(135deg, #0a0a1a 0%, #1a1035 50%, #0d1a2e 100%)',
    accent: '#6366f1',
  },
  {
    client: 'Wealthr',
    tag: 'Wealth Management',
    metric: '4× user retention',
    description: 'A new design system and web experience that turned a complex product into an elegant, trusted brand.',
    gradient: 'linear-gradient(135deg, #0a1a0f 0%, #0d2818 50%, #091510 100%)',
    accent: '#22c55e',
  },
  {
    client: 'Apex Ventures',
    tag: 'VC Firm',
    metric: 'Brand score 91 → 99',
    description: 'Repositioned a legacy VC firm as a world-class institution. Every pixel signals trust and ambition.',
    gradient: 'linear-gradient(135deg, #1a0a00 0%, #2a1200 50%, #1a0d00 100%)',
    accent: '#f97316',
  },
]

export default function Portfolio() {
  return (
    <section className="px-8 lg:px-24 py-24 flex flex-col gap-12">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="liquid-glass rounded-full px-3.5 py-1">
          <span className="text-white text-xs font-medium font-body">Work</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
          <BlurText text="The work speaks for itself." delay={80} />
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CASE_STUDIES.map(({ client, tag, metric, description, gradient, accent }) => (
          <motion.div
            key={client}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="liquid-glass rounded-2xl overflow-hidden cursor-pointer group"
          >
            {/* Image area */}
            <div
              className="relative h-52 flex items-end p-5"
              style={{ background: gradient }}
            >
              {/* Client name watermark */}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-5 select-none"
                style={{ fontSize: '72px', fontFamily: 'Georgia, serif', fontStyle: 'italic', color: 'white', lineHeight: 1 }}
              >
                {client}
              </div>
              {/* Accent dot */}
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
              />
              {/* Tag */}
              <span
                className="absolute top-4 right-4 text-xs font-body px-3 py-1 rounded-full"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                {tag}
              </span>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <h3 className="text-white font-heading italic text-xl">{client}</h3>
                <ArrowUpRight
                  size={16}
                  className="text-white/20 group-hover:text-white/60 transition-colors mt-1"
                />
              </div>
              <p
                className="text-sm font-body font-semibold"
                style={{ color: accent }}
              >
                {metric}
              </p>
              <p className="text-white/50 font-body font-light text-sm leading-relaxed">
                {description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify portfolio section renders**

Open `http://localhost:5173`, scroll to "Work" section. Verify:
- 3 cards visible with distinct color gradients (purple/green/orange)
- Hovering a card lifts it with smooth animation
- Client names, metrics, and descriptions display correctly

- [ ] **Step 3: Commit**

```bash
git add src/components/Portfolio.tsx
git commit -m "feat: portfolio section with 3 case study cards"
```

---

### Task 7: Pricing section

**Files:**
- Create: `src/components/Pricing.tsx`

- [ ] **Step 1: Create Pricing component**

Create `src/components/Pricing.tsx`:

```tsx
import { Check } from 'lucide-react'
import BlurText from './BlurText'

interface PricingProps {
  onOpenModal: () => void
}

const TIERS = [
  {
    name: 'Launch',
    price: '$5,900',
    tagline: 'For founders ready to launch.',
    features: [
      '1 landing page',
      '2-week delivery',
      'Mobile-first responsive',
      '1 revision round',
      'Performance optimized',
      'Handoff-ready code',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Studio',
    price: '$14,900',
    tagline: 'For teams that mean business.',
    features: [
      'Up to 8 pages',
      '4-week delivery',
      'CRO audit included',
      '3 revision rounds',
      'AI optimization setup',
      'Priority support',
    ],
    cta: 'Get Started',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    tagline: 'For brands at scale.',
    features: [
      'Multi-property design',
      'Dedicated team',
      'Ongoing AI optimization',
      'Unlimited revisions',
      'SLA guarantee',
      'Quarterly strategy calls',
    ],
    cta: 'Contact Us',
    highlight: false,
  },
]

export default function Pricing({ onOpenModal }: PricingProps) {
  return (
    <section className="px-8 lg:px-24 py-24 flex flex-col gap-12">
      <div className="flex flex-col items-center text-center gap-4">
        <div className="liquid-glass rounded-full px-3.5 py-1">
          <span className="text-white text-xs font-medium font-body">Pricing</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
          <BlurText text="Transparent. No surprises." delay={80} />
        </h2>
        <p className="text-white/50 font-body font-light text-sm max-w-sm">
          One-time project fee. No retainers, no hidden costs, no equity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {TIERS.map(({ name, price, tagline, features, cta, highlight }) => (
          <div
            key={name}
            className={`flex flex-col rounded-2xl p-8 gap-8 ${
              highlight
                ? 'liquid-glass-strong'
                : 'liquid-glass'
            }`}
            style={highlight ? { border: '1px solid rgba(255,255,255,0.25)' } : {}}
          >
            {/* Header */}
            <div className="flex flex-col gap-2">
              {highlight && (
                <span className="text-xs font-body font-semibold text-white/60 uppercase tracking-widest mb-1">
                  Most Popular
                </span>
              )}
              <h3 className="text-white font-heading italic text-2xl">{name}</h3>
              <div className="text-white font-body font-semibold text-3xl">{price}</div>
              <p className="text-white/40 font-body font-light text-sm">{tagline}</p>
            </div>

            {/* Features */}
            <ul className="flex flex-col gap-3 flex-1">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-white/70 font-body font-light text-sm">
                  <Check size={14} className="text-white/40 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={onOpenModal}
              className={`w-full rounded-full py-3 text-sm font-body font-semibold transition-colors ${
                highlight
                  ? 'bg-white text-black hover:bg-white/90'
                  : 'liquid-glass-strong text-white hover:bg-white/10'
              }`}
            >
              {cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify pricing section renders**

Open `http://localhost:5173`, scroll to "Pricing" section. Verify:
- 3 cards side by side (stacked on mobile)
- Middle "Studio" card has brighter border and `liquid-glass-strong` effect
- "Most Popular" label visible on middle card
- All 3 CTA buttons open the booking modal when clicked

- [ ] **Step 3: Commit**

```bash
git add src/components/Pricing.tsx
git commit -m "feat: pricing section with 3 tiers"
```

---

### Task 8: Final screenshot pass

**Files:** None (verification only)

- [ ] **Step 1: Take full-page screenshot**

```bash
node screenshot.mjs http://localhost:5173 final-v2
```

- [ ] **Step 2: Inspect screenshot**

Read the screenshot with the Read tool. Verify all sections visible top to bottom:
1. Navbar (centered nav, logo left)
2. Hero (video bg, updated copy, partner names)
3. How It Works (HLS video bg)
4. Services (Features Chess + Grid)
5. Work (Portfolio — 3 cards with gradients)
6. Stats (desaturated video bg)
7. Testimonials (3 cards)
8. Pricing (3 tier cards, middle highlighted)
9. CTA Footer

- [ ] **Step 3: Take close viewport screenshots of new sections**

```bash
node screenshot.mjs http://localhost:5173 close-modal
```

Then open `http://localhost:5173` in browser, click "Book a Call", screenshot each modal step.

- [ ] **Step 4: Fix any visible mismatches**

Compare against spec. Fix spacing, color, or copy issues.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: Noir Studio functional website complete"
```
