# Step 4: experience-certs

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `/docs/PRD.md` — Experience(섹션 4), Certs(섹션 5) 스펙 확인
- `/docs/UI_GUIDE.md` — 레이아웃, 타이포그래피, 애니메이션, importance 스타일 규칙
- `/docs/ADR.md` — ADR-008 Experience 타임라인 통합 방식
- `/src/types/career.ts` — CareerItem, CertItem 타입 확인
- `/src/data/career.ts` — CAREER 데이터 확인 (현재 work 항목만 존재)
- `/src/data/certs.ts` — CERTS 데이터 확인 (Step 0 생성)
- `/src/app/page.tsx` — 현재 페이지 구조 확인
- `phases/1-mvp/index.json` — 이전 step summary 확인

이전 step에서 만들어진 코드를 꼼꼼히 읽고, 설계 의도를 이해한 뒤 작업하라.

## 작업

Experience와 Certs 섹션을 구현하고 page.tsx에 연결한다. 이 step 완료 후 dev 서버에서 경력 타임라인과 자격증 목록이 보여야 한다.

### 현재 데이터 타입 주의사항

`src/types/career.ts`의 `CareerItem`은 ARCHITECTURE.md의 `ExperienceItem`과 다르다:

- `CareerItem`에는 `type: 'work' | 'edu'` 필드가 없음
- `CareerItem`에는 `importance` 필드가 없음
- `from`/`to` 대신 `period: string` 사용
- `tasks: string[]`가 bullets 역할

Experience 섹션은 **현재 존재하는 `CareerItem` 타입을 그대로 사용**해 구현한다. 타입을 수정하거나 ARCHITECTURE.md 스펙에 맞춰 리팩토링하지 않는다.

### 1. `src/components/sections/Experience.tsx` 생성 — Server Component

PRD 섹션 헤더:

- eyebrow: `Experience`
- h2: `경험`
- 한 줄: `일과 배움을 하나의 타임라인으로.`

**타임라인 레이아웃 (중앙선 alternating):**

- 최대 너비: `max-w-3xl mx-auto`
- 중앙에 세로 선 (`border-l-2 border-line` 또는 `border-r-2` 조합으로 alternating)
- CAREER 배열을 그대로 사용 (이미 최신→과거 순 정렬 가정, 서버에서 추가 sort 불필요)
- 짝수 인덱스(0, 2, …) 항목: 중앙선 왼쪽 / 홀수 인덱스(1, 3, …) 항목: 중앙선 오른쪽

**각 항목 카드 구성:**

- 기관명(`company`): `font-body text-lg font-semibold text-ink`
- 직책(`role`): `font-body text-sm text-ink-body`
- 기간(`period`): `font-mono text-xs text-ink-muted`
- 주요 업무(`tasks`): `font-body text-sm font-light text-ink-body leading-relaxed` bullet list
- 카드: `bg-card border border-line rounded-xl p-6`

**모바일:** md 미만에서는 alternating 없이 단일 컬럼 타임라인으로 단순화

**Framer Motion:** 각 카드 `whileInView` slide-up, `once: true`, stagger

### 2. `src/components/sections/Certs.tsx` 생성 — Server Component

PRD 스펙:

- eyebrow: `Certifications`
- h2: `자격증`
- Experience 바로 아래 배치 — `pt-0 pb-24 md:pb-32` (섹션 헤더 없이 연속 배치도 가능)

**각 항목:**

- 체크 아이콘(SVG 인라인, `strokeWidth 1.5`, 크기 `18px`, `text-accent`) + 자격증명 + 날짜 · 발급기관
- `font-body text-sm font-light text-ink-body`
- `CERTS` 배열을 map해 렌더

**최대 너비:** `max-w-3xl mx-auto` (Experience와 정렬 일치)

### 3. `src/app/page.tsx` 수정 — Experience + Certs 연결

`<section id="experience" />`를 Experience와 Certs를 포함하는 블록으로 교체한다.
Certs는 id가 별도로 없으므로 `experience` section 안에 포함하거나, 별도 section으로 분리하되 id는 없어도 된다.

```tsx
import Experience from '@/components/sections/Experience'
import Certs from '@/components/sections/Certs'
```

### 4. 테스트 파일 생성

`src/components/sections/Experience.test.tsx`: CAREER 데이터의 첫 번째 company명이 렌더되는지 확인
`src/components/sections/Certs.test.tsx`: CERTS 데이터의 첫 번째 자격증명이 렌더되는지 확인

## Acceptance Criteria

```bash
npm run build
npm test
```

## 검증 절차

1. 아키텍처 체크리스트:
   - Experience, Certs 모두 Server Component인가? (`'use client'` 없음)
   - `CareerItem` 타입이 수정되지 않았는가?
   - 타임라인 콘텐츠가 좌측 정렬인가? (UI_GUIDE: 타임라인 내부는 좌측 정렬)
   - 색상 토큰만 사용하고 hex 직접 사용이 없는가?
2. `phases/1-mvp/index.json`의 step 4를 업데이트:
   - 성공 → `"status": "completed"`, `"summary": "생성된 파일 목록과 핵심 결정 한 줄 요약"`
   - 차단 → `"status": "blocked"`, `"blocked_reason": "구체적 사유"` 후 즉시 중단

## 금지사항

- `CareerItem` 타입을 수정하지 마라. 이유: 이 step의 범위가 아니며, 기존 데이터와 layout.tsx가 이 타입에 의존
- importance 스타일 처리(UI_GUIDE 참조)를 추가하지 마라. 이유: CareerItem에 importance 필드가 없음
- 타임라인 dot에 `box-shadow` 글로우 사용 금지. 이유: UI_GUIDE 안티패턴
- 기존 테스트를 깨뜨리지 마라.
