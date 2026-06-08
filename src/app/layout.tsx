import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sandy Photography | Kids, Maternity & Wedding Photography India',
  description: 'Luxury kids, newborn, maternity & wedding photography across India. Because they won\'t stay this little forever. Book your session today.',
  keywords: 'kids photography India, maternity photography, newborn photography, wedding photography, baby photographer, Sandy photography',
  openGraph: {
    title: 'Sandy Photography | Kids, Maternity & Wedding Photography',
    description: 'Luxury kids, newborn, maternity & wedding photography across India. Timeless images, heartfelt storytelling.',
    type: 'website',
    locale: 'en_IN',
    images: [{ url: '/photos/kids-outdoor.jpg', width: 1200, height: 630, alt: 'Sandy Photography' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sandy Photography',
    description: 'Luxury kids, newborn, maternity & wedding photography across India.',
    images: ['/photos/kids-outdoor.jpg'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
