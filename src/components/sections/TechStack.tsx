import { SKILLS } from '@/data/skills'
import TechStackClient from '@/components/ui/TechStackClient'

export default function TechStack() {
  return (
    <section id="techstack" style={{ padding: 'var(--section-pad) 0' }}>
      <div style={{ width: 'var(--container-narrow)', margin: '0 auto' }}>
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <p className="eyebrow-dot font-mono text-[11px] tracking-[0.2em] text-ink-muted uppercase mb-5">
            Tech Stack
          </p>
          <h2
            className="font-display font-bold text-ink mb-4"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
            }}
          >
            기술 스택
          </h2>
          <p className="text-ink-muted mx-auto max-w-md" style={{ fontSize: '15px' }}>
            카테고리를 선택하면 해당하지 않는 기술은 흐릿하게 표시됩니다.
          </p>
        </div>

        <TechStackClient skills={SKILLS} />
      </div>
    </section>
  )
}
