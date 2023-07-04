'use client'

import Head from "next/head";
import { useEffect, useState } from "react";
import { type DateTime } from '@types';
import Calendar from "~/components/Calendar";
import Footer from "~/sections/Footer";
import Navbar from "~/sections/Navbar";
import Menu from "~/components/Menu";
import Spinner from "~/components/Spinner";
import { trpc } from "~/utils/trpc";

function page() {

  const [date, setDate] = useState<DateTime>({
    justDate: null,
    dateTime: null,
  });

  useEffect(() => {
    if(date.dateTime) checkMenuStatus()
  },[date]);

  //tRPC
  const {mutate: checkMenuStatus, isSuccess} = trpc.menu.checkMenuStatus.useMutation();

  return (
    <>
      <Head>
        <title>Booking</title>
        <meta name="description" content="Book a table with us" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar />
        <div className="h-[40vh] bg-[#1C2331] text-[#FFA500] mt-12 flex min-h-screen flex-col items-center justify-center p-24">
          <h1 className='m-2 text-[50px] md:text-[70px] text-[#FFA500] font-semibold'>
            BOOK YOUR TABLE
          </h1>
          {!date.dateTime && <Calendar setDate={setDate} date={date} />}
          {date.dateTime && isSuccess ? (
            <Menu />
          ) : (
            <div className="flex h-screen items-center justify-center">
              <Spinner />
            </div>
          )}
        </div>
        <Footer />
      </main>
    </>
  )
};

export default page;