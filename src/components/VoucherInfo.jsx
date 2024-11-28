import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import SaleForm from './SaleForm';
import VoucherTable from './VoucherTable';
import UseRecordStore from '../stores/UseRecordStore';
import { ring } from 'ldrs'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useCookie from 'react-use-cookie';

ring.register();
const VoucherInfo = () => {

  const [token]= useCookie('my-token');

    const {
        register,
        handleSubmit,
        formState: { errors },
      reset} = useForm();

    const  generateVoucherId=() =>{
        // Get the current date in YYYYMMDD format
        const date = new Date();
        const formattedDate = date.toISOString().split('T')[0].replace(/-/g, '');
    
        // Generate a random number between 1000 and 9999
        const randomNum = Math.floor(Math.random() * 9000) + 1000;
    
        // Combine the date and the random number
        const voucherId = `${formattedDate}-${randomNum}`;
    
        return voucherId;
    }
    
    // Example usage
    const newVoucherId = generateVoucherId();

    const {records,resetRecord} =UseRecordStore();

    const [isSending,setIsSending] = useState(false);

    const navigate = useNavigate();

    
    
    const submitBtn = async(data)=>{
      setIsSending(true);
      const total = records.reduce((a,b)=> a+ b.cost,0);
      const tax = total * 0.05;
      const net_total = total + tax ;

      const res =  await fetch(import.meta.env.VITE_API_URL+"/vouchers",{
        method : 'POST',
        headers :{
          "Content-Type": "application/json",
          "Accept" :"application/json",
          "Authorization":`Bearer ${token}`
        },
        body : JSON.stringify({...data,records,total,tax,net_total})
      })

      const json = await res.json();
     
      if(res.status === 201){
        toast.success("Voucher Created Successfully");

        reset();
        resetRecord();
        setIsSending(false);

        if(data.Link_to_vDetail){
          navigate(`/dashboard/voucher/voucherDetails/${json.data.id}`)
        }
      }else{
          toast.error(json.message);
        }
        
     
    }

  return (
    <section>
      <div className="grid grid-cols-4">
        <div className="col-span-3 mr-3"><SaleForm/>
        <VoucherTable/></div>
        <div className="col-span-1 flex flex-col h-full"> 
          <form onSubmit={handleSubmit(submitBtn)} className='grid grid-cols-1  gap-5 mb-5' id='formInfo'>
            <div className='col-span-1'>
            <label className='text-md font-bold'>Voucher Id</label>
            <input {...register('voucher_id',{required:'true'}) } defaultValue={`INV-${newVoucherId}`} type='text' className={` ${errors.voucher_id ?"focus:ring-red-500 focus:border-red-500 border-red-500 ring-red-500" : "focus:ring-blue-500 focus:border-blue-500 " }  block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}  />
            {errors.voucher_id && <p className=' text-red-600 text-xs '>ID is required.</p>}
            </div>
            <div className='col-span-1'>
            <label className='text-md font-bold'>Customer Name</label>
            <input htmlFor='customer_name' {...register('customer_name',{required : true})} type='text'  className={`block w-full p-4  text-sm text-gray-900 border-gray-300 border  rounded-lg bg-gray-50 ${errors.customer_name ?"focus:ring-red-500 focus:border-red-500 border-red-500 ring-red-500" : "focus:ring-blue-500 focus:border-blue-500 " }   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}   />
            {errors.customer_name && <p className=' text-red-600 text-xs '>Name is required.</p>}
            </div>
            <div className='col-span-1'>
            <label className='text-md font-bold'>Customer Email</label>
            <input {...register('customer_email',{required : true})} type='text'   className={`block w-full p-4   text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 ${errors.customer_email ?"focus:ring-red-500 focus:border-red-500 border-red-500 ring-red-500" : "focus:ring-blue-500 focus:border-blue-500 " }   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}   />
            {errors.customer_email && <p className=' text-red-600 text-xs '>Email is required.</p>}
            </div>
            <div className='col-span-1'>
            <label className='text-md font-bold'>Sale Date</label>
            <input {...register('sale_date')} defaultValue={new Date().toISOString().slice(0,10)} type="date"  className="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   />
            </div>
        </form>
        <div  className='flex flex-col gap-2 mt-auto' >
        <div className="flex items-center ">
          <div className="flex items-start justify-end h-5">
          <input {...register('all_correct',{required:'true'})} id='all_correct' type="checkbox" value="" className={`w-4 h-4 border border-gray-300 rounded bg-gray-50  ${errors.all_correct ?"focus:ring-red-500 focus:border-red-500 border-red-500 ring-red-500" : "focus:ring-blue-500 focus:border-blue-500 " }" dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800`}  />
          </div>
          <div className="flex flex-col">
          <label htmlFor='all_correct' className="ms-2 text-sm font-medium text-blue-500 dark:text-gray-300">I'm Sure That's All Correct</label>
          {errors.all_correct && <p className=' text-red-600 text-xs '>Check is required.</p>}

          </div>
        </div>   
        <div className="flex items-center ">
          <div className="flex items-start justify-end h-5">
          <input {...register('Link_to_vDetail')} id='Link_to_vDetail' type="checkbox" value="" className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800' />
          </div>
          <div className="flex flex-col">
          <label  className="ms-2 text-sm font-medium text-blue-500 dark:text-gray-300">Link To Voucher Details</label>
          </div>
        </div>   
        <button form='formInfo'  type="submit" className={` ${records.length === 0 ? "hidden" : ""}  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>Create Voucher{isSending && <l-ring
  size="20"
  stroke="5"
  bg-opacity="0"
  speed="2" 
  color="white" 
></l-ring>}</button>
        </div>
        </div>
      </div>
       
        
        
    </section>
  )
}

export default VoucherInfo