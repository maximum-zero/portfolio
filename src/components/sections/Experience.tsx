'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { CAREER } from '@/data/career'
import { getSkillByName } from '@/lib/utils'
import TechIcon from '@/components/ui/TechIcon'

const FADE_UP = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }
const CONTAINER = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }

function splitPeriod(period: string): [string, string] | null {
  const parts = period.split(' – ')
  if (parts.length === 2) return [parts[0], parts[1]]
  return null
}

export default function Experience() {
  const reduced = useReducedMotion()

  return (
    <section id="experience" style={{ padding: 'var(--section-pad) 0' }}>
      <div style={{ width: 'var(--container-narrow)', margin: '0 auto' }}>
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <p className="eyebrow-dot font-mono text-[11px] tracking-[0.2em] text-ink-muted uppercase mb-5">
            Experience
          </p>
          <h2
            className="font-display font-bold text-ink mb-4"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
            }}
          >
            경험
          </h2>
          <p className="text-ink-muted mx-auto max-w-md" style={{ fontSize: '15px' }}>
            일과 배움을 하나의 타임라인으로.
          </p>
        </div>

        {/* 타임라인 */}
        <motion.div
          className="relative"
          variants={CONTAINER}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* 단일 세로선 — dot 컬럼 중심(100px date + 24px gap + 10px = 134px) */}
          <div
            className="absolute top-0 bottom-0 w-px bg-line hidden md:block"
            style={{ left: '134px' }}
          />

          {CAREER.map((item, i) => {
            const dates = splitPeriod(item.period)
            return (
              <motion.div
                key={item.id}
                variants={reduced ? {} : FADE_UP}
                className="relative mb-12 last:mb-0 md:grid md:gap-6 md:items-start"
                style={{ gridTemplateColumns: '100px 20px 1fr' }}
              >
                {/* 날짜 */}
                <div className="hidden md:block font-mono text-[11px] tracking-[0.06em] text-ink-muted text-right pt-5 leading-relaxed">
                  {dates ? (
                    <>
                      {dates[0]}
                      <div className="text-ink-disabled my-0.5">~</div>
                      {dates[1]}
                    </>
                  ) : (
                    item.period
                  )}
                  <div className="text-ink-disabled mt-1">{item.duration}</div>
                </div>

                {/* dot */}
                <div className="hidden md:flex justify-center pt-5">
                  <div
                    className="w-3.5 h-3.5 rounded-full relative z-10 border-2"
                    style={
                      i === 0
                        ? { background: 'var(--color-accent)', borderColor: 'var(--color-accent)' }
                        : { background: 'var(--color-surface)', borderColor: 'var(--color-ink)' }
                    }
                  />
                </div>

                {/* 카드 */}
                <div className="border border-line rounded-xl p-7 bg-surface transition-colors duration-300 hover:border-ink">
                  {/* 모바일 날짜 */}
                  <p className="md:hidden font-mono text-xs tracking-[0.08em] text-ink-muted uppercase mb-3">
                    {item.period} · {item.duration}
                  </p>

                  {item.type === 'education' ? (
                    <div
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-[10px] tracking-[0.12em] uppercase mb-4 border border-line"
                      style={{ color: 'var(--color-ink-muted)' }}
                    >
                      EDU
                    </div>
                  ) : (
                    <div
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full font-mono text-[10px] tracking-[0.12em] uppercase mb-4"
                      style={{
                        background: 'var(--color-accent)',
                        color: 'var(--color-accent-ink)',
                      }}
                    >
                      WORK
                    </div>
                  )}

                  <h3 className="font-display text-2xl font-bold text-ink mb-1">{item.company}</h3>
                  <p className="text-sm text-ink-muted mb-5">{item.role}</p>

                  {item.tasks && item.tasks.length > 0 && (
                    <ul className="grid gap-2.5 mb-5">
                      {item.tasks.map((task, j) => (
                        <li key={j} className="text-sm font-light leading-relaxed text-ink-body">
                          <span className="text-ink mr-1.5">•</span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.stack && item.stack.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-line">
                      {item.stack.map((tech) => {
                        const skill = getSkillByName(tech) ?? { name: tech }
                        return <TechIcon key={tech} item={skill} size="sm" />
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
