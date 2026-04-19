import { CERTS } from '@/data/certs'

export default function Certs() {
  return (
    <section className="py-24 md:py-32">
      <div style={{ width: 'var(--container-narrow)', margin: '0 auto' }}>
        <div>
          {/* 섹션 헤더 */}
          <div className="text-center mb-10">
            <p className="eyebrow-dot font-mono text-[11px] tracking-[0.2em] text-ink-muted uppercase mb-5">
              Certifications
            </p>
            <h2
              className="font-display font-bold text-ink"
              style={{
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
              }}
            >
              자격증
            </h2>
          </div>

          {/* 자격증 목록 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTS.map((cert) => (
              <div
                key={cert.name}
                className="flex items-start gap-4 border border-line rounded-xl px-5 py-4 bg-surface"
              >
                <div
                  className="w-7 h-7 rounded-lg flex-shrink-0 grid place-items-center"
                  style={{ background: 'var(--color-accent)' }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-accent-ink)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12L10 17L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">{cert.name}</p>
                  <p className="font-mono text-xs text-ink-muted mt-0.5">
                    {cert.issuedAt} · {cert.org}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
