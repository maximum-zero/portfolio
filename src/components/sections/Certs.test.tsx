import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Certs from './Certs'
import { CERTS } from '@/data/certs'

describe('Certs', () => {
  it('첫 번째 자격증명이 렌더된다', () => {
    render(<Certs />)
    expect(screen.getByText(CERTS[0].name)).toBeTruthy()
  })
})
