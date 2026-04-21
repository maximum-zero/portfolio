# Step 1: build-final

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `docs/ARCHITECTURE.md`
- `docs/ADR.md`
- `next.config.ts` — 현재 설정 확인
- `phases/3-deployment/step0.md` — 이전 step 작업 내용 확인
- `phases/3-deployment/index.json` — step 0 summary 확인

이전 step에서 만들어진 코드를 꼼꼼히 읽고, 설계 의도를 이해한 뒤 작업하라.

## 작업

배포 환경 최적화 설정을 추가하고 최종 빌드를 검증한다.

### 1. `next.config.ts` — 배포 최적화 설정 추가

아래 옵션을 `NextConfig`에 추가한다:

```typescript
const nextConfig: NextConfig = {
  poweredByHeader: false,
  // 기존 images 설정 유지
}
```

- `poweredByHeader: false`: 응답 헤더에서 `X-Powered-By: Next.js` 제거 (불필요한 서버 정보 노출 방지)

### 2. `vercel.json` — 정적 자산 캐시 헤더 설정

프로젝트 루트에 `vercel.json`을 생성한다:

```json
{
  "headers": [
    {
      "source": "/_next/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

`/_next/static/**` 경로의 정적 번들 파일은 콘텐츠 해시가 포함되므로 1년 캐시가 안전하다.

## Acceptance Criteria

```bash
npm run build
npm run lint
npm test
```

## 검증 절차

1. `npm run build`가 에러 없이 완료되는가?
2. `npm run lint`가 에러 없이 통과하는가?
3. `npm test`가 모두 통과하는가?
4. `phases/3-deployment/index.json` step 1 업데이트:
   - 성공 → `"status": "completed"`, `"summary": "산출물 한 줄 요약"`
   - 차단 → `"status": "blocked"`, `"blocked_reason": "구체적 사유"` 후 즉시 중단

## 금지사항

- `output: 'export'`를 추가하지 마라. Vercel은 Next.js를 네이티브로 지원하므로 불필요하며, edge runtime 기능(`opengraph-image.tsx`)과 충돌한다.
- 기존 `images` 설정을 제거하지 마라. `cdn.simpleicons.org` 원격 패턴이 필요하다.
- 기존 테스트를 깨뜨리지 마라.
