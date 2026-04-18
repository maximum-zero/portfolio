# Architecture Decision Records

## 철학

콘텐츠의 신뢰성이 기술 복잡도보다 우선. 정적 생성으로 빠르게, 구조는 단순하게, 나중에 쉽게 확장 가능하게.

---

### ADR-001: Next.js 15 App Router 선택

**결정**: Next.js 15, App Router 방식  
**이유**: Server Component로 불필요한 JS 번들을 줄일 수 있고, `next/og`(Edge Runtime) OG 이미지 생성이 내장되어 별도 설정이 없다. Contact는 단순 링크로 처리하므로 API Route 불필요  
**트레이드오프**: Astro 대비 번들 사이즈가 크지만, 추후 동적 기능 추가 시 확장이 용이하다

---

### ADR-002: 콘텐츠를 CMS 없이 data/ 정적 파일로 관리

**결정**: career.ts, projects.ts 등 TypeScript 파일에 콘텐츠 직접 작성  
**이유**: 포트폴리오 콘텐츠는 업데이트 빈도가 낮다. CMS를 붙이면 외부 의존성과 비용이 생긴다. 개발자가 코드로 관리하는 것이 더 자연스럽다  
**트레이드오프**: 콘텐츠 수정 시 재배포 필요. 단, Vercel 자동 배포이므로 push로 해결됨

---

### ADR-003: 블로그는 외부 링크로 처리

**결정**: 자체 블로그 라우트 없이 Blog 섹션에서 외부 URL 링크로 포스트 목록 표시  
**이유**: 포트폴리오 사이트에서 블로그 글을 직접 호스팅할 필요가 없다. 외부 블로그 링크로 충분하며, 구조를 단순하게 유지할 수 있다  
**트레이드오프**: 블로그 디자인이 포트폴리오와 별개. 단, 유지 비용이 없다

---

### ADR-004: 라이트/다크 모드 지원 (data-mode 속성 방식)

**결정**: `<html data-mode="light|dark">` 속성 기반 CSS 변수 교체 방식으로 다크모드 지원  
**이유**: 기본은 라이트 모드이나, 다크모드 수요를 고려해 CSS 변수 레이어를 처음부터 구성한다. Tweaks 패널(개발 도구)에서 쉽게 전환 가능해 QA에도 유리하다  
**트레이드오프**: `prefers-color-scheme` 자동 감지를 초기에는 생략. 추후 `useEffect`로 OS 설정 연동 가능  
**Flash 방지**: `layout.tsx` `<head>` 안에 인라인 스크립트를 삽입해 hydration 전에 `data-mode` 즉시 적용

```html
<script dangerouslySetInnerHTML={{ __html: `
  (function() {
    var m = localStorage.getItem('color-mode') || 'light';
    document.documentElement.setAttribute('data-mode', m);
  })();
` }} />
```

---

### ADR-005: 프로젝트 상세를 중앙 팝업 Modal로 처리 + URL 공유

**결정**: 프로젝트 카드 클릭 시 중앙 팝업 Modal 표시. Modal 열릴 때 `?project={id}` 쿼리 스트링 추가  
**이유**: 단일 페이지 흐름을 끊지 않으면서 상세 정보를 충분히 보여줄 수 있다. `useSearchParams` + `useRouter`로 URL을 관리하면 Next.js 라우팅과 충돌 없이 특정 프로젝트 직링크 공유가 가능해진다  
**구현**:

- `ProjectList.tsx`: `useSearchParams()`로 초기 project ID 복원, `router.push('?project={id}')`로 열기, `router.replace('/')`로 닫기
- `ProjectList.tsx`는 `<Suspense>`로 감싸야 함 (`useSearchParams` 요구사항)
- Modal 열릴 때 `document.body.style.overflow = 'hidden'`, 닫힐 때 복원 (스크롤 락)
  **트레이드오프**: SSR 단계에서 Modal 콘텐츠를 서버 렌더하지 않음. 단, 포트폴리오 특성상 SEO보다 공유 편의가 우선

---

### ADR-006: Framer Motion 제한적 사용

**결정**: Framer Motion 도입하되, fade-in / slide-up / Modal 진입 세 가지만 허용. 섹션 진입 애니메이션은 1회만 실행  
**이유**: 간단한 진입 애니메이션에 Framer Motion을 쓰는 것은 과한 의존성이지만, Modal 트랜지션의 일관성과 `useReducedMotion` 통합이 이점이다  
**트레이드오프**: 번들 크기(~25kB gzipped) 추가. `prefers-reduced-motion` 대응 필수

---

### ADR-007: 기술 아이콘 — Simple Icons SVG + rounded-xl 컨테이너

**결정**: Simple Icons CDN SVG를 `rounded-xl` 컨테이너에 담는 방식 (iOS 앱 아이콘 스타일)  
**이유**: 텍스트 라벨 방식보다 아이콘이 즉시 인식 가능하다. `next/image + unoptimized`로 외부 SVG를 안전하게 로드한다. `rounded-xl` 컨테이너가 아이콘 경계를 정의해 배경색과의 충돌 없이 시인성을 확보한다  
**컨테이너**: 라이트 `bg-white shadow-sm p-3` / 다크 `bg-surface border border-line p-3`  
**금지**: `rounded-full` / pill 형태 컨테이너  
**트레이드오프**: Simple Icons CDN 외부 의존성. 단, CDN 불안정 시 `alt` 텍스트로 폴백 가능

---

### ADR-008: 경력과 교육을 단일 Experience 타임라인으로 통합

**결정**: Career + Education → `Experience.tsx` 하나로 통합. 중앙선 alternating 레이아웃  
**이유**: 경력 3~5년 미만 개발자에게 학력·교육은 경력만큼 중요한 맥락이다. 분리된 두 섹션은 시간 흐름이 단절되어 보이며, 통합하면 성장 궤적이 자연스럽게 드러난다  
**정렬**: `career.ts` 데이터는 `Experience.tsx` 서버 컴포넌트에서 최신→과거 순으로 1회 sort  
**importance 필드**: `ExperienceItem`에 `importance?: 'high' | 'normal'` 추가. 타임라인이 길어질 때 강조·필터링에 활용  
**트레이드오프**: 경력·교육 데이터를 하나의 배열로 관리. `type: 'work' | 'edu'`로 구분
