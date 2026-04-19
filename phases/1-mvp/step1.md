# Step 1: layout-shell

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `/docs/ARCHITECTURE.md`
- `/docs/PRD.md`
- `/docs/UI_GUIDE.md`
- `/docs/ADR.md`
- `/src/app/globals.css` — 현재 색상 토큰 확인
- `/src/app/layout.tsx` — 현재 레이아웃 구조 확인
- `/src/data/profile.ts` — PROFILE(name, BLOG_URL 등) 확인
- `/src/data/blog.ts` — Step 0에서 생성된 파일
- `phases/1-mvp/index.json` — step 0 summary 확인

이전 step에서 만들어진 코드를 꼼꼼히 읽고, 설계 의도를 이해한 뒤 작업하라.

## 작업

레이아웃 셸을 완성한다. 이 step 완료 후 `npm run dev`를 실행하면 상단 pill Nav와 하단 Footer가 보여야 한다.

### 1. `src/app/globals.css` 수정 — 누락 토큰·유틸 추가

현재 globals.css에 없는 아래 항목을 추가한다:

**@theme 블록에 font-mono 추가:**

```css
--font-mono: 'JetBrains Mono', monospace;
```

**다크 모드 CSS 변수 (html[data-mode="dark"] 선택자):**

```css
html[data-mode='dark'] {
  --color-surface: #0f0f0f;
  --color-card: #1a1a1a;
  --color-ink: #fafaf8;
  --color-ink-body: #b0b0aa;
  --color-ink-muted: #707070;
  --color-ink-disabled: #404040;
  --color-line: #2a2a2a;
  --color-line-strong: #3a3a3a;
}
```

**전역 유틸리티 클래스:**

```css
.text-outline-accent {
  -webkit-text-stroke: 2px var(--color-accent);
  color: transparent;
}
```

### 2. `src/app/layout.tsx` 수정 — JetBrains Mono 폰트 추가

`next/font/google`에서 `JetBrains_Mono`를 import하고, `--font-mono` CSS 변수로 주입한다.
`html` 태그의 `className`에 `jetbrainsMono.variable`을 추가한다.

또한 다크 모드 flash 방지 스크립트를 `<head>` 안에 추가한다 (ADR-004 참조):

```html
<script dangerouslySetInnerHTML={{ __html: `
  (function() {
    var m = localStorage.getItem('color-mode') || 'light';
    document.documentElement.setAttribute('data-mode', m);
  })();
` }} />
```

`Nav`와 `FloatingActions`를 import해 `<body>` 안에 렌더한다:

```tsx
<body>
  <Nav />
  {children}
  <FloatingActions />
</body>
```

### 3. `src/components/layout/Nav.tsx` 생성 — `'use client'`

PRD 스펙:

- `fixed top-6` 위치, `z-50`
- 알약(pill) 형태, `bg-surface border border-line` 반투명 배경
- 왼쪽 끝: 브랜드명 클릭 시 최상단(`#`) 이동
- 중앙: 섹션 링크 목록 — `[역량, 기술, 경험, 프로젝트, 연락]` (id: pillars, techstack, experience, portfolio, contact)
- active 섹션 항목: `bg-ink text-surface` (반전)
- 모바일(`md` 미만): 햄버거 버튼 → 드롭다운
- PC(`md` 이상): 중앙 정렬 pill, 섹션명 전체 노출

`useActiveSection` 훅을 Nav 내부 또는 `src/hooks/useActiveSection.ts`에 구현한다:

```ts
function useActiveSection(ids: string[]): string
// IntersectionObserver로 뷰포트 기준 활성 섹션 ID 반환
// rootMargin: "-40% 0px -50% 0px"
// 반환값: 현재 활성 섹션의 id 문자열
```

UI 아이콘(햄버거, X)은 SVG 인라인으로 직접 작성한다. `strokeWidth 1.5`, 크기 `20px`.

**색상 토큰만 사용할 것 (hex 직접 사용 금지).**

### 4. `src/components/layout/FloatingActions.tsx` 생성 — `'use client'`

PRD 스펙:

- `fixed bottom-6 right-6 z-50`
- 아이콘 버튼 세로 스택: ↑(맨 위로) / 이메일 / GitHub / 블로그
- 블로그 버튼: `PROFILE.BLOG_URL`이 비어있으면(`''`) 렌더하지 않는다
- hover 시 테두리·아이콘 색이 `text-accent border-accent`로 전환
- ↑ 버튼: `window.scrollTo({ top: 0, behavior: 'smooth' })`
- 이메일: `mailto:${PROFILE.email}` 링크
- GitHub: `PROFILE.github` 링크

`PROFILE`은 `@/data/profile`에서 import한다.
아이콘은 SVG 인라인으로 작성한다 (`strokeWidth 1.5`, 크기 `18px`).

### 5. `src/components/layout/Footer.tsx` 생성 — Server Component

PRD 스펙:

- 슬로건 재반복: `MAXIMUM IMPACT.` / `ZERO NOISE.`
- copyright: `© 2026 최대영 · Built with calm precision`
- 슬로건 타이포그래피: `font-display` (Space Grotesk)

### 6. `src/app/page.tsx` 수정 — 섹션 id 정리

현재 page.tsx의 빈 섹션 id를 PRD/ARCHITECTURE.md와 일치하도록 수정하고, Footer를 추가한다:

```tsx
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <main className="max-w-5xl mx-auto px-6 md:px-10">
        <section id="hero" />
        <section id="pillars" />
        <section id="techstack" />
        <section id="experience" />
        <section id="portfolio" />
        <section id="contact" />
      </main>
      <Footer />
    </>
  )
}
```

### 7. `src/components/layout/Footer.test.tsx` 생성

Footer가 슬로건 텍스트와 copyright 텍스트를 렌더하는지 검증하는 테스트를 작성한다.

## Acceptance Criteria

```bash
npm run build
npm test
```

## 검증 절차

1. 아키텍처 체크리스트:
   - Nav, FloatingActions는 `'use client'` 선언이 있는가?
   - Footer는 Server Component인가? (`'use client'` 없음)
   - 색상 값이 hex로 하드코딩되지 않고 Tailwind 토큰 클래스만 사용하는가?
   - `useActiveSection`이 `'use client'` 컴포넌트 내에서만 호출되는가?
2. `phases/1-mvp/index.json`의 step 1을 업데이트:
   - 성공 → `"status": "completed"`, `"summary": "생성된 파일 목록과 핵심 결정 한 줄 요약"`
   - 차단 → `"status": "blocked"`, `"blocked_reason": "구체적 사유"` 후 즉시 중단

## 금지사항

- `backdrop-filter: blur()` 사용 금지. 이유: UI_GUIDE의 AI 슬롭 안티패턴
- 색상 hex 값을 컴포넌트에 직접 사용하지 마라. 이유: globals.css CSS 변수 단일 관리 원칙
- `rounded-full` 아이콘 컨테이너 사용 금지. 이유: UI_GUIDE 안티패턴
- 기존 테스트를 깨뜨리지 마라.
