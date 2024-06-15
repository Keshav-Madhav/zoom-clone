import { SignIn } from '@clerk/nextjs'
import React from 'react'

type Props = {}

const SignInPage = (props: Props) => {
  return (
    <main className='flex-center h-screen w-screen'>
      <SignIn />
    </main>
  )
}

export default SignInPage