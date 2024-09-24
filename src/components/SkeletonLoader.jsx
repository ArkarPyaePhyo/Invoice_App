import React from 'react'


const SkeletonLoader = () => {
  return (
    <div className='mt-5'>
    <form>
      <div>
        <div className='mb-2'>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <div className="w-32 h-4 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
          </label>
          <div className="w-full h-10 bg-gray-200 dark:bg-gray-600 rounded"></div>
        </div>
        <div className='mb-2'>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <div className="w-32 h-4 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
          </label>
          <div className="w-full h-10 bg-gray-200 dark:bg-gray-600 rounded"></div>
        </div>
        <div className="flex items-start mb-2">
          <div className="flex items-center h-5">
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
          </div>
          <div className="flex flex-col">
            <div className="w-48 h-4 bg-gray-200 dark:bg-gray-600 rounded mt-2"></div>
          </div>
        </div>
        <div className="flex items-start mb-3">
          <div className="flex items-center h-5">
            <div className="w-4 h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
          </div>
          <div className="flex flex-col">
            <div className="w-48 h-4 bg-gray-200 dark:bg-gray-600 rounded mt-2"></div>
          </div>
        </div>
        <div className="w-32 h-10 bg-blue-200 dark:bg-blue-600 rounded"></div>
      </div>
    </form>
  </div>
  )
}

export default SkeletonLoader