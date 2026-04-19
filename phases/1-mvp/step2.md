# Step 2: hero-pillars

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `/docs/PRD.md` — Hero(섹션 1), Pillars(섹션 2) 스펙 확인
- `/docs/UI_GUIDE.md` — 타이포그래피 스케일, 색상 토큰, 애니메이션 규칙
- `/docs/ADR.md` — ADR-006 Framer Motion 사용 제한
- `/src/app/globals.css` — 색상·폰트 토큰 확인
- `/src/data/profile.ts` — PROFILE, INTRO, PILLARS 확인
- `/src/types/profile.ts` — PillarItem 타입 확인 (Step 0 생성)
- `/src/app/page.tsx` — 현재 페이지 구조 확인 (Step 1 수정 결과)
- `phases/1-mvp/index.json` — 이전 step summary 확인

이전 step에서 만들어진 코드를 꼼꼼히 읽고, 설계 의도를 이해한 뒤 작업하라.

## 작업

Hero와 Pillars 섹션을 구현하고 page.tsx에 연결한다. 이 step 완료 후 dev 서버에서 Hero 슬로건과 Pillars 카드 3개가 보여야 한다.

### 1. `src/components/sections/Hero.tsx` 생성 — Server Component

PRD 스펙 (UI_GUIDE 타이포그래피 스케일 준수):

**레이아웃:**

- `min-h-svh` 중앙 정렬 (`flex flex-col items-center justify-center`)
- 배경 동심원 ring 장식 3개: `border border-line rounded-full` absolute 포지션, 크기 600px / 800px / 1000px (중앙 기준)
- overflow-hidden 처리로 ring이 화면 밖으로 나가지 않도록

**콘텐츠 순서 (stagger 애니메이션 적용):**

1. eyebrow: `최대영 — Backend Engineer`
   - `font-mono text-xs md:text-sm tracking-[0.15em] text-ink-muted uppercase`
2. h1 슬로건 2줄:
   - `MAXIMUM IMPACT.` — `text-ink`
   - `ZERO NOISE.` — ZERO에 `.text-outline-accent` 클래스 적용 (transparent fill, accent stroke)
   - `font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-widest uppercase leading-[1.1]`
3. meta row: `Open to Work · 3-5 YEARS · Seoul, KR`
   - `font-mono text-xs text-ink-muted`

**Framer Motion 애니메이션 (ADR-006):**

- `'use client'`가 아닌 Server Component이므로, 애니메이션 부분을 별도 Client Component `HeroContent.tsx`로 분리하거나, Hero.tsx 자체를 `'use client'`로 선언한다
- Hero는 인터랙션은 없지만 진입 애니메이션이 필요하므로 `'use client'` 선언 허용
- `motion.div`로 각 요소를 감싸고 `initial={{ opacity: 0, y: 16 }}` → `animate={{ opacity: 1, y: 0 }}`
- `staggerChildren: 0.12`, `viewport={{ once: true }}`
- `useReducedMotion()` 훅으로 감소 모션 대응: true이면 모든 애니메이션을 비활성

### 2. `src/components/sections/Pillars.tsx` 생성 — Server Component (애니메이션 시 'use client' 허용)

PRD 스펙:

**섹션 헤더 (UI_GUIDE 패턴 준수):**

- eyebrow: `Core Competencies` — `font-mono text-xs tracking-[0.15em] text-accent uppercase`
- h2: `핵심 역량` — `font-display text-3xl md:text-4xl font-bold text-ink`
- 한 줄: `세 가지 축으로 문제를 바라보고 해결합니다.` — `font-body text-lg md:text-xl font-normal text-ink-muted`

**카드 3개 그리드:**

- `grid grid-cols-1 md:grid-cols-3 gap-6`
- `PILLARS` 배열(`@/data/profile`)을 map해 렌더
- 각 카드: `bg-card border border-line rounded-xl p-6`
- 카드 내부: 번호 + `title` (h3, `font-body text-lg font-semibold text-ink`) + `description` (`font-body text-sm font-light text-ink-body`)
- 이미지 없음, 아이콘 없음 — 텍스트 카드

**애니메이션:** 섹션 헤더 → 카드 stagger (`whileInView`, `once: true`)

### 3. `src/app/page.tsx` 수정 — Hero + Pillars 연결

빈 `<section id="hero" />`와 `<section id="pillars" />`를 실제 컴포넌트로 교체한다:

```tsx
import Hero from '@/components/sections/Hero'
import Pillars from '@/components/sections/Pillars'
```

각 섹션을 `<section id="...">` 태그 안에 감싸거나, 컴포넌트 내부에서 section 태그를 직접 반환하도록 구현한다. 선택은 에이전트 재량이지만, 최종 HTML에 각 id가 존재해야 한다.

### 4. 테스트 파일 생성

`src/components/sections/Hero.test.tsx`: 슬로건 텍스트("MAXIMUM IMPACT.", "ZERO NOISE.") 렌더 확인
`src/components/sections/Pillars.test.tsx`: 3개 pillar title이 모두 렌더되는지 확인

Framer Motion 모킹이 필요한 경우 `src/test/mocks/framer-motion.ts`를 생성해 `vitest.config.ts`의 alias에 추가한다.

## Acceptance Criteria

```bash
npm run build
npm test
```

## 검증 절차

1. 아키텍처 체크리스트:
   - Hero와 Pillars의 텍스트가 컴포넌트에 하드코딩되지 않고 `@/data/profile`에서 import하는가?
   - `.text-outline-accent` 클래스가 컴포넌트 안에 inline style이 아닌 className으로 사용되는가?
   - Framer Motion 애니메이션이 `once: true`로 설정되어 1회만 실행되는가?
   - `useReducedMotion()` 대응이 있는가?
2. `phases/1-mvp/index.json`의 step 2를 업데이트:
   - 성공 → `"status": "completed"`, `"summary": "생성된 파일 목록과 핵심 결정 한 줄 요약"`
   - 차단 → `"status": "blocked"`, `"blocked_reason": "구체적 사유"` 후 즉시 중단

## 금지사항

- 배경 gradient orb(`blur-3xl` 원형) 사용 금지. 이유: UI_GUIDE 안티패턴
- Hero에 사람 일러스트·아바타 추가 금지. 이유: UI_GUIDE 안티패턴
- gradient-text(배경 그라데이션 텍스트) 사용 금지. 이유: UI_GUIDE 안티패턴
- Framer Motion loop 애니메이션 사용 금지. 이유: ADR-006 허용 범위 초과
- 기존 테스트를 깨뜨리지 마라.
