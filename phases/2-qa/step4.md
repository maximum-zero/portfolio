# Step 4: content-policy

## 읽어야 할 파일

- `docs/PRD.md` — Nav 구성 (line 34), Portfolio 섹션 스펙 (line 93)
- `src/components/layout/Nav.tsx` — 현재 NAV_ITEMS 배열 확인
- `src/components/sections/Portfolio.tsx` — 섹션 h2 제목 확인
- `src/components/ui/ProjectModal.tsx` — links 렌더링 로직 확인
- `src/data/projects.ts` — 첫 번째 프로젝트 `live: ''` 확인
- `src/data/profile.ts` — BLOG_URL 값 확인
- `phases/2-qa/index.json` — step 상태 확인

## 작업

### 1. `src/components/layout/Nav.tsx` — nav 항목 정리

현재 5개(역량, 기술, 경험, 프로젝트, 연락) → **4개(역량, 기술, 경험, 프로젝트)** 로 축소.
이유: 연락 섹션은 페이지 맨 하단에 위치해 스크롤로 자연스럽게 도달 가능. nav 밀도를 줄여 핵심 섹션에 집중.

`NAV_ITEMS` 배열에서 `{ label: '연락', id: 'contact' }` 항목 제거.

### 2. `src/components/sections/Portfolio.tsx` — 섹션 제목 변경

현재 h2 `포트폴리오` → `프로젝트`.
이유: "포트폴리오"는 페이지 전체를 가리키는 단어. 섹션 제목은 "프로젝트"가 더 직관적.
eyebrow `Selected Work`는 그대로 유지.

### 3. `src/components/ui/ProjectModal.tsx` — live URL 없으면 링크 미렌더

현재 `links` 객체를 `Object.entries`로 순회해 값이 있는 것만 렌더하나,
`live: ''` 빈 문자열이 falsy하므로 이미 필터되고 있는지 확인한다.

```tsx
// 현재 코드 확인
const links = Object.entries(project.links).filter(([, v]) => v)
```

`''`(빈 문자열)은 falsy이므로 이미 필터됨. 동작 확인 후 별도 수정 불필요 시 패스.
만약 빈 문자열이 렌더되고 있다면 `Boolean(v)` 조건으로 명시적 처리 추가.

### 4. Blog 섹션 — 현행 유지 확인

`BLOG_URL: ''` → `Blog` 컴포넌트가 `null` 반환하는 동작 확인만. 코드 변경 없음.

## Acceptance Criteria

```bash
npm run build
npm test
```

## 검증 절차

1. 브라우저에서 확인:
   - Nav에 역량/기술/경험/프로젝트 4개만 표시되는가?
   - Portfolio 섹션 h2가 "프로젝트"로 표시되는가?
   - `live: ''`인 프로젝트 모달에서 Live 링크가 미노출되는가?
   - Blog 섹션이 페이지에 렌더되지 않는가?
2. `phases/2-qa/index.json` step 4 업데이트:
   - 성공 → `"status": "completed"`, `"summary": "수정 내용 한 줄 요약"`
   - 차단 → `"status": "blocked"`, `"blocked_reason": "구체적 사유"` 후 즉시 중단

## 금지사항

- `BLOG_URL`에 임의 URL을 채우지 마라. 현행 유지
- Nav에 Certs·Blog 항목을 추가하지 마라
- `live` 필드가 있는 다른 프로젝트의 링크를 건드리지 마라
- 기존 테스트를 깨뜨리지 마라
