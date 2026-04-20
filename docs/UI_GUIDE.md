# UI 디자인 가이드

## 디자인 원칙: Maximum Impact, Zero Noise

1. **Zero** — 불필요한 장식 없는 배경, 의도적인 여백. 비어 있는 공간이 집중을 만든다
2. **Maximum** — 제목·수치·역량 등 핵심 정보는 임팩트 있게. 작게 숨기지 않는다
3. **중앙 정렬 기본** — 전체 섹션 헤더와 콘텐츠는 중앙 정렬. 모달 내부는 좌측 정렬

> 컴포넌트별 시각 패턴은 Claude Design(`/tmp/portfolio/project/styles.css`, `sections.jsx`)을 소스 오브 트루스로 삼는다.  
> docs와 Claude Design이 충돌할 경우 Claude Design 우선. 단, 아래 전역 규칙이 우선 적용된다.

---

## AI 슬롭 안티패턴 — 하지 마라

| 금지 사항                              | 이유                                          |
| -------------------------------------- | --------------------------------------------- |
| `backdrop-filter: blur()`              | glass morphism은 AI 템플릿의 가장 흔한 징후   |
| gradient-text (배경 그라데이션 텍스트) | AI가 만든 SaaS 랜딩의 1번 특징                |
| box-shadow 글로우 애니메이션           | 네온 글로우 = AI 슬롭                         |
| 무분별한 그라데이션                    | 의도 없는 그라데이션은 템플릿 느낌            |
| 모든 카드에 동일한 `rounded-2xl`       | 균일한 둥근 모서리는 템플릿 느낌              |
| 배경 gradient orb (`blur-3xl` 원형)    | 모든 AI 랜딩 페이지에 있는 장식               |
| 별 모양 배경 파티클                    | 우주 테마 = 무개성                            |
| Hero에 사람 일러스트/아바타            | 진부한 "개발자 포트폴리오" 템플릿 클리셰      |
| `rounded-full` 아이콘 컨테이너         | pill/circle 배경 = AI 슬롭. rounded-xl만 허용 |

---

## 색상 시스템

### 팔레트

| 역할        | Light 값              | Dark 값   | CSS 변수    |
| ----------- | --------------------- | --------- | ----------- |
| Background  | `#FAFAF7` (off-white) | `#0F0F0F` | `--bg`      |
| Foreground  | `#0F0F0F` (ink black) | `#FAFAF7` | `--fg`      |
| Accent      | `#CCFF00` (lime)      | `#CCFF00` | `--accent`  |
| Surface     | `#FFFFFF`             | `#1A1A1A` | `--surface` |
| Muted       | `#6B7280`             | `#9CA3AF` | `--muted`   |
| Line/Border | `#E5E7EB`             | `#2A2A2A` | `--line`    |

### 다크모드

`<html data-mode="dark">` 속성으로 전환. CSS 변수 재정의 방식.

---

## 디자인 토큰

모든 색상과 폰트는 CSS 변수로 단일 관리. **변경 시 `globals.css`의 `@theme` 블록만 수정.**
컴포넌트에 hex 직접 사용 금지. Tailwind 하드코딩 금지 — 반드시 토큰 클래스만 사용.

| 토큰                | Tailwind 클래스 예시                        | 역할                          |
| ------------------- | ------------------------------------------- | ----------------------------- |
| `--color-bg`        | `bg-bg`                                     | 페이지 배경                   |
| `--color-surface`   | `bg-surface`, `text-surface`                | 카드·패널 배경                |
| `--color-ink`       | `text-ink`                                  | 메인 텍스트 (L1)              |
| `--color-ink-body`  | `text-ink-body`                             | 본문 텍스트 (L2)              |
| `--color-ink-muted` | `text-ink-muted`                            | 보조 텍스트 (L3)              |
| `--color-accent`    | `text-accent`, `border-accent`, `bg-accent` | Lime 포인트                   |
| `--color-line`      | `border-line`                               | 구분선·테두리                 |
| `--font-display`    | `font-display`                              | Space Grotesk (Hero 슬로건)   |
| `--font-mono`       | `font-mono`                                 | JetBrains Mono (코드·배지)    |
| `--font-body`       | `font-body`                                 | Pretendard (한국어·일반 본문) |

### 전역 유틸리티 클래스 (`globals.css`)

```css
/* Hero ZERO — accent 테두리, 투명 채움 */
.text-outline-accent {
  -webkit-text-stroke: 2px var(--color-accent);
  color: transparent;
}
```

---

## 폰트

| 역할                      | 폰트               | 이유                                                                   |
| ------------------------- | ------------------ | ---------------------------------------------------------------------- |
| Display (Hero 슬로건)     | **Space Grotesk**  | 기하학적 sans-serif. 숫자 "0"에 대각선 컷 — maximum**0** 정체성과 일치 |
| Mono (기술 배지, eyebrow) | **JetBrains Mono** | 코드 컨텍스트 강조. 기술 이름에 mono가 어울림                          |
| Body (한국어 + 영문 전반) | **Pretendard**     | 한/영 혼용 최상위 가독성. 자연스러운 웨이트 균형                       |

---

## 타이포그래피 스케일

| 용도             | 클래스                                                                                                                      |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Hero eyebrow     | `font-mono text-xs md:text-sm tracking-[0.15em] text-ink-muted uppercase`                                                   |
| Hero 슬로건 (h1) | `font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-widest uppercase leading-[1.1] text-ink` |
| Hero ZERO (span) | `.text-outline-accent` — `-webkit-text-stroke: 2px accent`, `color: transparent`                                            |
| Hero 소개글      | `font-body text-base md:text-lg font-normal text-ink-body leading-relaxed`                                                  |
| 섹션 eyebrow     | `font-mono text-xs tracking-[0.15em] text-ink-muted uppercase`                                                              |
| 섹션 제목 (h2)   | `font-display text-3xl md:text-4xl font-bold text-ink`                                                                      |
| 섹션 한 줄 설명  | `font-body text-lg md:text-xl font-normal text-ink-muted`                                                                   |
| 카드 제목 (h3)   | `font-body text-lg font-semibold text-ink`                                                                                  |
| 본문 / bullet    | `font-body text-sm font-light text-ink-body leading-relaxed`                                                                |
| 캡션 / 날짜      | `font-mono text-xs text-ink-muted`                                                                                          |

---

## 레이아웃

- **전체 최대 너비**: `max-w-5xl` (기본) / `max-w-3xl` (narrow, 타임라인·자격증)
- **페이지 수평 패딩**: `px-6 md:px-10`
- **섹션 간격**: `py-24 md:py-32`
- **카드 그리드**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- **기본 정렬**: `text-center` (섹션 헤더·콘텐츠 전체)
- **예외 좌측 정렬**: Modal 내부, Experience 타임라인 콘텐츠
- **Smooth scroll**: `html { scroll-behavior: smooth }` + `scroll-padding-top: 80px`

---

## 섹션 헤더 패턴 (전 섹션 통일)

```
eyebrow (font-mono, xs, accent, uppercase, tracking-wide)
섹션 제목 (h2, font-display, bold, text-ink)
한 줄 설명 (font-body, text-ink-muted)
──────────────────
콘텐츠
```

---

## 애니메이션

- **허용**: `fade-in` (opacity 0→1, 0.4~0.6s), `slide-up` (translateY 16px→0, 0.5s), `scale` (0.95→1.0)
- **적용 범위**: 섹션 진입 시 1회. `whileInView` + `viewport={{ once: true }}`
- **stagger**: 섹션 헤더 → 카드 순서로 시차. `staggerChildren: 0.12`
- **금지**: loop 애니메이션, hover 스케일 확대, 배경 움직임
- **감소 모션 대응**: `useReducedMotion()` 훅으로 애니메이션 전부 비활성

---

## 아이콘

- **UI 아이콘**: SVG 인라인, `strokeWidth 1.5~2`, 크기 `18~20px` 기본
- **기술 스택 아이콘**: Simple Icons CDN (`https://cdn.simpleicons.org/{slug}`)
  - `next/image` + `unoptimized` prop으로 로드
  - `rounded-xl` 컨테이너에 담기 (iOS 앱 아이콘 스타일)
  - 라이트: `bg-white shadow-sm p-3` / 다크: `bg-surface border border-line p-3`
  - `rounded-full` / pill 컨테이너 금지

---

## Experience 타임라인 importance 스타일 규칙

`importance: 'high'` 항목은 시각적으로 강조한다:

| 요소        | normal                         | high                                                     |
| ----------- | ------------------------------ | -------------------------------------------------------- |
| dot 크기    | `w-3 h-3`                      | `w-4 h-4`                                                |
| dot 색상    | `bg-accent border-2 border-bg` | `bg-accent border-2 border-accent ring-2 ring-accent/30` |
| 카드 테두리 | `border-line`                  | `border-accent/40`                                       |

normal 항목과 구분이 명확해야 하지만 과도한 강조는 금지 (scale, glow 등).

---

## 반응형 중단점 (Tailwind 기본)

- `sm`: 640px — 모바일 landscape
- `md`: 768px — 태블릿. 핵심 레이아웃 변화 기준
- `lg`: 1024px — 데스크탑
- `xl` 이상은 max-w-5xl로 자연 제한됨
