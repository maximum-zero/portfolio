# Step 1: visual-fixes

## 개요

MVP 분석에서 발견된 시각적 오류 3개를 수정한다.
디자인 의도(PRD/UI_GUIDE)와 실제 구현 간 명백한 불일치를 바로잡는다.

## 읽어야 할 파일

- `docs/PRD.md` — Hero `ZERO` 텍스트 스펙 확인 (line 53)
- `docs/UI_GUIDE.md` — eyebrow 색상·크기 스펙 확인
- `src/app/globals.css` — `text-outline-accent` / `text-outline-ink` 클래스 확인
- `src/components/sections/Hero.tsx` — ZERO 텍스트 현재 구현 확인
- `src/components/sections/CoreStrengths.tsx` — eyebrow 색상 확인
- `src/components/ui/TechIcon.tsx` — boxShadow 하드코딩 확인

## 작업

### 1. `src/components/sections/Hero.tsx` — ZERO outline 색상 수정

PRD line 53: `ZERO: .text-outline-accent (lime stroke, transparent fill)`

현재 `text-outline-ink` → `text-outline-accent`로 변경한다.

변경 대상 줄을 찾아 클래스명만 교체한다. 다른 코드는 건드리지 않는다.

### 2. `src/components/sections/CoreStrengths.tsx` — eyebrow 색상 수정

UI_GUIDE 기준: eyebrow는 `text-accent` 색상을 사용한다.

현재 eyebrow 요소에서 `text-ink-muted` → `text-accent`로 변경한다.

### 3. `src/components/ui/TechIcon.tsx` — 다크모드 shadow 수정

현재 하드코딩된 `boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)'` 를
CSS 클래스 방식으로 교체한다.

`globals.css`에 아래 유틸 클래스를 추가한다:

```css
.shadow-icon {
  box-shadow:
    0 2px 8px color-mix(in oklab, var(--color-ink) 8%, transparent),
    0 1px 3px color-mix(in oklab, var(--color-ink) 5%, transparent);
}
```

TechIcon에서 인라인 `boxShadow` 스타일 제거 후 `className`에 `shadow-icon` 추가.

## Acceptance Criteria

```bash
npm run build
npm test
```

## 검증 절차

1. 브라우저에서 확인:
   - Hero 섹션 "ZERO NOISE." 에서 ZERO가 라임색 outline으로 표시되는가?
   - CoreStrengths eyebrow 텍스트가 accent(라임) 색상인가?
   - TechStack 다크모드에서 아이콘 shadow가 검게 튀지 않는가?
2. 완료 후 `phases/2-qa/index.json` step 1 업데이트:
   - 성공 → `"status": "completed"`, `"summary": "수정 내용 한 줄 요약"`
   - 차단 → `"status": "blocked"`, `"blocked_reason": "구체적 사유"` 후 즉시 중단

## 금지사항

- `globals.css` 외 다른 파일에 hex 색상을 하드코딩하지 마라
- 변경 범위 외 다른 스타일을 수정하지 마라
- 기존 테스트를 깨뜨리지 마라
