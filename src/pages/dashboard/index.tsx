import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import AdminNav from "~/components/AdminNav";
import { trpc } from "~/utils/trpc";

function page() {

  //@ts-ignore
  const { mutate } = trpc.admin.sensitive.useMutation();

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="Admin Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AdminNav />
        <div className="flex h-[65vh] flex-col items-center justify-around p-24 text-[#2E3A59]">
          <h1 className='m-2 text-[50px] md:text-[70px] font-semibold'>DASHBOARD</h1>
          <p className="text-[25px] m-2">Chose which section to edit!</p>
          <div className="flex flex-row wrap">
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
      </main>
    </>
  )
};

export default page;