# 아키텍처

## 디렉토리 구조

```
src/
├── app/
│   ├── globals.css         # @theme 토큰 정의 — 색상·폰트 단일 관리
│   ├── layout.tsx          # 루트 레이아웃 (폰트 변수 주입, 메타데이터, OG, Flash 방지 스크립트)
│   ├── page.tsx            # 메인 페이지 (모든 섹션 조립)
│   └── opengraph-image.tsx # next/og 동적 OG 이미지 생성
├── components/
│   ├── layout/
│   │   ├── Nav.tsx             # fixed top-6 pill nav + 모바일 드롭다운 (Client, useActiveSection hook)
│   │   ├── FloatingActions.tsx # 우하단 FAB (Client)
│   │   └── Footer.tsx          # 슬로건 + Copyright
│   ├── sections/
│   │   ├── Hero.tsx            # 동심원 ring + 슬로건 (Client — Framer Motion)
│   │   ├── CoreStrengths.tsx   # 핵심 역량 텍스트 카드 3개 (Client — Framer Motion)
│   │   ├── TechStack.tsx       # 기술 아이콘 — TechStackClient 포함 (Server 래퍼)
│   │   ├── Experience.tsx      # 경력·교육 통합 타임라인 (Client — Framer Motion)
│   │   ├── Certs.tsx           # 자격증 목록 (Server)
│   │   ├── Portfolio.tsx       # 프로젝트 — ProjectList 포함 (Server 래퍼)
│   │   ├── Blog.tsx            # 블로그 포스트 목록 (Server)
│   │   └── Contact.tsx         # 연락처 목록 (Client — Framer Motion)
│   └── ui/
│       ├── TechIcon.tsx        # Simple Icons CDN + rounded-xl 컨테이너(w/h 고정) + CSS 툴팁
│       ├── ProjectModal.tsx    # 프로젝트 상세 팝업 + URL 쿼리 스트링 (Client)
│       ├── ProjectList.tsx     # 카드 그리드 + Modal 상태 + history API (Client)
│       └── TechStackClient.tsx # 카테고리 필터 상태 (Client)
├── data/
│   ├── profile.ts          # 이름, 이메일, GitHub URL, 블로그 URL, PILLARS
│   ├── career.ts           # 경력·교육 통합 배열 (ExperienceItem[]) — 시간순 작성, sort는 컴포넌트에서
│   ├── certs.ts            # 자격증 목록 (CertItem[])
│   ├── projects.ts         # 프로젝트 데이터 (ProjectDetail[])
│   ├── skills.ts           # export const SKILLS: Skill[] — 카테고리 6개
│   └── blog.ts             # 블로그 포스트 메타데이터 (BlogPost[])
├── types/
│   ├── profile.ts          # PillarItem
│   ├── career.ts           # ExperienceItem, CertItem
│   ├── project.ts          # Project, ProjectDetail
│   ├── skill.ts            # Skill, SkillCategory
│   └── blog.ts             # BlogPost
└── lib/
    └── utils.ts            # getSkillByName(name) 등 데이터 유틸
```

## 패턴

- **Server Components 기본**: 정적 콘텐츠를 렌더링하는 섹션은 서버 컴포넌트
- **Client Component 예외**: 인터랙션 또는 Framer Motion 사용 컴포넌트만 `'use client'` 선언

> **참고**: Hero, CoreStrengths, Experience, Contact는 Framer Motion `whileInView` 애니메이션을 위해
> `'use client'`로 구현됨. 데이터 fetch 없이 애니메이션만 사용하는 경우에도
> Framer Motion은 브라우저 API에 의존하므로 Client Component를 요구한다. (ADR-009 참고)

| 컴포넌트        | 클라이언트 이유                                                  |
| --------------- | ---------------------------------------------------------------- |
| Nav             | 스크롤 감지(useActiveSection), active 섹션 상태, 모바일 드롭다운 |
| FloatingActions | 스크롤 위치 (맨 위로 버튼 노출)                                  |
| Hero            | Framer Motion whileInView 애니메이션                             |
| CoreStrengths   | Framer Motion whileInView 애니메이션                             |
| Experience      | Framer Motion whileInView 애니메이션                             |
| Contact         | Framer Motion whileInView 애니메이션                             |
| TechStackClient | 카테고리 필터 상태                                               |
| ProjectList     | Modal 상태, 선택된 프로젝트, history API                         |
| ProjectModal    | 열림/닫힘, 이전/다음 네비게이션                                  |

## 데이터 흐름

```
정적 데이터 (data/*.ts)
    → Server Component import
    → 렌더 타임에 HTML 생성
    → 클라이언트에 완성된 HTML 전달

TechStack:
    TechStack.tsx(서버) → SKILLS 데이터 → TechStackClient(클라이언트)에 props 전달
    카테고리 탭 클릭 → useState(activeCategory) → opacity 인터랙션

Experience:
    Experience.tsx(클라이언트) → career 데이터 import → 최신순 sort(1회) → 중앙선 타임라인 렌더

Portfolio:
    Portfolio.tsx(서버) → 프로젝트 데이터 → ProjectList(클라이언트)에 props 전달
    카드 클릭 → useState(selectedProject) → ProjectModal 표시
    Modal 열기: router.push('?project={id}') + body overflow hidden
    Modal 닫기: router.replace('/') + body overflow 복원
    페이지 로드: useSearchParams()로 초기 project 복원
    ProjectList는 <Suspense>로 감싸야 함 (useSearchParams 요구사항)

Nav:
    useActiveSection(ids) 훅 → IntersectionObserver → activeId state
    섹션 enter 감지 → active 항목 강조
```

## 데이터 타입

### career.ts

```ts
export type ExperienceType = 'work' | 'edu'

export interface ExperienceItem {
  type: ExperienceType
  from: string // "2024.01"
  to: string // "현재" | "2024.12"
  current?: boolean
  org: string // 회사명 | 교육기관명
  role: string // 직책 | 과정명
  bullets: string[] // 주요 업무/내용
  stack?: string[] // 기술 태그 (선택)
  importance?: 'high' | 'normal' // 기본값 'normal'. 타임라인 강조·필터링용
}

export interface CertItem {
  name: string // "정보처리기사"
  date: string // "2016.05"
  org: string // "한국산업인력공단"
}
```

### skill.ts

```ts
export type SkillCategory = 'all' | 'backend' | 'database' | 'infra' | 'monitoring' | 'frontend'

export interface Skill {
  slug: string        // Simple Icons slug (예: "springboot")
  name: string        // 표시명 (예: "Spring Boot")
  category: SkillCategory
}

// data/skills.ts
export const SKILLS: Skill[] = [ ... ]
```

### project.ts

```ts
export interface Project {
  id: string
  icon: string // Simple Icons slug 또는 이모지
  year: string // "2026"
  title: string
  description: string
  stack: string[] // skills.ts의 Skill.name과 일치해야 함
}

export interface ProjectDetail extends Project {
  role: string // "BE 1명 · FE 1명"
  period: string // "2026.01 ~ 2026.02"
  githubUrl?: string
  liveUrl?: string
  problem: string[] // 핵심 문제 (bullet 배열)
  solution: string[] // 해결 방법 (bullet 배열)
  result: string[] // 결과 (bullet 배열)
  features: string[]
  implementation: string[]
}
```

### blog.ts

```ts
export interface BlogPost {
  title: string
  date: string // "2026.04"
  url: string // 외부 블로그 URL
}
```

## 데이터 일관성

`projects.ts`의 `stack: string[]`은 `skills.ts`의 `Skill.name`과 정확히 일치해야 한다.  
`lib/utils.ts`의 `getSkillByName(name: string): Skill | undefined`로 런타임 검증 가능.

```ts
// lib/utils.ts
import { SKILLS } from '@/data/skills'

export function getSkillByName(name: string) {
  return SKILLS.find((s) => s.name === name)
}
```

## TechIcon CLS 방지

`next/image`로 Simple Icons CDN SVG 로드 시 CLS 방지를 위해 반드시 명시적 크기 지정:

```tsx
// TechIcon.tsx
<div className="rounded-xl bg-white shadow-sm p-3 w-[72px] h-[72px] flex items-center justify-center">
  <Image
    src={`https://cdn.simpleicons.org/${slug}`}
    alt={name}
    width={48}
    height={48}
    unoptimized
  />
</div>
```

- 컨테이너 크기 고정(`w-[72px] h-[72px]`) → 이미지 로드 전후 레이아웃 불변
- `priority` 속성 불필요 (TechStack은 폴드 아래)

---

## 커스텀 훅

### useActiveSection

```ts
// Nav.tsx 내부 또는 hooks/useActiveSection.ts
function useActiveSection(ids: string[]): string {
  // IntersectionObserver로 뷰포트 기준 활성 섹션 ID 반환
  // rootMargin: "-40% 0px -50% 0px" (Claude Design 기준)
}
```

## 상태 관리

- **서버 상태**: 없음 (정적 데이터, fetch 불필요)
- **클라이언트 상태**: `useState` 한정 사용
- **전역 상태 라이브러리 불필요**: Zustand, Jotai 등 도입 안 함

## 빌드 및 배포

- **빌드 방식**: Next.js 기본 빌드 (정적 페이지 + Edge Runtime OG 이미지)
- **배포 플랫폼**: Vercel
- **도메인**: 미정 (vercel.app 서브도메인으로 시작)
- **이미지 최적화**: Next.js Image 컴포넌트, WebP 자동 변환
