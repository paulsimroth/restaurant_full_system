import Product from '@/app/components/Product';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

function Info() {
  return (
    <section className='w-[85vw] px-4 md:px-24 p-6 flex flex-col items-center' id='info'>

      <h3 className='m-6 mt-16 text-[50px] md:text-[70px] text-[#0F4C81] font-semibold'>SERVICES</h3>

      <div className="m-6 text-center lg:mb-0 flex flex-col md:flex-row justify-around w-full">

        <Product />

        <Product />

      </div>

    </section>
  )
};


export default Info;