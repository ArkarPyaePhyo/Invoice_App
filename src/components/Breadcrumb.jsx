import React from 'react'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { HiChevronDoubleRight, HiMiniHome } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

const Breadcrumb = ({currentPageTitle}) => {
  return (
    <div>
        

<nav className="flex" aria-label="Breadcrumb">
  <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
    <li className="inline-flex items-center">
      <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
        <HiMiniHome className="w-4 h-4 "/>
        Home
      </Link>
    </li>
    <li aria-current="page">
      <div className="flex items-center">
        <HiChevronDoubleRight/>
        <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">{currentPageTitle}</span>
      </div>
    </li>
  </ol>
</nav>


    </div>
  )
}

export default Breadcrumb