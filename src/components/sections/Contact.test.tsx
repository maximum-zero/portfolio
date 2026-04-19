import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Contact from './Contact'

describe('Contact', () => {
  it('이메일 링크를 렌더한다', () => {
    render(<Contact />)
    const emailLink = screen.getByRole('link', { name: /email/i })
    expect(emailLink).toHaveAttribute('href', 'mailto:maximum.zero95@gmail.com')
  })

  it('GitHub 링크를 렌더한다', () => {
    render(<Contact />)
    const githubLink = screen.getByRole('link', { name: /github/i })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/maximum-zero')
  })
})
