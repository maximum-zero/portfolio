import type { Project } from '@/types/project'

export const PROJECTS: Project[] = [
  {
    id: 'portfolio',
    icon: '/favicon.ico',
    title: '개인 포트폴리오 사이트',
    type: 'personal',
    period: '2026.04 ~ 2026.04',
    members: '1명',
    category: 'frontend',
    summary:
      '설계 기반으로 구조를 정의하고 phase/step 단위로 개발을 분리하여 AI 협업 기반으로 구현한 포트폴리오 사이트',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel', 'Claude Code'],
    links: {
      githubFe: 'https://github.com/maximum-zero/portfolio',
      live: 'https://portfolio-sigma-two-d7qow2is2t.vercel.app/',
    },
    detail: {
      overview: [
        '컴포넌트 구조와 데이터 기반 렌더링을 중심으로 설계한 포트폴리오 사이트',
        'phase/step 기반 개발 구조를 적용하여 설계 → 구현 흐름을 단계별로 분리',
      ],

      features: [
        'Next.js App Router 기반 정적 페이지 구조 설계',
        'JSON 기반 콘텐츠 데이터 렌더링 구조 구현',
        '컴포넌트 재사용성을 고려한 UI 구조 설계',
      ],

      problem: [
        '템플릿 없이 디자인 시스템과 UI 구조를 직접 설계해야 하는 문제',
        'AI 기반 개발 과정에서 프롬프트 품질 및 반복 작업 관리 비효율 발생',
      ],

      solution: [
        'JSON 기반 데이터 구조로 UI와 콘텐츠를 분리하여 확장성 확보',
        'phase/step 기반 개발 구조를 적용하여 설계 → 구현 흐름 체계화',
        '프롬프트 구조를 반복 개선하여 AI 코드 생성 품질 및 일관성 향상',
        'Claude Code를 활용해 반복적인 UI 구현 작업 자동화',
      ],

      result: [
        '템플릿 없이 설계부터 배포까지 독립 구현 완료',
        'AI 협업 기반 개발 프로세스를 구조화하여 개발 속도 및 생산성 향상',
      ],
    },
  },
  {
    id: 'fastpick',
    icon: '/icons/projects/fastpick.svg',
    title: '선착순 쿠폰 발급 시스템',
    type: 'personal',
    period: '2026.01 ~ 2026.02',
    members: '1명',
    category: 'backend',
    summary:
      'Redis 기반 동시성 제어와 인덱스 최적화를 통해 대량 트래픽 환경의 쿠폰 발급 및 검색 성능을 개선한 시스템',
    techStack: [
      'Java',
      'Spring Boot',
      'JPA',
      'Querydsl',
      'JUnit5',
      'Redis',
      'PostgreSQL',
      'Ubuntu',
      'Docker',
      'Jenkins',
      'Prometheus',
      'Grafana',
      'k6',
      'React',
      'TypeScript',
    ],
    links: {
      githubBe: 'https://github.com/maximum-zero/fastpick-be',
      githubFe: 'https://github.com/maximum-zero/fastpick-fe',
      githubInfra: 'https://github.com/maximum-zero/fastpick-infra',
    },
    detail: {
      overview: [
        '대량 트래픽 환경에서 선착순 쿠폰 발급 시스템을 설계하고 성능 병목과 동시성 문제를 구조적으로 개선',
      ],
      features: [
        '키워드 기반 쿠폰 검색 (대용량 데이터 처리)',
        '선착순 쿠폰 발급 (동시성 제어)',
        '사용자 인증 기반 1인 1매 발급 제한',
      ],

      problem: [
        '100만 건 데이터 환경에서 Full Scan으로 인한 검색 성능 저하 발생',
        '동시 요청 환경에서 DB Lock으로 인해 초과 발급 발생 (Error Rate 75%)',
      ],

      solution: [
        '키워드 전용 테이블 및 인덱스 구조를 설계하여 Full Scan → Index Scan 전환',
        'Redis Atomic Counter를 활용한 동시성 제어로 선착순 발급 로직 구현',
        '스케줄러 기반 큐 처리 구조를 적용하여 요청 처리와 DB 저장 로직을 분리',
      ],

      result: [
        '검색 성능 개선: p99 60s → 154ms (200VU)',
        '발급 안정성 확보: 초과 발급 0건 (Error Rate 75% → 0%)',
      ],
    },
  },
  {
    id: 'CKT',
    icon: '/icons/projects/ckt.svg',
    title: '실시간 차량 관제 시스템',
    type: 'team',
    period: '2025.05 ~ 2025.07',
    members: '3명 (팀장, 팀원 2명)',
    category: 'fullstack',
    summary:
      'RabbitMQ 비동기 처리와 SSE 전환으로 대량 위치 데이터의 실시간 처리 성능을 개선한 시스템',
    techStack: [
      'Java',
      'Spring Boot',
      'JPA',
      'Querydsl',
      'RabbitMQ',
      'MySQL',
      'React',
      'TypeScript',
      'AWS',
      'Prometheus',
      'Grafana',
      'JMeter',
      'Pinpoint',
    ],
    links: {
      githubBe: '',
      githubFe: '',
    },
    detail: {
      overview: [
        '다수 차량의 위치 데이터를 수집·처리·시각화하는 시스템으로 실시간 처리 성능과 병목 문제를 개선',
      ],

      features: [
        'GPS 기반 차량 위치 데이터 수집 및 처리',
        'SSE 기반 실시간 위치 데이터 전송',
        '차량 운행 및 예약 관리 기능',
      ],

      problem: [
        '동기 구조로 위치 데이터를 처리하면서 DB 커넥션 병목 발생',
        'WAS 스레드 점유로 인해 동시 요청 처리 성능 저하',
      ],

      solution: [
        'RabbitMQ 기반 비동기 처리 구조로 요청 분산',
        'Polling → SSE 전환으로 실시간 데이터 전송 구조 개선',
        '부하 테스트 기반 병목 구간 분석 및 성능 개선',
      ],

      result: ['평균 응답 시간 8.8s → 434ms 단축', '동시 요청 처리 안정성 확보'],
    },
  },
  {
    id: 'edu-video-upload',
    icon: '/icons/projects/video.svg',
    title: '교육 영상 업로드 안정성 개선',
    type: 'work',
    period: '2024.10 ~ 2024.12',
    members: '6명 (기획 1명, 디자이너 1명, FE 2명, BE 1명, 마케터 1명)',
    category: 'frontend',

    summary:
      'Vimeo 청크 업로드 구조로 전환하여 대용량 영상 업로드의 실패율과 타임아웃 문제를 해결한 시스템',

    techStack: ['JavaScript', 'React', 'Next.js', 'Zustand', 'Vimeo API', 'Spring Boot', 'Vercel'],
    links: {},
    detail: {
      overview: [
        '대용량 영상 업로드 과정의 안정성 문제를 해결하기 위해 업로드 구조를 개선',
        '서버 경유 구조를 클라이언트 직접 업로드 방식으로 전환',
      ],

      features: ['관리자 영상 업로드 기능', '업로드 완료 후 메타데이터 등록 프로세스'],

      problem: [
        '500MB~수 GB 영상 업로드 시 서버 경유 구조에서 타임아웃 및 실패 발생',
        '네트워크 불안정 시 전체 재업로드로 UX 저하 발생',
      ],

      solution: [
        'Vimeo API 기반 Direct Upload 방식으로 전환',
        '청크 업로드 기반으로 중단 시 이어서 업로드 가능하도록 개선',
        '업로드 책임을 클라이언트로 분리하고 서버는 인증/메타데이터만 처리',
      ],

      result: [
        '대용량 영상 업로드 실패율 감소',
        '업로드 시간 및 사용자 대기 시간 감소',
        '관리자 업로드 프로세스 효율 개선',
      ],
    },
  },
  {
    id: 'euro-ceramic',
    icon: '/icons/projects/euroceramic.svg',
    title: '인테리어 이커머스 플랫폼 고도화',
    type: 'work',
    period: '2023.06 ~ 2024.06',
    members: '7명 (기획 1명, 디자이너 1명, FE 3명, BE 1명, 마케터 1명)',
    category: 'fullstack',

    summary:
      'Nuxt.js 기반으로 기존 사이트를 이커머스 구조로 전환하고 사용자 탐색 흐름과 관리자 기능을 개선한 프로젝트',

    links: {
      live: 'https://www.euroceramic.co.kr/',
    },

    techStack: [
      'JavaScript',
      'TypeScript',
      'Vue',
      'Nuxt.js',
      'Vuex',
      'Web Component',
      'Spring Boot',
      'MyBatis',
      'Vercel',
    ],

    detail: {
      overview: [
        '기존 회사 소개 사이트를 상품 중심 이커머스 구조로 확장',
        '프론트엔드 중심으로 사용자 경험 및 관리자 기능 개선',
      ],

      features: [
        '상품 카테고리 및 필터 기반 목록 구현',
        '스타일링 콘텐츠 연계 UI 구조 구현',
        '쇼룸 예약 및 소개 페이지 개발',
        '관리자 배너/상품/콘텐츠 관리 기능 구현',
      ],

      problem: [
        '필터 상태 유지되지 않아 UX 저하 발생',
        'WebEditor 기반 상세 페이지 CSS 충돌 발생',
        '이미지 로딩 성능 저하 발생',
      ],

      solution: [
        'URL Query 기반 필터 상태 관리로 UX 유지',
        'Web Component로 스타일 충돌 격리',
        '이미지 최적화 기준 정의로 성능 개선',
      ],

      result: ['탐색 UX 개선으로 이탈 감소', '관리자 콘텐츠 안정성 확보', 'UI/UX 완성도 향상'],
    },
  },
  {
    id: 'baza',
    icon: '/icons/projects/baza.svg',
    title: 'BAZA 패션 중고거래 플랫폼',
    type: 'work',
    period: '2021.05 ~ 2021.10',
    members: '6명 (기획: 1명, 디자인: 1명, FE: 2명, BE: 1명, 마케터: 1명)',
    category: 'frontend',
    summary:
      'Flutter 기반 MVP 단계에서 패션 중고거래 플랫폼을 빠르게 구현하며 실시간 기능과 UX를 개선한 프로젝트',

    techStack: [
      'Dart',
      'Flutter',
      'Firebase Realtime Database',
      'Firebase Cloud Messaging',
      'Spring Boot',
    ],

    links: {
      live: 'https://baza.co.kr/',
    },

    detail: {
      overview: [
        '스타트업 MVP 단계에서 빠른 출시를 목표로 개발된 패션 중고거래 플랫폼',
        '실시간 채팅 및 콘텐츠 기반 거래 기능 중심으로 개발',
      ],

      features: [
        'OOTD 기반 상품 연계 거래 기능',
        '실시간 채팅 기능',
        '소셜 인터랙션 기능 (좋아요/팔로우)',
      ],

      problem: [
        'MVP 일정 제한으로 핵심 기능 빠른 구현 필요',
        '무한 스크롤에서 메모리 증가 및 성능 저하 발생',
        'API 기반 UI로 인해 인터랙션 지연 발생',
        '외부 채팅 SDK 의존성 문제 발생',
      ],

      solution: [
        '핵심 기능 우선순위 정의하여 MVP 범위 내 구현',
        'Lazy Loading으로 메모리 사용량 감소',
        'Optimistic UI 적용으로 즉각 반응 UX 구현',
        'Firebase Realtime Database 기반 채팅 구조로 전환',
      ],

      result: [
        'MVP 기간 내 핵심 기능 구현 및 출시',
        '스크롤 성능 및 메모리 사용량 개선',
        'UX 반응 속도 개선',
        '외부 SDK 없이 실시간 채팅 구현',
      ],
    },
  },
]
