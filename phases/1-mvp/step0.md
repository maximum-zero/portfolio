# Step 0: data-foundation

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `/docs/ARCHITECTURE.md`
- `/docs/PRD.md`
- `/src/types/career.ts` — 기존 CareerItem 타입 확인
- `/src/types/project.ts` — 기존 Project/ProjectDetail 타입 확인
- `/src/types/skill.ts` — 기존 SkillGroup/SkillItem 타입 확인
- `/src/data/profile.ts` — 기존 PROFILE, INTRO, CORE_STRENGTHS 확인
- `/src/data/career.ts` — 기존 CAREER 데이터 확인
- `/src/data/projects.ts` — 기존 PROJECTS 데이터 확인
- `/src/data/skills.ts` — 기존 SKILLS 데이터 확인

## 작업

이 step은 UI가 없는 데이터 레이어다. 누락된 타입·데이터 파일을 추가하고 유틸리티 함수를 작성한다.

### 1. `src/types/career.ts` 수정 — CertItem 추가

기존 `CareerItem`은 그대로 유지하고 아래 타입을 파일 끝에 추가한다:

```ts
export interface CertItem {
  name: string // 예: "정보처리기사"
  date: string // 예: "2016.05"
  org: string // 예: "한국산업인력공단"
}
```

### 2. `src/types/blog.ts` 생성

```ts
export interface BlogPost {
  title: string
  date: string // 예: "2026.04"
  url: string // 외부 블로그 포스트 URL
}
```

### 3. `src/types/profile.ts` 생성

Pillars 섹션용 타입이다:

```ts
export interface PillarItem {
  title: string // 예: "성능 최적화"
  description: string // 예: "병목을 찾고, 수치로 증명합니다"
}
```

### 4. `src/data/profile.ts` 수정 — PILLARS 추가

기존 PROFILE, INTRO, CORE_STRENGTHS는 그대로 유지하고, 아래 상수를 파일 끝에 추가한다.
PRD에 정의된 3개 pillar 텍스트를 그대로 사용한다:

```ts
import type { PillarItem } from '@/types/profile'

export const PILLARS: PillarItem[] = [
  { title: '성능 최적화', description: '병목을 찾고, 수치로 증명합니다' },
  { title: '안정성 설계', description: '트래픽이 몰려도 데이터는 지킵니다' },
  { title: '풀스택 관점', description: '프론트에서 DB까지, 전체를 봅니다' },
]
```

### 5. `src/data/certs.ts` 생성

실제 자격증 데이터를 입력한다. 아래는 예시 구조이며, 실제 보유 자격증으로 교체한다:

```ts
import type { CertItem } from '@/types/career'

export const CERTS: CertItem[] = [
  { name: '정보처리기사', date: '2019.08', org: '한국산업인력공단' },
]
```

### 6. `src/data/blog.ts` 생성

BLOG_URL이 비어있으면 Blog 섹션이 숨겨지므로, 현재는 빈 배열로 생성한다:

```ts
import type { BlogPost } from '@/types/blog'

export const BLOG_POSTS: BlogPost[] = []
```

### 7. `src/lib/utils.ts` 생성

`SKILLS`(SkillGroup[]) 에서 이름으로 SkillItem을 찾는 헬퍼와 모든 기술 목록을 평탄화하는 헬퍼를 작성한다:

```ts
import { SKILLS } from '@/data/skills'
import type { SkillItem } from '@/types/skill'

export function getSkillByName(name: string): SkillItem | undefined
export function getAllSkills(): SkillItem[]
```

### 8. `src/lib/utils.test.ts` 생성

`getSkillByName`, `getAllSkills` 각각에 대해 happy path와 엣지 케이스(존재하지 않는 이름) 테스트를 작성한다.

## Acceptance Criteria

```bash
npm run build
npm test
```

## 검증 절차

1. 아키텍처 체크리스트:
   - 새로운 타입은 모두 `src/types/` 폴더에 위치하는가?
   - 새로운 데이터는 모두 `src/data/` 폴더에 위치하는가?
   - 기존 타입(CareerItem, Project, SkillGroup 등)이 수정·삭제되지 않았는가?
   - `src/data/profile.ts`에 컴포넌트에 하드코딩될 수 있는 텍스트가 이동됐는가?
2. 완료 후 `phases/1-mvp/index.json`의 step 0을 업데이트:
   - 성공 → `"status": "completed"`, `"summary": "생성된 파일 목록과 핵심 결정 한 줄 요약"`
   - 차단 → `"status": "blocked"`, `"blocked_reason": "구체적 사유"` 후 즉시 중단

## 금지사항

- 기존 `CareerItem`, `Project`, `ProjectDetail`, `SkillGroup`, `SkillItem` 타입을 수정하지 마라. 이 단계는 추가만 한다.
- `src/data/profile.ts`의 PROFILE, INTRO, CORE_STRENGTHS를 삭제하거나 이름을 바꾸지 마라. `layout.tsx`가 이들을 import하고 있다.
- 기존 테스트를 깨뜨리지 마라.
