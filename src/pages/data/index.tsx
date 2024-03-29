import Head from "next/head";
import Footer from "~/sections/Footer";
import Navbar from "~/sections/Navbar";

function page() {
  return (
    <>
      <Head>
        <title>Data Policy</title>
        <meta name="description" content="Data Policy" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
          <h1 className='m-2 text-[50px] md:text-[70px] font-semibold'>Data Policy</h1>
        </div>
        <Footer />
      </main>
    </>
  )
};

export default page;