'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { PROFILE } from '@/data/profile'

function MailIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S9.06 17.38 9 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

const CONTACTS = [
  {
    label: 'Email',
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
    Icon: MailIcon,
  },
  {
    label: 'GitHub',
    value: PROFILE.github.replace('https://', ''),
    href: PROFILE.github,
    Icon: GithubIcon,
  },
]

export default function Contact() {
  return (
    <section id="contact" style={{ padding: 'var(--section-pad) 0' }}>
      <div style={{ width: 'var(--container-narrow)', margin: '0 auto' }}>
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <p className="eyebrow-dot font-mono text-[11px] tracking-[0.2em] text-ink-muted uppercase mb-5">
            Contact
          </p>
          <h2
            className="font-display font-bold text-ink mb-4"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
            }}
          >
            연락하기
          </h2>
          <p className="text-ink-muted mx-auto max-w-md" style={{ fontSize: '15px' }}>
            협업 제안, 커피챗, 기술 이야기 모두 환영합니다.
          </p>
        </div>

        {/* contact row 그리드 */}
        <motion.div
          className="grid gap-3 md:grid-cols-2 mx-auto"
          style={{ maxWidth: '640px' }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          {CONTACTS.map(({ label, value, href, Icon }) => (
            <ContactRow key={label} label={label} value={value} href={href} Icon={Icon} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ContactRow({
  label,
  value,
  href,
  Icon,
}: {
  label: string
  value: string
  href: string
  Icon: () => React.ReactElement
}) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
      aria-label={label}
      className="contact-row group flex items-center gap-4 px-5 py-5 rounded-2xl border border-line transition-all duration-300"
      style={{ background: 'var(--color-surface)' }}
    >
      <span className="contact-row__icon w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 text-ink-muted">
        <Icon />
      </span>
      <div>
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-muted">{label}</p>
        <p className="text-sm text-ink mt-0.5">{value}</p>
      </div>
    </a>
  )
}
