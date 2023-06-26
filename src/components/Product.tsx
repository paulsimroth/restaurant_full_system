'use client'

import Image from "next/image";
import { motion, useMotionValue, useTransform } from 'framer-motion';

function Product() {

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);

    return (
        <div className="w-fit perspective select-none flex items-center my-6 md:mx-8">
            <motion.div
                style={{ x, y, rotateX, rotateY, z: 100 }}
                drag
                dragElastic={0.16}
                dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                whileTap={{ cursor: "grabbing" }}
                className="relative w-[285px] h-[500px] flex flex-col rounded-3xl shadow-md shadow-[#452A6A] bg-[#7EC699] cursor-grab"
            >

                {/* TOP CONTAINER */}
                <div className="relative w-full flex flec-col flex-[1.2] items-center justify-end p-3">
                    {/* CIRCLE WRAPPER */}
                    <div className="absolute top-0 left-0 min-w-full min-h-full overflow-hidden rounded-r-3xl">
                        <div className="absolute w-[350px] h-[350px] top-[-4.2em] right-[-10em] z-10 bg-[#FFA500] rounded-[50%]" />
                    </div>

                    <div className="absolute w-full h-full flex items-center justify-center mr-12 mt-12">
                        <motion.div
                            style={{ x, y, rotateX, rotateY, z: 1000, rotate: "-20deg" }}
                            drag
                            dragElastic={0.10}
                            whileTap={{ cursor: "grabbing" }}
                            className="w-auto h-auto z-20"
                        >
                            <Image
                                src="/placeholder.png"
                                alt="PLACEHOLDER image"
                                width={100}
                                height={100}
                                className="w-auto h-[180px] select-none rounded-[50px]"
                            />
                        </motion.div>
                    </div>

                    <h1 className="uppercase z-20 text-[50px] font-black">
                        PRODUCT
                    </h1>
                </div>

                {/* BOTTOM CONTAINER */}
                <div className="flex flex-[0.8] px-4 text-[#2E3A59]">
                    <div className="w-full h-full flex flex-col pt-10 px-2 leading-6">
                        <span className="text-[11px] font-bold uppercase">
                            DETAIL SMALL
                        </span>

                        <div className="w-full flex flex-row justify-between items-center">
                            <span className="text-[18px] font-extrabold uppercase">
                                DETAIL 1
                            </span>
                            <span className="text-[18px] font-extrabold uppercase">
                                PRICE, DETAIL 2
                            </span>
                        </div>
                        <div className="w-full h-[10px]" />
                        <div className="w-full flex justify-between items-center">
                            <span className="text-[18px] font-extrabold uppercase">
                                START NOW!
                            </span>
                            <button className="text-[16px] font-bold uppercase py-[10px] px-[16px] rounded-3xl border-4 border-[#FFA500]">
                                button
                            </button>
                        </div>
                        <div className="w-full h-[30px] flex items-center justify-center">
                            <Image
                                src=""
                                alt="logo"
                                width={15}
                                height={15}
                                className="w-[50px] h-[30px]"
                            />
                        </div>
                    </div>

                </div>

            </motion.div>
        </div>
    )
};

export default Product;