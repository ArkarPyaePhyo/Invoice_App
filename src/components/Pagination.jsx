import React from 'react'
import { HiArrowLeft } from 'react-icons/hi2'

const Pagination = ({meta:{from,to,total,links},updateUrl}) => {

    // const handlePrevious = ()=>{
    //     updateUrl(links.prev);
    //   };

    //   const handleNext = ()=>{
    //     updateUrl(links.next);
    //   };

  return (
    <div className="flex justify-between items-center">
  {/* Help text */}
  <span className="text-sm text-gray-700 dark:text-gray-400">
    Showing <b>{from}</b> to <b>{to}</b> of {total} Entries
  </span>
  {/* Buttons */}
  <div className="inline-flex  mt-2 xs:mt-0">
    {/* <button disabled={!links.prev} onClick={handlePrevious} className="flex items-center justify-center size-10 text-sm font-medium text-blue border-2 border-md text-blue-600 border-blue-600  rounded-s hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none">
      Prev
    </button>
    <button disabled={!links.next} onClick={handleNext} className="flex items-center justify-center size-10 text-sm font-medium text-blue border-2 border-md text-blue-600 border-blue-600   hover:bg-gray-100 border-s  rounded-e  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none">
      Next
    </button> */}
    {links.map((link)=>(<button key={link.label} disabled={!link.url} onClick={()=>updateUrl(link.url)} className={`${link.active? "bg-blue-500 text-white" : ""} flex items-center justify-center size-10 text-sm font-medium text-blue border-y  first:border-l-2 last:border-r-2  text-blue-600 border-blue-600      dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none`}>
      {link.label=== "&laquo; Previous" ? "Prev" : link.label ===
"Next &raquo;"? "Next": link.label}
    </button>))}
  </div>
</div>
  )
}

export default Pagination