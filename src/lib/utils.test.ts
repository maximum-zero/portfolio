import { describe, it, expect } from 'vitest'
import { getSkillByName, getAllSkills } from './utils'

describe('getSkillByName', () => {
  it('존재하는 기술명으로 SkillItem을 반환한다', () => {
    const result = getSkillByName('Java')
    expect(result).toBeDefined()
    expect(result?.name).toBe('Java')
  })

  it('iconSlug가 있는 기술의 iconSlug를 반환한다', () => {
    const result = getSkillByName('Redis')
    expect(result?.iconSlug).toBe('redis')
  })

  it('존재하지 않는 이름은 undefined를 반환한다', () => {
    const result = getSkillByName('존재하지않는기술')
    expect(result).toBeUndefined()
  })

  it('빈 문자열은 undefined를 반환한다', () => {
    const result = getSkillByName('')
    expect(result).toBeUndefined()
  })
})

describe('getAllSkills', () => {
  it('모든 그룹의 기술을 평탄화해 반환한다', () => {
    const skills = getAllSkills()
    expect(skills.length).toBeGreaterThan(0)
    expect(skills.every((s) => typeof s.name === 'string')).toBe(true)
  })

  it('Java와 Redis가 모두 포함된다', () => {
    const skills = getAllSkills()
    const names = skills.map((s) => s.name)
    expect(names).toContain('Java')
    expect(names).toContain('Redis')
  })

  it('중복 없이 각 기술은 한 번만 등장한다', () => {
    const skills = getAllSkills()
    const names = skills.map((s) => s.name)
    const unique = new Set(names)
    expect(unique.size).toBe(names.length)
  })
})
