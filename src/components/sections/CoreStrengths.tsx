'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { CORE_STRENGTHS } from '@/data/profile'

const FADE_UP = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }
const CONTAINER = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

const ICONS = [
  // 사용자 경험의 마찰 제거 — wave/signal
  <svg
    key="0"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 12h4l3-8 4 16 3-8h4" />
  </svg>,
  // 시스템 성능의 한계 확장 — server stack
  <svg
    key="1"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="6" rx="1" />
    <rect x="3" y="14" width="18" height="6" rx="1" />
    <circle cx="7" cy="7" r="0.5" fill="currentColor" />
    <circle cx="7" cy="17" r="0.5" fill="currentColor" />
  </svg>,
  // 프론트-백엔드 통합 사고 — cube/layers
  <svg
    key="2"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 8 L12 4 L20 8 L20 16 L12 20 L4 16 Z" />
    <path d="M12 4 L12 12 L20 16" />
    <path d="M12 12 L4 16" />
  </svg>,
]

export default function CoreStrengths() {
  const reduced = useReducedMotion()

  return (
    <section id="pillars" style={{ padding: 'var(--section-pad) 0' }}>
      <div style={{ width: 'var(--container)', margin: '0 auto' }}>
        {/* 섹션 헤더 */}
        <motion.div
          className="text-center mb-16"
          variants={CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p
            variants={reduced ? {} : FADE_UP}
            className="eyebrow-dot font-mono text-[11px] tracking-[0.2em] text-ink-muted uppercase mb-5"
          >
            Core Competencies
          </motion.p>
          <motion.h2
            variants={reduced ? {} : FADE_UP}
            className="font-display font-bold text-ink mb-4"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
            }}
          >
            핵심 역량
          </motion.h2>
          <motion.p
            variants={reduced ? {} : FADE_UP}
            className="text-ink-muted mx-auto max-w-md"
            style={{ fontSize: '15px' }}
          >
            세 가지 핵심 문제 해결 경험
          </motion.p>
        </motion.div>

        {/* 카드 그리드 */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {CORE_STRENGTHS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              variants={reduced ? {} : FADE_UP}
              className="group border border-line rounded-xl p-7 bg-surface transition-transform duration-300 hover:-translate-y-1 hover:border-accent"
            >
              <div className="w-11 h-11 border border-ink rounded-xl grid place-items-center mb-5 transition-colors duration-300 group-hover:bg-accent group-hover:border-accent group-hover:text-accent-ink">
                {ICONS[i]}
              </div>
              <h3 className="font-display text-[22px] font-bold tracking-[-0.01em] text-ink mb-2.5">
                {pillar.title}
              </h3>
              <p className="text-ink-muted text-sm leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
