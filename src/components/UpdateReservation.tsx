'use client';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { MultiValue } from 'react-select';
import { trpc } from '~/utils/trpc';
import ReactCalendar from 'react-calendar';
import { format, formatISO, isBefore, parse,  } from 'date-fns';
import type { Day } from '@prisma/client';
import type { DateTime } from '@types';
import { getOpeningTimes, roundToNearestMinutes, seatingOptions } from '~/utils/helpers';
import { useRouter } from 'next/router';
import { Seat_Interval, now } from '~/constants';

const DynamicSelect = dynamic(() => import("react-select"), { ssr: false });

type Input = {
    id: string
    name: string
    surname: string
    email: string
    phone: string
    seats: MultiValue<{ value: number; label: number }> | any
    date: string
    message: string
}

interface EditProps {
    days: Day[]
    closedDays: string[] //as ISO string
    data: Input
    toggleEdit: any
}


function UpdateReservation({ days, closedDays, data, toggleEdit }: EditProps) {

    /**
     * INIT FORM
     */
    const initValues = {
        id: data.id,
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        seats: data.seats,
        date: data.date,
        message: data.message,
    };
    console.log('initValues', initValues);
    
    /**
     * SET STATES
     */
    const [input, setInput] = useState<Input>(initValues);
    const [toggleCalendar, setToggleCalendar] = useState(false);
    const [date, setDate] = useState<DateTime>({
        justDate: null,
        dateTime: null,
    });

    //tRPC
    const { mutateAsync: updateReservation } = trpc.admin.updateReservation.useMutation();

    const router = useRouter();

    //determine if today is closed
    const today = days.find((d) => d.dayOfWeek === now.getDay());
    const rounded = roundToNearestMinutes(now, Seat_Interval);
    //@ts-ignore
    const closing = parse(today!.closeTime, 'kk:mm', now);
    const tooLate = !isBefore(rounded, closing);
    if (tooLate) closedDays.push(formatISO(new Date().setHours(0, 0, 0, 0)));

    /**
     * USE EFFECTS
     */
/*     useEffect(() => {
        if (date.dateTime) {
            localStorage.setItem('selectedTime', date.dateTime.toISOString());
            //after Day and time are choosen redirecting to table booking
        }
    }, [date.dateTime, setToggleCalendar(false)]);

    useEffect(() => {
        toggleCalendar
        console.log("useEffect, toggleCalendar");
    }, []); */

    useEffect(() => {
        input
        console.log("useEffect, setInput");
    }, []);
    
    //@ts-ignore
    const times = date.justDate && getOpeningTimes(date.justDate, days);

    /**
     * UPDATE RESERVATION AND CLOSE POPUP
     */
    async function handleUpdate() {
        await updateReservation({
            id: initValues.id,
            name: input.name,
            surname: input.surname,
            phone: input.phone,
            email: input.email,
            //@ts-ignore
            seats: input.seats.value,
            date: "",
            message: input.message,
        });
        toggleEdit(false);
    };

    return (
        <div>
            <div className="fixed mt-5 top-10 left-10 flex flex-col flex-wrap items-center justify-center z-50 h-[80vh] w-[80vw] bg-white">
                <div>
                    <button onClick={() => toggleEdit()} className='p-1 border border-black'>
                        CLOSE
                    </button>
                </div>
                <div>
{/*                     {toggleCalendar ? (
                        <div className='h-full flex flex-col justify-center items-center'>
                            {date.justDate ? (

                                <div className='flex flex-wrap gap-4'>
                                    {times?.map((time, i) => (
                                        <div key={`time-${i}`} className='rounded-sm bg-gray-100 p-2'>
                                            <button type="button" onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))}>
                                                {format(time, "kk:mm")}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (


                                <ReactCalendar
                                    minDate={new Date()}
                                    className="p-2 REACT-CALENDAR font-bold"
                                    view='month'
                                    tileDisabled={({ date }) => closedDays.includes(formatISO(date))}
                                    onClickDay={(date) => setDate((prev) => ({ ...prev, justDate: date }))}
                                />
                            )}
                        </div>
                    ) : ( */}

                        <div>
                            <div className="flex flex-row flex-wrap">
                                <div className="m-1">
                                    <p className="px-3 text-[16px] md:text-[20px] flex flex-row">
                                        Name
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
                    {/* )} */}
                </div>
                <div>
                    <button onClick={handleUpdate}>
                        SAVE CHANGES
                    </button>
                </div>
            </div>
        </div>
    )
};

export default UpdateReservation;