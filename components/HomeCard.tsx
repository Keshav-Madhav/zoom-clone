import React from 'react'
import Image from 'next/image'

type Props = {
  imageUrl: string
  title: string
  description: string
  onClick: () => void
  className: string
}

const HomeCard = ({ imageUrl, title, description, onClick, className }: Props) => {
  return (
    <div 
      className={`${className} px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer`}
      onClick={onClick}
    >
      <div className='flex-center glassmorphism size-12 rounded-[10px]'>
        <Image src={imageUrl} width={27} height={27} alt='Add Meeting' />
      </div>

      <div className='flex flex-col gap-2'>
        <h1 className='text-2xl font-bold'>{title}</h1>
        <p className='text-lg font-normal'>{description}</p> 
      </div>
    </div>
  )
}

export default HomeCard