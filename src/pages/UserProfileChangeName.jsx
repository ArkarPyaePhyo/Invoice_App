import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import { HiUser } from 'react-icons/hi'
import { useForm } from 'react-hook-form';
import useCookie from 'react-use-cookie';
import toast from 'react-hot-toast';
import Container from '../components/Container';
import UseUserInfo from '../stores/UseUserInfo';

const UserProfileChangeName = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      reset} = useForm();
    
    const [userInfo,setUserInfo] = useCookie('user-info');
    const [token] = useCookie('my-token');
    const {setUser} = UseUserInfo();

    const {name} = JSON.parse(userInfo);

    const updateNameBut = async(data)=>{
        const res = await fetch(import.meta.env.VITE_API_URL + "/user-profile/change-name",{
            method : "POST",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Authorization" : `Bearer ${token}`,
            },
            body:JSON.stringify(data),
        });

        const json = await res.json();

        if (res.status === 200){
            toast.success(json.message);
            setUserInfo(JSON.stringify(json.user));
            setUser(json.user)
        }else{
            toast.error(json.message)
        }

    }

  return (
    <Container>
        <div>
        <Breadcrumb links={[{previous_title:"User Profile",path:"/dashboard/user-profile"}]} icons={<HiUser className='size-4'/>} currentPageTitle={"Change Name"}/>
        <form onSubmit={handleSubmit(updateNameBut)} className='mt-3 rounded-md border-2 p-4'>
      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
      <input  {...register('name',{required:true})} type="text" defaultValue={name} className={`${errors.name ? "focus:ring-red-500 focus:border-red-500 " : "focus:ring-blue-500 focus:border-blue-500 "} w-[300px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}  />
      {errors.name && <p className='text-red-600 text-xs'> name is required.</p>}
           <button type='submit' className="flex justify-center mt-5 text-white bg-blue-600 p-3 rounded">
                Update Your Name
           </button>
        </form>
    </div>
    </Container>
  )
}

export default UserProfileChangeName