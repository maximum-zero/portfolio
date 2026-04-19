import { PROFILE } from '@/data/profile'
import { BLOG_POSTS } from '@/data/blog'

export default function Blog() {
  if (!PROFILE.BLOG_URL || BLOG_POSTS.length === 0) return null

  return (
    <section id="blog" style={{ padding: 'var(--section-pad) 0' }}>
      <div style={{ width: 'var(--container-narrow)', margin: '0 auto' }}>
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <p className="eyebrow-dot font-mono text-[11px] tracking-[0.2em] text-ink-muted uppercase mb-5">
            Writing
          </p>
          <h2
            className="font-display font-bold text-ink mb-4"
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
            }}
          >
            블로그
          </h2>
          <p className="text-ink-muted mx-auto max-w-md" style={{ fontSize: '15px' }}>
            일하면서 부딪힌 문제와 그 해결 과정을 기록합니다.
          </p>
        </div>

        {/* 카드 그리드 */}
        <div className="grid gap-4 md:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-card group flex flex-col gap-4 p-7 rounded-2xl border border-line min-h-[200px] transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'var(--color-surface)' }}
            >
              <span className="font-mono text-[11px] tracking-[0.1em] text-ink-muted">
                {post.date}
              </span>
              <h3
                className="font-display font-semibold text-ink leading-snug flex-1"
                style={{ fontSize: '18px' }}
              >
                {post.title}
              </h3>
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted">
                <span>보러가기</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:text-ink">
                  →
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={PROFILE.BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-ink-muted hover:text-ink transition-colors"
          >
            모든 글 보기 →
          </a>
        </div>
      </div>
    </section>
  )
}
