import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <main className='min-h-screen p-5 flex flex-col'>
        <Header/>
        <Outlet/>
    </main>
  )
}

export default Layout