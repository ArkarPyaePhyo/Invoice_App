import React from 'react'

const VDetailsLoader = () => {
  return (
    <div className='p-4'>
    <div className='flex justify-between items-center'>
      <div>
        <p className='h-4 bg-gray-300 rounded mb-2'></p>
        <p className='h-4 bg-gray-300 rounded mb-2'></p>
      </div>
      <div>
        <p className='h-4 bg-gray-300 rounded mb-2'></p>
        <p className='h-4 bg-gray-300 rounded mb-2'></p>
      </div>
    </div>
    <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
      <thead className="text-xs text-gray-700 uppercase bg-gray-200">
        <tr>
          <th scope="col" className="px-6 py-4 bg-gray-300 rounded"></th>
          <th scope="col" className="px-6 py-4 bg-gray-300 rounded"></th>
          <th scope="col" className="px-6 py-4 bg-gray-300 rounded"></th>
          <th scope="col" className="px-6 py-4 bg-gray-300 rounded"></th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 3 }).map((_, index) => (
          <tr key={index}>
            <td className='px-6 py-4'>
              <div className='h-4 bg-gray-300 rounded'></div>
            </td>
            <td className='px-6 py-4'>
              <div className='h-4 bg-gray-300 rounded'></div>
            </td>
            <td className='px-6 py-4'>
              <div className='h-4 bg-gray-300 rounded'></div>
            </td>
            <td className='px-6 py-4'>
              <div className='h-4 bg-gray-300 rounded'></div>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td className="px-6 py-4 text-center" colSpan={3}>
            <div className='h-4 bg-gray-300 rounded'></div>
          </td>
          <td className="px-6 py-4">
            <div className='h-4 bg-gray-300 rounded'></div>
          </td>
        </tr>
        <tr>
          <td className="px-6 py-4 text-center" colSpan={3}>
            <div className='h-4 bg-gray-300 rounded'></div>
          </td>
          <td className="px-6 py-4">
            <div className='h-4 bg-gray-300 rounded'></div>
          </td>
        </tr>
        <tr>
          <td className="px-6 py-4 text-center" colSpan={3}>
            <div className='h-4 bg-gray-300 rounded'></div>
          </td>
          <td className="px-6 py-4">
            <div className='h-4 bg-gray-300 rounded'></div>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
);
};
  

export default VDetailsLoader