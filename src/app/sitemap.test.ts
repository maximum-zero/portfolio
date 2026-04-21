import { SITE_URL } from '@/data/profile'
import sitemap from './sitemap'

describe('sitemap', () => {
  it('배열 길이가 1이다', () => {
    expect(sitemap()).toHaveLength(1)
  })

  it('url이 SITE_URL + "/" 이다', () => {
    const [entry] = sitemap()
    expect(entry.url).toBe(`${SITE_URL}/`)
  })

  it('changeFrequency 필드가 존재한다', () => {
    const [entry] = sitemap()
    expect(entry.changeFrequency).toBeDefined()
  })

  it('priority 필드가 존재한다', () => {
    const [entry] = sitemap()
    expect(entry.priority).toBeDefined()
  })
})
