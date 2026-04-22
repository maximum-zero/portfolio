# maximum0 포트폴리오

백엔드 개발자 최대영의 개인 포트폴리오 사이트입니다.  
설계 기반 구조 정의와 phase/step 단위 개발 분리를 통해 AI 협업 기반으로 구현했습니다.

**[→ 사이트 바로가기](https://portfolio-sigma-two-d7qow2is2t.vercel.app/)**

---

## 기술 스택

| 분류      | 기술                     |
| --------- | ------------------------ |
| Framework | Next.js 15 (App Router)  |
| Language  | TypeScript (strict mode) |
| Styling   | Tailwind CSS v4          |
| Animation | Framer Motion            |
| Deploy    | Vercel                   |
| AI 협업   | Claude Code              |

---

## 프로젝트 구조

```
src/
├── app/              # Next.js App Router (layout, page, sitemap, robots)
├── components/
│   ├── layout/       # Nav, FloatingActions
│   ├── sections/     # Hero, TechStack, Career, Projects, Contact
│   └── ui/           # ProjectModal, TechIcon 등 공통 UI
├── data/             # 콘텐츠 상수 (profile, projects, career, techStack)
├── hooks/            # 커스텀 훅
├── lib/              # 유틸리티
└── types/            # TypeScript 타입 정의
```

---

## 개발 방식

**Harness 기반 phase/step 구조**를 적용하여 설계 → 구현 흐름을 단계별로 분리했습니다.

| Phase        | 내용                                   |
| ------------ | -------------------------------------- |
| 0-setup      | 프로젝트 초기 설정                     |
| 1-mvp        | 5개 섹션 핵심 기능 구현                |
| 2-qa         | 시각 품질, 모바일 대응, 코드 구조 개선 |
| 3-deployment | SEO 최적화, Vercel 배포 설정           |

---

## 로컬 실행

```bash
npm install
npm run dev       # 개발 서버 (localhost:3000)
npm run build     # 프로덕션 빌드
npm run lint      # ESLint
npm run test      # 테스트
```

---

## 환경 변수

| 변수                   | 설명                                     | 기본값                        |
| ---------------------- | ---------------------------------------- | ----------------------------- |
| `NEXT_PUBLIC_SITE_URL` | 배포 URL (sitemap, OG 메타데이터에 사용) | `https://maximum0.vercel.app` |
