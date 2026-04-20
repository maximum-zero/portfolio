'use client'

import { motion, useReducedMotion } from 'framer-motion'

const FADE_UP = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }
const CONTAINER = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section
      id="hero"
      className="relative min-h-svh grid place-items-center text-center overflow-hidden py-16 md:py-24 px-4 sm:px-6"
    >
      {/* 동심원 ring 장식 */}
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <span className="absolute border border-line rounded-full hero-ring-1" />
        <span className="absolute border border-line rounded-full hero-ring-2" />
        <span className="absolute border border-line rounded-full hero-ring-3" />
      </div>

      <motion.div
        className="relative z-10 max-w-5xl"
        variants={CONTAINER}
        initial="hidden"
        animate="visible"
      >
        {/* eyebrow — 양쪽 수평선 */}
        <motion.p
          variants={reduced ? {} : FADE_UP}
          className="font-mono text-xs tracking-[0.15em] text-ink-muted uppercase mb-9 flex items-center justify-center gap-3.5"
        >
          <span className="hidden sm:block w-7 h-px bg-current opacity-50" />
          최대영 — Backend Engineer
          <span className="hidden sm:block w-7 h-px bg-current opacity-50" />
        </motion.p>

        {/* h1 슬로건 */}
        <motion.h1
          variants={reduced ? {} : FADE_UP}
          className="font-display font-bold uppercase leading-[0.95] tracking-[-0.035em] m-0"
          style={{ fontSize: 'clamp(32px, 9vw, 128px)' }}
        >
          <span className="text-ink">
            MAXIMUM IMPACT<span className="text-accent">.</span>
          </span>
          <br />
          <span className="text-outline-accent">ZERO</span>
          <span className="text-ink">
            {' '}
            NOISE<span className="text-accent">.</span>
          </span>
        </motion.h1>

        {/* 서브카피 */}
        <motion.p
          variants={reduced ? {} : FADE_UP}
          className="mt-10 mx-auto max-w-xl text-ink-body leading-relaxed"
          style={{ fontSize: 'clamp(15px, 1.4vw, 18px)' }}
        >
          프론트엔드에서 경험한{' '}
          <strong
            className="font-semibold px-1.5 py-px rounded"
            style={{ background: 'var(--color-accent-soft)' }}
          >
            사용자 관점의 노이즈
          </strong>
          를 지우고,
          <br />
          백엔드에서{' '}
          <strong
            className="font-semibold px-1.5 py-px rounded"
            style={{ background: 'var(--color-accent-soft)' }}
          >
            시스템 성능의 한계
          </strong>
          를 지웁니다.
        </motion.p>

        {/* meta row */}
        <motion.div
          variants={reduced ? {} : FADE_UP}
          className="mt-12 inline-flex items-center flex-wrap justify-center gap-4 px-5 py-2.5 border border-line rounded-2xl sm:rounded-full font-mono text-[11px] tracking-[0.12em] uppercase text-ink-muted"
        >
          <span className="flex items-center gap-1.5 text-ink">
            <span
              className="w-1.5 h-1.5 rounded-full bg-accent"
              style={{ boxShadow: '0 0 0 4px var(--color-accent-soft)' }}
            />
            Open to Work
          </span>
          <span className="w-1 h-1 rounded-full bg-current opacity-50" />
          <span>3-5 YEARS</span>
          <span className="w-1 h-1 rounded-full bg-current opacity-50" />
          <span>Seoul, KR</span>
        </motion.div>
      </motion.div>

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center font-mono text-[10px] tracking-[0.24em] uppercase text-ink-muted scroll-line">
        SCROLL
      </div>
    </section>
  )
}
