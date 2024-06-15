import { SignUp } from '@clerk/nextjs'
import React from 'react'

type Props = {}

const SignUpPage = (props: Props) => {
  return (
    <main className='flex-center h-screen w-screen'>
      <SignUp />
    </main>
  )
}

export default SignUpPage