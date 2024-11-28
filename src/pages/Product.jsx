import React, {  useRef, useState } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Container from '../components/Container'
import ProductList from '../components/ProductList'
import useSWR  from 'swr'
import { HiChevronDown, HiChevronUp, HiInformationCircle, HiSearch, HiX } from 'react-icons/hi'
import { HiPencil, HiPlus, HiTrash } from 'react-icons/hi2'
import { Link,useSearchParams } from 'react-router-dom'
import { debounce } from 'lodash'
import Pagination from '../components/Pagination'
import useCookie from 'react-use-cookie';


const Product = () => {

  const [token]= useCookie('my-token');
 

  const [search,setSearch] = useState("");
  const [fetchUrl,setFetchUrl] = useState(`${import.meta.env.VITE_API_URL}/products`);
  const [param,setParam] = useSearchParams();

  const fetcher = (...args) => fetch(...args,{headers:{
    "Authorization":`Bearer ${token}`
  }}).then(res => res.json());

  const { data, error, isLoading } = useSWR(
   fetchUrl,
    fetcher
  );

  
  const searchInput = useRef("");

  const handleChange = debounce((e) => {
    if(e.target.value){
      setSearch(e.target.value);
      setParam({q:e.target.value})
      setFetchUrl(`${import.meta.env.VITE_API_URL}/products?q=${e.target.value}`);
    }else{
      setParam({});
      setFetchUrl(`${import.meta.env.VITE_API_URL}/products`);
    }
  },500);



  const clearSearch = ()=>{
    setSearch('');
    searchInput.current.input.value = '';
    setParam({});
    setFetchUrl(`${import.meta.env.VITE_API_URL}/products`); 
  };

  const updateUrl = (url)=>{

    const currentUrl = new URL(url);

    const searchParam = new URLSearchParams(currentUrl.search);

    const paramObj = Object.fromEntries(searchParam);

    setParam(paramObj);
    setFetchUrl(url);
  };
 
  const handleSort =(sortData)=>{
    
    const sortParam = new URLSearchParams(sortData).toString();
    setParam(sortData);
    setFetchUrl(`${import.meta.env.VITE_API_URL}/vouchers?${sortParam}`);
  }

  return (
    <section>
        <Container>
            <Breadcrumb currentPageTitle="Product"/>
            <div className='mt-5'>
            <div className="flex justify-between mb-2">
        <form> 
    <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <HiSearch/>
    </div>
    <input ref={searchInput} value={searchInput.current.input} onChange={handleChange} type="text"  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Products"  />
    <button onClick={clearSearch}  className={`${search ? "" : "hidden"} absolute inset-y-0 end-3 flex items-center ps-3 hover:text-red-500`} ><HiX/></button>
  </div>
        </form>
    <div>
    <Link to={'/dashboard/product/add-new-product'}  className="text-white text-nowrap flex justify-center items-center gap-3 w-[180px] h-[53px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add New Product<HiPlus/></Link>
    </div>
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
          Product Name
        </th>
        <th scope="col" className="px-6 py-3">
          Price(MMK)
        </th>
        <th scope="col" className="px-6 py-3">
          Created At
        </th>
        <th scope="col" className="px-6 py-3">
          Updated At
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    
            {isLoading ? (<tbody>
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
            </tbody>) :
            (data?.data?.length === 0 ? (<tbody className='flex justify-center   ml-56'><tr className=' text-nowrap  '>
              <td className='text-center '>There are no products</td></tr></tbody>) : (data?.data?.map((product,index) => <ProductList product={product} index={index}  key={product.id}/>  )))  }

          </table>

          </div>
     </div>
          {!isLoading && <Pagination links={data?.links} meta={data?.meta} updateUrl={updateUrl}/>}
        </Container>
    </section>
  )
}

export default Product


