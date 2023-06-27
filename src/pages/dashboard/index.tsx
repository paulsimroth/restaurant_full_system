import Head from "next/head";
import Footer from "~/sections/Footer";
import Navbar from "~/sections/Navbar";

function page() {
  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="Admin Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
          <h1 className="m-12 text-[50px]">DASHBOARD</h1>
        </div>
        <Footer />
      </main>
    </>
  )
};

export default page;