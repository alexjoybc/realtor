import './globals.css'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import Header from './header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Morgage Plan',
  description: 'Plan your mortgage with AI, Calculate how much you can afford',
  keywords: ['Morgage', 'Loan', 'Property', 'House', 'Calculator', 'Bank', 'Money', 'Affordable'],
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
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-D6N6KJDJ73" strategy="afterInteractive" 
      />
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6324299542397221"
     crossorigin="anonymous"></Script>

      <Script id="google-analytics" strategy="afterInteractive">
        {` 
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}      
          gtag('js', new Date());

          gtag('config', 'G-D6N6KJDJ73');
        `}
      </Script>
    </html>
  )
}
