'use client';

import { useState } from "react";
import { sendBookingForm, sendForm } from "../lib/api";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { HiArrowLeft } from "react-icons/hi";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { seatingOptions } from "~/utils/helpers";
import { MultiValue } from "react-select";

const DynamicSelect = dynamic(() => import("react-select"), { ssr: false });

type Input = {
    name: string
    surname: string
    email: string
    phone: string
    seats: MultiValue<{ value: number | any; label: number | any }>
    selectedTime: string
    message: string
}

/**
 * INITIAL STATE OF THE FORM IS SET HERE
 */
const initValues = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    seats: [],
    selectedTime: "",
    message: "",
};

const initFormState = { values: initValues };

function BookingForm({ selectedTime }: any) {

    const router = useRouter();

    const [input, setInput] = useState<Input>(initValues);
    const [processing, setProcessing] = useState(false);
    const [msgError, setMsgError] = useState(false);

    //SELECTED TIME IS SAVED TO STATE
    function time(input: string) {
        setInput((prev) => ({ ...prev, selectedTime: input }))
    };

    time(selectedTime);


    const onSubmit = async (e: any) => {
        e.preventDefault();
        setProcessing(true);
        setMsgError(false);
        setInput((prev) => ({
            ...prev,
        }))
        try {
            await sendBookingForm(input);
            setProcessing(false);
            setMsgError(false);
            setInput(initValues);
            router.push('/');
        } catch (error) {
            setMsgError(true);
            setInput((prev) => ({
                ...prev,
                error,
            }))
        };
    };


    return (
        <>
            <h2 className='flex items-center gap-4 text-2xl font-bold tracking-tight text-gray-900'>
                <HiArrowLeft
                    className='cursor-pointer'
                    onClick={() => router.push('/')}
                />
                Fill out the details for {format(parseISO(selectedTime), 'MMM do, yyyy')}
            </h2>
            <form>

                <div className="flex flex-col flex-wrap items-center justify-center">

                    <div className="flex flex-row flex-wrap">
                        <div className="m-1">
                            <p className="px-3 text-[16px] md:text-[20px] flex flex-row">
                                Name
                                <Image src="/asterisk.svg" alt="required" width={15} height={15} className="m-1" />
                            </p>
                            <input
                                className='w-full h-14 p-3 m-2 rounded-[15px] text-[16px] md:text-[23px] text-[#1C2331]'
                                name="name"
                                type="text"
                                placeholder="Your Name"
                                value={input.name}
                                onChange={(e) => setInput((prev) => ({ ...prev, name: e.target.value }))}
                                required
                            />
                        </div>
                        <div className="m-1">
                            <p className="px-3 text-[16px] md:text-[20px] flex flex-row">
                                Surname
                                <Image src="/asterisk.svg" alt="required" width={15} height={15} className="m-1" />
                            </p>
                            <input
                                className='w-full h-14 p-3 m-2 rounded-[15px] text-[16px] md:text-[23px] text-[#1C2331]'
                                name="surname"
                                type="text"
                                placeholder="Your Surname"
                                value={input.surname}
                                onChange={(e) => setInput((prev) => ({ ...prev, surname: e.target.value }))}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex flex-row flex-wrap">
                        <div className="m-1">
                            <p className="px-3 text-[16px] md:text-[20px] flex flex-row">
                                Email
                                <Image src="/asterisk.svg" alt="required" width={15} height={15} className="m-1" />
                            </p>
                            <input
                                className='w-full h-14 p-3 my-2 md:m-2 rounded-[15px] text-[16px] md:text-[23px] text-[#1C2331]'
                                name="email"
                                type="email"
                                placeholder="example@mail.com"
                                value={input.email}
                                onChange={(e) => setInput((prev) => ({ ...prev, email: e.target.value }))}
                                required
                            />
                        </div>
                        <div className="m-1">
                            <p className="px-3 text-[16px] md:text-[20px] flex flex-row">
                                Phone Number
                                <Image src="/asterisk.svg" alt="required" width={15} height={15} className="m-1" />
                            </p>
                            <input
                                className='w-full h-14 p-3 my-2 md:m-2 rounded-[15px] text-[16px] md:text-[23px] text-[#1C2331]'
                                name="phone"
                                type="tel"
                                placeholder="Your Phone Number"
                                value={input.phone}
                                onChange={(e) => setInput((prev) => ({ ...prev, phone: e.target.value }))}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <p className="px-3 text-[16px] md:text-[20px] flex flex-row">
                            Select the number of Seats
                            <Image src="/asterisk.svg" alt="required" width={15} height={15} className="m-1" />
                        </p>
                        <DynamicSelect
                            className='w-[150px] h-fit-content h-14 p-3 m-2 rounded-[15px] text-[16px] md:text-[23px] text-[#1C2331]'
                            name="seats"
                            value={input.seats}
                            //@ts-ignore
                            onChange={(e) => setInput((prev) => ({ ...prev, seats: e }))}
                            required
                            options={seatingOptions}
                        />
                    </div>

                    <div>

                        <p className="px-3 text-[16px] md:text-[20px] flex flex-row">
                            Leave us a Message about special wishes
                        </p>
                        <textarea
                            className='w-full min-h-[50px] p-3 m-2 rounded-[15px] text-[16px] md:text-[23px] text-[#1C2331]'
                            name="message"
                            placeholder="Your Message"
                            value={input.message}
                            onChange={(e) => setInput((prev) => ({ ...prev, message: e.target.value }))}
                            required
                        />
                    </div>
                </div>

                {!processing
                    ? <input
                        className="m-1 flex items-center h-fit border-2 border-[#FFA500] py-1 px-4 gap-[12px] text-[20px] font-bold hover:scale-110 hover:bg-[#7EC699] hover:text-[#2E3A59] duration-300"
                        type="submit"
                        value="Send Reservation"
                        onClick={onSubmit}
                        disabled={!input.name || !input.surname || !input.email || !input.seats}
                    />
                    : <input
                        className="flex items-center h-fit border-2 border-[#FFA500] py-4 px-6 bg-red gap-[12px] cursor-progress"
                        type="submit"
                        value="Sending..."
                        onClick={onSubmit}
                    />
                }

                {msgError &&
                    <div className="p-6 m-4 bg-[#ff0000] rounded-md flex items-center h-fit w-fit">
                        <p className="font-extrabold text-[16px] text-white">ERROR, Failed to send!</p>
                    </div>
                }
            </form >
        </>
    )
};

export default BookingForm;