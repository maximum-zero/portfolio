import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from './Footer'

describe('Footer', () => {
  it('슬로건 텍스트를 렌더한다', () => {
    render(<Footer />)
    expect(screen.getByText(/MAXIMUM IMPACT/)).toBeTruthy()
    expect(screen.getByText(/ZERO NOISE/)).toBeTruthy()
  })

  it('copyright 텍스트를 렌더한다', () => {
    render(<Footer />)
    expect(screen.getByText(/© 2026 최대영/)).toBeTruthy()
    expect(screen.getByText(/Built with calm precision/)).toBeTruthy()
  })
})
