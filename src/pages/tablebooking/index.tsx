'use client'
import { parseISO } from "date-fns";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import BookingForm from "~/components/BookingForm";
import Spinner from "~/components/Spinner";
import { now } from "~/constants";
import Footer from "~/sections/Footer";
import Navbar from "~/sections/Navbar";
import { trpc } from "~/utils/trpc";

interface menuProps { }

function page({ }: menuProps) {

    const router = useRouter();

    const [selectedTime, setSelectedTime] = useState<String | null>(null); //selectedTime as ISO string
    const { isFetchedAfterMount } = trpc.menu.checkMenuStatus.useQuery(undefined, {
        onError: () => {
            //Check for validity of selectedTime failed
            // Handle error (e.g. route to Homepage)
            router.push('/')
        },
    });

    useEffect(() => {
        const selectedTime = localStorage.getItem('selectedTime');
        //reroutes to home if not time selected
        if (!selectedTime) router.push('/booking')
        else {
            const date = parseISO(selectedTime)
            if (date < now) router.push('/booking')

            //Date is valid
            setSelectedTime(selectedTime);
        }
    }, []);

    return (
        <>
            <Head>
                <title>Book a table</title>
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
                <div className="flex min-h-screen flex-col items-center justify-between p-24">
                    <h1 className='m-2 text-[50px] md:text-[70px] font-semibold text-[#2E3A59]'>Book a Table</h1>
                    <div>
                        {isFetchedAfterMount && selectedTime ? (
                            <>
                                <BookingForm selectedTime={selectedTime} />
                            </>
                        ) : (
                            <div className="flex h-screen items-center justify-center">
                                <Spinner />
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </main>
        </>
    )
};

export default page;