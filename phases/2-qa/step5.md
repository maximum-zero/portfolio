# Step 5: inline-style-cleanup

## 개요

컴포넌트에 산재된 인라인 스타일을 Tailwind 클래스 또는 CSS 유틸로 교체한다.
유지보수성과 다크모드 일관성을 높이기 위한 정리 작업이다.

## 읽어야 할 파일

- `src/components/ui/ProjectModal.tsx` — `borderLeft` 인라인 스타일 확인
- `src/components/sections/Contact.tsx` — `background: 'var(--color-surface)'` 확인
- `src/components/sections/Blog.tsx` — `background: 'var(--color-surface)'` 확인
- `src/app/globals.css` — 기존 유틸 클래스 확인, 추가 위치

## 작업

### 1. `src/components/ui/ProjectModal.tsx` — accent border 클래스화

현재:

```tsx
style={{ borderLeft: '3px solid var(--color-accent)', ... }}
```

`globals.css`에 유틸 클래스 추가:

```css
.border-l-accent {
  border-left: 3px solid var(--color-accent);
}
```

인라인 `borderLeft` 제거 후 `className`에 `border-l-accent` 추가.

> **주의**: Tailwind v4에서 `border-l-[3px]`과 `border-accent`를 조합하면 border-color가
> 적용되지 않을 수 있다. CSS 클래스 방식이 더 안전하다.

### 2. `src/components/sections/Contact.tsx`, `src/components/sections/Blog.tsx` — bg-surface 클래스화

현재:

```tsx
style={{ background: 'var(--color-surface)' }}
```

Tailwind v4에서 `bg-surface`가 커스텀 토큰으로 정의되어 있는지 확인한다.
`globals.css`의 `@theme` 블록을 확인해 `--color-surface`가 `surface`로 매핑되어 있다면
인라인 스타일을 `className="bg-surface"`로 교체한다.

매핑이 없는 경우 `globals.css`에 추가하거나, 인라인 스타일을 유지한다.

### 3. `src/components/layout/Nav.tsx`, `src/components/layout/FloatingActions.tsx` — color-mix 처리

현재 `color-mix(in oklab, var(--color-surface) 85%, transparent)` 인라인 스타일 사용.

이 값은 CSS 변수로 추출해 재사용성을 높인다:

```css
/* globals.css */
--color-surface-glass: color-mix(in oklab, var(--color-surface) 85%, transparent);
```

인라인 스타일을 `var(--color-surface-glass)` 참조로 교체하거나,
수정 범위가 크다면 현행 유지 후 `globals.css`에 변수만 정의한다.

## Acceptance Criteria

```bash
npm run build
npm test
```

## 검증 절차

1. 인라인 스타일이 제거된 요소들이 시각적으로 동일하게 표시되는가?
2. 다크모드에서도 동일하게 작동하는가?
3. 완료 후 `phases/2-qa/index.json` step 5 업데이트

## 금지사항

- 인라인 스타일 제거 시 시각적 결과가 달라지면 원상복구한다
- `globals.css`에 추가하는 클래스는 컴포넌트별 one-off가 아닌 재사용 가능한 것만 추가한다
- 기존 테스트를 깨뜨리지 마라
