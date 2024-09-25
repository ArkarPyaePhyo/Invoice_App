import React from 'react'
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import VoucherTable from './VoucherTable';
import { json } from 'react-router-dom';
import UseRecordStore from '../stores/UseRecordStore';

const fetcher = (...args) => fetch(...args).then(res => res.json())

const SaleForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  reset} = useForm();

  const {data,error,isLoading} = useSWR(import.meta.env.VITE_API_URL+"/products",fetcher);

  const {addRecord,changeQuantity,records}= UseRecordStore();

  const onSubmit =(data)=>{
    const currentProduct = JSON.parse(data.product);

    const isExited = records.find(record=> record.product.id=== currentProduct.id )

    if(!isExited){
      addRecord({
        id:Date.now(),
        product: currentProduct,
        quantity: data.quantity,
        cost: currentProduct.price * data.quantity,
        create_at: new Date().toISOString(),
      });
    }else{
      changeQuantity(isExited.id,data.quantity)
    }

    reset();
  }

  return (
    <div  >
      <form id='recordForm' onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-3 mb-5 gap-5'>
        <div className='col-span-1'>
         <select  {...register('product',{required:'true'})}  className={` ${errors.quantity ?"focus:ring-red-500 focus:border-red-500 border-red-500 ring-red-500" : "focus:ring-blue-500 focus:border-blue-500 " }   block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>
         
         <option value="">Select Product</option>
        {!isLoading &&  
         data.map((product)=>(
          <option key={product.id} value={JSON.stringify(product)}>{product.title}</option>
         ))}
         </select>
         {errors.product && <option className=' text-red-600 text-xs '>Option is required.</option>}

        </div>
        <div className='col-span-1'>
          <input {...register('quantity',{required : true})} id='quantity' type='text' className={`block w-full p-4  text-sm text-gray-900 border-gray-300 border  rounded-lg bg-gray-50 ${errors.quantity ?"focus:ring-red-500 focus:border-red-500 border-red-500 ring-red-500" : "focus:ring-blue-500 focus:border-blue-500 " }   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder='Quantity'  />
          {errors.quantity && <p className=' text-red-600 text-xs '>Quantity is required.</p>}
        </div>
        <div>
        <button   type="submit" className="text-gray  bg-gray-50 border-gray-300 border hover:bg-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-4 w-full  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Record
        </button>
        </div>
      </form>
    </div>
  )
}

export default SaleForm