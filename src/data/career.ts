import type { CareerItem } from '@/types/career'

export const CAREER: CareerItem[] = [
  {
    id: 'todos',
    company: '(주) 투도스',
    role: '개발자',
    period: '2021년 10월 – 2025년 01월',
    duration: '3년 4개월',
    tasks: [
      '웹 서비스 기능 개발 및 운영 업무 수행',
      'SSR 구조 도입을 통해 렌더링 성능 및 SEO 개선',
      'Vimeo Chunk Upload 적용을 통해 대용량 파일 업로드 안정성 확보',
      '입력값 검증 및 XSS / SQL Injection 대응 구조 구축',
      '운영 배포 및 장애 대응 수행',
    ],
  },
  {
    id: 'baja',
    company: '(주) 바자코퍼레이션',
    role: '개발자',
    period: '2021년 05월 – 2021년 10월',
    duration: '6개월',
    tasks: [
      '초기 스타트업 서비스 MVP 개발에 참여',
      'Firebase 기반 실시간 채팅 및 푸시 알림 기능 구현',
      '서버리스 기반 실시간 데이터 통신 구조 설계 경험',
      'Lazy Loading 및 이미지 최적화를 통한 초기 사용자 경험 개선',
    ],
  },
]
