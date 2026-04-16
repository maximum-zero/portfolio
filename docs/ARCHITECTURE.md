# 아키텍처

## 디렉토리 구조
```
src/
├── app/
│   ├── globals.css         # @theme 토큰 정의 — 색상·폰트 단일 관리
│   ├── layout.tsx          # 루트 레이아웃 (폰트 변수 주입, 메타데이터, OG)
│   ├── page.tsx            # 메인 페이지 (모든 섹션 조립)
│   └── opengraph-image.tsx # next/og 동적 OG 이미지 생성
├── components/
│   ├── layout/
│   │   ├── Nav.tsx             # sticky pill nav — Hero 다음 DOM에 위치, 스크롤 시 상단 고정
│   │   ├── MobileMenu.tsx      # 모바일 전체화면 메뉴 오버레이 (Client Component)
│   │   ├── FloatingActions.tsx # 우하단 FAB: 맨 위로 / 이메일 / GitHub (Client Component)
│   │   └── Footer.tsx          # Copyright, 사이트 한 줄 설명
│   ├── sections/
│   │   ├── Hero.tsx            # 인트로 + 핵심 역량 포함
│   │   ├── TechStack.tsx
│   │   ├── Career.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx         # 이메일 + GitHub 링크
│   └── ui/
│       ├── ProjectDrawer.tsx   # 우측 슬라이드인 상세 패널 (Client Component)
│       └── ProjectList.tsx     # 필터 탭 + 카드 그리드 (Client Component — 필터 상태 관리)
├── data/
│   ├── profile.ts          # 이름, 이메일, GitHub URL, 블로그 URL(빈값)
│   ├── career.ts           # 경력 데이터
│   ├── projects.ts         # 프로젝트 데이터
│   └── skills.ts           # 기술 스택 데이터
├── types/
│   ├── career.ts
│   ├── project.ts
│   └── skill.ts
└── lib/
    └── utils.ts
```

## 패턴
- **Server Components 기본**: 모든 섹션 컴포넌트는 서버 컴포넌트. data/ 정적 데이터를 직접 import
- **Client Component 예외**: Nav (스크롤 감지, active 상태), MobileMenu (열림/닫힘), FloatingActions (스크롤 위치), ProjectList (필터 상태), ProjectDrawer (열림/닫힘)만 `'use client'`
- **Projects 조합**: `Projects.tsx`(서버)가 전체 프로젝트 데이터를 import해 `ProjectList.tsx`(클라이언트)에 props로 전달. 필터링과 Drawer 상태는 `ProjectList` 내부에서 관리

## 데이터 흐름
```
정적 데이터 (data/*.ts)
    → Server Component import
    → 렌더 타임에 HTML 생성
    → 클라이언트에 완성된 HTML 전달

ProjectList (Client):
    필터 탭 클릭
    → useState(activeCategory)로 필터 상태 변경
    → 해당 카테고리 프로젝트만 렌더링

    카드 클릭
    → useState(selectedProject)로 선택 프로젝트 상태 변경
    → ProjectDrawer 슬라이드인
    → ESC / 오버레이 클릭으로 닫기
```

## 상태 관리
- **서버 상태**: 없음 (정적 데이터, fetch 불필요)
- **클라이언트 상태**: `useState` 한정 사용
  - ProjectList: 활성 필터 카테고리, 선택된 프로젝트, Drawer 열림/닫힘
  - Nav: 스크롤 위치 기반 active 섹션 감지
  - FloatingActions: 스크롤 위치 (맨 위로 버튼 표시/숨김)
- **전역 상태 라이브러리 불필요**: Zustand, Jotai 등 도입 안 함

## 빌드 및 배포
- **빌드 방식**: Next.js 기본 빌드 (정적 페이지 + Edge Runtime OG 이미지)
- **배포 플랫폼**: Vercel
- **도메인**: 미정 (vercel.app 서브도메인으로 시작)
- **이미지 최적화**: Next.js Image 컴포넌트, WebP 자동 변환
