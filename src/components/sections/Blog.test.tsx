import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Blog from './Blog'

vi.mock('@/data/profile', () => ({
  PROFILE: { BLOG_URL: '', email: '', github: '' },
}))

vi.mock('@/data/blog', () => ({
  BLOG_POSTS: [],
}))

describe('Blog', () => {
  it('BLOG_URL이 비어있으면 null을 렌더한다', () => {
    const { container } = render(<Blog />)
    expect(container.firstChild).toBeNull()
  })
})
