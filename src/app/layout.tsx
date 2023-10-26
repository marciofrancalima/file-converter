import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Navbar } from '@/components/navbar'
import { Toaster } from '@/components/ui/toaster'

import '@/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Conversor de arquivos',
  description:
    'Use o file-converter gratuitamente como seu conversor de arquivos favoritos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Navbar />
        <Toaster />
        <div className="container min-h-screen max-w-4xl pt-32 lg:max-w-6xl lg:pt-36 2xl:max-w-7xl 2xl:pt-44">
          {children}
        </div>
      </body>
    </html>
  )
}
