export type SkillCategory =
  | 'Backend'
  | 'Database'
  | 'Infra'
  | 'Messaging'
  | 'Monitoring'
  | 'Test'
  | 'Frontend'

export interface SkillItem {
  name: string
  iconSlug?: string   // Simple Icons slug (예: 'spring', 'redis')
}

export interface SkillGroup {
  category: SkillCategory
  items: SkillItem[]
}
