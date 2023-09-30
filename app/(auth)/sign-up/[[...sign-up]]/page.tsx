import React from 'react'
import Image from 'next/image'
import { SignUp } from '@clerk/nextjs'
const page = () => {
  return (
    <div className=' flex flex-col items-center justify-center py-4 custom-scrollbar'>
      <div className='head-text flex space-x-2   mb-2'>
        {/* <p className='text-transparent bg-clip-text bg-white'>Login To</p> */}
        <Image src='logo-orbits.png' width={28} height={28} alt='logo'/>
        <span className='bg-clip-text bg-gradient-to-tr from-purple-600 to-red-800 text-transparent '>Orbits</span>
      </div>
      <SignUp/>
    </div>
  )
}

export default page
