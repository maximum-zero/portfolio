import { SKILLS } from '@/data/skills'
import type { SkillItem } from '@/types/skill'

export function getSkillByName(name: string): SkillItem | undefined {
  for (const group of SKILLS) {
    const found = group.items.find((item) => item.name === name)
    if (found) return found
  }
  return undefined
}

export function getAllSkills(): SkillItem[] {
  return SKILLS.flatMap((group) => group.items)
}
