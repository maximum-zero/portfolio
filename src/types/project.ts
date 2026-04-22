export type ProjectCategory = 'backend' | 'frontend' | 'fullstack'

export type ProjectType = 'personal' | 'team' | 'work'

export interface ProjectLink {
  title: string
  url: string
}

export interface ProjectDetail {
  overview: string[]
  features?: string[] // 주요기능
  problem: string[]
  solution: string[]
  result: string[]
}

export interface Project {
  id: string
  title: string
  type: ProjectType
  period: string
  members?: string // 참여인원 (예: "1인", "4인 팀")
  category: ProjectCategory
  summary: string // 카드용 한 줄 설명
  icon?: string // public/icons/ 경로 (예: '/icons/project.png')
  techStack: string[]
  links: ProjectLink[]
  detail: ProjectDetail
}
