# PRD: maximum0 포트폴리오 사이트

## 목표
개발자 maximum0의 역량, 경험, 프로젝트를 방문자(채용 담당자·협업 파트너)에게 효과적으로 전달하는 정적 포트폴리오 사이트

## 사용자
- **1차 타깃**: 채용 담당자 — 빠르게 스킬셋과 경력을 파악하고 싶은 사람
- **2차 타깃**: 기술 협업 파트너 — 프로젝트 레퍼런스와 기술 방향성을 보고 싶은 사람

## 페이지 구조
- **단일 페이지 스크롤** — 모든 섹션이 한 페이지에 존재, 총 5개 섹션
- **프로젝트 상세**: 프로젝트 카드 클릭 시 우측에서 좌로 슬라이드인되는 Drawer 패널
- **라우팅**: `/` 단일 경로. Drawer는 URL 변경 없이 UI 레이어로만 처리

## 네비게이션
- 별도 Header 없음. Nav가 Header 역할을 겸함
- **Hero 하단에 위치** → 스크롤 시 뷰포트 상단에 달라붙는 `sticky` 방식
- 알약(pill) 형태, 반투명 배경 — blur 없이 뒤 콘텐츠가 살짝 비침
- active 섹션 항목은 pill 내부에서 다크 배경으로 강조
- PC: 섹션명 전체 노출 / Mobile: 햄버거 버튼으로 대체 → 전체화면 메뉴 오버레이
- 섹션 클릭 시 smooth scroll 이동
- 블로그 링크는 `BLOG_URL`이 채워지면 새 탭으로 외부 링크 노출

```
[기술 스택] [경력] [프로젝트] [연락하기]   ← pill nav, 상단 중앙 고정
```

## 우하단 FAB (Floating Action Buttons)
- 페이지 우하단 고정 (`fixed bottom-6 right-6`)
- 아이콘 버튼 세로 스택: 맨 위로 (↑) / 이메일 / GitHub
- 각 버튼: 원형, `bg-[#FAFAF8]`, 얇은 테두리
- hover 시 테두리 색이 브랜드 액센트로 전환

## 컨셉: maximum0
- **maximum** — 한계를 밀어붙이는 태도, 최선을 다하는 자세
- **0** — 개발자 감성(0-based), 원점에서 다시 시작하는 성장 철학
- 핵심 메시지: "제로에서 출발해 최대를 향해 가는 개발자"
- 톤: 과시하지 않고, 절제 속에 깊이를 보여준다

## 섹션 구성

### 1. Hero
- 닉네임 "maximum0" 타이포 중심
- 직군 한 줄 소개
- 짧은 자기소개 + 핵심 역량 3~4개 (About 흡수)

### 2. Tech Stack (기술 스택)
- 카테고리별 기술 나열 (Frontend / Backend / DevOps / etc.)
- 아이콘 + 이름 조합

### 3. Career (경력)
- 타임라인 형식
- 회사명, 직책, 기간, 주요 업무 bullet

### 4. Projects (프로젝트)
- **필터 탭**: 전체 / 백엔드 / 풀스택 / 프론트엔드 — 탭 클릭 시 해당 카테고리만 표시
  - 해당 카테고리 프로젝트가 없으면 탭 비활성(disabled) 처리
  - 기본 선택: 전체
- 카드 그리드 (2~3열)
- 제목, 기술 태그, 한 줄 설명
- 카드 클릭 → Drawer로 상세 내용 표시 (GitHub/라이브 링크 포함)
- **Drawer 상세 구성**: 개요 → 역할(팀 프로젝트만) → 문제 → 해결 → 결과 → 링크

### 5. Contact (연락하기)
- 이메일 직접 링크 (`mailto:`)
- GitHub 링크
- 블로그 링크 (숨김 — `BLOG_URL` 비어있을 시 미노출)

## MVP 제외 사항
- Contact Form (서버 없이 직접 연락처 링크로 대체)
- 자체 블로그 기능 (외부 링크로 대체)
- 다크모드 토글 (미니멀 라이트 모드 단일 고정)
- CMS 연동 (콘텐츠는 data/ 정적 파일로 관리)
- 다국어(i18n) — 한국어 단일 버전으로 시작
- 기술 스택 숙련도 레벨 표기

## 성공 지표
- 채용 담당자가 30초 내에 직군·기술스택·연락처를 파악 가능
- Lighthouse 전 항목 90점 이상 (Performance, Accessibility, Best Practices, SEO)
- Core Web Vitals 모두 Green (LCP < 2.5s, CLS < 0.1, INP < 200ms)
- OG 이미지 포함 — SNS/메신저 공유 시 썸네일 노출

## SEO / 성능 전략
- `next/image`로 모든 이미지 WebP 자동 변환 + lazy loading
- 폰트 로컬 로딩 (Geist, `font-display: swap`) — 외부 요청 없음
- `<head>` 메타 완비: title, description, og:image, og:title, twitter:card
- OG 이미지: Next.js `ImageResponse` (`next/og`) 로 동적 생성 — 별도 이미지 파일 불필요
- Semantic HTML 철저히 사용 (section, article, h1~h3 순서 준수)
- `aria-label` 등 접근성 마크업으로 Accessibility 점수 확보
