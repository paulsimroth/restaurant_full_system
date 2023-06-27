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
          DATA POLICY
        </div>
        <Footer />
      </main>
    </>
  )
};

export default page;