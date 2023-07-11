'use client'
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { trpc } from "~/utils/trpc";
import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";

function tables() {

  //tRPC
  const { mutateAsync: addItem } = trpc.admin.bookReservation.useMutation();
  const { data: reservations, refetch } = trpc.admin.getReservations.useQuery();
  const { mutateAsync: deleteReservation } = trpc.admin.deleteReservation.useMutation();

  const handleDelete = async (id: string) => {
    await deleteReservation({ id })
    refetch()
  };

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
        <div>
          <div>
            <p className='text-lg font-bold m-2'>Your Reservations:</p>
            <div className='mt-6 mb-12 grid grid-cols-7 gap-8'>
              {reservations?.map((reservation) => (
                <div key={reservation.id} className="m-1 p-1 border border-black ">
                  <p className="font-bold">{reservation.name} {reservation.surname}</p>
                  <p>email: {reservation.email}</p>
                  <p>phone: {reservation.phone}</p>
                  <p>Day: {format(parseISO(reservation.date), 'do MMM yyyy', { locale: de })}</p>
                  <p>Time: {format(parseISO(reservation.date), 'kk:mm' , {locale: de})}</p>
                  <p>persons: {reservation.seats}</p>
                  <p>message: {reservation.message}</p>
                  <button
                    onClick={() => handleDelete(reservation.id)}
                    className='text-xs text-red-500 border-red-500 border-2 p-1 rounded-md hover:scale-110 duration-300 hover:text-white hover:bg-red-500'>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default tables