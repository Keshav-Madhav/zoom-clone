import StreamVideoProvider from '@/providers/StreamClientProvider'
import React from 'react'
import { Metadata } from 'next/types'

export const metadata: Metadata = {
  title: "Yoom - A Zoom Clone",
  description: "Video calling app",
  icons:{
    icon: "/icons/logo.svg",
  }
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>
      
    </main>
  )
}

export default RootLayout