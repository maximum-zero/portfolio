'use client'

import { useState, useEffect } from 'react'
import { PROFILE } from '@/data/profile'

function FabBtn({
  href,
  onClick,
  label,
  children,
}: {
  href?: string
  onClick?: () => void
  label: string
  children: React.ReactNode
}) {
  const cls =
    'w-12 h-12 rounded-full border border-line bg-surface text-ink-muted grid place-items-center cursor-pointer transition-all duration-200 hover:bg-accent hover:text-accent-ink hover:border-accent hover:-translate-y-0.5'
  const style = { boxShadow: '0 6px 18px rgba(0,0,0,0.08)' }

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={cls}
        style={style}
      >
        {children}
      </a>
    )
  }
  return (
    <button onClick={onClick} aria-label={label} className={cls} style={style}>
      {children}
    </button>
  )
}

export default function FloatingActions() {
  const [visible, setVisible] = useState(false)

  // 400px 스크롤 후 등장
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5 transition-[transform,opacity] duration-300"
      style={
        visible ? undefined : { transform: 'translateY(20px)', opacity: 0, pointerEvents: 'none' }
      }
    >
      <FabBtn onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} label="맨 위로">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </FabBtn>

      <FabBtn href={`mailto:${PROFILE.email}`} label="이메일">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      </FabBtn>

      <FabBtn href={PROFILE.github} label="GitHub">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.36 6.84 9.72.5.1.68-.22.68-.48l-.01-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.93.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9l-.01 2.81c0 .27.18.58.69.48A10.03 10.03 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
        </svg>
      </FabBtn>

      {PROFILE.BLOG_URL && (
        <FabBtn href={PROFILE.BLOG_URL} label="블로그">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 4h12M3 8h8m-8 4h6" />
          </svg>
        </FabBtn>
      )}
    </div>
  )
}
