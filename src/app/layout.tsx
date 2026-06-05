import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sandy Photography | Kids, Maternity & Wedding Photography',
  description: 'Specialising in newborn, baby, kids & maternity photography across India. Every session is crafted with warmth, patience, and love.',
  keywords: 'kids photography, maternity photography, wedding photography, event photography, India',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
