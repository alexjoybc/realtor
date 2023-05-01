import './globals.css'
import { Inter } from 'next/font/google'
import Header from './header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Morgage Plan',
  description: 'Plan your mortgage with AI',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-full">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  )
}
