import Head from "next/head";
import Calendar from "~/components/Calendar";
import Footer from "~/sections/Footer";
import Navbar from "~/sections/Navbar";
import { prisma } from "~/server/db";
import { formatISO } from "date-fns";
import { Day } from "@prisma/client";

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
        <Navbar />
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