import React, { useEffect } from 'react'
import Header from './Header'
import { Navigate, Outlet} from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import useCookie from 'react-use-cookie';
import UseUserInfo from '../stores/UseUserInfo';

const Layout = () => {

  const [userToken]= useCookie('my-token');
  const [userInfo,setUserInfo] = useCookie('user-info');
  const {user,setUser}= UseUserInfo();

  useEffect(()=>{
    setUser(JSON.parse(userInfo));
  },[])

  if(!userToken){
    return <Navigate to={'/'}/>
  }

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