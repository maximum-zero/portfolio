import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import localFont from 'next/font/local'
import { INTRO, PROFILE } from '@/data/profile'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: `${PROFILE.nickname} — ${PROFILE.role}`,
  description: INTRO.split('.')[0] + '.',
  openGraph: {
    title: `${PROFILE.nickname} — ${PROFILE.role}`,
    description: INTRO.split('.')[0] + '.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${spaceGrotesk.variable} ${pretendard.variable}`}>
      <body>{children}</body>
    </html>
  )
}
