import React from 'react'

function MenuItem({title, price, tags}: any) {
  return (
    <div className='w-[100%] my-4 flex flex-col'>
      <div className='flex flex-row items-center justify-between'>
        <div className='w-[100%] mt-1'>
          <p className='text-[#dcca87] flex-1'>{title}</p>
        </div>
        <div className='w-[119px] h-[2px] mx-4 bg-white rounded-md' />
        <div className='flex justify-end items-end'>
          <p>{price}</p>
        </div>
      </div>
      
      <div className=''>
        <p className='italic text-[#aaa]'>{tags}</p>
      </div>      
    </div>
  )
};

export default MenuItem;