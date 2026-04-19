import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import TechStack from './TechStack'

describe('TechStack', () => {
  it('섹션 헤더를 렌더한다', () => {
    render(<TechStack />)
    expect(screen.getByText('Tech Stack')).toBeTruthy()
    expect(screen.getByText('기술 스택')).toBeTruthy()
    expect(screen.getByText(/카테고리를 선택하면/)).toBeTruthy()
  })
})
