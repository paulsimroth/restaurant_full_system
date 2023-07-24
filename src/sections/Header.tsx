import Image from "next/image";
import SubHeading from "~/components/SubHeading";

function Hero() {
  return (
    <section className='w-[100vw] min-h-[95vh] flex flex-col md:flex-row items-center justify-center px-12 md:px-24 py-16 md:py-6 bg-white' id='home'>
      <div className="text-[#1C2331] w-[70vw] m-12">
        <SubHeading title="Chase the new flavor"/>
        <h1 className="text-[#1C2331] tracking-wider uppercase leading-[90px] md:leading-[117px] text-[70px] md:text-[90px]">
          The Key to fine dining
        </h1>
        <p className="my-8 text-justify">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea obcaecati possimus rem dignissimos voluptatibus tempore aliquam a. Consequuntur facere, vero distinctio veritatis dolorum ullam temporibus, optio odit, atque nisi dignissimos.
        </p>
        <button className="m-1 flex items-center h-fit border-2 border-[#FFA500] py-1 px-4 gap-[12px] text-[20px] font-bold hover:scale-110 hover:bg-[#7EC699] hover:text-[#2E3A59] duration-300">
          Explore our Menu
        </button>
      </div>

      <div className="m-4">
        <Image
          src="/welcome.png"
          alt="header image"
          width={650}
          height={650}
          className='block object-contain'
        />
      </div>
    </section>
  )
};

export default Hero;