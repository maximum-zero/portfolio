# Step 0: next-init

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `docs/ARCHITECTURE.md`
- `docs/ADR.md`
- `CLAUDE.md`

## 작업

현재 디렉토리(`/`)는 이미 git 저장소이며 아래 파일들이 존재한다:

```
docs/           ← 설계 문서 (건드리지 않는다)
src/data/       ← 정적 콘텐츠 데이터 (건드리지 않는다)
src/types/      ← TypeScript 타입 정의 (건드리지 않는다)
scripts/        ← harness 스크립트 (건드리지 않는다)
CLAUDE.md
.gitignore
```

### 1. Next.js 프로젝트 초기화

프로젝트 루트에서 아래 커맨드를 실행한다. 이미 존재하는 파일과 충돌이 발생하면 덮어쓰기를 허용한다:

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-turbopack \
  --yes
```

### 2. 추가 패키지 설치

```bash
npm install framer-motion pretendard
```

### 3. 생성 결과 확인 및 보존

`create-next-app` 실행 후 아래 항목을 확인한다:

- `src/data/` 와 `src/types/` 디렉토리가 그대로 존재하는지 확인한다. 만약 삭제되었다면 git에서 복원한다:
  ```bash
  git checkout -- src/data/ src/types/
  ```
- `tsconfig.json`에 `"strict": true` 가 포함되어 있는지 확인한다. 없으면 `compilerOptions`에 추가한다.
- `src/app/globals.css`에 Tailwind v3 기본 지시어(`@tailwind base` 등)가 있을 것이다. 이 파일은 다음 step에서 교체하므로 지금은 그대로 둔다.

### 4. 불필요한 초기 파일 정리

아래 파일들의 내용을 최소화한다 (삭제하지 말고 내용만 비운다):

- `src/app/page.tsx` → 빈 `<main />` 만 남긴다:
  ```tsx
  export default function Home() {
    return <main />
  }
  ```
- `public/` 디렉토리의 Next.js 기본 SVG 파일들(`next.svg`, `vercel.svg`)은 삭제한다.

## Acceptance Criteria

```bash
npm run build
```

## 검증 절차

1. 아키텍처 체크리스트를 확인한다:
   - `src/data/`, `src/types/` 디렉토리가 손상 없이 존재하는가?
   - `tsconfig.json`에 `"strict": true`가 있는가?
   - `package.json`에 `framer-motion`, `pretendard`가 dependencies에 있는가?
2. 결과에 따라 `phases/0-setup/index.json`의 step 0을 업데이트한다:
   - 성공 → `"status": "completed"`, `"summary": "Next.js 15 프로젝트 초기화 완료. framer-motion, pretendard 설치. src/data, src/types 보존 확인"`
   - 사용자 개입 필요 → `"status": "blocked"`, `"blocked_reason": "구체적 사유"` 후 즉시 중단

## 금지사항

- `src/data/` 와 `src/types/` 디렉토리를 수정하거나 삭제하지 마라. 이 디렉토리에는 이미 콘텐츠 데이터와 타입 정의가 들어있다.
- `docs/` 디렉토리를 수정하지 마라.
- Tailwind 설정을 변경하지 마라. Tailwind v4 업그레이드는 Step 2에서 진행한다.
- `package.json`의 `scripts`를 임의로 추가하거나 변경하지 마라. 스크립트 변경은 이후 step에서 처리한다.
