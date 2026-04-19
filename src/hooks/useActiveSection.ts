'use client'

import { useState, useEffect } from 'react'

export function useActiveSection(ids: string[]): string {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id)
          }
        },
        { rootMargin: '-40% 0px -50% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [ids])

  return activeId
}
