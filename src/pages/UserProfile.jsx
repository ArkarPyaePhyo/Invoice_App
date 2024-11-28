import React from 'react'
import useCookie from 'react-use-cookie';
import { HiOutlineIdentification } from 'react-icons/hi';
import Container from '../components/Container';
import { HiPencil } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import UseUserInfo from '../stores/UseUserInfo';

const UserProfile = () => {

    const {user:{name,email,profile_image},setUser}= UseUserInfo();
  
    
  
    return (
        <div>
            <Breadcrumb currentPageTitle={"User Profile"}/>
              <div className='border-2 rounded p-10 mt-2 flex flex-col items-start justify-center gap-5'>
        <div className="relative">
        <img  src={profile_image ? profile_image : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"} className='size-40 rounded-full object-cover object-top' alt="" />
        <Link to={'/dashboard/user-profile/user-change-image'} className='absolute right-0 top-0 translate-x-1/2'>
            <HiPencil className='hover:text-blue-700 border rounded-full'/>
        </Link>
        </div>
        <div className="flex flex-col gap-5 ">
        <div className='relative'>
        <h1 className=' text-3xl font-bold text-blue-700'>{name}</h1>
        <Link to={'/dashboard/user-profile/user-change-name'} className='absolute right-0 top-0 translate-x-1/2'>
            <HiPencil className='hover:text-blue-700 border rounded-full'/>
        </Link>
        </div>
        <div>
            <div className="relative">
            <p className='text-1xl font-bold text-blue-700 '>Change Password</p>
            <Link to={'/dashboard/user-profile/user-change-password'} className='absolute right-0 top-0 translate-x-1/2'>
            <HiPencil className='hover:text-blue-700 border rounded-full'/>
            </Link>
            </div>
        </div>
        </div>
      </div>
        </div>
      
    )
  }

export default UserProfile