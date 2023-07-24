'use client'

import { MutableRefObject, useRef, useState } from 'react';
import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';

function Intro() {

    const [playVideo, setPlayVideo] = useState(false);
    const vidRef: any = useRef();

    const handleVideo = () => {
        setPlayVideo((previousPlayVideo) => !previousPlayVideo)
        if (playVideo) {
            vidRef.current.pause();
        } else {
            vidRef.current.play();
        }
    };

    return (
        <section className="relative w-[100vw] h-fit px-4 md:px-24 p-6 bg-white text-white flex items-center justify-center" id="intro">
            <video
                ref={vidRef}
                loop
                controls={false}
                muted
                className='w-[95%] lg:w-[70%] h-fit object-cover'
            >
                <source src="meal.mp4" type="video/mp4" />
            </video>

            <div className='absolute inset-0 bg-[#ffffff]/30 flex items-center justify-center'>
                <div
                    className='w-[100px] h-[100px] rounded-[50px] border-white border cursor-pointer flex items-center justify-center'
                    onClick={handleVideo}
                >
                    {playVideo ? (
                        <BsPauseFill color="#fff" fontSize={40} />
                    ) : (
                        <BsFillPlayFill color="#fff" fontSize={40} />
                    )}
                </div>
            </div>

        </section>
    )
};

export default Intro;