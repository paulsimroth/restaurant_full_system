'use client'
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { trpc } from "~/utils/trpc";
import { format, parseISO, subDays, addDays, formatISO } from "date-fns";
import { de } from "date-fns/locale";
import dynamic from 'next/dynamic';
import { now } from "~/constants";
import UpdateReservation from '~/components/UpdateReservation';
import { prisma } from '~/server/db';
import type { Day } from '@prisma/client';
import { MultiValue } from 'react-select';
import toast, { Toaster } from 'react-hot-toast';
import AdminNav from '~/components/AdminNav';
import { Suspense } from 'react';
import Spinner from '~/components/Spinner';
import Image from 'next/image';

const DynamicSelect = dynamic(() => import("react-select"), { ssr: false });

type Input = {
  id: string | any
  name: string | any
  surname: string | any
  email: string | any
  phone: string | any
  seats: MultiValue<{ value: number; label: number }>
  date: string | any
  message: string | any
}

interface HomeProps {
  days: Day[]
  closedDays: string[] //ISO string
}

const initToggle: boolean = false;
const initDate: string = formatISO(now);

function tables({ days, closedDays }: HomeProps) {

  const initValues = {
    id: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
    seats: [],
    date: "",
    message: "",
  };

  /**
   * SET STATES HERE
   * @param toggle handles visibilty of UpdateReservation
   * @param editValues ist the currewntly selected reservation
   * @param selectedDay is the currently selected day
   */
  const [toggle, setToggle] = useState<boolean>(initToggle);
  const [editValues, setEditValues] = useState<Input>(initValues)
  const [selectedDay, setSelectedDay] = useState<string>(initDate);


  /**
   * TOGGLE VISIBILITY OF UpdateReservation
   * @param id is the id of the toggled reservation
   */
  function toggleEdit(item: any) {
    setToggle(!toggle);
    setEditValues(item)
  };

  //tRPC
  const { mutateAsync: addItem } = trpc.admin.bookReservation.useMutation();
  const { data: reservations, refetch } = trpc.admin.getReservations.useQuery();
  const { mutateAsync: deleteReservation } = trpc.admin.deleteReservation.useMutation({
    onSuccess: () => toast.success('Succesfully deleted'),
    onError: () => toast.error('Something went wrong'),
  });

  /**
   * FUNCTIONS TO SELECT DAY
   * INCREASE OR DECREASE BY 1 DAY
   */
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

  /**
   * USE EFFECTS
   */
  useEffect(() => {
    setSelectedDay
  }, [selectedDay]);

  useEffect(() => {
    toggleEdit
  }, [])

  /**
   * HANDLE DELETION OF RESERVATION
   * @param id id of reservation
   */
  const handleDelete = async (id: string) => {
    await deleteReservation({ id });
    refetch();
  };

  /**
   * Filters reservations before rendering to only show reservations for the selected date
   */
  const filterTablesByDate = reservations?.filter((reservation: any) => {

    const formatDate: string | undefined = reservation.date.split('T')[0]
    const formatSelectedDay: string | undefined = selectedDay.split('T')[0]

    if (formatDate === formatSelectedDay) {
      return reservation;
    };

  });

  /**
   * filteredTablesbyDate will get sorted from earliest to latest booking for the corresponding day
   */
  const sortedTables = filterTablesByDate?.sort((a: any, b: any) => {
    const aDate: Date = new Date(a.date);
    const bDate: Date = new Date(b.date);

    const aTime: number = aDate.getTime();
    const bTime: number = bDate.getTime();

    return aTime - bTime;
  });

  // Shows number of reservations for the selected date
  const index: number | undefined = filterTablesByDate?.length;

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="Admin Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <AdminNav />
        <div className="flex flex-col items-center justify-around p-24 text-[#2E3A59]">
          <Toaster />
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
                    <Image
                      src="/arrow-left.svg"
                      alt="arrow"
                      height={29}
                      width={29}
                    />
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
                    <Image
                      src="/arrow-right.svg"
                      alt="arrow"
                      height={29}
                      width={29}
                    />
                  </button>
                </div>
              </div>
              <p className='text-lg font-bold m-2'>Total reservations: {index}</p>
              <div className='m-6 p-6 mb-12 w-[90vw] h-fit flex flex-row flex-wrap items-start flex-center'>
                  {sortedTables?.map((reservation: any) => (
                     <Suspense fallback={<Spinner />}>
                    <div key={reservation.id} className="m-1 p-1 border h-fit w-fit border-black">
                      <p className="font-bold">NAME: {reservation.name} {reservation.surname}</p>
                      <div className='w-full bg-black h-[2px]' />
                      <p><strong>email: </strong>{reservation.email}</p>
                      <p><strong>phone: </strong>{reservation.phone}</p>
                      <p><strong>Time: </strong>{format(parseISO(reservation.date), 'do MMM yyyy', { locale: de })},{format(parseISO(reservation.date), 'kk:mm', { locale: de })}</p>
                      {/* @ts-ignore */}
                      <p><strong>Seats: </strong>{reservation.seats}</p>
                      <p className='max-w-[280px]'><strong>Message: </strong>{reservation.message}</p>
                      <div className='w-full bg-black h-[2px]' />
                      <div className='flex flex-row justify-around'>
                        <button
                          onClick={() => handleDelete(reservation.id)}
                          className='text-xs text-red-500 border-red-500 border-2 p-1 m-1 rounded-md hover:scale-110 duration-300 hover:text-white hover:bg-red-500'
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => toggleEdit(reservation)}
                          className='text-xs text-green-500 border-green-500 border-2 p-1 m-1 rounded-md hover:scale-110 duration-300 hover:text-white hover:bg-green-500'
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                    </Suspense>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          {toggle && (
            <UpdateReservation days={days} closedDays={closedDays} data={editValues} toggleEdit={toggleEdit} />
          )}
        </div>
      </div>
    </>
  )
};

export async function getServerSideProps() {
  const days = await prisma.day.findMany();
  const closedDays = (await prisma.closedDay.findMany()).map((d: any) => formatISO(d.date));
  return { props: { days, closedDays } };
};

export default tables;