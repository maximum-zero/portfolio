# Step 3: mobile-responsive

## 읽어야 할 파일

- `src/components/sections/Hero.tsx` — `py-24` 고정값, ring 구조 확인
- `src/app/globals.css` — hero-ring 크기 정의 확인 (overflow-hidden으로 클리핑됨)
- `src/components/sections/Experience.tsx` — 모바일 카드 레이아웃
- `src/components/sections/Certs.tsx` — 자격증 항목 1줄 처리 여부
- `src/components/ui/ProjectList.tsx` — 카드 내 기술 태그 overflow
- `src/components/ui/ProjectModal.tsx` — 모바일 헤더/패딩 구조
- `src/components/ui/TechStackClient.tsx` — 필터 탭 가로 overflow 여부
- `src/components/sections/Hero.tsx` — meta row 2줄 wrap 여부
- `phases/2-qa/index.json` — step 상태 확인

## 작업

Hero ring은 섹션에 `overflow-hidden`이 적용되어 있어 클리핑으로 처리됨. 현행 유지.
TechIcon tooltip은 hover-only로 유지.

### 1. `src/components/sections/Hero.tsx` — 모바일 상하 여백 축소

현재 `py-24`(96px 고정) → `py-16 md:py-24`(모바일 64px, 데스크톱 96px).
이유: 모바일에서 hero 콘텐츠 진입 전 여백이 과도하게 넓어 UX 저하.

### 2. 모바일 2줄 깨짐 전수 조사 및 수정

**375px(iPhone SE) 뷰포트**에서 아래 컴포넌트를 직접 확인하고 깨지는 부분을 수정한다.

| 컴포넌트              | 확인 항목                                       | 수정 방향                                |
| --------------------- | ----------------------------------------------- | ---------------------------------------- |
| `Hero.tsx` meta row   | `Open to Work · 3-5 YEARS · Seoul, KR` 2줄 wrap | `flex-wrap` 허용 또는 `text-[10px]` 축소 |
| `Experience.tsx`      | 회사명(`text-2xl`) overflow                     | `text-xl md:text-2xl` 조정               |
| `ProjectList.tsx`     | 카드 내 기술 태그 overflow                      | `flex-wrap` 확인                         |
| `ProjectModal.tsx`    | 헤더(아이콘+제목+태그) 모바일 패딩              | `px-5 md:px-8` 조정                      |
| `TechStackClient.tsx` | 필터 탭 가로 overflow                           | `overflow-x-auto` 추가                   |
| `Certs.tsx`           | 자격증명 + 날짜·기관 텍스트 overflow            | `text-xs` 또는 줄바꿈 허용               |

수정 시 **데스크톱 레이아웃은 변경하지 않는다**. `md:` 이하 breakpoint에서만 조정.

## Acceptance Criteria

```bash
npm run build
npm test
```

## 검증 절차

1. 브라우저 DevTools iPhone SE(375px) 기준 전체 섹션 스크롤:
   - 어느 섹션에서도 가로 스크롤이 발생하지 않는가?
   - 텍스트가 컨테이너 밖으로 삐져나오지 않는가?
   - 각 섹션이 의도한 레이아웃으로 표시되는가?
2. 데스크톱(1280px)에서 기존 레이아웃이 그대로인가?
3. `phases/2-qa/index.json` step 3 업데이트:
   - 성공 → `"status": "completed"`, `"summary": "수정된 컴포넌트 목록 한 줄 요약"`
   - 차단 → `"status": "blocked"`, `"blocked_reason": "구체적 사유"` 후 즉시 중단

## 금지사항

- `backdrop-filter: blur()` 사용 금지 (UI_GUIDE 안티패턴)
- 데스크톱(`md:` 이상) 레이아웃을 변경하지 마라
- Hero ring 크기를 수정하지 마라. `overflow-hidden` 클리핑으로 충분
- 기존 테스트를 깨뜨리지 마라
