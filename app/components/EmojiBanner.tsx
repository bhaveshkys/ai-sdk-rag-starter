import React from 'react'
import styles from './EmojiBanner.module.css'
const EmojiBanner = () => {
  return (
    <div className={`${styles.banner} mx-auto` }>
      <div className='hidden md:block text-base md:text-5xl '> 🍝🍳🌭🌯🥟🍛🍜🍡🍫🧋🌽</div>
      <div className=' md:hidden text-base md:text-5xl text-left '> 🍝🍳🌭🌯🥟🍛🍜</div>
    </div>
  )
}

export default EmojiBanner