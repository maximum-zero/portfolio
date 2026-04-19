import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Experience from './Experience'
import { CAREER } from '@/data/career'

describe('Experience', () => {
  it('첫 번째 company명이 렌더된다', () => {
    render(<Experience />)
    expect(screen.getByText(CAREER[0].company)).toBeTruthy()
  })
})
