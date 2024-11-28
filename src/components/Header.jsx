import React from 'react'
import Container from './Container'
import useCookie from 'react-use-cookie';
import { HiOutlineIdentification } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { HiPencil } from 'react-icons/hi2';
import UseUserInfo from '../stores/UseUserInfo';


const Header = () => {

  const {user:{name,email,profile_image}} = UseUserInfo();

  return (
    <header className='mb-5'>
        <Container>
            <div className="flex justify-between ">
              <div>
            <h1 className='text-3xl font-bold text-blue-700'>Karz</h1>
            <p className='text-1xl font-bold text-blue-700 '>Voucher App</p>
              </div>
              <div className='flex justify-between items-center gap-2'>
                <img  src={profile_image ? profile_image : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"} className='size-12 rounded-full object-cover object-top' alt="" />
                <div className="">
                <h1 className='text-3xl font-bold text-blue-700'>{name}</h1>
                <p className='text-1xl font-bold text-blue-700 '>{email}</p>
                </div>
              </div>
            </div>
        </Container>
    </header>
  )
}

export default Header