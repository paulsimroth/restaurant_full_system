import Head from "next/head";
import Footer from "~/sections/Footer";
import Navbar from "~/sections/Navbar";

function page() {
  return (
    <>
      <Head>
        <title>Imprint</title>
        <meta name="description" content="Imprint" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
          IMPRINT
        </div>
        <Footer />
      </main>
    </>
  )
};

export default page;