'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';

function Navbar() {

  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="z-40 fixed bg-[#1C2331] text-[#FFA500] left-0 top-0 w-full border-b-4 border-[#FFA500] pb-8 pt-8 flex flex-row justify-around items-center">

      <Link href="/" className='cursor-pointer'>
        <Image
          src="/placeholder.png"
          alt="logo"
          width={60}
          height={60}
          className='block rounded-md object-contain'
        />
      </Link>

      <ul className="hidden m-2 sm:flex flex-row justify-around items-center md:w-2/5 h-fit gap-4">
        <li className="md:text-[20px] hover:scale-110 duration-300"><a href="/#home">Home</a></li>
        <li className="md:text-[20px] hover:scale-110 duration-300"><a href="/#about">About</a></li>
        <li className="md:text-[20px] hover:scale-110 duration-300"><a href="/menu">Menu</a></li>
        <li className="md:text-[20px] hover:scale-110 duration-300"><a href="/#awards">Awards</a></li>
      </ul>

      <div className="hidden sm:flex flex-row justify-around items-center">
        <a href="#contact">
          <button className="m-1 flex items-center h-fit border-2 border-[#FFA500] py-1 px-4 gap-[12px] text-[20px] font-bold hover:scale-110 hover:bg-[#7EC699] hover:text-[#2E3A59] duration-300">
            Contact
          </button>
        </a>
        <Link href="/booking">
          <button className="m-1 flex items-center h-fit border-2 border-[#FFA500] py-1 px-4 gap-[12px] text-[20px] font-bold hover:scale-110 hover:bg-[#7EC699] hover:text-[#2E3A59] duration-300">
            Book a Table
          </button>
        </Link>
      </div>

      <div className="sm:hidden">
        <GiHamburgerMenu fontSize={27} onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <div className="fixed top-0 left-0 w-[100%] h-[100vh] bg-black duration-500 flex flex-col justify-center items-center z-10">
            <MdOutlineRestaurantMenu className="cursor-pointer absolute top-10 right-10" fontSize={30} onClick={() => setToggleMenu(false)} />
            <ul className="m-4 cursor-pointer h-[30vh] flex flex-col justify-around items-center gap-4" onClick={() => setToggleMenu(false)}>
              <li className="md:text-[20px] hover:scale-110 duration-300"><a href="/#home">Home</a></li>
              <li className="md:text-[20px] hover:scale-110 duration-300"><a href="/#about">About</a></li>
              <li className="md:text-[20px] hover:scale-110 duration-300"><a href="/menu">Menu</a></li>
              <li className="md:text-[20px] hover:scale-110 duration-300"><a href="/#awards">Awards</a></li>
              <li className="md:text-[20px] flex items-center h-fit border-2 border-[#FFA500] py-1 px-4 gap-[12px] font-bold hover:scale-110 hover:bg-[#7EC699] hover:text-[#2E3A59] duration-300"><a href="//#contact">Contact</a></li>
              <li className="md:text-[20px] flex items-center h-fit border-2 border-[#FFA500] py-1 px-4 gap-[12px] font-bold hover:scale-110 hover:bg-[#7EC699] hover:text-[#2E3A59] duration-300"><a href="/booking">Book a Table</a></li>
            </ul>
          </div>
        )}
      </div>

    </nav>
  )
};

export default Navbar;