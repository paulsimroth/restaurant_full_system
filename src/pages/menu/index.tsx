'use client'
import { parseISO } from "date-fns";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect, FC } from "react";
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
            //IF MENU CANNOT BE LOADED PUSH TO HOME
            router.push('/');
        },
    });

/*     useEffect(() => {
        const selectedTime = localStorage.getItem('selectedTime');
        //reroutes to home if not time selected
        if (!selectedTime) router.push('/')
        else {
            const date = parseISO(selectedTime)
            if (date < now) router.push('/')

            //Date is valid
            setSelectedTime(selectedTime);
        }
    }, []); */

    return (
        <>
            <Head>
                <title>Our Menu</title>
                <meta name="description" content="Our Menu" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Navbar />
                <div className="flex min-h-screen flex-col items-center justify-start p-24">
                    <h1 className='m-2 text-[50px] md:text-[80px] font-semibold text-[#2E3A59]'>Our Menu</h1>
                    <div className="flex flex-col items-start justify-start m-4">
                        {isFetchedAfterMount && (
                            <>
                                {/* <button className="border p-2 border-[#2E3A59] hover:scale-110 duration-300 font-bold">Back to Time Selection</button> */}
                                <Menu/>
                            </>
                        )}
                    </div>
                </div>
                <Footer />
            </main>
        </>
    )
};

export default page;