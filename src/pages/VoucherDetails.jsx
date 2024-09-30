import React from 'react'
import Container from '../components/Container'
import useSWR from 'swr';
import { Link, useParams } from 'react-router-dom';
import VDetailsLoader from './VDetailsLoader';
import Breadcrumb from '../components/Breadcrumb';
import { HiDocumentDuplicate } from 'react-icons/hi';
import ShowDate from '../components/ShowDate';

const fetcher = (...args) => fetch(...args).then(res => res.json())

const VoucherDetails = () => {
  const {data,error,isLoading} = useSWR(import.meta.env.VITE_API_URL+"/vouchers",fetcher);

  console.log(data);
  const {id} = useParams();
    const currentDetail = Array.isArray(data) ? data.find(detail => detail.id.toString() === id): null ;

    if (isLoading) {
      return <VDetailsLoader/>;
    }
  return (
    <Container>
      <Breadcrumb currentPageTitle={"Voucher Details"} links={[{previous_title:"Voucher",path:"/voucher"}]} icons={<HiDocumentDuplicate className='size-4'/>}></Breadcrumb>
      <div className='mt-3 border p-3 rounded-lg bg-gray-50'>
        <div className='flex justify-between items-center font-bold'>
          <div>
            <p>Voucher ID : {currentDetail.voucher_id}</p>
            <p>Sold Date : {currentDetail.sale_date}</p>
          </div>
          <div>
            <p>Customer's Name : {currentDetail.customer_name}</p>
            <p>Customer's Email : {currentDetail.customer_email}</p>
          </div>
        </div>
        <table className='w-full mt-2  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className=" text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 ">
      <tr className=" ">
        <th scope="col" className="px-6 py-4 text-end ">Product name</th>
        <th scope="col" className="px-6 py-4 text-end ">Price</th>
        <th scope="col" className="px-6 py-4 text-end ">Quantity</th>
        <th scope="col" className="px-6 py-4 text-end ">Cost</th>
        <th scope="col" className="px-6 py-4 text-end ">Sale-Date</th>
      </tr>
    </thead>
    <tbody>
    {currentDetail.records.map((record,index) => (
              <tr className='hover:bg-gray-100' key={index}>
                <td className='px-6 py-4 text-end'>{record.product.title}</td>
                <td className="px-6 py-4 text-end">{record.product.price}</td>
                <td className="px-6 py-4 text-end">{record.quantity}</td>
                <td className="px-6 py-4 text-end">{record.cost.toFixed(2)}</td>
                <td className="px-6 py-4 text-end">{<ShowDate created_at={record.create_at}/>}</td>
              </tr>
            ))}
    </tbody>
    <tfoot className='border-t-2'>
    <tr className="border-b">
        <td className="px-6 py-4 text-center" colSpan={3}>Total</td>
        <td className="px-6 py-4 text-end" id="recordTotal">{currentDetail.total.toFixed(2)}</td>
      </tr>
      <tr className="border-b">
        <td className="px-6 py-4 text-center" colSpan={3}>TAX(0.05)</td>
        <td className="px-6 py-4 text-end" id="recordTotal">{currentDetail.tax.toFixed(2)}</td>
      </tr>
      <tr className="border-b-0">
        <td className="px-6 py-4 text-center" colSpan={3}>NET Total</td>
        <td className="px-6 py-4 text-end" id="recordTotal">{currentDetail.netTotal.toFixed(2)}</td>
      </tr>
    </tfoot>
        </table>
      </div>
      <div className='flex justify-end mt-2'>
      <Link to={'/voucher'}  className="text-white  text-nowrap flex justify-center items-center gap-3 w-[180px] h-[53px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Return to Voucher</Link>
      </div>
    </Container>
  )
}

export default VoucherDetails