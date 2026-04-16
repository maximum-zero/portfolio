# Step 2: tailwind-v4

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `docs/UI_GUIDE.md` — @theme 토큰 정의, 컴포넌트 스타일 스펙 전체
- `docs/ADR.md` — ADR-004 (미니멀 라이트 모드 단일 테마)
- `CLAUDE.md`
- `package.json` (현재 tailwindcss 버전 확인)
- `src/app/globals.css` (현재 내용 확인 후 교체)
- `postcss.config.mjs` (현재 내용 확인 후 교체)

## 작업

Tailwind CSS를 v3에서 v4로 업그레이드하고, UI_GUIDE에 정의된 디자인 토큰을 `globals.css`에 적용한다.

### 1. Tailwind v4 업그레이드

기존 Tailwind v3 관련 패키지를 제거하고 v4를 설치한다:

```bash
npm uninstall tailwindcss
npm install tailwindcss @tailwindcss/postcss
```

### 2. PostCSS 설정 교체

`postcss.config.mjs`를 v4 방식으로 교체한다:

```js
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
```

### 3. tailwind.config.ts 삭제

Tailwind v4는 `tailwind.config.ts`를 사용하지 않는다. 파일이 존재하면 삭제한다:

```bash
rm -f tailwind.config.ts
```

### 4. globals.css 교체

`src/app/globals.css`를 아래 내용으로 완전히 교체한다.
UI_GUIDE.md의 디자인 토큰을 그대로 적용한다:

```css
@import "tailwindcss";

@theme {
  /* ── 배경 ── */
  --color-surface:      #FAFAF8;
  --color-card:         #EFEDE8;

  /* ── 브랜드 액센트 ── */
  --color-accent:       #8FAF8A;
  --color-accent-sand:  #C4A882;
  --color-accent-wash:  #E8F0E6;

  /* ── 텍스트 ── */
  --color-ink:          #1A1A18;
  --color-ink-body:     #4A4A46;
  --color-ink-muted:    #7A7A74;
  --color-ink-disabled: #ADADAB;

  /* ── 경계선 ── */
  --color-line:         #E2DFD8;
  --color-line-strong:  #C8C4BB;

  /* ── 폰트 ── */
  --font-display: 'Space Grotesk', sans-serif;
  --font-body:    'Pretendard',    sans-serif;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}

body {
  background-color: var(--color-surface);
  color: var(--color-ink);
  font-family: var(--font-body);
}

*:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Acceptance Criteria

```bash
npm run build
npm run test
```

## 검증 절차

1. 아키텍처 체크리스트를 확인한다:
   - `tailwind.config.ts`가 삭제되었는가?
   - `postcss.config.mjs`가 `@tailwindcss/postcss` 방식으로 교체되었는가?
   - `globals.css`에 `@import "tailwindcss"` 와 `@theme` 블록이 있는가?
   - UI_GUIDE의 모든 색상 토큰이 `@theme`에 정의되어 있는가?
2. 결과에 따라 `phases/0-setup/index.json`의 step 2를 업데이트한다:
   - 성공 → `"status": "completed"`, `"summary": "Tailwind v4 업그레이드 완료. @theme 토큰(색상 12개, 폰트 2개) 적용. prefers-reduced-motion 대응 포함"`
   - 사용자 개입 필요 → `"status": "blocked"`, `"blocked_reason": "구체적 사유"` 후 즉시 중단

## 금지사항

- `globals.css`에 `@tailwind base`, `@tailwind components`, `@tailwind utilities` 지시어를 사용하지 마라. 이유: v4는 `@import "tailwindcss"` 단일 import 방식을 사용한다.
- `tailwind.config.ts`를 새로 생성하지 마라. 이유: v4는 CSS 파일에서 모든 설정을 관리한다.
- UI_GUIDE.md에 정의된 색상 토큰 값을 임의로 변경하지 마라. 이유: 디자인 시스템의 단일 진실 공급원이다.
- `src/data/`, `src/types/` 디렉토리를 수정하지 마라.
