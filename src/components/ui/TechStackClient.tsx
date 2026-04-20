'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { SkillGroup, SkillCategory } from '@/types/skill'
import TechIcon from './TechIcon'

interface TechStackClientProps {
  skills: SkillGroup[]
}

const FILTER_TABS = [
  { key: 'all', label: '전체' },
  { key: 'backend', label: '백엔드' },
  { key: 'frontend', label: '프론트엔드' },
  { key: 'database', label: '데이터베이스' },
  { key: 'messaging', label: '메시징 & 실시간' },
  { key: 'infra', label: '인프라' },
  { key: 'monitor', label: '모니터링 & 테스트' },
  { key: 'tools', label: '툴' },
] as const

type FilterKey = (typeof FILTER_TABS)[number]['key']

// Test → 모니터링 & 테스트로 통합
const CAT_TO_FILTER: Record<SkillCategory, FilterKey> = {
  Backend: 'backend',
  Frontend: 'frontend',
  Database: 'database',
  Infra: 'infra',
  Messaging: 'messaging',
  Realtime: 'messaging',
  Monitoring: 'monitor',
  Test: 'monitor',
  Tools: 'tools',
}

const FADE_UP = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }
const CONTAINER = { hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }

export default function TechStackClient({ skills }: TechStackClientProps) {
  const [active, setActive] = useState<FilterKey>('all')
  const reduced = useReducedMotion()

  const flatItems = skills.flatMap((g) =>
    g.items.map((item) => ({ ...item, filterKey: CAT_TO_FILTER[g.category] }))
  )

  return (
    <div>
      {/* 필터 탭 — pill 컨테이너 */}
      <div className="mb-12 overflow-x-auto pb-1 scrollbar-hide">
        <div
          className="flex flex-nowrap gap-1 p-1.5 rounded-full w-max mx-auto"
          style={{ background: 'var(--color-card)' }}
        >
          {FILTER_TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              role="tab"
              aria-selected={active === key}
              className={`px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-colors duration-200 ${
                active === key
                  ? 'bg-ink text-surface'
                  : 'text-ink-muted hover:text-ink bg-transparent'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 플랫 그리드 */}
      <motion.div
        className="grid gap-1 md:gap-2 justify-center grid-techstack"
        variants={CONTAINER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {flatItems.map((item) => {
          const dim = active !== 'all' && item.filterKey !== active
          return (
            <motion.div
              key={`${item.filterKey}-${item.name}`}
              variants={reduced ? {} : FADE_UP}
              className="transition-all duration-300"
              style={{ opacity: dim ? 0.2 : 1, filter: dim ? 'grayscale(1)' : 'none' }}
            >
              <TechIcon item={item} />
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
