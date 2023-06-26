import Image from "next/image";

function SubHeading(props: any) {
  return (
    <div className="mb-4">
        <p className="italic text-white">
            {props.title}
        </p>
        <Image
          src="/spoon.svg"
          alt="spoon"
          width={160}
          height={60}
          className='block object-contain'
        />
    </div>
  )
};

export default SubHeading;