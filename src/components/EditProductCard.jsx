import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';
import SkeletonLoader from './SkeletonLoader';

const fetcher = (...args) => fetch(...args).then(res => res.json());


const EditProductCard = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  reset} = useForm();

  const navigate = useNavigate();

  const {id} = useParams();

  const {data,isLoading,error} = useSWR(import.meta.env.VITE_API_URL+`/products/${id}`,fetcher);

  const productEditHandler =async(data) => {
    
    await fetch(import.meta.env.VITE_API_URL+`/products/${id}`,{
      method : "PUT",
      headers :{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({title : data.product_name, price : data.price, created_at : new Date().toISOString()})
    })

    reset();

    if(data.return_page){
      navigate("/product")
    }

  };

  return (
    <div className='mt-3'>
      <h1 className='text-3xl font-bold '>Edit Product</h1>
      <p className='text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores voluptatibus deleniti quam, consectetur consequatur ea dolor pariatur necessitatibus sunt molestiae maiores porro omnis. Odio illo dicta ut aut vero! Dolor?</p>
      {
        isLoading ? <SkeletonLoader/>: ( <div className='mt-5'>
          <form onSubmit={handleSubmit(productEditHandler)}>
          <div>
    <div className='mb-2'>
      <label htmlFor="product_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
      <input  {...register('product_name',{required : true})} type="text" defaultValue={data.title} className={`${errors.product_name ? "focus:ring-red-500 focus:border-red-500 " : "focus:ring-blue-500 focus:border-blue-500 "} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="Samsung A22 ..."  />
      {errors.product_name && <p className='text-red-600 text-xs'>product name is required.</p>}
    </div>
    <div className='mb-2'>
      <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
      <input {...register('price',{required : true})} type="text" defaultValue={data.price} className={`${errors.price ? "focus:ring-red-500 focus:border-red-500 " : "focus:ring-blue-500 focus:border-blue-500 "} bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} placeholder="90000"  />
      {errors.price && <p className='text-red-600 text-xs'>price is required.</p>}
    </div>
  </div>
  <div className="flex items-start mb-2">
          <div className="flex items-center h-5">
          <input {...register('all_correct',{required : true})} id='all_correct' type="checkbox" value="" className={`w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 ${errors.all_correct ?"focus:ring-red-300" : "focus:ring-blue-300" } dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800`}  />
          </div>
          <div className="flex flex-col">
          <label htmlFor='all_correct' className="ms-2 text-sm font-medium text-blue-500 dark:text-gray-300">I'm Sure That's All Correct</label>
          {errors.all_correct && <p className=' text-red-600 text-xs '>check is required.</p>}
          </div>
      </div>
  <div className="flex items-start mb-3">
          <div className="flex items-center h-5">
          <input {...register('return_page')} id="return_page" type="checkbox"  value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"  />
          </div>
          <label htmlFor="return_page" className="ms-2 text-sm font-medium text-blue-500 dark:text-gray-300">Return To Product List</label>
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  
          </form>
        </div>)
      }
    </div>
  )
}

export default EditProductCard