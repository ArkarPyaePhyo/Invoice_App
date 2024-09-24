import React, { useState } from 'react'
import { HiSearch } from 'react-icons/hi'
import { HiPencil, HiPlus, HiTrash } from 'react-icons/hi2'
import { leapfrog } from 'ldrs'
import { useSWRConfig } from 'swr'
import { Link } from 'react-router-dom'

leapfrog.register()
const ProductList = ({product:{id,title,price,created_at},index}) => {

  const currentDate = new Date(created_at).toLocaleDateString("en-US",Option={
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
  const currentTime = new Date(created_at).toLocaleTimeString("en-US",Option={
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true 
  });


  const {mutate} = useSWRConfig();
  const [delLoading,setDelLoading] = useState(false);
 const deleteHandler= async() =>{
  setDelLoading(true);
          
  await fetch(import.meta.env.VITE_API_URL+`/products/${id}`,{
   method:"DELETE"
 });
  await mutate(import.meta.env.VITE_API_URL+`/products`);
  
}

  return (
    
    <tbody>
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {index + 1}
        </th>
        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {title}
        </td>
        <td className="px-6 py-4">
        {price}
        </td>
        <td className="px-6 py-4 flex flex-col">
         <p>{currentDate} </p><p>{currentTime}</p>
        </td>
        <td className="px-6 py-4 text-right">
          <div className="flex  justify-center items-center space-x-2">
          <Link to={`/product/edit-product/${id}`} className="flex  justify-center items-center font-medium text-blue-600 dark:text-blue-500 hover:underline border-2 rounded-md border-blue-600  size-10"><HiPencil/></Link>
          {delLoading? (<l-leapfrog
  size="20"
  speed="2.5" 
  color="black" 
></l-leapfrog>) :(<a  onClick={deleteHandler} className="flex  justify-center items-center font-medium text-red-500 dark:text-blue-500 hover:underline border-2 rounded-md border-blue-600  size-10"><HiTrash/></a>)}
          </div>
        </td>
      </tr>
    </tbody>



  )
}

export default ProductList
