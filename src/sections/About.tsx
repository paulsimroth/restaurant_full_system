import Image from "next/image";

function About() {
  return (
    <section className='relative w-[100vw] h-fit px-4 md:px-24 p-6 flex flex-col md:flex-row items-center justify-center bg-white' id='about'>

      <div className="p-8 m-2 flex flex-col items-end justify-end text-right z-10">
        <h1 className="text-[#FFA500]">About Us</h1>
        <Image
          src="/spoon.svg"
          alt="spoon"
          width={100}
          height={60}
        />
        <p className="text-[#1C2331] my-4">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae expedita deserunt incidunt in ipsam est reiciendis, tempora ipsa doloremque odio beatae at, voluptas ratione culpa! Ipsum earum consequatur tenetur dolore?
        </p>
        <button className="m-1 flex items-center h-fit border-2 border-[#FFA500] py-1 px-4 gap-[12px] text-[#1C2331] text-[20px] font-bold hover:scale-110 hover:bg-[#7EC699] duration-300">
          Learn More!
        </button>
      </div>

      <div className="m-8">
        <Image
          src="/knife.png"
          alt="knife"
          fill={true}
          className='w-[80%] h-[320px] md:h-[910px] lg:[1000px] object-contain opacity-30 md:opacity-90'
        />
      </div>

        <div className="p-8 m-2 flex flex-col items-start justify-start text-left z-10">
          <h1 className="text-[#FFA500]">Our History</h1>
          <Image
            src="/spoon.svg"
            alt="spoon"
            width={100}
            height={60}
            className="transform rotate-180"
          />
          <p className="text-[#1C2331] my-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae expedita deserunt incidunt in ipsam est reiciendis, tempora ipsa doloremque odio beatae at, voluptas ratione culpa! Ipsum earum consequatur tenetur dolore?
          </p>
          <button className="m-1 flex items-center h-fit border-2 border-[#FFA500] py-1 px-4 gap-[12px] text-[#1C2331] text-[20px] font-bold hover:scale-110 hover:bg-[#7EC699] duration-300">
            Learn More!
          </button>
        </div>
    </section>
  )
};

export default About;