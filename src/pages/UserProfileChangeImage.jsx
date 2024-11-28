import React, { useRef } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import { HiCamera,HiUser } from 'react-icons/hi'
import {  useForm } from 'react-hook-form';
import useCookie from 'react-use-cookie';
import toast from 'react-hot-toast';
import Container from '../components/Container';
import UseUserInfo from '../stores/UseUserInfo';


const UserProfileChangeImage = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      reset} = useForm();

    
    
    const [userInfo,setUserInfo] = useCookie('user-info');
    const [token] = useCookie('my-token');
    const {user:{profile_image},setUser}= UseUserInfo();
    
    const imageInputRef = useRef();

    const updateImageBut = async(event)=>{
 
        const formData = new FormData();
        formData.append("profile_image",event.target.files[0]);

        const res = await fetch(import.meta.env.VITE_API_URL + "/user-profile/change-profile-image",{
            method : "POST",
            headers:{
                // "Content-Type":"multipart/form-data",
                "Accept":"application/json",
                "Authorization": `Bearer ${token}`,
            },
            body:formData,
        });

        const json = await res.json();

        if (res.status === 200){
            toast.success(json.message);
            setUserInfo(JSON.stringify(json.user));
            setUser(json.user);
            reset();
        }else{
            toast.error(json.message);
        }
    }

    const handleImageUpdate =()=>{
        imageInputRef.current.click();
    }
    return (
        <Container>
            <Breadcrumb links={[{previous_title:"User Profile",path:"/dashboard/user-profile"}]} icons={<HiUser className='size-4'/>} currentPageTitle={"Change Image"}/>
            <div className='mt-3 rounded-md border-2 p-4'>
                <div className='relative inline-block'>
                <img  src={profile_image ? profile_image : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"} className=' size-40  rounded-full ' alt="" />
            <button onClick={handleImageUpdate} className=' absolute bottom-0 right-0 active:scale-50 '>
            <HiCamera className='size-10' />
            </button>
                </div>
            <form >
            <input onChange={updateImageBut} id='profile_image' ref={imageInputRef} type="file" className={`${errors.profile_image ? "focus:ring-red-500 focus:border-red-500 " : "focus:ring-blue-500 focus:border-blue-500 "} hidden w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}   />
            </form>
        </div>
        </Container>
      )
}

export default UserProfileChangeImage