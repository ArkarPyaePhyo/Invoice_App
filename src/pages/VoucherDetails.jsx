import React from 'react'
import Container from '../components/Container'
import useSWR from 'swr';
import { json, Link, useParams } from 'react-router-dom';
import VDetailsLoader from './VDetailsLoader';
import Breadcrumb from '../components/Breadcrumb';
import { HiDocumentDuplicate } from 'react-icons/hi';
import ShowDate from '../components/ShowDate';
import printJS from 'print-js'
import html2pdf from 'html2pdf.js';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import useCookie from 'react-use-cookie';


const VoucherDetails = () => {

  const [token]= useCookie('my-token');


  const fetcher = (...args) => fetch(...args,{headers:{
    "Authorization":`Bearer ${token}`
  }}).then(res => res.json());

  const pdfRef = useRef();

const handleDownloadPdf = () => {
  const element = pdfRef.current;
  const options = {
    margin: 1,
    filename: 'download.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };

  html2pdf()
    .from(element)
    .set(options)
    .save();
};

const captureScreenshot = async () => {
  const element = document.getElementById('printableArea');
  const canvas = await html2canvas(element);
  const dataUrl = canvas.toDataURL('image/jpeg');

  // Create a link to download the image
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = 'screenshot.jpg';
  link.click();
};

  const handlePrint = () => {
    printJS({
      printable: 'printableArea',
      type: 'html',
      scanStyles: true,
      css: ['https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css'], 
    });
  };

  const {id} = useParams();

  const {data,error,isLoading} = useSWR(import.meta.env.VITE_API_URL+`/vouchers/${id}`,fetcher);

    if (isLoading) {
      return <VDetailsLoader/>;
    }

  return (
    <Container>
      <Breadcrumb currentPageTitle={"Voucher Details"} links={[{previous_title:"Voucher",path:"/dashboard/voucher"}]} icons={<HiDocumentDuplicate className='size-4'/>}></Breadcrumb>
      <div ref={pdfRef} id="printableArea" className=' w-[14.8cm] mt-3 border p-4 rounded-lg bg-gray-50'>
        <div className='flex justify-between items-start text-start font-bold'>
          <div className=''>
            
            <p className='pb-3'>Voucher ID<span>({data.data.voucher_id})</span></p>
            
            <p>Sold Date</p>
            <span>({data.data.sale_date})</span>
          </div>
          <div className=''>
            <p className='pb-3'>Customer's Name<span>({data.data.customer_name})</span></p>
            <p>Customer's Email <span>({data.data.customer_email})</span></p>
          </div>
        </div>
        <table className='  mt-2  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className=" text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 ">
      <tr className="text-nowrap">
        <th scope="col" className="px-6 py-4 text-end ">Product name</th>
        <th scope="col" className="px-6 py-4 text-end ">Price</th>
        <th scope="col" className="px-6 py-4 text-end ">Quantity</th>
        <th scope="col" className="px-6 py-4 text-end ">Cost</th>
        <th scope="col" className="px-6 py-4 text-end ">Sale-Date</th>
      </tr>
    </thead>
    <tbody>
    {data?.data?.records.map((record,index) => (
              <tr className='hover:bg-gray-100 ' key={index}>
                <td className='px-4 py-4 text-center'>{record.product.product_name}</td>
                <td className="px-4 py-4 text-center">{record.product.price}</td>
                <td className="px-4 py-4 text-center">{record.quantity}</td>
                <td className="px-4 py-4 text-center">{parseFloat(record.cost).toFixed(2)}</td>
                <td className="px-4 py-4 text-center">{<ShowDate time={record.created_at}/>}</td>
              </tr>
            ))}
    </tbody>
    <tfoot className='border-t-2'>
    <tr className="border-b">
        <td className="px-6 py-4 text-center" colSpan={3}>TOTAL</td>
        <td className="px-6 py-4 text-end" id="recordTotal">{parseFloat(data.data.total).toFixed(2)}</td>
      </tr>
      <tr className="border-b">
        <td className="px-6 py-4 text-center" colSpan={3}>TAX(0.05)</td>
        <td className="px-6 py-4 text-end" id="recordTotal">{parseFloat(data.data.tax).toFixed(2)}</td>
      </tr>
      <tr className="border-b-4">
        <td className="px-6 py-4 text-center" colSpan={3}>NET TOTAL</td>
        <td className="px-6 py-4 text-end" id="recordTotal">{parseFloat(data.data.net_total).toFixed(2)}</td>
      </tr>
    </tfoot>
        </table>
        <div className='flex justify-center items-center p-3 text-xs font-bold'>Thank You.Have A Nice Day.</div>
      </div>
      <div className="grid grid-cols-4 gap-3 mt-2 w-[14.8cm]">
      <div className=''>
      <Link to={'/voucher'}  className="text-white  text-nowrap flex justify-center items-center gap-3  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Return to Voucher</Link>
      </div>
      <div className=''>
      <div onClick={handlePrint}  className="text-white  text-nowrap flex justify-center items-center gap-3  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Print Voucher</div>
      </div>
      <div className=''>
      <div onClick={handleDownloadPdf}  className="text-white  text-nowrap flex justify-center items-center gap-3  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Download PDF</div>
      </div>
      <div className=''>
      <div onClick={captureScreenshot}  className="text-white  text-nowrap flex justify-center items-center gap-3  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Download JPG</div>
      </div>
      </div>
    </Container>
  )
}

export default VoucherDetails