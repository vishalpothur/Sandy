import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sandy Photography | Premium Kids & Maternity Photography',
  description:
    'Award-winning kids, maternity & family photography. Capturing the magical moments that become your greatest treasures. Based in India.',
  keywords: 'kids photography, maternity photography, newborn photography, family portraits, India',
  openGraph: {
    title: 'Sandy Photography | Premium Kids & Maternity Photography',
    description: 'Capturing the magic of little ones — beautifully, forever.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
