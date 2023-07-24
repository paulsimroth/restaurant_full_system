import Image from "next/image";

function SubHeading(props: any) {
  return (
    <div className="mb-4">
        <p className="italic text-slate-400">
            {props.title}
        </p>
        <Image
          src="/spoon.svg"
          alt="spoon"
          width={160}
          height={60}
          className='block object-contain fill-[#1C2331]'
        />
    </div>
  )
};

export default SubHeading;