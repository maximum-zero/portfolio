# Step 6: component-review

## 읽어야 할 파일

- `docs/ARCHITECTURE.md` — Server/Client 컴포넌트 분류표 확인
- `docs/ADR.md` — 기존 ADR 목록 및 번호 확인
- `src/components/sections/CoreStrengths.tsx` — `'use client'` + Framer Motion 사용 확인
- `src/components/sections/Experience.tsx` — `'use client'` + Framer Motion 사용 확인
- `phases/2-qa/index.json` — step 상태 확인

## 작업

Framer Motion `whileInView` 애니메이션 사용으로 인해 `'use client'`가 된 컴포넌트를 docs에 반영한다.
코드 변경 없이 **문서만 업데이트**한다.

### 1. `docs/ARCHITECTURE.md` — Client Component 예외 기록

컴포넌트 분류표에서 `CoreStrengths`, `Experience`의 타입을 현실에 맞게 수정하고 사유를 기록.

추가할 내용:

```
> **참고**: CoreStrengths, Experience는 Framer Motion whileInView 애니메이션을 위해
> 'use client'로 구현됨. 데이터 fetch 없이 애니메이션만 사용하는 경우에도
> Framer Motion은 Client Component를 요구한다.
```

### 2. `docs/ADR.md` — ADR 추가

기존 ADR 최대 번호 확인 후 다음 번호로 추가.

```markdown
## ADR-00X: Framer Motion 사용 컴포넌트는 Client Component

**상태**: 채택

**배경**:
Framer Motion의 `motion.*`, `whileInView`, `useReducedMotion` 등은 브라우저 API에 의존하므로
`'use client'` 없이 사용할 수 없다.

**결정**:
Framer Motion을 사용하는 섹션 컴포넌트는 인터랙션이 없더라도 `'use client'`를 선언한다.
애니메이션이 필요 없는 컴포넌트(Certs, Portfolio, Blog 등)는 Server Component로 유지한다.

**영향**:
CoreStrengths, Experience, Hero, Contact — `'use client'`
```

## Acceptance Criteria

```bash
npm run build
```

## 검증 절차

1. `docs/ARCHITECTURE.md`에 CoreStrengths, Experience의 Client Component 사유가 기록됐는가?
2. `docs/ADR.md`에 Framer Motion 관련 ADR이 추가됐는가?
3. `phases/2-qa/index.json` step 6 업데이트:
   - 성공 → `"status": "completed"`, `"summary": "업데이트된 파일 목록 한 줄 요약"`
   - 차단 → `"status": "blocked"`, `"blocked_reason": "구체적 사유"` 후 즉시 중단

## 금지사항

- CoreStrengths, Experience를 Server Component로 전환하지 마라. 문서 업데이트만 수행
- 기존 ADR 내용을 수정하지 마라. 새 ADR을 추가만 한다
- 기존 테스트를 깨뜨리지 마라
