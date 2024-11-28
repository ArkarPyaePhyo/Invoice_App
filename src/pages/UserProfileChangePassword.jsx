import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import { HiUser } from 'react-icons/hi'
import { useForm } from 'react-hook-form';
import useCookie from 'react-use-cookie';
import toast from 'react-hot-toast';
import Container from '../components/Container';
import UseUserInfo from '../stores/UseUserInfo';
import { useNavigate } from 'react-router-dom';

const UserProfileChangePassword = () => {

  const {
      register,
      handleSubmit,
      formState: { errors },
    reset} = useForm();

  const navigate = useNavigate();
  
  const [userInfo,setUserInfo] = useCookie('user-info');
  const [token,setToken] = useCookie('my-token');
  const {resetUser} = UseUserInfo();

 

  const updateNameBut = async(data)=>{
      const res = await fetch(import.meta.env.VITE_API_URL + "/user-profile/change-password",{
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
          toast("Login With New Password")
          setToken('');
          setUserInfo('');
          resetUser();
          navigate('/');
      }else{
          toast.error(json.message)
      }

  }

return (
  <Container>
      <div>
      <Breadcrumb links={[{previous_title:"User Profile",path:"/dashboard/user-profile"}]} icons={<HiUser className='size-4'/>} currentPageTitle={"Change Name"}/>
      <form onSubmit={handleSubmit(updateNameBut)} className='mt-3 rounded-md border-2 p-4'>
    <label htmlFor="old_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Old Password</label>
    <input  {...register('old_password',{required:true})} type="password"  className={`${errors.old_password ? "focus:ring-red-500 focus:border-red-500 " : "focus:ring-blue-500 focus:border-blue-500 "} w-[300px] mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}  />
    {errors.old_password && <p className='text-red-600 text-xs'> old password is required.</p>}
    <label htmlFor="new_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your New Password</label>
    <input  {...register('new_password',{required:true})} type="password"  className={`${errors.new_password ? "focus:ring-red-500 focus:border-red-500 " : "focus:ring-blue-500 focus:border-blue-500 "} w-[300px] mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}  />
    {errors.new_password && <p className='text-red-600 text-xs'> new password is required.</p>}
    <label htmlFor="new_password_confirmation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Your New Password</label>
    <input  {...register('new_password_confirmation',{required:true})} type="password"  className={`${errors.new_password_confirmation ? "focus:ring-red-500 focus:border-red-500 " : "focus:ring-blue-500 focus:border-blue-500 "} w-[300px] mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}  />
    {errors.new_password_confirmation && <p className='text-red-600 text-xs'> new password confirm is required.</p>}
         <button type='submit' className="flex justify-center mt-5 text-white bg-blue-600 p-2 rounded">
              Update Your Password
         </button>
      </form>
  </div>
  </Container>
)
}

export default UserProfileChangePassword