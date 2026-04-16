# Step 1: code-quality

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `docs/ARCHITECTURE.md`
- `docs/ADR.md`
- `CLAUDE.md`
- `package.json` (Step 0에서 생성됨 — 현재 scripts, dependencies 확인)
- `eslint.config.mjs` (Step 0에서 생성됨 — 기존 ESLint 설정 확인)

## 작업

코드 품질 도구를 설치하고 설정한다. 모든 설정은 프로젝트 루트에 생성한다.

### 1. Prettier 설치 및 설정

```bash
npm install --save-dev prettier eslint-config-prettier
```

`.prettierrc` 파일을 생성한다:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

`.prettierignore` 파일을 생성한다:

```
.next/
out/
node_modules/
public/
```

`eslint.config.mjs`의 마지막 extends 항목에 `prettier`를 추가해 ESLint와 Prettier 규칙 충돌을 방지한다. `eslint-config-prettier`의 설정을 spread하는 방식으로 추가한다.

### 2. Husky + lint-staged 설치 및 설정

```bash
npm install --save-dev husky lint-staged
npx husky init
```

`.husky/pre-commit` 파일을 아래 내용으로 교체한다:

```sh
npx lint-staged
```

`package.json`에 `lint-staged` 설정을 추가한다:

```json
"lint-staged": {
  "*.{ts,tsx}": [
    "prettier --write",
    "eslint --fix"
  ],
  "*.{json,md,css}": [
    "prettier --write"
  ]
}
```

### 3. commitlint 설치 및 설정

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

`commitlint.config.ts` 파일을 생성한다:

```ts
import type { UserConfig } from '@commitlint/types'

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
}

export default config
```

`.husky/commit-msg` 파일을 생성한다:

```sh
npx --no -- commitlint --edit $1
```

### 4. Vitest 설치 및 설정

```bash
npm install --save-dev vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```

`vitest.config.ts` 파일을 생성한다:

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

`src/test/setup.ts` 파일을 생성한다:

```ts
import '@testing-library/jest-dom'
```

`package.json`의 `scripts`에 test 커맨드를 추가한다:

```json
"test": "vitest run",
"test:watch": "vitest"
```

### 5. 스모크 테스트 작성

`src/test/smoke.test.ts` 파일을 생성해 테스트 환경이 정상 동작하는지 확인한다:

```ts
describe('test environment', () => {
  it('should work', () => {
    expect(true).toBe(true)
  })
})
```

## Acceptance Criteria

```bash
npm run lint
npm run test
```

## 검증 절차

1. 아키텍처 체크리스트를 확인한다:
   - `.prettierrc`, `.prettierignore`, `commitlint.config.ts`, `vitest.config.ts` 파일이 생성되었는가?
   - `.husky/pre-commit`, `.husky/commit-msg` 파일이 존재하는가?
   - `eslint.config.mjs`에 prettier 설정이 추가되었는가?
   - `package.json`에 `lint-staged` 설정과 `test` 스크립트가 있는가?
2. 결과에 따라 `phases/0-setup/index.json`의 step 1을 업데이트한다:
   - 성공 → `"status": "completed"`, `"summary": "Prettier, Husky, lint-staged, commitlint, Vitest 설정 완료. pre-commit/commit-msg 훅 활성화"`
   - 사용자 개입 필요 → `"status": "blocked"`, `"blocked_reason": "구체적 사유"` 후 즉시 중단

## 금지사항

- Tailwind, Next.js 관련 설정을 변경하지 마라. 이 step은 코드 품질 도구만 다룬다.
- `src/data/`, `src/types/` 디렉토리를 수정하지 마라.
- `eslint.config.mjs`에서 기존 Next.js ESLint 규칙을 제거하지 마라. prettier 설정만 추가한다.
