
function MenuItem({title, price, tags}: any) {
  return (
    <div className='w-[100%] my-4 flex flex-col'>
      <div className='flex flex-row items-center justify-between'>
        <div className='w-[100%] mt-1'>
          <p className='#2E3A59 flex-1'>{title}</p>
        </div>
        <div className='w-[119px] h-[2px] mx-4 bg-white rounded-md' />
        <div className='flex justify-end items-end'>
          <p>€{price}</p>
        </div>
      </div>
      
      <div className=''>
        <p className='italic text-slate-400'>{tags}</p>
      </div>      
    </div>
  )
};

export default MenuItem;