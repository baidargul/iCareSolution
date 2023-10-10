import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import NavigationMenuSideBar from '@/components/sideBars/NavigationMenuSideBar'
import { cn } from '@/lib/utils'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'iCare Solutions',
  description: 'Created by Baidar Gul',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(font.className, 'flex flex-row gap-2')}>
          <NavigationMenuSideBar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
