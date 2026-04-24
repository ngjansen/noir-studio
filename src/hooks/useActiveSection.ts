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
