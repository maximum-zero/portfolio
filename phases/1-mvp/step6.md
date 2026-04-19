# Step 6: blog-contact

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `/docs/PRD.md` — Blog(섹션 7), Contact(섹션 8), Footer(섹션 9) 스펙 확인
- `/docs/UI_GUIDE.md` — 색상 토큰, 타이포그래피, 애니메이션
- `/docs/ADR.md` — ADR-003 블로그 외부 링크 방식
- `/src/data/profile.ts` — PROFILE(email, github, BLOG_URL) 확인
- `/src/data/blog.ts` — BLOG_POSTS 확인 (Step 0 생성, 현재 빈 배열)
- `/src/types/blog.ts` — BlogPost 타입 확인 (Step 0 생성)
- `/src/app/page.tsx` — 현재 페이지 구조 확인
- `/src/components/layout/Footer.tsx` — Step 1에서 생성된 Footer 확인
- `phases/1-mvp/index.json` — 이전 step summary 확인

이전 step에서 만들어진 코드를 꼼꼼히 읽고, 설계 의도를 이해한 뒤 작업하라.

## 작업

Blog와 Contact 섹션을 구현하고 page.tsx에 연결해 전체 페이지를 완성한다. 이 step 완료 후 dev 서버에서 페이지 전체 섹션이 모두 보여야 한다.

### 1. `src/components/sections/Blog.tsx` 생성 — Server Component

PRD 스펙:

- eyebrow: `Writing`
- h2: `블로그`
- 한 줄: `일하면서 부딪힌 문제와 그 해결 과정을 기록합니다.`

**조건부 렌더링 (ADR-003):**

- `PROFILE.BLOG_URL`이 비어있거나(`''`), `BLOG_POSTS`가 빈 배열이면 → 전체 섹션을 렌더하지 않는다 (`return null`)
- 둘 다 채워진 경우에만 섹션 표시

**포스트 목록:**

- `BLOG_POSTS`를 map해 렌더
- 각 항목: 날짜(`date`) + 제목(`title`) + 외부 링크 아이콘 + `→`
- 클릭 시 `post.url`로 새 탭 이동 (`target="_blank" rel="noopener noreferrer"`)
- `font-mono text-xs text-ink-muted` (날짜), `font-body text-sm font-light text-ink-body` (제목)
- 각 항목 hover 시 `text-ink` (텍스트 색 강조)

**현재 상태:** `BLOG_URL`이 비어있으므로 이 섹션은 렌더되지 않는다. 이것이 정상 동작이다.

### 2. `src/components/sections/Contact.tsx` 생성 — Server Component

PRD 스펙:

- eyebrow: `Contact`
- h2: `연락하기`
- 한 줄: `협업 제안, 커피챗, 기술 이야기 모두 환영합니다.`

**연락 수단 목록:**

- 이메일: `mailto:${PROFILE.email}` 링크
- GitHub: `PROFILE.github` 링크
- 각 항목: SVG 아이콘(인라인, `strokeWidth 1.5`, `18px`) + 라벨 + 값
- 클릭 시 해당 링크 이동
- `font-body text-sm text-ink-body`

**Framer Motion:** 섹션 진입 시 `scale: 0.95 → 1.0` + `opacity: 0 → 1`, `whileInView`, `once: true`

### 3. `src/app/page.tsx` 최종 수정 — Blog + Contact 연결

마지막으로 `<section id="contact" />`를 Blog와 Contact로 교체한다.

최종 page.tsx 구조:

```tsx
import Hero from '@/components/sections/Hero'
import Pillars from '@/components/sections/Pillars'
import TechStack from '@/components/sections/TechStack'
import Experience from '@/components/sections/Experience'
import Certs from '@/components/sections/Certs'
import Portfolio from '@/components/sections/Portfolio'
import Blog from '@/components/sections/Blog'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <main className="max-w-5xl mx-auto px-6 md:px-10">
        <Hero />
        <Pillars />
        <TechStack />
        <Experience />
        <Certs />
        <Portfolio />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
```

각 섹션이 자체적으로 `<section id="...">` 태그를 포함하도록 구현되어 있는지 확인하고, 없으면 page.tsx에서 `<section id="...">` 태그로 감싼다. Nav의 `useActiveSection`이 올바른 id를 감지할 수 있어야 한다.

필요한 섹션 id 목록: `hero`, `pillars`, `techstack`, `experience`, `portfolio`, `contact`

### 4. 테스트 파일 생성

`src/components/sections/Blog.test.tsx`: `BLOG_URL`이 비어있을 때 null을 렌더하는지 확인
`src/components/sections/Contact.test.tsx`: 이메일 링크와 GitHub 링크가 렌더되는지 확인

## Acceptance Criteria

```bash
npm run build
npm test
```

## 검증 절차

1. 아키텍처 체크리스트:
   - Blog, Contact 모두 Server Component인가?
   - Blog가 `BLOG_URL === ''`일 때 `null`을 반환하는가?
   - 모든 외부 링크에 `rel="noopener noreferrer"`가 있는가?
   - `email`, `github` 등 연락처 값이 컴포넌트에 하드코딩되지 않고 `@/data/profile`에서 import하는가?
   - 최종 page.tsx에서 Nav가 감지할 수 있는 섹션 id(`hero`, `pillars`, `techstack`, `experience`, `portfolio`, `contact`)가 모두 존재하는가?
2. `phases/1-mvp/index.json`의 step 6을 업데이트:
   - 성공 → `"status": "completed"`, `"summary": "생성된 파일 목록과 핵심 결정 한 줄 요약"`
   - 차단 → `"status": "blocked"`, `"blocked_reason": "구체적 사유"` 후 즉시 중단

## 금지사항

- 이메일 주소, GitHub URL을 컴포넌트 안에 직접 작성하지 마라. 이유: 콘텐츠는 `data/profile.ts`에서 단일 관리
- `BLOG_URL`이 비어있어도 Blog 섹션을 "준비 중" 상태로 렌더하지 마라. 이유: PRD 스펙에 미노출 명시
- Contact Form(입력 필드, 제출 버튼) 구현 금지. 이유: PRD MVP 제외 사항
- 기존 테스트를 깨뜨리지 마라.
