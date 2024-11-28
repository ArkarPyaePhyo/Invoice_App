import React, { useRef, useState } from 'react'
import { HiChevronDown, HiChevronUp, HiInformationCircle, HiSearch, HiX } from 'react-icons/hi'
import { HiComputerDesktop, HiPencil, HiPlus, HiTrash } from 'react-icons/hi2'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { leapfrog } from 'ldrs'
import useSWR, { useSWRConfig } from 'swr'
import ShowDate from './ShowDate'
import toast, { Toaster } from 'react-hot-toast';
import { debounce } from 'lodash'
import Pagination from './Pagination'
import useCookie from 'react-use-cookie';



leapfrog.register();
const VoucherList = () => {

  const [token]= useCookie('my-token');
  const location = useLocation();
  const [param,setParam] = useSearchParams();

  const fetcher = (...args) => fetch(...args,{headers:{
    "Authorization":`Bearer ${token}`
  }}).then(res => res.json());

  const [search,setSearch] = useState("");
  const [fetchUrl,setFetchUrl] = useState(`${import.meta.env.VITE_API_URL}/vouchers${location.search}`);
  const searchInput = useRef("");
  const { data, error, isLoading } = useSWR(
   fetchUrl ,
    fetcher
  );  
  
  

  const handleChange = debounce((e) => {
    if(e.target.value){
      setSearch(e.target.value);
      setParam({q:e.target.value})
      setFetchUrl(`${import.meta.env.VITE_API_URL}/vouchers?q=${e.target.value}`);
    }else{
      setParam({});
      setFetchUrl(`${import.meta.env.VITE_API_URL}/vouchers`);
    }
  },500);


  const clearSearch = ()=>{
    setSearch('');
    searchInput.current.input.value = '';
    setParam({});
    setFetchUrl(`${import.meta.env.VITE_API_URL}/vouchers`); 
  };

  const updateUrl = (url)=>{

    const currentUrl = new URL(url);

    const searchParam = new URLSearchParams(currentUrl.search);

    const paramObj = Object.fromEntries(searchParam);

    setParam(paramObj);
    setFetchUrl(url);
  };

 
  
  const {mutate} = useSWRConfig();

  const [isDeleting,setIsDeleting] = useState(null);

  
  const deleteVoucher = async(id)=>{
    
    setIsDeleting(id);

    await fetch(import.meta.env.VITE_API_URL+`/vouchers/${id}`,{
      method: 'DELETE',
      headers:{"Authorization":`Bearer ${token}`}
    });
    
    mutate(import.meta.env.VITE_API_URL+"/vouchers");

    setIsDeleting(false)

    toast.success("Voucher Deleted Successfully")
  }


  const handleSort =(sortData)=>{
    
    const sortParam = new URLSearchParams(sortData).toString();
    setParam(sortData);
    setFetchUrl(`${import.meta.env.VITE_API_URL}/vouchers?${sortParam}`);
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
    <input ref={searchInput}  onChange={handleChange} type="text" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Vouchers"  />
    <button onClick={clearSearch}  className={`${search ? '' : "hidden"} absolute inset-y-0 end-3 flex items-center  hover:text-red-500`} ><HiX/></button>
  </div>
        </form>
    <Link to="/dashboard/sale">
    <button type="submit" className="text-white text-nowrap flex justify-center items-center gap-3 w-[180px] h-[53px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Sale<HiComputerDesktop/></button>
    </Link>
        </div>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3 flex items-center gap-1">
          #
          <div>
          <button onClick={handleSort.bind(null,{sort_by:"id",sort_direction:"asc"})} className='hover:bg-stone-500 active:scale-50'><HiChevronUp/></button>
          <button onClick={handleSort.bind(null,{sort_by:"id",sort_direction:"desc"})} className='hover:bg-stone-500 active:scale-50'><HiChevronDown/></button>
          </div>
        </th>
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
            ) : (data?.data?.length === 0 ? (<tr ><td colSpan='5' className='text-center px-60 py-5 text-nowrap mx-auto'>There are no vouchers</td></tr>) : (data?.data?.map((voucher,index) => (<tr key={voucher.id}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {voucher.id}
        </th>
        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {voucher.voucher_id}
        </td>
        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {voucher.customer_name}
        </td>
        <td className="px-6 py-4">
        {voucher.customer_email} 
        </td>
        <td className="px-6 py-4  ">
        {voucher.sale_date}
        </td>
        <td className="px-6 py-4 text-right">
          <div className="flex space-x-2">
        <Link to={`/dashboard/voucher/voucherDetails/${voucher.id}`} className="font-medium text-red-500 dark:text-blue-500 hover:underline border-2 rounded-md border-blue-600  p-2"><HiInformationCircle/></Link>
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
  {!isLoading && <Pagination links={data?.links} meta={data?.meta} updateUrl={updateUrl}/>}
    </div>
  )
}

export default VoucherList