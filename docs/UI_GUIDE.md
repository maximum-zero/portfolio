# UI 디자인 가이드

## 디자인 원칙
1. **절제된 강인함** — maximum0의 정체성처럼, 화려하지 않되 인상에 남는다
2. **공백이 말한다** — 여백을 채우지 말 것. 비어 있는 공간이 집중을 만든다
3. **파스텔은 포인트다** — 배경을 지배하지 않고 숨결처럼 깔린다

## AI 슬롭 안티패턴 — 하지 마라
| 금지 사항 | 이유 |
|-----------|------|
| `backdrop-filter: blur()` | glass morphism은 AI 템플릿의 가장 흔한 징후 |
| gradient-text (배경 그라데이션 텍스트) | AI가 만든 SaaS 랜딩의 1번 특징 |
| box-shadow 글로우 애니메이션 | 네온 글로우 = AI 슬롭 |
| 보라/인디고 브랜드 색상 | "AI = 보라색" 클리셰 |
| 모든 카드에 동일한 `rounded-2xl` | 균일한 둥근 모서리는 템플릿 느낌 |
| 배경 gradient orb (`blur-3xl` 원형) | 모든 AI 랜딩 페이지에 있는 장식 |
| 별 모양 배경 파티클 | 우주 테마 = 무개성 |
| Hero에 사람 일러스트/아바타 | 진부한 "개발자 포트폴리오" 템플릿 클리셰 |

---

## 디자인 토큰

모든 색상과 폰트는 CSS 변수로 단일 관리. 변경 시 `globals.css`의 `@theme` 블록만 수정.

### `globals.css` — `@theme` 정의 (Tailwind v4)
```css
@import "tailwindcss";

@theme {
  /* ── 배경 ── */
  --color-surface:      #FAFAF8;   /* 페이지 기본 배경 */
  --color-card:         #EFEDE8;   /* 카드 배경 */

  /* ── 브랜드 액센트 ── */
  --color-accent:       #8FAF8A;   /* 세이지 그린 */
  --color-accent-sand:  #C4A882;   /* 샌드 (Career 날짜 등) */
  --color-accent-wash:  #E8F0E6;   /* 세이지 연한 워시 (태그 배경) */

  /* ── 텍스트 ── */
  --color-ink:          #1A1A18;   /* 주 텍스트 */
  --color-ink-body:     #4A4A46;   /* 본문 */
  --color-ink-muted:    #7A7A74;   /* 보조 */
  --color-ink-disabled: #ADADAB;   /* 비활성 */

  /* ── 경계선 ── */
  --color-line:         #E2DFD8;   /* 기본 선 */
  --color-line-strong:  #C8C4BB;   /* 강조 선 */

  /* ── 폰트 ── */
  --font-display: 'Space Grotesk', sans-serif;
  --font-body:    'Pretendard',    sans-serif;
}
```

### 토큰 → Tailwind 유틸리티 대응표
| 토큰 | Tailwind 클래스 예시 |
|------|---------------------|
| `--color-surface` | `bg-surface`, `text-surface` |
| `--color-card` | `bg-card` |
| `--color-accent` | `text-accent`, `border-accent` |
| `--color-ink` | `text-ink` |
| `--color-ink-body` | `text-ink-body` |
| `--color-ink-muted` | `text-ink-muted` |
| `--color-line` | `border-line` |
| `--font-display` | `font-display` |
| `--font-body` | `font-body` |

---

## 폰트

### 추천 조합
| 역할 | 폰트 | 이유 |
|------|------|------|
| Display (Hero 닉네임) | **Space Grotesk** | 기하학적 sans-serif. 숫자 "0"에 대각선 컷이 있어 maximum**0** 정체성과 일치 |
| Body (한국어 + 영문 전반) | **Pretendard** | 한/영 혼용 최상위 가독성. 자연스러운 웨이트 균형 |

### 로딩 방식 (`layout.tsx`)
```ts
// Space Grotesk — next/font/google
import { Space_Grotesk } from 'next/font/google'
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

// Pretendard — next/font/local (패키지: pretendard)
import localFont from 'next/font/local'
const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  variable: '--font-body',
  display: 'swap',
})
```

---

## 컬러 팔레트 (참조용)

> 실제 코드에서는 토큰 클래스를 사용. 아래 hex 값은 디자인 툴 참조용.

| 토큰 | Hex |
|------|-----|
| `surface` | `#FAFAF8` |
| `card` | `#EFEDE8` |
| `accent` | `#8FAF8A` |
| `accent-sand` | `#C4A882` |
| `accent-wash` | `#E8F0E6` |
| `ink` | `#1A1A18` |
| `ink-body` | `#4A4A46` |
| `ink-muted` | `#7A7A74` |
| `ink-disabled` | `#ADADAB` |
| `line` | `#E2DFD8` |
| `line-strong` | `#C8C4BB` |

---

## 타이포그래피

| 용도 | 폰트 | 스타일 |
|------|------|--------|
| Hero 닉네임 (maximum0) | `font-display` | `text-5xl md:text-7xl font-bold tracking-tight text-ink` |
| 섹션 제목 | `font-body` | `text-2xl md:text-3xl font-semibold text-ink` |
| 카드 제목 | `font-body` | `text-base font-medium text-ink` |
| 본문 | `font-body` | `text-sm text-ink-body leading-relaxed` |
| 캡션 / 날짜 | `font-body` | `text-xs text-ink-muted` |
| Career 날짜 | `font-body` | `text-xs text-accent-sand` |

---

## 컴포넌트

### 카드
```
rounded-lg bg-card border border-line p-6
hover:border-line-strong transition-colors duration-200
```

### 버튼
```
Primary: rounded-md bg-ink text-surface px-5 py-2.5 text-sm font-body
         hover:bg-ink/80 transition-colors duration-150

Outline: rounded-md border border-line-strong text-ink-body px-5 py-2.5 text-sm
         hover:border-accent hover:text-ink transition-colors duration-150

Text:    text-ink-muted hover:text-ink-body transition-colors duration-150
```

### 태그 (기술 스택, 프로젝트 레이블)
```
rounded-sm bg-accent-wash text-accent text-xs px-2 py-1 font-medium font-body
```

### 구분선 (섹션 사이)
```
border-t border-line
```

### Pill Nav (Hero 하단 → 스크롤 시 상단 고정)
```
// 동작 방식
- Hero 섹션 바로 아래 DOM에 위치, 초기엔 페이지 흐름 안에 존재
- 스크롤로 Hero가 올라가면 nav가 뷰포트 상단에 달라붙음
- position: sticky 사용 (fixed 아님 — Hero를 가리지 않음)

// 컨테이너
sticky top-4 z-50
flex justify-center        ← 중앙 정렬은 래퍼로 처리
py-3                       ← Hero와 다음 섹션 사이 여백

// pill 본체
inline-flex items-center gap-1
rounded-full bg-surface/85 border border-line
px-2 py-1.5 shadow-sm

// 비활성 항목
px-3 py-1 rounded-full text-sm text-ink-muted font-body
hover:text-ink transition-colors duration-150

// 활성 항목 (현재 섹션)
px-3 py-1 rounded-full text-sm font-body
bg-ink text-surface

// 모바일: 햄버거 버튼만 노출 (nav 항목 hidden md:flex)
```

### 모바일 전체화면 메뉴
```
// 오버레이
fixed inset-0 z-50 bg-surface
flex flex-col items-center justify-center gap-8

// 메뉴 항목
text-2xl font-medium text-ink font-body
hover:text-accent transition-colors duration-150
```

### FAB (우하단 고정)
```
// 컨테이너
fixed bottom-6 right-6 z-40
flex flex-col gap-2

// 각 버튼
w-10 h-10 rounded-full
bg-surface border border-line
shadow-sm flex items-center justify-center
text-ink-muted
hover:border-accent hover:text-accent
transition-colors duration-150

// 맨 위로 버튼: 스크롤 300px 이상일 때만 노출 (fade-in)
```

### ProjectFilter (필터 탭)
```
// 컨테이너
flex gap-1 mb-8

// 비활성 탭
px-3 py-1 rounded-full text-sm text-ink-muted font-body
hover:text-ink transition-colors duration-150
cursor-pointer

// 활성 탭 (현재 선택)
px-3 py-1 rounded-full text-sm font-body
bg-ink text-surface

// disabled 탭 (해당 카테고리 프로젝트 없음)
px-3 py-1 rounded-full text-sm text-ink-disabled font-body
cursor-not-allowed pointer-events-none
```

> Nav의 pill 스타일과 동일 패턴으로 통일감 유지. 탭 레이블: 전체 / 백엔드 / 풀스택 / 프론트엔드

---

### ProjectDrawer
```
// 오버레이
fixed inset-0 z-40
bg-ink/35

// 패널
fixed top-0 right-0 z-50
h-full w-full md:w-[560px]
bg-surface border-l border-line
shadow-[-4px_0_20px_rgba(26,26,24,0.07)]
overflow-y-auto

// 닫기 버튼
absolute top-5 right-5
text-ink-muted hover:text-ink
transition-colors duration-150

// 내부 패딩
p-8 md:p-10

// 콘텐츠 구조 (상→하 순서)
카테고리 태그 + 프로젝트 유형 태그 row   → 상단
프로젝트명 (h2)   → text-2xl font-semibold text-ink font-display
기간              → text-xs text-accent-sand mt-1
구분선            → border-t border-line my-6
상세 섹션들       → 아래 상세 블록 참조
링크 버튼 row     → 하단, GitHub(Outline) + Live(Primary)
```

#### Drawer 상세 블록 (문제/해결/결과 공통 패턴)
```
// 섹션 레이블
text-xs font-medium uppercase tracking-widest text-ink-muted font-body
mb-3

// bullet 항목 목록
space-y-2

// 각 bullet 항목
flex gap-2 text-sm text-ink-body leading-relaxed font-body

// bullet 마커 (·)
text-ink-disabled mt-0.5 shrink-0
```

#### 역할 블록 (팀 프로젝트만 표시)
```
bg-accent-wash rounded-sm px-3 py-2.5 mb-6
text-sm text-ink-body leading-relaxed font-body
```

#### 결과 수치 강조
```
// 수치 부분 (예: "8.8s → 434ms")
font-medium text-ink
// 나머지 설명 텍스트는 text-ink-body 유지
```

### Drawer 애니메이션 (Framer Motion)
```
initial:    { x: '100%' }
animate:    { x: 0 }
exit:       { x: '100%' }
transition: { duration: 0.32, ease: [0.32, 0, 0.16, 1] }
```

### Career 타임라인
```
// 전체 래퍼
relative pl-6 border-l-2 border-line

// 항목 시작 점
absolute -left-[5px] top-1.5
w-2.5 h-2.5 rounded-full bg-accent

// 회사명
text-base font-medium text-ink font-body

// 직책
text-sm text-ink-muted

// 기간
text-xs text-accent-sand

// 업무 bullet
text-sm text-ink-body leading-relaxed
```

### TechStack 레이아웃
```
// 카테고리 헤더
text-xs font-medium uppercase tracking-widest text-ink-muted font-body
mb-3

// 항목 목록
flex flex-wrap gap-3

// 각 항목 (아이콘 + 이름)
flex items-center gap-1.5
text-sm text-ink-body font-body
```

### Contact 레이아웃
```
// 섹션 전체: 중앙 정렬
text-center

// 짧은 문구
text-base text-ink-body font-body mb-6

// 이메일 링크
text-sm font-medium text-ink
hover:text-accent transition-colors
```

### 포커스 스타일 (전역 — `globals.css`)
```css
*:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

---

## 레이아웃
- 전체 최대 너비: `max-w-4xl` (64rem)
- 페이지 수평 패딩: `px-6 md:px-10`
- 정렬: 좌측 정렬 기본. Hero(모바일) · Contact 섹션은 중앙 정렬 허용
- Hero 타이포: `text-center md:text-left`
- Smooth scroll: `html { scroll-behavior: smooth }` + `scroll-padding-top: 80px` (pill nav 높이 보정)
- 섹션 간격: `py-20 md:py-28`
- 카드 그리드: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4`

---

## 애니메이션
- **허용**: `fade-in` (opacity 0→1, 0.4s ease-out), `slide-up` (translateY 16px→0, 0.5s ease-out)
- **적용 범위**: 섹션 진입 시 1회. IntersectionObserver 기반
- **금지**: loop 애니메이션, hover 스케일 확대, 배경 움직임
- **감소 모션 대응**: `prefers-reduced-motion: reduce` 시 애니메이션 전부 비활성

---

## 아이콘
- SVG 인라인 사용
- `strokeWidth 1.5`, 크기 `20px` 기본
- 아이콘 컨테이너(둥근 배경 박스)로 감싸지 않는다
- 기술 스택 아이콘은 SVG 로고 직접 사용 (Simple Icons 소스)

---

## 반응형 중단점 (Tailwind 기본)
- `sm`: 640px — 모바일 landscape
- `md`: 768px — 태블릿. 핵심 레이아웃 변화 기준
- `lg`: 1024px — 데스크탑
- `xl` 이상은 max-w-4xl로 자연 제한됨
