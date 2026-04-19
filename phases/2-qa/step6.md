# Step 6: component-review

## 개요

ARCHITECTURE.md 기준 Server Component로 지정됐으나 `'use client'`로 구현된 컴포넌트를 검토한다.
변경 여부를 결정하고, 문서와 코드를 동기화한다.

## 읽어야 할 파일

- `docs/ARCHITECTURE.md` — Server/Client 컴포넌트 구분 원칙 확인
- `docs/ADR.md` — ADR-001 Server Component 관련 결정 확인
- `src/components/sections/CoreStrengths.tsx` — `'use client'` 사용 이유 확인
- `src/components/sections/Experience.tsx` — `'use client'` 사용 이유 확인

## 현황

| 컴포넌트            | 현재           | ARCHITECTURE.md 명세 | 원인                     |
| ------------------- | -------------- | -------------------- | ------------------------ |
| `CoreStrengths.tsx` | `'use client'` | Server               | Framer Motion 애니메이션 |
| `Experience.tsx`    | `'use client'` | Server               | Framer Motion 애니메이션 |

## 결정 항목 (작업 전 확인)

### 선택지

1. **현행 유지 + ADR 업데이트**
   - 애니메이션 유지, `'use client'` 유지
   - `docs/ADR.md` 또는 `docs/ARCHITECTURE.md`에 예외 사유 기록
   - 권장: 사용자 경험(애니메이션)이 번들 증가보다 가치 있는 경우

2. **Server 컴포넌트로 전환**
   - Framer Motion 제거, CSS animation 또는 Intersection Observer 방식으로 교체
   - 권장: 번들 크기를 최소화하고 싶은 경우

## 작업 (선택지 1: 현행 유지)

`docs/ARCHITECTURE.md` 해당 섹션에 아래 내용 추가:

```markdown
> **예외**: CoreStrengths, Experience는 Framer Motion whileInView 애니메이션을 위해
> 'use client'로 구현됨. 기능적 Server 컴포넌트이나 클라이언트 런타임 필요.
```

## 작업 (선택지 2: Server 전환)

### CoreStrengths.tsx

1. `'use client'` 제거
2. Framer Motion import 제거
3. CSS `@keyframes fade-up` + `animation` 방식으로 교체 (globals.css 활용)
4. `whileInView`를 Tailwind `animate-*` 또는 `[animation-delay]` 방식으로 대체

### Experience.tsx

동일한 방식으로 Framer Motion → CSS animation 교체.

## Acceptance Criteria

```bash
npm run build
npm test
```

## 검증 절차

1. 애니메이션이 정상 동작하는가? (선택지에 따라)
2. 문서와 코드가 일치하는가?
3. 완료 후 `phases/2-qa/index.json` step 6 업데이트

## 금지사항

- 선택지 결정 없이 임의로 Server로 전환하지 마라
- 애니메이션 제거 시 UX 저하 여부를 먼저 브라우저에서 확인한다
- 기존 테스트를 깨뜨리지 마라
