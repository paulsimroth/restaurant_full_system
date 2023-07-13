'use client'
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { trpc } from "~/utils/trpc";
import { format, parseISO, formatDistance, subDays, addDays, formatISO, compareDesc, compareAsc } from "date-fns";
import { de } from "date-fns/locale";
import dynamic from 'next/dynamic';
import { string } from 'zod';
import { now } from "~/constants";

const DynamicSelect = dynamic(() => import("react-select"), { ssr: false });

function tables() {

  const initDate = formatISO(now);

  const [selectedDay, setSelectedDay] = useState(initDate);

  function setToday() {
    setSelectedDay(initDate);
  }

  function increaseDay() {
    const date: Date = addDays(parseISO(selectedDay), 1);
    setSelectedDay(formatISO(date));
  };

  function decreaseDay() {
    const date: Date = subDays(parseISO(selectedDay), 1);
    setSelectedDay(formatISO(date));
  };

  //tRPC
  const { mutateAsync: addItem } = trpc.admin.bookReservation.useMutation();
  const { data: reservations, refetch } = trpc.admin.getReservations.useQuery();
  const { mutateAsync: deleteReservation } = trpc.admin.deleteReservation.useMutation();

  const handleDelete = async (id: string) => {
    await deleteReservation({ id })
    refetch()
  };

  /**
   * Filters reservations before rendering to only show reservations for the selected date
   */
  const filterTablesByDate = reservations?.filter((reservation) => {

    const formatDate = reservation.date.split('T')[0]
    const formatSelectedDay = selectedDay.split('T')[0]

    if (formatDate === formatSelectedDay) {
      return reservation;
    };

  });

  /**
   * filteredTablesbyDate will get sorted from earliest to latest booking for the corresponding day
   */
  const sortedTables = filterTablesByDate?.sort((a: any, b: any) => {
    const aDate = new Date(a.date);
    const bDate = new Date(b.date);

    const aTime = aDate.getTime();
    const bTime = bDate.getTime();

    return aTime - bTime;
  });

  // Shows number of reservations for the selected date
  const index = filterTablesByDate?.length;

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
          <Link href="/booking" className="m-2 flex items-center h-fit w-fit border-2 border-[#FFA500] py-1 px-4 gap-[12px] text-[20px] font-bold hover:scale-110 hover:bg-[#7EC699] hover:text-[#2E3A59] duration-300">
            MAKE RESERVATION
          </Link>
          <div>
            <div className='m-2'>
              <p className='text-lg font-bold m-2'>Reservations for <strong>{format(parseISO(selectedDay), 'do MMM yyyy', { locale: de })}</strong></p>

              <div className='flex flex-row'>
                <button
                  className="m-2 flex items-center h-fit border-2 border-[#FFA500] py-1 px-4 gap-[12px] text-[20px] font-bold hover:scale-110 hover:bg-[#7EC699] hover:text-[#2E3A59] duration-300"
                  onClick={decreaseDay}
                >
                  -1 Day
                </button>
                <button
                  className="m-2 flex items-center h-fit border-2 border-[#FFA500] py-1 px-4 gap-[12px] text-[20px] font-bold hover:scale-110 hover:bg-[#7EC699] hover:text-[#2E3A59] duration-300"
                  onClick={setToday}
                >
                  TODAY
                </button>
                <button
                  className="m-2 flex items-center h-fit border-2 border-[#FFA500] py-1 px-4 gap-[12px] text-[20px] font-bold hover:scale-110 hover:bg-[#7EC699] hover:text-[#2E3A59] duration-300"
                  onClick={increaseDay}
                >
                  +1 Day
                </button>
              </div>
            </div>
            <p className='text-lg font-bold m-2'>Total reservations: {index}</p>
            <div className='m-6 p-6 mb-12 w-[90vw] h-fit flex flex-row flex-wrap items-start flex-start'>

              {sortedTables?.map((reservation) => (
                <div key={reservation.id} className="m-1 p-1 border h-fit w-fit border-black">
                  <p className="font-bold">NAME: {reservation.name} {reservation.surname}</p>
                  <div className='w-full bg-black h-[2px]' />
                  <p><strong>email: </strong>{reservation.email}</p>
                  <p><strong>phone: </strong>{reservation.phone}</p>
                  <p><strong>Time: </strong>{format(parseISO(reservation.date), 'do MMM yyyy', { locale: de })},{format(parseISO(reservation.date), 'kk:mm', { locale: de })}</p>
                  <p><strong>Seats: </strong>{reservation.seats}</p>
                  <p className='max-w-[280px]'><strong>Message: </strong>{reservation.message}</p>
                  <div className='w-full bg-black h-[2px]' />
                  <button
                    onClick={() => handleDelete(reservation.id)}
                    className='text-xs text-red-500 border-red-500 border-2 p-1 m-1 rounded-md hover:scale-110 duration-300 hover:text-white hover:bg-red-500'>
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
};

export default tables;