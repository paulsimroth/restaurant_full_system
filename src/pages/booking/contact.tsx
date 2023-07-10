'use client'
import { parseISO } from "date-fns";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, FC } from "react";
import BookingForm from "~/components/BookingForm";
import Menu from "~/components/Menu";
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
        },
    });

    useEffect(() => {
        const selectedTime = localStorage.getItem('selectedTime');
        //reroutes to home if not time selected
        if (!selectedTime) router.push('/')
        else {
            const date = parseISO(selectedTime)
            if (date < now) router.push('/')

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
                <Navbar />
                <div className="flex min-h-screen flex-col items-center justify-between p-24">
                    <h1 className='m-2 text-[50px] md:text-[70px] font-semibold text-[#2E3A59]'>Book a Table</h1>
                    <div>
                        {isFetchedAfterMount && selectedTime ? (
                            <>
                                <button className="border p-2 border-[#2E3A59] hover:scale-110 duration-300 font-bold">Back to Time Selection</button>
                                {/* <Menu selectedTime={selectedTime} /> */}
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