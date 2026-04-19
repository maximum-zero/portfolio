# Step 5: portfolio

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `/docs/PRD.md` — Portfolio(섹션 6), ProjectModal 스펙 확인
- `/docs/UI_GUIDE.md` — 카드 그리드, 모달, 색상 토큰, 애니메이션
- `/docs/ADR.md` — ADR-005 Modal + URL 쿼리 스트링 방식
- `/docs/ARCHITECTURE.md` — ProjectList, ProjectModal 데이터 흐름 확인
- `/src/types/project.ts` — Project, ProjectDetail 타입 확인 (현재 ProjectDetail이 Project 안에 중첩)
- `/src/data/projects.ts` — PROJECTS 데이터 확인
- `/src/app/page.tsx` — 현재 페이지 구조 확인
- `phases/1-mvp/index.json` — 이전 step summary 확인

이전 step에서 만들어진 코드를 꼼꼼히 읽고, 설계 의도를 이해한 뒤 작업하라.

## 작업

Portfolio 섹션을 구현하고 page.tsx에 연결한다. 이 step 완료 후 dev 서버에서 프로젝트 카드 그리드와 클릭 시 상세 모달이 동작해야 한다.

### 현재 데이터 타입 주의사항

`src/types/project.ts`의 구조가 ARCHITECTURE.md 스펙과 다르다:

- `ProjectDetail`이 `Project`를 extend하지 않고 `Project.detail: ProjectDetail`로 중첩됨
- `Project.techStack: string[]` (ARCHITECTURE.md의 `stack`과 이름 다름)
- `Project.links: ProjectLink` (githubBe, githubFe, githubInfra, live)
- `Project.summary: string` (카드용 한 줄 설명)
- `ProjectDetail.role?: string` (팀 프로젝트만)
- `ProjectDetail.overview: string`

컴포넌트를 구현할 때 **현재 존재하는 타입 구조를 그대로 사용**한다. 타입을 수정하지 않는다.

### 1. `src/components/ui/ProjectModal.tsx` 생성 — `'use client'`

PRD 스펙:

- 중앙 팝업, `max-w-2xl`, `max-h-[90vh] overflow-y-auto`
- 배경 오버레이 클릭 시 닫힘
- 전체 좌측 정렬

**인터페이스:**

```tsx
interface ProjectModalProps {
  project: Project
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
}
```

**모달 헤더:**

- 프로젝트명(`title`), 한 줄 설명(`summary`), 기술 태그(`techStack`), 역할(`detail.role`, 있을 때만), 기간(`period`)
- 관련 링크: `links.githubBe`, `links.githubFe`, `links.githubInfra`, `links.live` — 각각 비어있지 않으면 렌더

**핵심 요약 블록** (accent 좌측 border: `border-l-2 border-accent pl-4`):

- 핵심 문제: `detail.problem[]`
- 해결 방법: `detail.solution[]`
- 결과: `detail.result[]`

**상세 내용:** `detail.overview` 전체 설명

**이전/다음 버튼:** `onPrev`, `onNext` prop이 있을 때만 렌더

**Framer Motion:** 모달 진입 시 `scale: 0.95 → 1.0`, `opacity: 0 → 1`

**ADR-005 스크롤 락:** 모달 열릴 때 `document.body.style.overflow = 'hidden'`, 닫힐 때 복원

### 2. `src/components/ui/ProjectList.tsx` 생성 — `'use client'`

카드 그리드 + Modal 상태 + URL 쿼리 관리.

**인터페이스:**

```tsx
interface ProjectListProps {
  projects: Project[]
}
```

**구현 규칙:**

- `useSearchParams()`로 초기 `?project={id}` 파싱해 Modal 초기 상태 복원
- `useRouter()`로 Modal 열기: `router.push('?project={id}')`, 닫기: `router.replace('/')`
- `useState<Project | null>(null)` — 선택된 프로젝트
- 카드 그리드: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

**카드 구성:**

- 연도(`year` 필드가 없으므로 `period`의 앞 4자리 또는 `period` 그대로 사용), 제목(`title`), 설명(`summary`), 기술 태그(`techStack`) — 최대 4개 노출
- `bg-card border border-line rounded-xl p-6 cursor-pointer` (hover 시 `border-accent/40` transition)
- `font-mono text-xs text-ink-muted` (연도/기간), `font-body text-lg font-semibold text-ink` (제목)

**더보기:** 초기 4개 노출 → "더 보기" 버튼 → 전체 노출

- PROJECTS가 4개 이하면 더보기 버튼 미노출

`ProjectList`는 `<Suspense>`로 감싸야 하므로, `Portfolio.tsx`에서 래핑한다 (ADR-005).

### 3. `src/components/sections/Portfolio.tsx` 생성 — Server Component

PRD 섹션 헤더:

- eyebrow: `Selected Work`
- h2: `포트폴리오`
- 한 줄: `주요 프로젝트를 클릭하면 세부 내용을 확인할 수 있습니다.`

`PROJECTS` 데이터를 import해 `ProjectList`에 props로 전달한다.
`ProjectList`를 `<Suspense fallback={<div>...</div>}>`로 감싼다 (ADR-005 요구사항).

### 4. `src/app/page.tsx` 수정 — Portfolio 연결

`<section id="portfolio" />`를 Portfolio 컴포넌트로 교체한다.

### 5. 테스트 파일 생성

`src/components/ui/ProjectModal.test.tsx`: 모달이 project title을 렌더하는지, 닫기 버튼이 onClose를 호출하는지 확인
`src/components/sections/Portfolio.test.tsx`: 섹션 헤더 텍스트 렌더 확인

`useRouter`, `useSearchParams` 모킹:

- `src/test/mocks/next-navigation.ts`를 생성하고 `vitest.config.ts` alias에 `next/navigation`으로 추가한다

## Acceptance Criteria

```bash
npm run build
npm test
```

## 검증 절차

1. 아키텍처 체크리스트:
   - `ProjectModal`, `ProjectList`는 `'use client'`인가?
   - `Portfolio.tsx`는 Server Component인가?
   - `ProjectList`가 `<Suspense>`로 감싸져 있는가?
   - Modal URL 관리: `router.push('?project={id}')` / `router.replace('/')`가 올바르게 사용되는가?
   - 스크롤 락(`document.body.style.overflow`)이 Modal 열기/닫기에 적용되는가?
2. `phases/1-mvp/index.json`의 step 5를 업데이트:
   - 성공 → `"status": "completed"`, `"summary": "생성된 파일 목록과 핵심 결정 한 줄 요약"`
   - 차단 → `"status": "blocked"`, `"blocked_reason": "구체적 사유"` 후 즉시 중단

## 금지사항

- `Project`, `ProjectDetail` 타입을 수정하지 마라. 이유: 이 step의 범위가 아니며, 기존 데이터가 이 타입을 사용
- Modal에 `backdrop-filter: blur()` 사용 금지. 이유: UI_GUIDE 안티패턴
- 더보기 없이 전체 카드를 처음부터 렌더하지 마라. 이유: PRD 스펙에 초기 4개 노출 명시
- 기존 테스트를 깨뜨리지 마라.
