import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import React from 'react'

type Props = {
  children: React.ReactNode;
}

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