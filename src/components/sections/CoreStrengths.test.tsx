import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CoreStrengths from './CoreStrengths'
import { CORE_STRENGTHS } from '@/data/profile'

describe('CoreStrengths', () => {
  it('3개 pillar title이 모두 렌더된다', () => {
    render(<CoreStrengths />)
    for (const pillar of CORE_STRENGTHS) {
      expect(screen.getByText(pillar.title)).toBeTruthy()
    }
  })

  it('3개 pillar description이 모두 렌더된다', () => {
    render(<CoreStrengths />)
    for (const pillar of CORE_STRENGTHS) {
      expect(screen.getByText(pillar.description)).toBeTruthy()
    }
  })

  it('섹션 헤더를 렌더한다', () => {
    render(<CoreStrengths />)
    expect(screen.getByText('핵심 역량')).toBeTruthy()
    expect(screen.getByText('Core Competencies')).toBeTruthy()
  })
})
