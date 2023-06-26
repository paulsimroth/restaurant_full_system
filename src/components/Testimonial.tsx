import Image from "next/image";
import Link from "next/link";

function Testimonial({ index, id, picture, name, product, rating, text, link }: any) {
    return (
        <div className="flex flex-row w-[280px] md:w-[350px] h-fit items-center justify-center p-4">
            
            <Image
                src={picture}
                alt="Kundenfoto"
                width={60}
                height={60}
                key={id}
                className="w-[50px] h-[50px] rounded-[50px]"
            />

            <div className="flex flex-col px-2">

                <div className="relative flex flex-row w-full items-center justify-center gap-3">

                    <Link href={link} target="_blank">
                        <p className="py-2 text-[16px]">{name}</p>
                    </Link>

                    <div className="flex flex-row">
                        
                        {product.map(
                            (item: any, id: any) => (
                                <p key={id} className="py-2 text-[12px] italic">{item}</p>
                            ))
                        }

                    </div>


                    <div className="p-2 flex flex-row items-center justify-center">
                        
                        {rating.map(
                            (id: any) => (
                                <Image
                                    key={id}
                                    src="/star-yellow.svg"
                                    alt="star"
                                    width={300}
                                    height={300}
                                    className="w-[10px] h-[10px] rounded-[50px]"
                                />
                            ))
                        }

                    </div>

                </div>

                <p className="text-[12px] italic text-justify">
                    {text}
                </p>

            </div>
        </div>
    )
};

export default Testimonial;