import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import React from 'react'
import { Metadata } from 'next/types'

type Props = {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Yoom - A Zoom Clone",
  description: "Video calling app",
  icons:{
    icon: "/icons/logo.svg",
  }
};

const homeLayout = ({children}: Props) => {
  return (
    <main className='relative'>
      <Navbar />

      <div className='flex'>
        <Sidebar />

        <section className='flex min-h-screen flex-1 flex-col p06 pt-28 max-md:pb-14 sm:px-14'>
          <div className='w-full'>
            {children}
          </div>
        </section>
      </div>
    </main>
  )
}

export default homeLayout