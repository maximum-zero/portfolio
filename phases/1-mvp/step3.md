# Step 3: techstack

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `/docs/PRD.md` — Stack 섹션(섹션 3) 스펙 확인
- `/docs/UI_GUIDE.md` — 아이콘 컨테이너 규칙, 색상 토큰, 애니메이션
- `/docs/ADR.md` — ADR-007 Simple Icons 방식, ADR-006 Framer Motion
- `/docs/ARCHITECTURE.md` — TechStack 데이터 흐름, TechIcon CLS 방지
- `/src/types/skill.ts` — SkillGroup, SkillItem, SkillCategory 타입 확인
- `/src/data/skills.ts` — SKILLS 데이터 확인 (카테고리: Backend, Database, Infra, Messaging, Monitoring, Test, Frontend)
- `/src/app/page.tsx` — 현재 페이지 구조 확인
- `phases/1-mvp/index.json` — 이전 step summary 확인

이전 step에서 만들어진 코드를 꼼꼼히 읽고, 설계 의도를 이해한 뒤 작업하라.

## 작업

TechStack 섹션을 구현하고 page.tsx에 연결한다. 이 step 완료 후 dev 서버에서 기술 아이콘 그리드와 카테고리 필터 탭이 동작해야 한다.

### 1. `src/components/ui/TechIcon.tsx` 생성 — Server Component

Simple Icons CDN SVG를 `next/image`로 로드하는 아이콘 컴포넌트.

인터페이스:

```tsx
interface TechIconProps {
  item: SkillItem // { name: string; iconSlug?: string }
}
```

구현 규칙:

- 컨테이너: `rounded-xl bg-surface border border-line p-3 w-[72px] h-[72px] flex items-center justify-center` (CLS 방지를 위해 크기 고정)
- `iconSlug`가 있으면: `next/image`로 `https://cdn.simpleicons.org/{iconSlug}` 로드, `width={40} height={40} unoptimized`
- `iconSlug`가 없으면(Querydsl, JUnit5, TestContainers 등): 이름 첫 글자를 `font-mono text-xs` 텍스트로 표시
- 기술명 tooltip: CSS only, `group` + `group-hover:visible` 패턴 (`position: absolute`, `font-mono text-xs`)
- `rounded-full` 컨테이너 금지

### 2. `src/components/ui/TechStackClient.tsx` 생성 — `'use client'`

카테고리 필터 상태를 관리하는 클라이언트 컴포넌트.

인터페이스:

```tsx
interface TechStackClientProps {
  skills: SkillGroup[]
}
```

구현 규칙:

- `useState<string>('all')` — 선택된 카테고리. 초기값 `'all'`
- 필터 탭 목록: `['all', ...SKILLS.map(g => g.category)]` — 데이터에서 동적 생성
- 탭 선택 시: 선택 카테고리의 아이콘 `opacity-100`, 나머지 `opacity-30 transition-opacity`
- `'all'` 선택 시 모든 아이콘 `opacity-100`
- 각 카테고리 그룹을 소제목(`font-mono text-xs text-ink-muted uppercase`) + 아이콘 그리드로 렌더
- Framer Motion: 섹션 진입 시 1회 fade-in (`whileInView`, `once: true`)

### 3. `src/components/sections/TechStack.tsx` 생성 — Server Component

PRD 섹션 헤더 (UI_GUIDE 패턴):

- eyebrow: `Tech Stack`
- h2: `기술 스택`
- 한 줄: `카테고리를 선택하면 해당하지 않는 기술은 흐릿하게 표시됩니다.`

`SKILLS` 데이터를 import해 `TechStackClient`에 props로 전달한다. 이 컴포넌트 자체는 Server Component이므로 데이터 import와 레이아웃만 담당한다.

### 4. `src/app/page.tsx` 수정 — TechStack 연결

빈 `<section id="techstack" />`를 `TechStack` 컴포넌트로 교체한다.

### 5. 테스트 파일 생성

`src/components/ui/TechIcon.test.tsx`: iconSlug가 있을 때 img 태그 렌더, 없을 때 첫 글자 텍스트 렌더 확인
`src/components/sections/TechStack.test.tsx`: 섹션 헤더 텍스트 렌더 확인

`next/image` 모킹이 필요하면 `src/test/mocks/next-image.ts`를 생성하고 `vitest.config.ts` alias에 추가한다.

## Acceptance Criteria

```bash
npm run build
npm test
```

## 검증 절차

1. 아키텍처 체크리스트:
   - `TechStack.tsx`는 Server Component, `TechStackClient.tsx`는 `'use client'`인가?
   - TechIcon 컨테이너가 `rounded-xl`이고 `rounded-full`이 없는가?
   - 이미지 컨테이너 크기가 고정(`w-[72px] h-[72px]`)되어 CLS가 방지되는가?
   - `iconSlug` 없는 기술(Querydsl 등)에 폴백이 있는가?
2. `phases/1-mvp/index.json`의 step 3를 업데이트:
   - 성공 → `"status": "completed"`, `"summary": "생성된 파일 목록과 핵심 결정 한 줄 요약"`
   - 차단 → `"status": "blocked"`, `"blocked_reason": "구체적 사유"` 후 즉시 중단

## 금지사항

- `rounded-full` 아이콘 컨테이너 사용 금지. 이유: UI_GUIDE 안티패턴
- `box-shadow` 글로우 애니메이션 추가 금지. 이유: UI_GUIDE 안티패턴
- SVG 아이콘 파일을 프로젝트에 복사하지 마라. 이유: CDN 방식 사용(ADR-007)
- 카테고리 목록을 컴포넌트에 하드코딩하지 마라. 이유: SKILLS 데이터에서 동적 생성해야 함
- 기존 테스트를 깨뜨리지 마라.
