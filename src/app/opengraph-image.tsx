import { ImageResponse } from 'next/og'
import { PROFILE } from '@/data/profile'

export const runtime = 'edge'

export const size = { width: 1200, height: 630 }

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FAFAF8',
        gap: '16px',
      }}
    >
      <div
        style={{
          fontSize: 96,
          fontWeight: 700,
          color: '#1A1A18',
          letterSpacing: '-0.04em',
        }}
      >
        {PROFILE.nickname}
      </div>
      <div
        style={{
          fontSize: 36,
          color: '#4A4A46',
        }}
      >
        {PROFILE.role}
      </div>
    </div>,
    { ...size }
  )
}
