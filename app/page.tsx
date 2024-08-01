import Link from 'next/link'
import React from 'react'
import Navbar from './components/Navbar'
import EmojiBanner from './components/EmojiBanner'

const page = () => {
  return (
    <div className='min-h-screen bg-[#f2d4d4]'>
    <div>
      <Navbar/>
    </div>
    <div className='w-[75%] md:w-1/2 mx-auto mt-36'>
    <EmojiBanner/>
      <div className='font-sans font-bold md:text-4xl text-center text-[#e46a6a] mt-10 '> Your ultimate culinary companion</div>
      <div className='font-sans font-medium md:text-2xl text-center text-gray-900 mt-5 mb-10'> Whether you are a seasoned chef or a kitchen novice, RecipeBot has something special for everyone.</div>
      <EmojiBanner/>
    </div>
    </div>
  )
}

export default page