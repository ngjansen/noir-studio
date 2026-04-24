import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'

interface BlurTextProps {
  text: string
  className?: string
  delay?: number
  direction?: 'bottom' | 'top'
}

export default function BlurText({ text, className = '', delay = 0, direction = 'bottom' }: BlurTextProps) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight) { setInView(true); return }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ display: 'inline' }}
      initial={{ filter: 'blur(12px)', opacity: 0, y: direction === 'bottom' ? 16 : -16 }}
      animate={inView ? { filter: 'blur(0px)', opacity: 1, y: 0 } : {}}
      transition={{ delay: delay / 1000, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {text}
    </motion.span>
  )
}
