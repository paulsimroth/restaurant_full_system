import Head from "next/head";
import Navbar from "~/sections/Navbar";

function opening() {
    return (
        <>
            <Head>
                <title>Admin Dashboard</title>
                <meta name="description" content="Admin Dashboard" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <Navbar />
                <div className="flex h-[65vh] flex-col items-center justify-around p-24 text-[#2E3A59]">
                    opening hours
                </div>
            </div>
            
        </>
    )
};

export default opening;