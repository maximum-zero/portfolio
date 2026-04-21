import { SITE_URL } from '@/data/profile'
import robots from './robots'

describe('robots', () => {
  it('rules에 userAgent "*" 가 포함된다', () => {
    const result = robots()
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules]
    const allRule = rules.find((r) => r.userAgent === '*')
    expect(allRule).toBeDefined()
  })

  it('sitemap 필드가 문자열로 존재한다', () => {
    const result = robots()
    expect(typeof result.sitemap).toBe('string')
  })

  it('sitemap이 SITE_URL을 포함한다', () => {
    const result = robots()
    expect(result.sitemap as string).toContain(SITE_URL)
  })
})
