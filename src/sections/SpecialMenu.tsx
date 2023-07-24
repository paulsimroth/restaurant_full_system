import Image from "next/image";
import { cocktails, wines } from '../constants';
import MenuItem from "~/components/MenuItem";
import SubHeading from "~/components/SubHeading";

function SpecialMenu() {
  return (
    <section className="w-[100vw] px-4 md:px-24 p-6 bg-white text-[#1C2331] flex flex-col" id="menu">
      <div className="flex flex-col items-center">
        <SubHeading title="Menu that fits your Palatte" />
        <h1 className='m-2 text-[50px] md:text-[70px] text-[#FFA500] font-semibold'>Today&apos;s Special</h1>
      </div>

      <div className="relative w-[100%] my-8 h-fit flex flex-col md:flex-row items-start justify-center">
        <div className="w-[100%] flex-1 flex-col mx-4 z-10">
          <p className="text-[45px] leading-[58px] font-semibold italic tracking-wider">Wine & Beer</p>
          <div className="flex flex-col my-4 w-[90%]">
            {wines.map((wine, index) => (
              <MenuItem key={wine.title + index} title={wine.title} price={wine.price} tags={wine.tags} />
            ))}
          </div>
        </div>

        <div className="w-[410px] lg-[650px] h-auto m-4 ">
          <Image
            src="/menu.png"
            alt="menu"
            fill={true}
            className='w-[100%] h-auto object-contain opacity-30 lg:opacity-90'
          />
        </div>

        <div className="w-[100%] flex-1 flex-col mx-4 z-10">
          <p className="text-[45px] leading-[58px] font-semibold italic tracking-wider">Cocktails</p>
          <div className="flex flex-col my-4 w-[90%]">
            {cocktails.map((cocktail, index) => (
              <MenuItem key={cocktail.title + index} title={cocktail.title} price={cocktail.price} tags={cocktail.tags} />
            ))}
          </div>
        </div>
      </div>

      <div className="m-4">
        <button type="button" className="m-1 flex items-center h-fit border-2 border-[#FFA500] text-[#2E3A59] py-1 px-4 gap-[12px] text-[20px] font-bold hover:scale-110 hover:bg-[#7EC699] duration-300">
          View more
        </button>
      </div>
    </section>
  )
};

export default SpecialMenu;