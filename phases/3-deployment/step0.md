# Step 0: seo-meta

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `docs/ARCHITECTURE.md`
- `docs/ADR.md`
- `src/app/layout.tsx` — 현재 metadata 설정 확인
- `src/app/opengraph-image.tsx` — OG 이미지 구현 확인
- `src/data/profile.ts` — PROFILE, INTRO 상수 확인

## 작업

포트폴리오 사이트 SEO에 필요한 sitemap, robots.txt, metadataBase를 추가한다.

### 1. `src/data/profile.ts` — SITE_URL 상수 추가

```typescript
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maximum0.vercel.app'
```

> **배포 후 할 일**: Vercel 대시보드 → Settings → Environment Variables → `NEXT_PUBLIC_SITE_URL` = 실제 URL → Redeploy. 코드 수정 없이 URL 변경 가능.

### 2. `src/app/layout.tsx` — metadataBase 및 OG 보강

`metadata` 객체에 아래 필드를 추가한다:

```typescript
import { SITE_URL } from '@/data/profile'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // 기존 title, description 유지
  openGraph: {
    // 기존 title, description, type 유지
    url: SITE_URL,
    siteName: `${PROFILE.name} 포트폴리오`,
  },
}
```

### 3. `src/app/sitemap.ts` — 신규 생성

Next.js App Router의 `MetadataRoute.Sitemap` 타입을 사용한다.

```typescript
import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/data/profile'

export default function sitemap(): MetadataRoute.Sitemap
```

포트폴리오는 단일 페이지(`/`)만 존재한다. `lastModified`는 현재 날짜, `changeFrequency: 'monthly'`, `priority: 1.0`으로 설정한다.

### 4. `src/app/robots.ts` — 신규 생성

Next.js App Router의 `MetadataRoute.Robots` 타입을 사용한다.

```typescript
import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/data/profile'

export default function robots(): MetadataRoute.Robots
```

모든 크롤러 허용(`*`), `sitemap` 필드에 sitemap URL을 포함한다.

### 5. 테스트 파일 생성

`src/app/sitemap.test.ts` — sitemap 반환값 검증:

- 배열 길이 1
- url이 SITE_URL + '/'
- changeFrequency, priority 필드 존재

`src/app/robots.test.ts` — robots 반환값 검증:

- rules에 userAgent `'*'` 포함
- sitemap 필드가 문자열로 존재

## Acceptance Criteria

```bash
npm run build
npm test
```

## 검증 절차

1. `npm run build` 결과에서 sitemap, robots 라우트가 생성됐는가?
2. 테스트가 모두 통과하는가?
3. `phases/3-deployment/index.json` step 0 업데이트:
   - 성공 → `"status": "completed"`, `"summary": "산출물 한 줄 요약"`
   - 차단 → `"status": "blocked"`, `"blocked_reason": "구체적 사유"` 후 즉시 중단

## 금지사항

- `opengraph-image.tsx`의 `runtime = 'edge'`를 수정하지 마라. Vercel 무료 플랜에서 정상 동작한다.
- SITE_URL을 컴포넌트에 하드코딩하지 마라. 반드시 `data/profile.ts`의 상수를 참조한다.
- 기존 테스트를 깨뜨리지 마라.
