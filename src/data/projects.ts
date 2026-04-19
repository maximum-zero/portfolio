import type { Project } from '@/types/project'

export const PROJECTS: Project[] = [
  {
    id: 'portfolio',
    icon: '/favicon.ico',
    title: '개인 포트폴리오 사이트',
    type: 'personal',
    period: '2026.04 ~ 진행중',
    members: '1명',
    category: 'frontend',
    summary: 'AI 협업 기반 개발 방식을 활용해 빠르게 설계·구현한 포트폴리오 사이트',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel', 'Claude Code'],
    links: {
      githubFe: 'https://github.com/maximum-zero/portfolio',
      live: '', // TODO: 배포 URL 입력
    },
    detail: {
      overview:
        '컴포넌트 구조와 데이터 기반 렌더링을 중심으로 설계한 포트폴리오 사이트로, Harness 기반 단계별 개발 방식을 적용해 Claude Code와의 협업 효율을 높였습니다.',

      features: [
        'Next.js App Router 기반 정적 페이지 구성',
        '데이터(JSON) 기반 콘텐츠 렌더링 구조',
      ],

      problem: [
        '템플릿 없이 일관된 디자인 시스템과 구조를 직접 설계해야 하는 문제',
        'AI 협업 시 반복 작업과 흐름 단절 문제',
      ],

      solution: [
        '데이터(JSON) 기반 콘텐츠 구조로 컴포넌트 재사용성과 확장성 확보',
        'Harness phase/step 구조로 개발 단계를 분리하여 AI 협업 흐름 정립',
        'Claude Code를 활용해 반복적인 UI 구현 작업 자동화',
      ],

      result: [
        '템플릿 없이 구조 설계부터 배포까지 독립 구현',
        '단계별 개발 흐름을 통해 AI 협업 효율 및 개발 속도 향상',
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
      'Redis 동시성 제어와 인덱스 최적화로 대량 트래픽 환경의 쿠폰 발급 성능을 개선한 시스템',
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
      overview:
        '대량 트래픽 환경에서 선착순 쿠폰 발급 시스템을 설계하고, 성능 병목과 동시성 문제를 분석해 구조적으로 개선했습니다.',
      features: [
        '키워드 기반 쿠폰 검색 (대용량 데이터 최적화)',
        '선착순 쿠폰 발급 (동시성 제어)',
        '사용자 인증 기반 발급 제한 (1인 1매)',
      ],
      problem: [
        '100만 건 환경에서 키워드 검색 시 Full Scan으로 성능 저하 및 응답 실패 발생',
        '동시 발급 요청 시 DB Lock 병목으로 초과 발급 발생 (Error Rate 75%)',
      ],
      solution: [
        '키워드 전용 테이블 + 인덱스 구조로 검색 경로 재설계 (Full Scan → Index Scan)',
        'Redis Atomic Counter 기반 선착순 판단으로 DB Lock 제거',
        '큐 기반 비동기 처리 구조 도입으로 발급 로직을 요청 흐름에서 분리',
      ],
      result: [
        '검색: 200VU 환경에서 p99 응답 시간 60s → 154ms 단축',
        '발급: 1000VU 환경에서 초과 발급 0건 달성 (Error Rate 75% → 0%)',
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
      overview:
        '다수 차량의 위치 데이터를 수집·처리·시각화하는 시스템으로, 실시간 처리 성능 개선과 병목 제거를 중심으로 구조를 개선했습니다.',
      features: [
        'GPS 데이터 기반 차량 위치 수집 및 처리',
        'SSE 기반 실시간 위치 데이터 전송',
        '차량 운행 및 예약 관리 기능',
      ],

      problem: [
        '대량 위치 데이터를 동기 구조로 처리하면서 DB 커넥션 병목 발생',
        '응답 지연 및 WAS 스레드 점유로 동시 요청 처리 불안정',
      ],

      solution: [
        'RabbitMQ 기반 비동기 처리 구조로 전환하여 요청 분산',
        'Polling → SSE 전환으로 실시간 데이터 전송 구조 개선',
        '부하 테스트 기반 병목 구간 식별 및 개선 전후 성능 검증',
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
      'Vimeo 청크 업로드 구조로 전환하여 대용량 영상 업로드의 실패율과 타임아웃 문제를 해결한 관리자 시스템 개선',

    techStack: ['JavaScript', 'React', 'Next.js', 'Zustand', 'Vimeo API', 'Spring Boot', 'Vercel'],
    links: {
      githubBe: '',
      githubFe: '',
    },
    detail: {
      overview:
        '교육 콘텐츠 관리자 시스템에서 대용량 영상 업로드 과정의 안정성 문제를 해결하기 위해 업로드 구조를 개선한 작업입니다. 서버를 경유하던 기존 구조를 클라이언트 직접 업로드 방식으로 전환하여 성능과 안정성을 동시에 확보했습니다.',

      features: [
        '관리자 페이지에서 대용량 교육 영상 업로드 기능',
        '업로드 완료 후 메타데이터 기반 콘텐츠 등록 프로세스',
      ],

      problem: [
        '500MB~수 GB 영상 업로드 시 서버 경유 구조에서 타임아웃 및 업로드 실패 빈번 발생',
        '네트워크 불안정 시 전체 업로드 재시도로 인한 사용자 경험 저하',
      ],

      solution: [
        '기존 서버 업로드 구조 대비 네트워크 안정성과 확장성을 고려하여 Vimeo API 기반 Direct Upload 방식으로 전환',
        '청크 업로드 기반으로 전송 중단 시에도 이어서 업로드 가능하도록 개선',
        '서버는 인증 정보만 처리하고, 업로드 완료 후 메타데이터만 저장하도록 역할 분리',
      ],

      result: [
        '대용량 영상 업로드 실패율 감소 및 안정성 확보',
        '업로드 시간 및 사용자 대기 시간 단축',
        '관리자 콘텐츠 등록 프로세스 효율 개선',
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
      'Nuxt.js 기반으로 기존 회사 사이트를 이커머스 구조로 전환하고, 사용자 탐색 흐름과 관리자 기능을 중심으로 서비스 구조를 개선',

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
      overview:
        '기존 단순 회사 소개 페이지를 상품 목록, 스타일링 콘텐츠, 쇼룸 예약 기능을 포함한 이커머스 구조로 확장한 프로젝트. 프론트엔드 개발을 중심으로 사용자 탐색 경험 개선과 관리자 기능 구현을 담당했습니다.',

      features: [
        '상품 카테고리 및 필터 기반 목록 페이지 구현',
        '스타일링 콘텐츠와 상품을 연결하는 UI 및 데이터 구조 구현',
        '쇼룸 예약 및 소개 페이지 개발',
        '배너, 상품, 스타일링을 관리하는 관리자 페이지 개발',
      ],

      problem: [
        '필터링 상태가 유지되지 않아 뒤로가기 및 공유 시 사용자 경험 저하',
        'WebEditor 기반 상품 상세 콘텐츠 렌더링 시 CSS 충돌 발생',
        '대용량 이미지로 인해 로딩 성능 저하 및 품질 이슈 발생',
      ],

      solution: [
        'URL Query Parameter를 활용하여 필터 상태를 관리하고, 뒤로가기 및 공유 시 동일한 상태 유지',
        'WebEditor 영역을 Web Component로 분리하여 스타일 충돌 방지',
        '이미지 해상도 및 포맷 기준을 정의하여 렌더링 품질과 로딩 성능 개선',
      ],

      result: [
        '필터 기반 탐색 UX 개선으로 사용자 탐색 흐름 단축 및 페이지 이탈 감소에 기여',
        '관리자 콘텐츠 렌더링 안정성 확보',
        '기획자 및 디자이너와 협업을 통한 UI/UX 완성도 향상',
      ],
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
      '스타트업 MVP 단계에서 Flutter 기반 패션 중고거래 플랫폼을 빠르게 구현하며 사용자 인터랙션과 실시간 기능을 개선한 프로젝트',

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
      overview:
        '스타트업 MVP 단계에서 빠른 서비스 출시를 목표로 개발된 패션 중고거래 플랫폼으로, OOTD 기반 콘텐츠와 실시간 채팅 기능을 중심으로 사용자 간 상호작용을 강화했습니다. 프론트엔드 개발을 담당하며 제한된 일정 내에서 기능 구현과 사용자 경험 개선을 병행했습니다.',

      features: [
        'OOTD 기반 스타일 공유 및 상품 연계 거래 기능',
        '실시간 채팅 기반 사용자 간 거래 기능',
        '팔로우·좋아요 기반 소셜 인터랙션',
      ],

      problem: [
        'MVP 단계로 제한된 일정 내에서 핵심 기능을 빠르게 구현해야 하는 상황',
        '스타일 피드 무한 스크롤 시 이미지 누적으로 메모리 사용량 증가 및 성능 저하 발생',
        '좋아요/팔로우 UI가 API 응답에 의존하면서 사용자 인터랙션 지연 발생',
        '채팅 기능 도입 과정에서 외부 SDK 의존성과 일정 불일치 문제 발생',
      ],

      solution: [
        '핵심 기능 중심으로 우선순위를 정의하여 MVP 범위 내 기능 구현',
        '이미지 Lazy Loading 및 리스트 렌더링 최적화로 메모리 사용량 감소',
        'Optimistic UI 적용으로 사용자 입력에 즉각 반응하도록 인터랙션 개선',
        'Sendbird 대신 Firebase Realtime Database 기반 채팅 구조로 전환하여 일정 대응',
      ],

      result: [
        '제한된 기간 내 핵심 기능 중심의 MVP 서비스 구현 및 출시',
        '무한 스크롤 구간에서 메모리 사용량 감소 및 스크롤 성능 개선',
        '사용자 인터랙션 반응 속도 개선으로 UX 향상',
        '외부 의존성 없이 실시간 채팅 기능 안정적으로 구현',
      ],
    },
  },
]
