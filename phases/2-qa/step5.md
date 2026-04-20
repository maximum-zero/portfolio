# Step 5: inline-style-cleanup

## 읽어야 할 파일

- `src/app/globals.css` — @theme 블록에서 `surface`, `card` 토큰 매핑 확인
- `src/components/ui/ProjectModal.tsx` — `borderLeft` 인라인 스타일 위치 확인
- `src/components/sections/Contact.tsx` — `background: 'var(--color-surface)'` 확인
- `src/components/sections/Blog.tsx` — `background: 'var(--color-surface)'` 확인
- `src/components/layout/Nav.tsx` — `color-mix(...)` 인라인 스타일 확인
- `src/components/layout/FloatingActions.tsx` — `color-mix(...)` 인라인 스타일 확인
- `phases/2-qa/index.json` — step 상태 확인

## 작업

### 1. `src/app/globals.css` — glass 변수 추가

Nav·FloatingActions에서 반복 사용되는 반투명 배경값을 CSS 변수로 추출.

`:root` 블록에 추가:

```css
--color-surface-glass: color-mix(in oklab, var(--color-surface) 85%, transparent);
```

### 2. `src/components/layout/Nav.tsx` + `src/components/layout/FloatingActions.tsx` — color-mix 인라인 제거

현재 두 컴포넌트 모두 동일한 `color-mix(in oklab, var(--color-surface) 85%, transparent)` 인라인 사용.
`var(--color-surface-glass)` 참조로 교체.

```tsx
// 변경 전
style={{ background: 'color-mix(in oklab, var(--color-surface) 85%, transparent)' }}
// 변경 후
style={{ background: 'var(--color-surface-glass)' }}
```

### 3. `src/app/globals.css` + `src/components/ui/ProjectModal.tsx` — accent border 클래스화

ProjectModal `SectionBlock`의 `borderLeft: '3px solid var(--color-accent)'` 인라인 제거.

`globals.css`에 추가:

```css
.border-l-accent {
  border-left: 3px solid var(--color-accent);
}
```

> **주의**: Tailwind v4에서 `border-l-[3px] border-accent` 조합은 border-color가 적용되지 않을 수 있다. CSS 클래스 방식 사용.

SectionBlock div에서 인라인 `borderLeft` 제거 후 `className`에 `border-l-accent` 추가.

### 4. `src/components/sections/Contact.tsx` + `src/components/sections/Blog.tsx` — bg-surface 클래스화

`globals.css` `@theme` 블록에 `--color-surface`가 정의되어 있으면 Tailwind v4가 `bg-surface` 유틸을 자동 생성한다.

`@theme` 블록 확인 후:

- `bg-surface`가 작동하면 `style={{ background: 'var(--color-surface)' }}` → `className` 에 `bg-surface` 추가
- 작동하지 않으면 인라인 유지(강제 변경 금지)

## Acceptance Criteria

```bash
npm run build
npm test
```

## 검증 절차

1. 인라인 스타일 제거 후 시각적 결과가 동일한가?
2. 다크모드에서 Nav/FloatingActions 반투명 배경이 정상인가?
3. ProjectModal SectionBlock의 accent 좌측 border가 표시되는가?
4. `phases/2-qa/index.json` step 5 업데이트:
   - 성공 → `"status": "completed"`, `"summary": "수정 내용 한 줄 요약"`
   - 차단 → `"status": "blocked"`, `"blocked_reason": "구체적 사유"` 후 즉시 중단

## 금지사항

- 인라인 스타일 제거 시 시각적 결과가 달라지면 원상복구하고 인라인 유지
- `globals.css`에 컴포넌트 전용 one-off 클래스를 추가하지 마라. 재사용 가능한 유틸만 추가
- 기존 테스트를 깨뜨리지 마라
