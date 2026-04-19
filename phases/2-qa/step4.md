# Step 4: content-policy

## 개요

이 step은 구현 전 **사용자 결정이 필요한 콘텐츠 정책 항목**을 처리한다.
결정된 내용에 따라 코드 변경이 달라지므로, 작업 시작 전 아래 항목을 사용자에게 확인한다.

## 읽어야 할 파일

- `src/data/profile.ts` — `BLOG_URL` 값 확인
- `src/data/blog.ts` — 포스트 정의 확인
- `src/data/projects.ts` — 첫 프로젝트 `live: ''` 확인
- `src/components/layout/Nav.tsx` — 현재 nav 항목 목록 확인
- `src/components/sections/Blog.tsx` — BLOG_URL 조건부 로직 확인

## 결정 항목 (작업 전 확인)

### 결정 A: Blog 섹션 노출 정책

현재 `BLOG_URL: ''` → Blog 섹션 미노출.
`data/blog.ts`에 포스트 3개가 정의되어 있으나 도달 불가.

**선택지**:

1. **BLOG_URL 입력** → Blog 섹션 정상 노출 (포스트 클릭 시 외부 링크)
2. **"준비 중" 모드** → `BLOG_URL` 없어도 섹션은 표시, 각 포스트 링크 비활성화
3. **현행 유지** → 미노출 상태 유지 (추후 블로그 개설 시 URL 입력)

### 결정 B: Nav 항목 추가 여부

현재 Nav: 역량, 기술, 경험, 프로젝트, 연락 (5개)
Certs·Blog 섹션이 Nav에 없어 직접 이동 불가.

**선택지**:

1. **Certs 추가** → Nav에 "자격증" 항목 추가
2. **Blog 추가** → Nav에 "블로그" 항목 추가 (결정 A가 노출인 경우)
3. **둘 다 추가**
4. **현행 유지** → 섹션이 짧아 스크롤로 충분

### 결정 C: 첫 번째 프로젝트 live URL

`data/projects.ts`의 첫 번째 프로젝트 `live: ''` (TODO 상태).

**선택지**:

1. **URL 입력** → live 링크 활성화
2. **live 버튼 숨김 처리** → `live: ''` 이면 링크 미노출 (ProjectModal에 조건 추가)

## 작업

**위 결정 사항이 확정된 후** 아래 작업을 수행한다.

### A. Blog 섹션 (결정 A 기준)

- **URL 입력**: `src/data/profile.ts`의 `BLOG_URL`에 실제 URL 입력
- **준비 중 모드**: `src/components/sections/Blog.tsx`에서 BLOG_URL 없을 때 "준비 중" 상태 렌더링 추가
- **현행 유지**: 변경 없음

### B. Nav 항목 (결정 B 기준)

`src/components/layout/Nav.tsx`의 `NAV_ITEMS` 배열에 항목 추가:

```ts
{ id: 'certs', label: '자격증' }   // Certs 추가 시
{ id: 'blog', label: '블로그' }    // Blog 추가 시 (섹션 id 확인 필요)
```

### C. 프로젝트 live URL (결정 C 기준)

- **URL 입력**: `src/data/projects.ts` 첫 항목의 `live` 필드에 URL 입력
- **숨김 처리**: `src/components/ui/ProjectModal.tsx`에서 `live` 링크 렌더링 조건 추가
  ```tsx
  {
    project.links?.live && <a href={project.links.live}>...</a>
  }
  ```

## Acceptance Criteria

```bash
npm run build
npm test
```

## 검증 절차

1. 결정된 정책대로 변경이 적용됐는가?
2. Blog 섹션이 정책에 맞게 노출/미노출되는가?
3. 완료 후 `phases/2-qa/index.json` step 4 업데이트

## 금지사항

- 결정 사항 없이 임의로 BLOG_URL을 채우거나 Nav 항목을 추가하지 마라
- 기존 테스트를 깨뜨리지 마라
