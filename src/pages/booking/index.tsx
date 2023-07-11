import Head from "next/head";
import Calendar from "~/components/Calendar";
import Footer from "~/sections/Footer";
import Navbar from "~/sections/Navbar";
import { prisma } from "~/server/db";
import { formatISO } from "date-fns";
import { Day } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface HomeProps {
  days: Day[]
  closedDays: string[] //ISO string
}

function page({ days, closedDays }: HomeProps) {

  return (
    <>
      <Head>
        <title>Booking</title>
        <meta name="description" content="Book a table with us" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
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

          <Link href="/#contact">
            <button className="m-1 flex items-center h-fit border-2 border-[#FFA500] py-1 px-4 gap-[12px] text-[20px] font-bold hover:scale-110 hover:bg-[#7EC699] hover:text-[#2E3A59] duration-300">
              Contact Us!
            </button>
          </Link>
        </div>
        <div className="h-[40vh] bg-[#1C2331] text-[#FFA500] mt-12 flex min-h-screen flex-col items-center justify-center p-24">
          <h1 className='m-2 text-[50px] md:text-[70px] text-[#FFA500] font-semibold'>
            BOOK YOUR TABLE
          </h1>
          <Calendar days={days} closedDays={closedDays} />
        </div>
        <Footer />
      </main>
    </>
  )
};

export async function getServerSideProps() {
  const days = await prisma.day.findMany();
  const closedDays = (await prisma.closedDay.findMany()).map((d) => formatISO(d.date));
  return { props: { days, closedDays } };
};

export default page;