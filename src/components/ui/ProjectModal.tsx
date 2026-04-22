'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Project } from '@/types/project'
import { getSkillByName } from '@/lib/utils'
import TechIcon from './TechIcon'

interface ProjectModalProps {
  project: Project
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
}

function ProjectIcon({ icon, title }: { icon?: string; title: string }) {
  if (icon) {
    return (
      <Image
        src={icon}
        alt={title}
        width={40}
        height={40}
        className="object-contain w-8 h-8 sm:w-10 sm:h-10"
      />
    )
  }
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8 sm:w-10 sm:h-10 text-ink-muted"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function SectionBlock({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="pl-5 py-4 pr-6 rounded-r-xl border-l-accent bg-card">
      <p className="font-display text-[15px] font-semibold text-ink mb-2.5">{label}</p>
      <ul className="grid gap-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="text-sm md:text-[15px] font-light text-ink-body leading-relaxed flex gap-2"
          >
            <span className="text-ink flex-shrink-0">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ProjectModal({ project, onClose, onPrev, onNext }: ProjectModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev?.()
      if (e.key === 'ArrowRight') onNext?.()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, onPrev, onNext])

  const links = project.links.filter((l) => l.url)

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center p-0 sm:p-6"
      style={{ background: 'rgba(15,15,15,0.6)' }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-3xl h-[100dvh] sm:h-auto sm:max-h-[90vh] overflow-y-auto rounded-none sm:rounded-2xl modal-scroll"
        style={{ background: 'var(--color-surface)', boxShadow: '0 24px 72px rgba(0,0,0,0.3)' }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 */}
        <div className="sticky top-0 z-10 flex justify-end px-4 sm:px-6 pt-4 sm:pt-5 pb-2 bg-surface">
          <button
            onClick={onClose}
            aria-label="닫기"
            className="w-8 h-8 grid place-items-center rounded-full border border-line text-ink-muted hover:text-ink hover:border-ink transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-4 sm:px-5 md:px-8 pb-10">
          {/* 헤더: 아이콘 + 제목 */}
          <div className="mb-5">
            <ProjectIcon icon={project.icon} title={project.title} />
            <div className="mt-4">
              <h2
                className="font-display font-bold text-ink leading-tight"
                style={{ fontSize: 'clamp(24px, 4vw, 36px)', letterSpacing: '-0.02em' }}
              >
                {project.title}
              </h2>
              <p className="text-sm md:text-[15px] text-ink-muted leading-relaxed mt-1.5">
                {project.summary}
              </p>
            </div>
          </div>

          {/* 메타: 기간 + 참여인원 */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-10 mb-5">
            <div>
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-muted mb-1.5">
                기간
              </p>
              <p className="text-sm md:text-[15px] text-ink-body">{project.period}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-muted mb-1.5">
                참여인원
              </p>
              <p className="text-sm md:text-[15px] text-ink-body">
                {project.members ?? (project.type === 'personal' ? '1인' : '팀')}
              </p>
            </div>
          </div>

          {/* 관련 링크 */}
          {links.length > 0 && (
            <div className="mb-5">
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-muted mb-1.5">
                관련 링크
              </p>
              <div className="flex flex-wrap gap-4">
                {links.map((link) => (
                  <a
                    key={link.title}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[13px] font-mono text-ink-muted hover:text-ink transition-colors"
                  >
                    {link.title} <ExternalIcon />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* 기술 스택 */}
          <div className="mb-8">
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-muted mb-3">
              기술 스택
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((t) => {
                const skill = getSkillByName(t) ?? { name: t }
                return <TechIcon key={t} item={skill} size="sm" />
              })}
            </div>
          </div>

          {/* 개요 */}
          <div className="mb-6 pt-6 border-t border-line">
            <p className="font-display text-[15px] font-semibold text-ink mb-4">개요</p>
            <ul className="grid gap-3">
              {project.detail.overview.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-ink flex-shrink-0 mt-[1px]">•</span>
                  <p className="text-sm md:text-[15px] font-light text-ink-body leading-relaxed">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* 주요기능 */}
          {project.detail.features && project.detail.features.length > 0 && (
            <div className="mb-8">
              <p className="font-display text-[15px] font-semibold text-ink mb-4">주요 기능</p>
              <ul className="grid gap-3">
                {project.detail.features.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-ink flex-shrink-0 mt-[1px]">•</span>
                    <span className="text-sm md:text-[15px] font-light text-ink-body leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 핵심 문제 / 해결 방법 / 결과 */}
          <div className="grid gap-3 mb-8">
            {[
              { label: '핵심 문제', items: project.detail.problem },
              { label: '해결 방법', items: project.detail.solution },
              { label: '결과', items: project.detail.result },
            ].map(({ label, items }) => (
              <SectionBlock key={label} label={label} items={items} />
            ))}
          </div>

          {/* 이전/다음 */}
          {(onPrev || onNext) && (
            <div className="flex justify-between pt-4 border-t border-line">
              {onPrev ? (
                <button
                  onClick={onPrev}
                  className="font-mono text-xs text-ink-muted hover:text-ink transition-colors"
                >
                  ← 이전
                </button>
              ) : (
                <span />
              )}
              {onNext && (
                <button
                  onClick={onNext}
                  className="font-mono text-xs text-ink-muted hover:text-ink transition-colors"
                >
                  다음 →
                </button>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
