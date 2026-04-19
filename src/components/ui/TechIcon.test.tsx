import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TechIcon from './TechIcon'

describe('TechIcon', () => {
  it('iconSlug가 있으면 img 태그를 렌더한다', () => {
    render(<TechIcon item={{ name: 'Redis', iconSlug: 'redis' }} />)
    const img = screen.getByRole('img', { name: 'Redis' })
    expect(img).toBeTruthy()
    expect(img.getAttribute('src')).toContain('redis')
  })

  it('iconSlug가 없으면 이름 첫 글자를 표시한다', () => {
    render(<TechIcon item={{ name: 'Querydsl' }} />)
    expect(screen.getByText('Qu')).toBeTruthy()
  })
})
