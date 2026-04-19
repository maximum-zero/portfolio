'use client'

import { useState, useEffect, useRef } from 'react'
import { useActiveSection } from '@/hooks/useActiveSection'

const NAV_ITEMS = [
  { label: '역량', id: 'pillars' },
  { label: '기술', id: 'techstack' },
  { label: '경험', id: 'experience' },
  { label: '프로젝트', id: 'portfolio' },
  { label: '연락', id: 'contact' },
]

const SECTION_IDS = NAV_ITEMS.map((item) => item.id)

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  const activeId = useActiveSection(SECTION_IDS)

  // 스크롤 내릴 때 숨김, 올릴 때 표시
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > 120 && y > lastY.current)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none transition-[transform,opacity] duration-300"
      style={hidden ? { transform: 'translateY(-140%)', opacity: 0 } : undefined}
    >
      {/* Desktop pill */}
      <div
        className="hidden md:flex items-center gap-1 px-1.5 py-1.5 border border-line rounded-full pointer-events-auto"
        style={{
          background: 'color-mix(in oklab, var(--color-surface) 85%, transparent)',
          boxShadow: '0 6px 24px rgba(0,0,0,0.04)',
        }}
      >
        <a
          href="#"
          className="flex items-center gap-2 px-3.5 py-2 font-mono text-xs font-semibold tracking-[0.04em] text-ink border-r border-line mr-1 hover:text-accent transition-colors"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-accent flex-shrink-0" />
          maximum0
        </a>
        {NAV_ITEMS.map(({ label, id }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`px-3.5 py-2 text-sm rounded-full transition-colors ${
              activeId === id ? 'bg-ink text-surface' : 'text-ink-body hover:text-ink'
            }`}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Mobile */}
      <div className="md:hidden pointer-events-auto w-full mx-4">
        <div
          className="flex items-center justify-between px-4 py-3 border border-line rounded-2xl"
          style={{ background: 'color-mix(in oklab, var(--color-surface) 85%, transparent)' }}
        >
          <a
            href="#"
            className="flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.04em] text-ink"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-accent flex-shrink-0" />
            maximum0
          </a>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            className="text-ink-muted hover:text-ink transition-colors"
          >
            {menuOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path strokeLinecap="round" d="M5 5l10 10M15 5l-10 10" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path strokeLinecap="round" d="M3 6h14M3 10h14M3 14h14" />
              </svg>
            )}
          </button>
        </div>
        {menuOpen && (
          <div className="mt-1 bg-surface border border-line rounded-2xl overflow-hidden">
            {NAV_ITEMS.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 text-sm border-b border-line last:border-0 transition-colors ${
                  activeId === id ? 'bg-ink text-surface' : 'text-ink-body hover:text-ink'
                }`}
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
