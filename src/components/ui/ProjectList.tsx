'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import type { Project } from '@/types/project'
import { getSkillByName } from '@/lib/utils'
import TechIcon from './TechIcon'
import ProjectModal from './ProjectModal'

interface ProjectListProps {
  projects: Project[]
}

const FADE_UP = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }
const CONTAINER = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

const TYPE_LABEL: Record<string, string> = { personal: '개인', team: '팀', work: '업무' }

export default function ProjectList({ projects }: ProjectListProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const reduced = useReducedMotion()

  const [expanded, setExpanded] = useState(false)

  const initialId = searchParams.get('project')
  const [selected, setSelected] = useState<Project | null>(
    () => projects.find((p) => p.id === initialId) ?? null
  )

  const visible = expanded ? projects : projects.slice(0, 6)
  const remaining = projects.length - 6

  function openModal(project: Project) {
    setSelected(project)
    router.push(`?project=${project.id}`, { scroll: false })
  }

  function closeModal() {
    setSelected(null)
    router.replace('/', { scroll: false })
  }

  function navigate(dir: 'prev' | 'next') {
    if (!selected) return
    const idx = projects.findIndex((p) => p.id === selected.id)
    const next = dir === 'prev' ? projects[idx - 1] : projects[idx + 1]
    if (next) openModal(next)
  }

  const selectedIdx = selected ? projects.findIndex((p) => p.id === selected.id) : -1

  return (
    <>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={CONTAINER}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {visible.map((project, idx) => {
          const isNew = expanded && idx >= 6
          return (
            <motion.button
              key={project.id}
              variants={!isNew && !reduced ? FADE_UP : {}}
              initial={isNew && !reduced ? { opacity: 0, y: 16 } : undefined}
              animate={isNew && !reduced ? { opacity: 1, y: 0 } : undefined}
              transition={
                isNew && !reduced ? { duration: 0.3, delay: (idx - 6) * 0.08 } : undefined
              }
              onClick={() => openModal(project)}
              className="group border border-line rounded-xl p-7 bg-surface text-left flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 hover:border-ink w-full"
              style={{ minHeight: '280px' }}
            >
              {/* 카드 헤더 */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-shrink-0">
                  {project.icon ? (
                    <Image
                      src={project.icon}
                      alt={project.title}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-ink-muted transition-colors group-hover:text-accent"
                    >
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                  )}
                </div>
                <span className="text-ink-muted opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-xl leading-none">
                  ↗
                </span>
              </div>

              {/* 카드 바디 */}
              <div className="flex-1 flex flex-col gap-2">
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-muted">
                  {project.period} · {TYPE_LABEL[project.type] ?? project.type}
                </p>
                <h3
                  className="font-display text-[20px] font-bold text-ink leading-snug"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  {project.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">{project.summary}</p>
              </div>

              {/* 카드 푸터 — 기술 아이콘 */}
              <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-dashed border-line">
                {project.techStack.slice(0, 5).map((t) => {
                  const skill = getSkillByName(t) ?? { name: t }
                  return <TechIcon key={t} item={skill} size="sm" />
                })}
                {project.techStack.length > 5 && (
                  <span className="font-mono text-[10px] text-ink-disabled ml-1">
                    +{project.techStack.length - 5}
                  </span>
                )}
              </div>
            </motion.button>
          )
        })}
      </motion.div>

      {/* 더보기 */}
      {projects.length > 6 && !expanded && (
        <div className="text-center mt-9">
          <button
            onClick={() => setExpanded(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-line rounded-full font-mono text-sm text-ink-muted hover:text-ink hover:border-ink transition-colors"
          >
            더보기
            <span className="text-xs text-ink-disabled">+{remaining}</span>
          </button>
        </div>
      )}

      {/* 모달 — AnimatePresence는 여기서 */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            key={selected.id}
            project={selected}
            onClose={closeModal}
            onPrev={selectedIdx > 0 ? () => navigate('prev') : undefined}
            onNext={selectedIdx < projects.length - 1 ? () => navigate('next') : undefined}
          />
        )}
      </AnimatePresence>
    </>
  )
}
