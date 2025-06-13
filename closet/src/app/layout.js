//src/app/layout.js

import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Closet - Digital Wardrobe Manager',
  description: 'Organize your wardrobe digitally with AI-powered clothing recognition',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}