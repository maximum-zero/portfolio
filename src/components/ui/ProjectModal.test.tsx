import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ProjectModal from './ProjectModal'
import { PROJECTS } from '@/data/projects'

const project = PROJECTS[0]

describe('ProjectModal', () => {
  it('project title을 렌더한다', () => {
    render(<ProjectModal project={project} onClose={vi.fn()} />)
    expect(screen.getByText(project.title)).toBeTruthy()
  })

  it('닫기 버튼 클릭 시 onClose를 호출한다', () => {
    const onClose = vi.fn()
    render(<ProjectModal project={project} onClose={onClose} />)
    fireEvent.click(screen.getByLabelText('닫기'))
    expect(onClose).toHaveBeenCalledOnce()
  })
})
