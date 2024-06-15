"use client"

import { sideBarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {}

const Sidebar = (props: Props) => {
  const pathname = usePathname()
  return (
    <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
      <div className='flex flex-1 flex-col gap-6'>
        {sideBarLinks.map((link, index) => {
          const isActive = pathname === link.route || pathname.includes(link.route);

          return (
            <Link key={index} href={link.route} className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {
              'bg-blue-1' : isActive
            })}>
              <Image src={ link.imgUrl } width={24} height={24} alt={link.label} />
              <p className='text-lg font-semibold hidden lg:block'>
                {link.label}
              </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default Sidebar