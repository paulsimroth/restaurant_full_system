import Head from "next/head";
import Link from "next/link";
import Navbar from "~/sections/Navbar";
import Header from "~/sections/Header";
import { api } from "~/utils/api";
import About from "~/sections/About";
import SpecialMenu from "~/sections/SpecialMenu";
import Chef from "~/sections/Chef";
import Intro from "~/sections/Intro";
import Awards from "~/sections/Awards";
import Contact from "~/sections/Contact";
import Footer from "~/sections/Footer";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Restaurant App</title>
        <meta name="description" content="Restaurant App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='w-full overflow-hidden'>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center pt-24 px-24">
        <Header />
        <About />
        <SpecialMenu />
        <Chef />
        <Intro />
        <Awards />
        <Contact />
      </div>
      <Footer />
    </main>
    </>
  );
}
