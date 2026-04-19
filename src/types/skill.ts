export type SkillCategory =
  | 'Backend'
  | 'Database'
  | 'Infra'
  | 'Messaging'
  | 'Realtime'
  | 'Monitoring'
  | 'Test'
  | 'Frontend'
  | 'Tools'

export interface SkillItem {
  name: string
  iconSlug?: string // Simple Icons slug (예: 'spring', 'redis')
  iconPath?: string // public/icons/skills/ 경로 (예: '/icons/skills/aws.svg')
}

export interface SkillGroup {
  category: SkillCategory
  items: SkillItem[]
}
