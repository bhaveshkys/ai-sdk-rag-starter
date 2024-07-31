import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <Link href={"/chat"}>Login</Link>
    </div>
  )
}

export default page