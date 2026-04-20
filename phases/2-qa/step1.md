# Step 1: visual-fixes

## 읽어야 할 파일

- `docs/PRD.md` — Hero ZERO 텍스트 스펙 (line 53)
- `docs/UI_GUIDE.md` — text-outline-accent 정의, eyebrow 색상 스펙
- `src/app/globals.css` — text-outline-accent / text-outline-ink 클래스 확인
- `src/components/sections/Hero.tsx` — ZERO span 현재 클래스 확인
- `src/components/ui/TechIcon.tsx` — boxShadow 인라인 스타일 확인
- `phases/2-qa/index.json` — step 상태 확인

## 작업

### 1. `src/components/sections/Hero.tsx` — ZERO outline 색상 수정

PRD 명시: `ZERO: .text-outline-accent (lime stroke, transparent fill)`
현재 `text-outline-ink`(검은 stroke) → `text-outline-accent`(lime stroke)로 변경.

### 2. `src/components/ui/TechIcon.tsx` + `src/app/globals.css` — 다크모드 shadow 수정

현재 `boxShadow: 'rgba(0,0,0,...)'` 하드코딩 → 다크모드에서 검은 그림자 노출.
`color-mix`로 현재 ink 색상 기준 shadow를 계산하도록 CSS 클래스 방식으로 교체.

`globals.css`에 추가:

```css
.shadow-icon {
  box-shadow:
    0 2px 8px color-mix(in oklab, var(--color-ink) 8%, transparent),
    0 1px 3px color-mix(in oklab, var(--color-ink) 5%, transparent);
}
```

TechIcon 컨테이너 div에서 인라인 `style={{ boxShadow: ... }}` 제거 후 `className`에 `shadow-icon` 추가.

### 3. `docs/UI_GUIDE.md` — 섹션 eyebrow 색상 스펙 현실화

현재 docs가 `text-accent`로 명시되어 있으나 실제 구현은 `text-ink-muted`.
"ZERO NOISE" 컨셉상 절제된 muted 색상이 의도에 더 부합하므로 docs를 현실에 맞게 수정.

타입 테이블의 `섹션 eyebrow` 행: `text-accent` → `text-ink-muted`

## Acceptance Criteria

```bash
npm run build
npm test
```

## 검증 절차

1. 브라우저에서 확인:
   - Hero "ZERO NOISE."에서 ZERO가 라임색 outline으로 표시되는가?
   - TechStack 다크모드에서 아이콘 shadow가 검은색으로 튀지 않는가?
   - UI_GUIDE.md 섹션 eyebrow 행이 `text-ink-muted`로 업데이트됐는가?
2. `phases/2-qa/index.json` step 1 업데이트:
   - 성공 → `"status": "completed"`, `"summary": "수정 내용 한 줄 요약"`
   - 차단 → `"status": "blocked"`, `"blocked_reason": "구체적 사유"` 후 즉시 중단

## 금지사항

- `globals.css` 외 다른 파일에 hex 색상을 하드코딩하지 마라
- 변경 범위(Hero ZERO, TechIcon shadow, UI_GUIDE) 외 다른 스타일을 수정하지 마라
- 기존 테스트를 깨뜨리지 마라
