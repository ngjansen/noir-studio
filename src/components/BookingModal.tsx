import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ArrowRight, Check } from 'lucide-react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

const PROJECT_TYPES = ['New website', 'Redesign', 'Landing page', 'Brand identity', 'Ongoing CRO']
const BUDGETS = ['Under $5k', '$5k–$15k', '$15k–$50k', '$50k+']
const TIMELINES = ['ASAP', '1–3 months', '3–6 months', '6+ months']

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || 'demo'
const CAL_URL = 'https://cal.com/noir-studio/strategy'

const slide = {
  enter: { x: 40, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -40, opacity: 0 },
}

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

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setStep(1); setProjectTypes([]); setBudget(''); setTimeline('')
        setName(''); setEmail(''); setCompany(''); setSubmitting(false); setSuccess(false)
      }, 300)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  function toggleType(type: string) {
    setProjectTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type])
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
            <button onClick={onClose} className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors">
              <X size={18} />
            </button>

            {!success && (
              <div className="flex gap-1.5 mb-8">
                {[1, 2, 3].map(s => (
                  <div key={s} className="h-0.5 flex-1 rounded-full transition-colors duration-300"
                    style={{ background: s <= step ? 'white' : 'rgba(255,255,255,0.15)' }} />
                ))}
              </div>
            )}

            <AnimatePresence mode="wait">

              {success && (
                <motion.div key="success" variants={slide} initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.3 }} className="flex flex-col items-center text-center gap-6 py-8">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Check size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-heading italic text-white mb-2">You're in.</p>
                    <p className="text-white/50 font-body font-light text-sm">
                      We'll be in touch within 24 hours. Check your inbox — and your Cal.com tab to book a time.
                    </p>
                  </div>
                  <button onClick={onClose} className="liquid-glass-strong rounded-full px-6 py-2.5 text-white font-body text-sm">
                    Close
                  </button>
                </motion.div>
              )}

              {!success && step === 1 && (
                <motion.div key="step1" variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                  <p className="text-xs text-white/30 font-body uppercase tracking-widest mb-2">Step 1 of 3</p>
                  <h2 className="text-2xl font-heading italic text-white mb-1">What are you building?</h2>
                  <p className="text-white/40 font-body font-light text-sm mb-7">Select all that apply.</p>
                  <div className="flex flex-wrap gap-2.5 mb-10">
                    {PROJECT_TYPES.map(type => (
                      <button key={type} onClick={() => toggleType(type)}
                        className={`rounded-full px-4 py-2 text-sm font-body font-medium transition-all duration-150 ${
                          projectTypes.includes(type) ? 'bg-white text-black' : 'liquid-glass text-white/70 hover:text-white'
                        }`}>
                        {type}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setStep(2)} disabled={projectTypes.length === 0}
                    className="flex items-center gap-2 bg-white text-black rounded-full px-5 py-2.5 text-sm font-body font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/90 transition-colors">
                    Continue <ArrowRight size={14} />
                  </button>
                </motion.div>
              )}

              {!success && step === 2 && (
                <motion.div key="step2" variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                  <p className="text-xs text-white/30 font-body uppercase tracking-widest mb-2">Step 2 of 3</p>
                  <h2 className="text-2xl font-heading italic text-white mb-1">Scope it out.</h2>
                  <p className="text-white/40 font-body font-light text-sm mb-7">Helps us come prepared.</p>

                  <p className="text-xs text-white/40 font-body uppercase tracking-widest mb-3">Budget</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {BUDGETS.map(b => (
                      <button key={b} onClick={() => setBudget(b)}
                        className={`rounded-full px-4 py-2 text-sm font-body font-medium transition-all duration-150 ${
                          budget === b ? 'bg-white text-black' : 'liquid-glass text-white/70 hover:text-white'
                        }`}>
                        {b}
                      </button>
                    ))}
                  </div>

                  <p className="text-xs text-white/40 font-body uppercase tracking-widest mb-3">Timeline</p>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {TIMELINES.map(t => (
                      <button key={t} onClick={() => setTimeline(t)}
                        className={`rounded-full px-4 py-2 text-sm font-body font-medium transition-all duration-150 ${
                          timeline === t ? 'bg-white text-black' : 'liquid-glass text-white/70 hover:text-white'
                        }`}>
                        {t}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="text-white/40 font-body text-sm hover:text-white transition-colors">← Back</button>
                    <button onClick={() => setStep(3)} disabled={!budget || !timeline}
                      className="flex items-center gap-2 bg-white text-black rounded-full px-5 py-2.5 text-sm font-body font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/90 transition-colors">
                      Continue <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {!success && step === 3 && (
                <motion.div key="step3" variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                  <p className="text-xs text-white/30 font-body uppercase tracking-widest mb-2">Step 3 of 3</p>
                  <h2 className="text-2xl font-heading italic text-white mb-1">Where do we reach you?</h2>
                  <p className="text-white/40 font-body font-light text-sm mb-7">No spam. Ever.</p>

                  <div className="flex flex-col gap-3 mb-10">
                    {[
                      { placeholder: 'Full name', value: name, onChange: setName, type: 'text' },
                      { placeholder: 'Work email', value: email, onChange: setEmail, type: 'email' },
                      { placeholder: 'Company (optional)', value: company, onChange: setCompany, type: 'text' },
                    ].map(({ placeholder, value, onChange, type }) => (
                      <input key={placeholder} type={type} placeholder={placeholder} value={value}
                        onChange={e => onChange(e.target.value)}
                        className="w-full rounded-xl px-4 py-3 text-sm font-body text-white placeholder-white/25 outline-none focus:ring-1 focus:ring-white/20"
                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    ))}
                  </div>

                  <div className="flex gap-3 items-center">
                    <button onClick={() => setStep(2)} className="text-white/40 font-body text-sm hover:text-white transition-colors">← Back</button>
                    <button onClick={handleSubmit} disabled={!name || !email || submitting}
                      className="flex items-center gap-2 bg-white text-black rounded-full px-5 py-2.5 text-sm font-body font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/90 transition-colors">
                      {submitting ? 'Sending…' : 'Send + Book a Call →'}
                    </button>
                  </div>
                  <p className="text-white/20 font-body text-xs mt-4">Submits to our inbox · Opens Cal.com to schedule your call</p>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
