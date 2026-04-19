import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import { INTRO, PROFILE } from '@/data/profile'
import Nav from '@/components/layout/Nav'
import FloatingActions from '@/components/layout/FloatingActions'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: `${PROFILE.name} | ${PROFILE.role}`,
  description: INTRO.split('.')[0] + '.',
  openGraph: {
    title: `${PROFILE.name} | ${PROFILE.role}`,
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
    <html
      lang="ko"
      data-mode="light"
      className={`${spaceGrotesk.variable} ${pretendard.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var m=localStorage.getItem('color-mode')||'light';document.documentElement.setAttribute('data-mode',m);})();`,
          }}
        />
      </head>
      <body>
        <Nav />
        {children}
        <FloatingActions />
      </body>
    </html>
  )
}
