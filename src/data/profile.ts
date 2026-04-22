import type { CoreStrengthItem } from '@/types/profile'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maximum0.vercel.app'

export const PROFILE = {
  name: '최대영',
  nickname: 'maximum0',
  role: '풀스택 개발자',
  email: 'maximum.zero95@gmail.com',
  github: 'https://github.com/maximum-zero',
  BLOG_URL: '',
} as const

export const INTRO =
  '풀스택 포지션으로 시작해 프론트엔드 개발을 중심으로 API 설계와 서버 사이드 개발까지 함께 경험했습니다. 클라이언트와 서버 전반을 다루는 과정에서 백엔드 구조 설계와 성능 개선 문제에 흥미를 느끼게 되었고, 이후 대규모 트래픽 처리, 동시성 제어, 비동기 아키텍처 등 백엔드 영역을 중심으로 기술 역량을 확장하고 있습니다.'

export const CORE_STRENGTHS: CoreStrengthItem[] = [
  {
    title: '대규모 트래픽 성능 개선',
    description:
      'Full Scan, 동기 처리, Polling 기반 구조의 병목을 분석하고 Index 최적화 및 비동기 구조 개선을 통해 성능을 향상',
  },
  {
    title: '동시성 및 데이터 정합성 설계',
    description:
      'Redis Atomic Counter를 활용한 선착순 처리 구조로 DB Lock 문제를 제거하고 초과 발급 및 경합 문제를 해결',
  },
  {
    title: '실시간 시스템 아키텍처 개선',
    description:
      'RabbitMQ와 SSE 기반 구조로 Polling 구조를 대체하여 실시간 데이터 처리 효율 및 사용자 응답성을 개선',
  },
]
