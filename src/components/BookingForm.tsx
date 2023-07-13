'use client';

import { useState } from "react";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { HiArrowLeft } from "react-icons/hi";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { seatingOptions } from "~/utils/helpers";
import { MultiValue } from "react-select";
import { sendBookingForm } from "~/lib/api";
import { de } from "date-fns/locale";
import { trpc } from "~/utils/trpc";

const DynamicSelect = dynamic(() => import("react-select"), { ssr: false });

type Input = {
    name: string
    surname: string
    email: string
    phone: string
    seats: MultiValue<{ value: number; label: number }>
    selectedTime: string
    message: string
    sentAt: Date
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
    sentAt: new Date()
};

function BookingForm({ selectedTime }: any | string) {

    const router = useRouter();

    //GENERAL STATE FOR UI AND NODEMAILER
    const [input, setInput] = useState<Input>(initValues);
    const [bookingProcessing, setBookingProcessing] = useState<Boolean>(false);
    const [bookingError, setBookingError] = useState<Boolean>(false);

    //tRPC
    const { mutateAsync: addReservation } = trpc.table.bookTable.useMutation();

    /**
     * SUBMITTING FORM TO NODEMAILER
     * @function time 
     * @function setProcessing changes appearance of submit button
     * @function setMsgError sets error state to display error message in case of failure to submit
     * @function setInput sets form inputs to initValues if submit is successful
     * 
     * after successful submit user is pushed to Home
     */

    const data = {
        name: input.name,
        surname: input.surname,
        email: input.email,
        phone: input.phone,
        seats: input.seats,
        selectedTime: selectedTime,
        message: input.message,
        sentAt: input.sentAt,
    };

    function reservationToDb() {
        addReservation({
            name: input.name,
            surname: input.surname,
            phone: input.phone,
            email: input.email,
            //@ts-ignore
            seats: input.seats.value,
            date: selectedTime,
            message: input.message,
        });
    };

    const onSubmit = async (e: any) => {
        e.preventDefault();
        setBookingProcessing(true);
        setBookingError(false);
        setInput((prev) => ({
            ...prev,
        }))

        try {
            await sendBookingForm(data);
            await reservationToDb();
            setBookingProcessing(false);
            setBookingError(false);
            setInput(initValues);
            router.push('/');
        } catch (error) {
            setBookingError(true);
            setBookingProcessing(false);
            setInput((prev) => ({
                ...prev,
                error,
            }));
        };
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-row items-start justify-start">
                    <HiArrowLeft
                        className='cursor-pointer fill-[#808080] self-center p-1 text-4xl hover:bg-[#808080] hover:fill-white duration-300 rounded-full'
                        onClick={() => router.push('/booking')}
                    />
                    <h2 className='flex items-center gap-4 text-3xl font-bold tracking-tight text-gray-900 leading-9'>
                        Fill out the details!
                    </h2>
                </div>
                <p className="p-1 text-xl"><strong>Your reservation details: {format(parseISO(selectedTime), 'do MMM yyyy', { locale: de })} at {format(parseISO(selectedTime), 'kk:mm', { locale: de })}</strong></p>
            </div>
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
                        />
                    </div>
                </div>

                {!bookingProcessing
                    ? <input
                        className="m-1 flex items-center h-fit border-2 border-[#FFA500] py-1 px-4 gap-[12px] text-[20px] font-bold hover:scale-110 hover:bg-[#7EC699] hover:text-[#2E3A59] duration-300"
                        type="submit"
                        value="Send"
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

                {bookingError &&
                    <div className="p-6 m-4 bg-[#ff0000] rounded-md flex items-center h-fit w-fit">
                        <p className="font-extrabold text-[16px] text-white">ERROR, Failed to send reservation!</p>
                    </div>
                }
            </form >
        </>
    )
};

export default BookingForm;