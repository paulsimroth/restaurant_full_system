import Head from "next/head";
import Navbar from "~/sections/Navbar";
import Header from "~/sections/Header";
import About from "~/sections/About";
import SpecialMenu from "~/sections/SpecialMenu";
import Chef from "~/sections/Chef";
import Intro from "~/sections/Intro";
import Awards from "~/sections/Awards";
import Contact from "~/sections/Contact";
import Footer from "~/sections/Footer";
import Colorschemes from "~/sections/Colorschemes";

export default function Home() {

  return (
    <html lang="de">
      <Head>
        <title>{`${process.env.NEXT_PUBLIC_COMNAME}`}</title>
        <meta
          name="description"
          content={` ${process.env.NEXT_PUBLIC_COMNAME} `}
        />
        <meta charSet="utf-8" />
        <meta name='author' content={process.env.NEXT_PUBLIC_COMNAME} />
        <meta name='copyright' content={process.env.NEXT_PUBLIC_COMNAME} />
        <meta name="keywords" content="10 suchbegriffe einfügen" />
        <meta name="robots" content="index,follow" />
        <meta name="format-detection" content="telephone=yes, address=yes, email=yes" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://stijndv.com" />
        <link rel="stylesheet" href="https://stijndv.com/fonts/Eudoxus-Sans.css" />
      </Head>
      <main className='w-full overflow-hidden'>
        <Navbar />
        <div className="flex min-h-screen flex-col items-center justify-center pt-24 px-24 mx-auto">
          <Header />
          {/* <Colorschemes /> */}
          <About />
          <SpecialMenu />
          <Chef />
          <Intro />
          <Awards />
          <Contact />
        </div>
        <Footer />
      </main>
    </html>
  );
}
