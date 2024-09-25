import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const Layout = () => {
  return (
    <main className='min-h-screen p-5 flex flex-col'>
        <Header/>
        <Outlet/>
        <Toaster
  toastOptions={{
    success: {
      style: {
        background: 'white',
      },
    },
    error: {
      style: {
        background: 'yellow',
      },
    },
  }}
/>
    </main>
  )
}

export default Layout