# 프로젝트: maximum0 포트폴리오

## 기술 스택
- Next.js 15 (App Router, SSG 기반)
- TypeScript strict mode
- Tailwind CSS v4
- Framer Motion (섹션 fade-in / slide-up, Drawer 슬라이드인)

## 아키텍처 규칙
- CRITICAL: 페이지는 Server Component 기본. 인터랙션이 필요한 컴포넌트만 'use client' 선언
- 컴포넌트는 components/ 폴더에, 타입은 types/ 폴더에, 콘텐츠 데이터는 data/ 폴더에 분리
- 섹션 5개: Hero, TechStack, Career, Projects, Contact
- Header 없음. Nav(pill)가 상단 고정으로 Header 역할 대체
- 블로그는 외부 링크. `data/profile.ts`의 `BLOG_URL`이 비어있으면 Contact 섹션에서 미노출

## 개발 프로세스
- CRITICAL: 파일을 생성하면 반드시 해당 파일에 대한 테스트 파일을 함께 작성할 것
- 커밋 메시지는 conventional commits 형식을 따를 것 (feat:, fix:, docs:, refactor:)
- 섹션 단위로 개발. 한 섹션 완성 후 다음 섹션으로 이동
- 콘텐츠(텍스트, 링크, 날짜)는 data/ 폴더 상수로 분리. 컴포넌트에 하드코딩 금지

## 명령어
```
npm run dev      # 개발 서버 (localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint
npm run test     # 테스트
```

## 참고 문서
- 요구사항: docs/PRD.md
- 아키텍처 결정: docs/ADR.md
- UI 가이드: docs/UI_GUIDE.md
- 구조 설계: docs/ARCHITECTURE.md
