import Image from "next/image";
import Link from "next/link";

function Footer() {

  const comname = process.env.NEXT_PUBLIC_COMNAME;

  return (
    <footer className='z-20 bg-[#1C2331] text-[#FFA500] left-0 bottom-0 flex flex-col items-center border-t-4 border-[#FFA500] pb-8 pt-8'>

      <div className="flex w-full justify-around">
        <Image
          src="/placeholder.png"
          alt="logo"
          width={200}
          height={200}
          className='hidden md:block w-[200px] h-[200px] p-3 rounded-[50px]'
        />
        <div className='flex flex-col justify-around'>
          <a href="" className='p-3 md:text-[20px] hover:scale-110 duration-300'>FAQ</a>
          <a href="" className='p-3 md:text-[20px] hover:scale-110 duration-300'>Unsere Methode</a>
          <a href="" className='p-3 md:text-[20px] hover:scale-110 duration-300'>Unsere Mission</a>
        </div>
        <div className='flex flex-col justify-around'>
          <a href="" className='p-3 md:text-[20px] hover:scale-110 duration-300'>Facebook</a>
          <a href="" className='p-3 md:text-[20px] hover:scale-110 duration-300'>Instagram</a>
          <a href="" className='p-3 md:text-[20px] hover:scale-110 duration-300'>LinkedIn</a>
          <a href="" className='p-3 md:text-[20px] hover:scale-110 duration-300'>TikTok</a>
        </div>
        <div className='flex flex-col'>
          <Link href="/impressum" className='p-3 md:text-[20px] hover:scale-110 duration-300'>Impressum</Link>
          <Link href="/datenschutz" className='p-3 md:text-[20px] hover:scale-110 duration-300'>Datenschutz</Link>
        </div>
      </div>

      <div>
        <p className="p-2 center text-[14px] opacity-50">Copyright © 2023, {comname}</p>
      </div>

    </footer>
  )
};

export default Footer;