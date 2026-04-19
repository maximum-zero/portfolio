import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from './Hero'

describe('Hero', () => {
  it('MAXIMUM IMPACT. 슬로건을 렌더한다', () => {
    render(<Hero />)
    expect(screen.getByText('MAXIMUM IMPACT')).toBeTruthy()
  })

  it('ZERO NOISE. 슬로건을 렌더한다', () => {
    render(<Hero />)
    expect(screen.getByText('ZERO')).toBeTruthy()
    expect(screen.getByText('NOISE')).toBeTruthy()
  })

  it('eyebrow 텍스트를 렌더한다', () => {
    render(<Hero />)
    expect(screen.getByText(/Backend Engineer/)).toBeTruthy()
  })

  it('meta row를 렌더한다', () => {
    render(<Hero />)
    expect(screen.getByText(/Open to Work/)).toBeTruthy()
  })
})
