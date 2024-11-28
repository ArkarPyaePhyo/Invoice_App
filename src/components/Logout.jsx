import React from 'react'
import { Link } from 'react-router-dom'
import { HiCash, HiLogout } from 'react-icons/hi'

const Logout = () => {
  return (
    <div><Link to={'/'} className='flex items-center justify-start w-24 gap-3 mt-2 py-3 px-2 text-white bg-blue-600 rounded'>
    Logout <span>
      <HiLogout/>
    </span>
  </Link></div>
  )
}

export default Logout