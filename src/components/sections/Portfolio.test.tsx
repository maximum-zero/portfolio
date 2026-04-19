import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Portfolio from './Portfolio'

describe('Portfolio', () => {
  it('섹션 헤더를 렌더한다', () => {
    render(<Portfolio />)
    expect(screen.getByText('Selected Work')).toBeTruthy()
    expect(screen.getByText('포트폴리오')).toBeTruthy()
  })
})
