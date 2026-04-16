import type { Project } from '@/types/project'

export const PROJECTS: Project[] = [
  {
    id: 'coupon-system',
    title: '선착순 쿠폰 발급 시스템',
    type: 'personal',
    period: '2026.01 – 2026.02',
    category: 'backend',
    summary: 'Redis 동시성 제어와 인덱스 재설계로 100만 건 환경 쿠폰 발급 성능 최적화',
    techStack: ['Java', 'Spring Boot', 'JPA', 'Redis', 'MySQL', 'Docker', 'k6'],
    links: {
      githubBe: '',    // TODO: 실제 링크 입력
      githubFe: '',
      githubInfra: '',
    },
    detail: {
      overview:
        '쿠폰 키워드 검색과 선착순 발급 기능을 갖춘 시스템. 100만 건 데이터 환경에서 실제 트래픽 시나리오를 재현하고, 성능 병목 구간을 분석해 구조적으로 개선했습니다.',
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
    id: 'vehicle-control',
    title: '실시간 차량 관제 시스템',
    type: 'team',
    period: '2025.05 – 2025.07',
    category: 'fullstack',
    summary: 'RabbitMQ 비동기 메시징과 SSE 전환으로 대량 위치 데이터 실시간 처리 개선',
    techStack: ['Java', 'Spring Boot', 'RabbitMQ', 'SSE', 'React', 'JMeter', 'Pinpoint'],
    links: {
      githubBe: '',    // TODO: 실제 링크 입력
      githubFe: '',
    },
    detail: {
      overview:
        '다수 차량의 실시간 위치 데이터를 수집·처리·시각화하는 관제 시스템. Kernel 360 백엔드 심화 캠프 팀 프로젝트로 진행했습니다.',
      role: 'RabbitMQ 기반 메시징 구조 설계, SSE 실시간 데이터 전달 구현, JMeter·Pinpoint 성능 분석',
      problem: [
        '대량 위치 데이터를 동기 구조로 처리하면서 DB 커넥션 병목 발생',
        '응답 지연 및 WAS 스레드 점유로 동시 요청 처리 불안정',
      ],
      solution: [
        'RabbitMQ 기반 비동기 메시징 구조로 전환 — 요청을 큐에 적재해 분산 처리',
        'Polling 방식을 SSE로 전환 — 서버에서 클라이언트로 실시간 데이터 푸시',
        'JMeter·Pinpoint를 활용한 병목 구간 식별 및 개선 전후 성능 검증',
      ],
      result: [
        '평균 응답 시간 8.8s → 434ms 단축',
        '동시 요청 처리 안정성 확보',
      ],
    },
  },
]
