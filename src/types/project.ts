export type ProjectCategory = 'backend' | 'frontend' | 'fullstack'

export type ProjectType = 'personal' | 'team' | 'work'

export interface ProjectLink {
  githubBe?: string
  githubFe?: string
  githubInfra?: string
  live?: string
}

export interface ProjectDetail {
  overview: string
  role?: string        // 팀 프로젝트만 작성
  problem: string[]
  solution: string[]
  result: string[]
}

export interface Project {
  id: string
  title: string
  type: ProjectType
  period: string
  category: ProjectCategory
  summary: string      // 카드용 한 줄 설명
  techStack: string[]
  links: ProjectLink
  detail: ProjectDetail
}
