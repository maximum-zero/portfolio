import { Suspense } from 'react'
import { PROJECTS } from '@/data/projects'
import ProjectList from '@/components/ui/ProjectList'

export default function Portfolio() {
  return (
    <section id="portfolio" style={{ padding: 'var(--section-pad) 0' }}>
      <div style={{ width: 'var(--container)', margin: '0 auto' }}>
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <p className="eyebrow-dot font-mono text-[11px] tracking-[0.2em] text-ink-muted uppercase mb-5">
            Selected Work
          </p>
          <h2
            className="font-display font-bold text-ink mb-4"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
            }}
          >
            프로젝트
          </h2>
          <p className="text-ink-muted mx-auto max-w-md" style={{ fontSize: '15px' }}>
            주요 프로젝트를 클릭하면 세부 내용을 확인할 수 있습니다.
          </p>
        </div>

        <Suspense fallback={<div className="h-64" />}>
          <ProjectList projects={PROJECTS} />
        </Suspense>
      </div>
    </section>
  )
}
