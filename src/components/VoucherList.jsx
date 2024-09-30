import React, { useState } from 'react'
import { HiInformationCircle, HiSearch } from 'react-icons/hi'
import { HiComputerDesktop, HiPencil, HiPlus, HiTrash } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { leapfrog } from 'ldrs'
import useSWR, { useSWRConfig } from 'swr'
import ShowDate from './ShowDate'
import toast, { Toaster } from 'react-hot-toast';

const fetcher = (...args) => fetch(...args).then(res => res.json())
leapfrog.register();
const VoucherList = () => {

  const {data,error,isLoading} = useSWR(import.meta.env.VITE_API_URL+"/vouchers",fetcher);
  const {mutate} = useSWRConfig();

  const [isDeleting,setIsDeleting] = useState(null);
  
  
  const deleteVoucher = async(id)=>{
    
    setIsDeleting(id);

    await fetch(import.meta.env.VITE_API_URL+`/vouchers/${id}`,{
      method: 'DELETE',
    });
    
    mutate(import.meta.env.VITE_API_URL+"/vouchers");

    toast.success("Voucher Deleted Successfully")
  }

  return (
    <div className='mt-2'>
        <div className="flex justify-between flex-grow mb-2">
        <form className=" ">   
  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"></label>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <HiSearch/>
    </div>
    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Products" required />
  </div>
        </form>
    <Link to="/sale">
    <button type="submit" className="text-white text-nowrap flex justify-center items-center gap-3 w-[180px] h-[53px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Sale<HiComputerDesktop/></button>
    </Link>
        </div>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          VOUCHER-ID
        </th>
        <th scope="col" className="px-6 py-3">
          NAME
        </th>
        <th scope="col" className="px-6 py-3">
          EMAIL
        </th>
        <th scope="col" className="px-6 py-3">
          DATE
        </th>
        <th scope="col" className="px-6 py-3">
          ACTION
        </th>
      </tr>
    </thead>
    <tbody>
    {isLoading ? (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <th className="px-6 py-3">
            <div className="h-4 bg-gray-200 rounded dark:bg-gray-600 animate-pulse w-6"></div>
          </th>
          <td className="px-6 py-3">
            <div className="h-4 bg-gray-200 rounded dark:bg-gray-600 animate-pulse w-32"></div>
          </td>
          <td className="px-6 py-3">
            <div className="h-4 bg-gray-200 rounded dark:bg-gray-600 animate-pulse w-24"></div>
          </td>
          <td className="px-6 py-3">
            <div className="h-4 bg-gray-200 rounded dark:bg-gray-600 animate-pulse w-20"></div>
          </td>
          <td className="px-6 py-3">
            <div className="h-4 bg-gray-200 rounded dark:bg-gray-600 animate-pulse w-12"></div>
          </td>
          </tr>
            ) : (data.length === 0 ? (<tr ><td colSpan='5' className='text-center px-60 py-5 text-nowrap mx-auto'>There are no vouchers</td></tr>) : (data.map((voucher,index) => (<tr key={index}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {voucher.voucher_id}
        </th>
        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {voucher.customer_name}
        </td>
        <td className="px-6 py-4">
        {voucher.customer_email} 
        </td>
        <td className="px-6 py-4  ">
        <ShowDate created_at={voucher.sale_date}/>
        </td>
        <td className="px-6 py-4 text-right">
          <div className="flex space-x-2">
        <Link to={`/voucherDetails/${voucher.id}`} className="font-medium text-red-500 dark:text-blue-500 hover:underline border-2 rounded-md border-blue-600  p-2"><HiInformationCircle/></Link>
          <a onClick={() => deleteVoucher(voucher.id)}  className="font-medium text-red-500 dark:text-blue-500 hover:underline border-2 rounded-md border-blue-600  p-2">{isDeleting === voucher.id ? ((<l-leapfrog
  size="20"
  speed="2.5" 
  color="black" 
></l-leapfrog>)) : <HiTrash/>}</a>
          </div>
        </td>
      </tr>))))} 
      
    </tbody>
  </table>
</div>
    </div>
  )
}

export default VoucherList