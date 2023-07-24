
import Image from "next/image";
import { awards } from '../constants';
import SubHeading from "~/components/SubHeading";

function AwardCard({ award: { imgUrl, title, subtitle , key} }: any) {
  return (
    <div key={key} className="min-w-[230px] flex flex-row flex-1 m-4 items-center justify-start">
      <Image
        src={imgUrl}
        alt="award"
        width={60}
        height={60}
        className='rounded-lg object-contain'
      />
      <div className="p-2">
        <p className="text-[#1C2331]">{title}</p>
        <p className="text-slate-400 italic">{subtitle}</p>
      </div>
    </div>
  )
};

function Awards() {
  return (
    <section className='relative w-[100vw] h-fit px-4 md:px-24 p-8 flex flex-col  items-center justify-center bg-white' id='awards'>
      <div>
        <SubHeading title="Awards & Recognition" />
        <h1 className='m-2 text-[50px] md:text-[70px] text-[#1C2331] font-semibold'>
          Our Laurels
        </h1>
        <div className="flex flex-row flex-wrap">
          {awards.map((award) => <AwardCard award={award} key={award.title} />)}
        </div>
      </div>
      <div className="m-4">
        <Image
          src="/placeholder.png"
          alt="logo"
          width={500}
          height={500}
          className='w-[280px] h-[280px] md:w-[500px] md:h-[500px] p-3 rounded-[50px]'
        />
      </div>
    </section>
  )
};

export default Awards;