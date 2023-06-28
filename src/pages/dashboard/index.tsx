import Head from "next/head";
import Footer from "~/sections/Footer";
import Navbar from "~/sections/Navbar";
import { trpc } from "~/utils/trpc";

function page() {

  const {mutate} = trpc.admin.sensitive.useMutation();

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
          
          <button type="button" onClick={() => mutate()}>TOP SECRET ACTION</button>

        </div>
        <Footer />
      </main>
    </>
  )
};

export default page;