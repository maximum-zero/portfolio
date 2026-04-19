import type { CoreStrengthItem } from '@/types/profile'

export const PROFILE = {
  name: '최대영',
  nickname: 'maximum0',
  role: '백엔드 개발자',
  email: 'maximum.zero95@gmail.com',
  github: 'https://github.com/maximum-zero',
  BLOG_URL: '',
} as const

export const INTRO =
  '풀스택 포지션으로 입사해 프론트엔드 개발을 주로 담당하면서, API 설계와 서버 사이드 작업에도 함께 참여했습니다. 클라이언트와 서버 양쪽을 경험하면서 백엔드에 더 흥미를 느꼈고, 이후 백엔드 심화 과정과 개인 프로젝트를 통해 본격적으로 확장했습니다.'

export const CORE_STRENGTHS: CoreStrengthItem[] = [
  {
    title: '대규모 트래픽 성능 개선',
    description:
      '선착순 쿠폰 시스템과 차량 관제 시스템에서 병목을 분석하고 Redis, 인덱스 최적화, 비동기 처리로 응답 성능을 개선한 경험',
  },
  {
    title: '동시성 및 데이터 정합성 설계',
    description:
      'Redis Atomic Counter 및 DB Lock 구조 개선을 통해 초과 발급 문제와 데이터 정합성 이슈를 해결한 경험',
  },
  {
    title: '실시간 시스템 아키텍처 개선',
    description:
      'RabbitMQ와 SSE 기반 구조로 전환하여 실시간 데이터 처리 성능과 시스템 확장성을 개선한 경험',
  },
]
