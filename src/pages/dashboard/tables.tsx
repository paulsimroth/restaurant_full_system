import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function tables() {
  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="Admin Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="z-40 fixed bg-[#1C2331] text-[#FFA500] left-0 top-0 w-full border-b-4 border-[#FFA500] pb-8 pt-8 flex flex-row justify-around items-center">
        <Link href="/" className='cursor-pointer'>
          <Image
            src="/placeholder.png"
            alt="logo"
            width={60}
            height={60}
            className='block rounded-md object-contain'
          />
        </Link>
        <div className="flex flex-row items-center justify-between w-[30vw]">
          <Link
            href="/dashboard/opening"
            className="m-2 flex items-center h-fit border-2 border-[#FFA500] py-1 px-4 gap-[12px] text-[20px] font-bold hover:scale-110 hover:bg-[#7EC699] hover:text-[#2E3A59] duration-300">
            Opening Hours
          </Link>
          <Link
            href="/dashboard/menu"
            className="m-2 flex items-center h-fit border-2 border-[#FFA500] py-1 px-4 gap-[12px] text-[20px] font-bold hover:scale-110 hover:bg-[#7EC699] hover:text-[#2E3A59] duration-300">
            Menu
          </Link>
          <Link
            href="/dashboard/tables"
            className="m-2 flex items-center h-fit border-2 border-[#FFA500] py-1 px-4 gap-[12px] text-[20px] font-bold hover:scale-110 hover:bg-[#7EC699] hover:text-[#2E3A59] duration-300">
            Bookings
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center justify-around p-24 text-[#2E3A59]">
        <h1 className='mt-8 text-[50px] font-bold'>Bookings</h1>
      </div>
    </>
  )
}

export default tables