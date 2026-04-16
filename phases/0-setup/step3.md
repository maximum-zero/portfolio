# Step 3: base-layout

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `docs/ARCHITECTURE.md` — 디렉토리 구조, Server/Client Component 분리 규칙
- `docs/PRD.md` — 페이지 구조, 섹션 구성, SEO 전략
- `docs/UI_GUIDE.md` — 폰트, 레이아웃 규칙, 컴포넌트 스타일
- `docs/ADR.md` — ADR-001(Next.js), ADR-004(라이트 모드)
- `CLAUDE.md`
- `src/data/profile.ts` — 메타데이터에 사용할 이름, 이메일, GitHub URL
- `src/app/globals.css` (Step 2에서 생성 — @theme 토큰 확인)

## 작업

보일러플레이트를 정리하고, 폰트와 메타데이터가 적용된 루트 레이아웃과 페이지 스켈레톤을 구성한다.

### 1. 폰트 패키지 설치 확인

`pretendard` 패키지가 Step 0에서 설치되었는지 확인한다. `package.json`에 없으면 설치한다:

```bash
npm install pretendard
```

### 2. Pretendard 웹폰트 파일 복사

`node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2` 파일을 `public/fonts/PretendardVariable.woff2`로 복사한다:

```bash
mkdir -p public/fonts
cp node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2 public/fonts/
```

### 3. src/app/layout.tsx 작성

아래 인터페이스를 갖는 루트 레이아웃을 작성한다. Server Component이며 `'use client'`를 추가하지 않는다:

- Space Grotesk: `next/font/google`으로 로드 (`variable: '--font-display'`)
- Pretendard: `next/font/local`으로 `public/fonts/PretendardVariable.woff2` 로드 (`variable: '--font-body'`)
- 두 폰트 변수를 `<html>` 태그의 className에 주입한다
- `<html lang="ko">`
- metadata export:
  - `title`: `'maximum0 — 백엔드 개발자'`
  - `description`: profile.ts의 INTRO 첫 문장 (직접 import해서 사용)
  - `openGraph`: title, description, type: 'website'
  - `twitter`: card: 'summary_large_image'
- children을 `<body>`로 감싼다

### 4. src/app/page.tsx 작성

Server Component. 5개 섹션의 placeholder를 배치한다. 아직 실제 섹션 컴포넌트는 없으므로 `<section>` 태그에 id와 최소 높이만 부여한다:

```tsx
// 각 섹션의 id는 nav 스크롤 타겟과 일치해야 한다
// hero, tech-stack, career, projects, contact
export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-6 md:px-10">
      <section id="hero"       className="py-20 md:py-28" />
      <section id="tech-stack" className="py-20 md:py-28" />
      <section id="career"     className="py-20 md:py-28" />
      <section id="projects"   className="py-20 md:py-28" />
      <section id="contact"    className="py-20 md:py-28" />
    </main>
  )
}
```

### 5. src/app/opengraph-image.tsx 작성

`next/og`의 `ImageResponse`를 사용하는 OG 이미지 엔드포인트 스켈레톤을 작성한다:

- export: `ImageResponse` 반환하는 default function
- 사이즈: `{ width: 1200, height: 630 }`
- 내용: 배경 `#FAFAF8`, 닉네임 `maximum0`, 직군 텍스트 — 텍스트 색상은 `#1A1A18`
- Edge Runtime 사용 (`export const runtime = 'edge'`)

### 6. layout.tsx 테스트 파일 작성

CLAUDE.md 규칙에 따라 `src/app/layout.test.tsx`를 작성한다:

- metadata의 title과 description이 올바른 값인지 검증한다
- layout 컴포넌트가 children을 렌더링하는지 검증한다

## Acceptance Criteria

```bash
npm run build
npm run test
```

## 검증 절차

1. 아키텍처 체크리스트를 확인한다:
   - `src/app/layout.tsx`가 Server Component이고 `'use client'`가 없는가?
   - 두 폰트 변수가 `<html>` className에 주입되는가?
   - `src/app/page.tsx`의 섹션 id가 `hero`, `tech-stack`, `career`, `projects`, `contact`인가?
   - `public/fonts/PretendardVariable.woff2` 파일이 존재하는가?
   - `src/app/layout.test.tsx`가 존재하는가?
2. 결과에 따라 `phases/0-setup/index.json`의 step 3을 업데이트한다:
   - 성공 → `"status": "completed"`, `"summary": "layout.tsx(폰트, 메타데이터), page.tsx(섹션 스켈레톤 5개), opengraph-image.tsx 작성 완료. layout.test.tsx 포함"`
   - 사용자 개입 필요 → `"status": "blocked"`, `"blocked_reason": "구체적 사유"` 후 즉시 중단

## 금지사항

- `layout.tsx`에 `'use client'`를 추가하지 마라. 이유: 루트 레이아웃은 Server Component여야 한다.
- `src/data/`, `src/types/` 디렉토리를 수정하지 마라.
- 실제 섹션 컴포넌트(Hero, TechStack 등)를 이 step에서 구현하지 마라. 이유: 각 섹션은 이후 phase에서 단계적으로 개발한다.
- `globals.css`의 `@theme` 블록을 수정하지 마라. 이유: Step 2에서 확정된 디자인 토큰이다.
