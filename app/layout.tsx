import { ThemeProvider } from '@/components/provider/theme-provider'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/header'
import { cn } from '@/lib/utils'
import { ModalProvider } from '@/components/provider/modal-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PulseChat',
  description: 'The best way to create polls and share them with your friends.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className='h-full' suppressHydrationWarning>
        <body className={cn(inter.className, "h-full")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}