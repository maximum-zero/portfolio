# Step 2: layout-spacing

## 읽어야 할 파일

- `docs/PRD.md` — FAB 위치 스펙 (line 40), Certs 배치 (line 90)
- `docs/UI_GUIDE.md` — eyebrow tracking 스펙
- `src/app/globals.css` — `--section-pad` 값 확인
- `src/components/sections/Certs.tsx` — 현재 `py-24 md:py-32` 사용 중
- `src/components/layout/FloatingActions.tsx` — 현재 `bottom-5 right-5`
- `src/components/sections/Hero.tsx` — eyebrow tracking 현재값
- `src/components/sections/Contact.tsx` — ContactRow 패딩 현재값
- `phases/2-qa/index.json` — step 상태 확인

## 작업

### 1. `src/components/sections/Certs.tsx` — 섹션 패딩 통일

현재 `className="py-24 md:py-32"` → 다른 섹션과 동일한 방식으로 변경.
이유: 섹션 간 여백이 Certs만 달라 시각적 리듬이 깨짐.

```tsx
// 변경 전
<section className="py-24 md:py-32">
// 변경 후
<section style={{ padding: 'var(--section-pad) 0' }}>
```

### 2. `src/components/layout/FloatingActions.tsx` — FAB 위치 수정

PRD line 40: `fixed bottom-6 right-6` 명시.
현재 `bottom-5 right-5` → `bottom-6 right-6`

### 3. `src/components/sections/Hero.tsx` — eyebrow tracking 수정

현재 `tracking-[0.28em]` → UI_GUIDE 기준 `tracking-[0.15em]`.
이유: 0.28em은 다른 섹션 eyebrow(0.2em)보다 지나치게 넓어 이질감.

### 4. `src/components/sections/Contact.tsx` — ContactRow 패딩 통일

현재 ContactRow `px-5 py-5`(20px) → `p-7`(28px).
이유: 다른 섹션 카드는 모두 `p-7` 사용. Contact만 다른 패딩으로 일관성 깨짐.

## Acceptance Criteria

```bash
npm run build
npm test
```

## 검증 절차

1. 브라우저에서 확인:
   - Certs 섹션 위아래 여백이 다른 섹션(Experience, Portfolio 등)과 동일한가?
   - FAB가 우하단 `bottom-6 right-6` 위치에 있는가?
   - Hero eyebrow 텍스트 자간이 다른 섹션 eyebrow와 비슷한가?
   - Contact 카드 내부 여백이 다른 카드와 균형이 맞는가?
2. `phases/2-qa/index.json` step 2 업데이트:
   - 성공 → `"status": "completed"`, `"summary": "수정 내용 한 줄 요약"`
   - 차단 → `"status": "blocked"`, `"blocked_reason": "구체적 사유"` 후 즉시 중단

## 금지사항

- `Footer.tsx` 패딩(`py-10`)은 의도적으로 작게 유지. 수정하지 마라
- 기존 테스트를 깨뜨리지 마라
