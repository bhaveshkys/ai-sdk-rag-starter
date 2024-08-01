import React from 'react'

const LoadingSkeleton = () => {
  const array = Array.from({ length: 5 });
  return (
    <div className="animate-pulse mt-10">
        <div className="flex-1 space-y-10 py-1">
          
        {array.map((_, index) => (
          <div key={index}>
            {/* Left aligned */}
            <div className='flex justify-start ml-72 mb-5'>
              <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            </div>
            {/* Right aligned */}
            <div className='flex justify-end mr-72'>
              <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
        ))}
          
          
        </div>
      
    </div>  
  )
}

export default LoadingSkeleton