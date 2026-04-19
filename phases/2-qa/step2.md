# Step 2: layout-spacing

## 개요

섹션 간 패딩·간격 불일치와 컴포넌트별 카드 패딩 불일치를 통일한다.
기준: 대부분의 섹션이 사용하는 `var(--section-pad)` (120px) 와 카드 `p-7`.

## 읽어야 할 파일

- `src/app/globals.css` — `--section-pad` 값 확인
- `src/components/sections/Certs.tsx` — 현재 `py-24 md:py-32` 사용 중
- `src/components/layout/Footer.tsx` — 현재 `py-10` 사용 중
- `src/components/sections/Contact.tsx` — ContactRow 카드 패딩 확인
- `src/components/layout/FloatingActions.tsx` — `bottom-5 right-5` 확인
- `src/components/sections/Hero.tsx` — eyebrow tracking 확인

## 작업

### 1. `src/components/sections/Certs.tsx` — 섹션 패딩 통일

현재 `className="py-24 md:py-32"` → 다른 섹션과 동일하게 `style={{ padding: 'var(--section-pad) 0' }}` 방식으로 변경한다.

섹션 최상위 래퍼 요소를 찾아 패딩 방식을 통일한다.

> **참고**: PRD line 90 "Experience 바로 아래 배치 (padding-top 없음)" 항목은 현재 두 섹션 사이 간격이 이미 적절하다면 유지. 단, 패딩 방식 자체는 `var(--section-pad)` 기준으로 통일한다.

### 2. `src/components/layout/FloatingActions.tsx` — FAB 위치 수정

PRD line 40: `fixed bottom-6 right-6`

현재 `bottom-5 right-5` → `bottom-6 right-6`으로 수정한다.

### 3. `src/components/sections/Hero.tsx` — eyebrow tracking 수정

현재 `tracking-[0.28em]` → UI_GUIDE 기준 `tracking-[0.15em]`으로 변경한다.

eyebrow 요소를 찾아 tracking 값만 수정한다.

### 4. `src/components/sections/Contact.tsx` — 카드 패딩 통일 (선택)

> ⚠️ 이 항목은 선택 사항이다. Contact 섹션의 ContactRow가 `px-5 py-5`를 사용 중.
> 다른 카드가 `p-7`을 사용하므로 통일 여부를 판단 후 적용한다.
> ContactRow의 시각적 균형이 `p-7`로 더 나아 보이는 경우에만 변경한다.

## Acceptance Criteria

```bash
npm run build
npm test
```

## 검증 절차

1. 브라우저에서 확인:
   - Certs 섹션 위아래 여백이 다른 섹션과 동일한가?
   - FAB가 우하단 `bottom-6 right-6` 위치에 있는가?
   - Hero eyebrow 텍스트 자간이 좁아졌는가?
2. 완료 후 `phases/2-qa/index.json` step 2 업데이트

## 금지사항

- `Footer.tsx`의 패딩은 의도적으로 작게 유지될 수 있으므로 건드리지 않는다
- 기존 테스트를 깨뜨리지 마라
