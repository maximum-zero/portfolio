# Step 3: mobile-responsive

## 개요

모바일 대응이 부족한 컴포넌트에 반응형 클래스를 추가한다.
뷰포트 너비 375px(iPhone SE) 기준으로 레이아웃이 깨지지 않도록 한다.

## 읽어야 할 파일

- `src/components/sections/Hero.tsx` — `py-24 px-6` 고정, 반응형 클래스 없음
- `src/components/sections/TechStack.tsx` — `var(--container-narrow)` 고정
- `src/components/layout/Footer.tsx` — 반응형 미적용
- `src/components/ui/ProjectModal.tsx` — 모바일 스크롤 UX 검토
- `src/components/ui/TechIcon.tsx` — 터치 기기 tooltip 확인

## 작업

### 1. `src/components/sections/Hero.tsx` — 모바일 여백 최적화

현재 `py-24 px-6` (96px 상하, 24px 좌우) 고정.
모바일에서 과도한 상하 여백을 줄인다:

```
py-16 md:py-24  (64px → 96px)
```

배경 동심원 ring 3개가 모바일 화면 밖으로 overflow되는지 확인한다.
ring이 overflow되는 경우 `overflow-hidden`을 섹션 래퍼에 추가한다.

### 2. `src/components/sections/TechStack.tsx` — 모바일 패딩 확인

`var(--container-narrow)` 는 `min(880px, 100% - 48px)` 로 정의되어 있어
모바일에서 `100% - 48px` (좌우 24px씩)로 자동 적용된다.
별도 수정이 필요 없다면 패스해도 된다.

필터 탭이 모바일에서 가로 스크롤 없이 표시되는지 확인한다.
스크롤이 필요한 경우 `overflow-x-auto` 추가를 고려한다.

### 3. `src/components/ui/TechIcon.tsx` — tooltip 처리

현재 tooltip이 `hover:`로만 작동 → 터치 기기에서 미표시.

아래 두 방식 중 선택한다:

- **A) tooltip 제거**: 이미 이름이 뱃지에 텍스트로 표시되므로 tooltip 불필요
- **B) tooltip 유지**: 터치 대응 없이 데스크톱 전용 hover로만 두기

tooltip을 제거하는 경우 관련 absolute 엘리먼트와 group 클래스를 정리한다.

### 4. `src/components/ui/ProjectModal.tsx` — 모바일 scroll 개선

모바일에서 `max-h-[90vh]` 내에서 스크롤이 자연스럽게 동작하는지 확인한다.

헤더가 sticky로 고정되어 있는 경우, 모바일에서 컨텐츠 영역이 충분히 확보되는지 확인한다.
필요시 모바일 전용 `px-4` 추가 또는 패딩 조정.

## Acceptance Criteria

```bash
npm run build
npm test
```

## 검증 절차

1. 브라우저 DevTools에서 iPhone SE(375px) 뷰포트로 전체 스크롤 확인:
   - Hero 섹션이 잘려나가지 않는가?
   - TechStack 필터 탭이 가로 overflow 없이 표시되는가?
   - ProjectModal이 모바일에서 스크롤 가능한가?
2. 완료 후 `phases/2-qa/index.json` step 3 업데이트

## 금지사항

- `backdrop-filter: blur()` 사용 금지 (UI_GUIDE 안티패턴)
- 기존 데스크톱 레이아웃을 변경하지 마라. `md:` prefix 이하만 조정한다
- 기존 테스트를 깨뜨리지 마라
