import React from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Container from '../components/Container'
import ProductList from '../components/ProductList'
import useSWR, {  useSWRConfig } from 'swr'
import { HiSearch } from 'react-icons/hi'
import { HiPencil, HiPlus, HiTrash } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Product = () => {
  
  const {data,error,isLoading} = useSWR(import.meta.env.VITE_API_URL+"/products",fetcher);
  
  

  return (
    <section>
        <Container>
            <Breadcrumb currentPageTitle="Product"/>
            <div className='mt-5'>
            <div className="flex justify-between mb-2">
        <form className=" ">   
  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"></label>
  <div className="relative">
    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
      <HiSearch/>
    </div>
    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Products" required />
  </div>
        </form>
    <div>
    <Link to={'/product/add-new-product'}  className="text-white text-nowrap flex justify-center items-center gap-3 w-[180px] h-[53px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add New Product<HiPlus/></Link>
    </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          #
        </th>
        <th scope="col" className="px-6 py-3">
          TITLE
        </th>
        <th scope="col" className="px-6 py-3">
          Price(MMK)
        </th>
        <th scope="col" className="px-6 py-3">
          CREATED AT
        </th>
        <th scope="col" className="px-6 py-3">
          ACTION
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
            (data.length === 0 ? (<p className='px-60 py-5 text-nowrap mx-auto'>There is no products</p>) : (data.map((product,index) => <ProductList product={product} index={index}  key={product.id}/>  )))  }

          </table></div>
     </div>
        </Container>
    </section>
  )
}

export default Product


