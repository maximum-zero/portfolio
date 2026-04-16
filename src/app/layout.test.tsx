import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { metadata } from './layout'
import RootLayout from './layout'

describe('RootLayout', () => {
  it('metadata title이 올바른 값이다', () => {
    expect(metadata.title).toBe('maximum0 — 백엔드 개발자')
  })

  it('metadata description이 INTRO 첫 문장으로 시작한다', () => {
    expect(typeof metadata.description).toBe('string')
    expect((metadata.description as string).length).toBeGreaterThan(0)
  })

  it('openGraph title이 설정되어 있다', () => {
    expect(metadata.openGraph?.title).toBe('maximum0 — 백엔드 개발자')
  })

  it('twitter card가 summary_large_image이다', () => {
    expect(metadata.twitter?.card).toBe('summary_large_image')
  })

  it('children을 렌더링한다', () => {
    render(
      <RootLayout>
        <div data-testid="child">test content</div>
      </RootLayout>
    )
    expect(screen.getByTestId('child')).toBeDefined()
  })
})
