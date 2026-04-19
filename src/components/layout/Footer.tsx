export default function Footer() {
  return (
    <footer className="border-t border-line py-10 text-center">
      <h2
        className="font-display font-bold tracking-[-0.02em] leading-[1.05] m-0 mb-6"
        style={{ fontSize: 'clamp(28px, 5vw, 56px)' }}
      >
        MAXIMUM IMPACT<span className="text-accent">.</span>
        <br />
        ZERO NOISE<span className="text-accent">.</span>
      </h2>
      <p className="font-mono text-[11px] text-ink-muted tracking-[0.08em] uppercase">
        © 2026 최대영 · Built with calm precision
      </p>
    </footer>
  )
}
