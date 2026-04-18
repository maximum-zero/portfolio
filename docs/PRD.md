# PRD: maximum0 포트폴리오 사이트

## 목표

개발자 maximum0의 역량, 경험, 프로젝트를 방문자(채용 담당자·협업 파트너)에게 효과적으로 전달하는 정적 포트폴리오 사이트

## 사용자

- **1차 타깃**: 채용 담당자 — 빠르게 스킬셋과 경력을 파악하고 싶은 사람
- **2차 타깃**: 기술 협업 파트너 — 프로젝트 레퍼런스와 기술 방향성을 보고 싶은 사람

## 컨셉: Maximum Impact, Zero Noise

- **Maximum** — 핵심 정보는 임팩트 있게. 제목·수치·역량은 크고 강하게
- **Zero** — 불필요한 장식 없는 배경, 의도적인 여백, 노이즈 제거
- 톤: 화려하지 않되 인상에 남는다. 절제 속에 깊이를 보여준다

## 페이지 구조

- **단일 페이지 스크롤** — 모든 섹션이 한 페이지에 존재, 총 9개 섹션
- **프로젝트 상세**: 카드 클릭 시 중앙 팝업 Modal로 표시
- **라우팅**: `/` 단일 경로. Modal은 URL 변경 없이 UI 레이어로만 처리

## 네비게이션

- 별도 Header 없음. Nav가 Header 역할을 겸함
- **항상 상단 고정** — `fixed top-6`
- 알약(pill) 형태, 반투명 배경
- 왼쪽 끝: 브랜드명 또는 이니셜 (클릭 시 최상단 이동)
- active 섹션 항목: `bg-ink text-bg` (반전)
- **PC**: 중앙 정렬 pill / 섹션명 전체 노출
- **Mobile**: 햄버거 → 드롭다운

```
[최대영] [역량] [기술] [경험] [프로젝트] [블로그] [연락]
```

## 우하단 FAB (Floating Action Buttons)

- 페이지 우하단 고정 (`fixed bottom-6 right-6`)
- 아이콘 버튼 세로 스택: 맨 위로 (↑) / 이메일 / GitHub / 블로그
- hover 시 테두리·아이콘 색이 lime accent로 전환
- 블로그 버튼: `BLOG_URL`이 비어있으면 미노출

## 섹션 구성

### 1. Hero

- 레이아웃: `min-h-svh` 중앙 정렬, 배경 동심원 ring 장식 3개 (border-only)
- eyebrow: `최대영 — Backend Engineer` (font-mono, xs, accent, uppercase)
- h1 슬로건 2줄 (Space Grotesk, 올캡스):
  - `MAXIMUM IMPACT.` — text-ink
  - `ZERO NOISE.` — ZERO: `.text-outline-accent` (lime stroke, transparent fill)
- meta row: Open to Work · 3-5 YEARS · Seoul, KR
- 진입 애니메이션: fade + slide-up (stagger)

### 2. Pillars (핵심 역량)

- eyebrow: Core Competencies
- 제목: 핵심 역량
- 한 줄: 세 가지 축으로 문제를 바라보고 해결합니다.
- 텍스트 카드 3개 (이미지 없음):
  - Pillar 1 | 성능 최적화 — 병목을 찾고, 수치로 증명합니다
  - Pillar 2 | 안정성 설계 — 트래픽이 몰려도 데이터는 지킵니다
  - Pillar 3 | 풀스택 관점 — 프론트에서 DB까지, 전체를 봅니다

### 3. Stack (기술 스택)

- eyebrow: Tech Stack
- 제목: 기술 스택
- 한 줄: 카테고리를 선택하면 해당하지 않는 기술은 흐릿하게 표시됩니다.
- 카테고리 6개:
  - all (전체), backend, database, infra, monitoring, frontend
- 기술 배지: font-mono 텍스트 라벨 + 브랜드 색상 박스 (SVG 아이콘 없음)
- 카테고리 탭 → 선택 카테고리 `opacity-100`, 나머지 `opacity-30`

### 4. Experience (경력·교육 통합)

- eyebrow: Experience
- 제목: 경험
- 한 줄: 일과 배움을 하나의 타임라인으로.
- **중앙선 alternating 타임라인**: 짝수 항목 좌측, 홀수 항목 우측
- 항목 구성: type 배지(WORK/EDU) + 기관명 + 직책/과정 + 기간 + 주요 bullet
- 경력과 교육을 시간 순으로 합산 (단일 배열)

### 5. Certs (자격증)

- eyebrow: Certifications
- 제목: 자격증
- Experience 바로 아래 배치 (padding-top 없음)
- 각 항목: 체크 아이콘 + 자격증명 + 날짜 · 발급기관

### 6. Portfolio (프로젝트)

- eyebrow: Selected Work
- 제목: 포트폴리오
- 한 줄: 주요 프로젝트를 클릭하면 세부 내용을 확인할 수 있습니다.
- 카드 그리드 (1~3열), 기본 4개 노출 → 더보기 버튼
- 카드: 아이콘 + 연도 + 제목 + 설명 + 기술 태그
- 카드 클릭 → ProjectModal

#### ProjectModal

- 중앙 팝업, `max-w-2xl`, `max-h-[90vh] overflow-y-auto`
- 전체 좌측 정렬
- **헤더**: 아이콘, 프로젝트명, 한 줄 설명, 기술 태그, 역할·기간(2컬럼), 관련 링크
- **핵심 요약**: 핵심 문제 / 해결 방법 / 결과 (accent 좌측 border 블록)
- **상세 내용**: 주요 기능(bullet), 구현 상세(bullet)
- 이전/다음 네비게이션

### 7. Blog (블로그)

- eyebrow: Writing
- 제목: 블로그
- 한 줄: 일하면서 부딪힌 문제와 그 해결 과정을 기록합니다.
- 포스트 목록 (날짜 + 제목 + 읽기 시간 + →)
- 항목 클릭 → `BLOG_URL` 기반 외부 링크
- `BLOG_URL`이 비어있으면 섹션 미노출 또는 "준비 중" 상태 표시

### 8. Contact (연락하기)

- eyebrow: Contact
- 제목: 연락하기
- 한 줄: 협업 제안, 커피챗, 기술 이야기 모두 환영합니다.
- 연락 수단 목록 (이메일, GitHub): 아이콘 + 라벨 + 값
- 스크롤 진입 시 fade+scale 애니메이션

### 9. Footer

- 슬로건 재반복: `MAXIMUM IMPACT. / ZERO NOISE.`
- copyright: `© 2026 최대영 · Built with calm precision`

## 다크모드

- `<html data-mode="dark">` 속성 기반 CSS 변수 교체 방식
- 우하단 Tweaks 패널(개발 도구)에서 테마·모드·밀도 전환 가능
- 기본값: `data-mode="light"`

## MVP 제외 사항

- Contact Form (직접 연락처 링크로 대체)
- CMS 연동 (data/ 정적 파일로 관리)
- 다국어(i18n) — 한국어 단일 버전으로 시작
- 기술 스택 숙련도 레벨 표기

## 성공 지표

- 채용 담당자가 30초 내에 직군·기술스택·연락처 파악 가능
- Lighthouse 전 항목 90점 이상 (Performance, Accessibility, Best Practices, SEO)
- Core Web Vitals 모두 Green (LCP < 2.5s, CLS < 0.1, INP < 200ms)
- OG 이미지 포함 — SNS/메신저 공유 시 썸네일 노출

## SEO / 성능 전략

- `next/image`로 이미지 WebP 자동 변환 + lazy loading
- 폰트 로컬/CDN 로딩 (`font-display: swap`)
- `<head>` 메타 완비: title, description, og:image, og:title, twitter:card
- OG 이미지: Next.js `ImageResponse` (`next/og`) 동적 생성
- Semantic HTML 철저히 사용 (section, article, h1~h3 순서 준수)
- `aria-label` 등 접근성 마크업으로 Accessibility 점수 확보
