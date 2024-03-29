'use client';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { MultiValue } from 'react-select';
import { trpc } from '~/utils/trpc';
import ReactCalendar from 'react-calendar';
import { format, formatISO, isBefore, parse, parseISO, } from 'date-fns';
import type { Day } from '@prisma/client';
import type { DateTime } from '@types';
import { getOpeningTimes, roundToNearestMinutes, seatingOptions } from '~/utils/helpers';
import { Seat_Interval, now } from '~/constants';
import { de } from 'date-fns/locale';
import toast, { Toaster } from 'react-hot-toast';
import { motion, useDragControls } from 'framer-motion';

const DynamicSelect = dynamic(() => import("react-select"), { ssr: false });

type Input = {
    id: string
    name: string
    surname: string
    email: string
    phone: string
    seats: MultiValue<{ value: number; label: number }>
    date: DateTime | any
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
        seats: { value: data.seats, label: data.seats },
        date: data.date,
        message: data.message,
    };

    /**
     * SET STATES
     */
    //@ts-ignore
    const [input, setInput] = useState<Input>(initValues);
    const [toggleCalendar, setToggleCalendar] = useState<boolean>(false);
    const [date, setDate] = useState<DateTime>({
        justDate: null,
        dateTime: null,
    });

    /**
     * FORMATTING DATE FOR CORRECT PROCESSING
     * OTHERWISE ERROR
     */
    const formatDate = date.dateTime ? date.dateTime!.toISOString() : initValues.date;

    const formData = {
        id: initValues.id,
        name: input.name,
        surname: input.surname,
        phone: input.phone,
        email: input.email,
        date: formatDate,
        seats: input.seats,
        message: input.message,
    };

    //tRPC
    const { mutateAsync: updateReservation } = trpc.admin.updateReservation.useMutation({
        onSuccess: () => toast.success('Changes saved'),
        onError: () => toast.error('Something went wrong'),
    });
    const { data: reservations, refetch } = trpc.admin.getReservations.useQuery();

    //determine if today is closed
    const today = days.find((d) => d.dayOfWeek === now.getDay());
    const rounded = roundToNearestMinutes(now, Seat_Interval);
    const closing = parse(today!.closeTime, 'kk:mm', now);
    const tooLate = !isBefore(rounded, closing);
    if (tooLate) closedDays.push(formatISO(new Date().setHours(0, 0, 0, 0)));

    /**
     * USE EFFECTS
     */
    useEffect(() => {
        toggleCalendar
    }, []);

    useEffect(() => {
        input
    }, []);

    useEffect(() => {
        setToggleCalendar
    }, []);

    useEffect(() => {
        setDate
    }, [date]);

    useEffect(() => {
        if (date.dateTime) {
            showCalendar();
        };
    }, [date.dateTime]);

    const times = date.justDate && getOpeningTimes(date.justDate, days);

    /**
     * UPDATE RESERVATION IN DATABASE
     * THEN REFETCH AND CLOSE POPUP
     */
    async function handleUpdate() {
        await updateReservation({
            id: formData.id ? formData.id : initValues.id,
            name: formData.name ? formData.name : initValues.name,
            surname: formData.surname ? formData.surname : initValues.surname,
            phone: formData.phone ? formData.phone : initValues.phone,
            email: formData.email ? formData.email : initValues.email,
            date: formData.date ? formData.date : initValues.date,
            //@ts-ignore
            seats: formData.seats ? formData.seats!.value : initValues.seats!.value,
            message: formData.message ? formData.message : initValues.message,
        });
        await refetch();
        toggleEdit(false);
    };

    /**
     * TOGGLE CALENDAR
     */
    function showCalendar() {
        setToggleCalendar(!toggleCalendar);
    };

    return (
        <div>
            <Toaster />
            <motion.div
                className="fixed p-5 mt-5 top-[20%] left-[20%] flex flex-col flex-wrap items-center opacity-90 justify-center z-50 h-fit w-fit max-h-[80vh] max-w-[80vw] bg-white border-4 border-[#1C2331] rounded-xl"
                drag
                dragConstraints={{
                    top: -1000,
                    left: -1000,
                    right: 1000,
                    bottom: 1000,
                }}
                whileInView="show"
                dragMomentum={false}
            >
                <div className='m-1'>
                    <button onClick={() => toggleEdit()} className='m-1 p-1 border text-red-700 border-red-700 bg-[#D8D8D8] font-bold rounded-md hover:scale-110 duration-300 hover:text-white hover:bg-red-500'>
                        CLOSE & DISCARD
                    </button>
                </div>
                <div>
                    {toggleCalendar ? (
                        <div>
                            <button onClick={() => showCalendar()} className='m-1 p-1 border text-green-700 border-green-700 bg-[#D8D8D8] font-bold rounded-md hover:scale-110 duration-300 hover:text-white hover:bg-green-500'>
                                Edit Details
                            </button>
                            <div className='h-full flex flex-col justify-center items-center'>
                                {date.justDate ? (
                                    <div className='flex flex-wrap gap-4'>
                                        {times?.map((time, i) => (
                                            <div key={`time-${i}`} className='rounded-sm bg-black-100 p-2 hover:scale-110 duration-300 '>
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
                        </div>
                    ) : (
                        <div className="flex flex-col flex-wrap">
                            <div className="flex flex-row flex-wrap items-center justify-center">
                                <div className="m-1">
                                    <button onClick={() => showCalendar()} className='m-1 p-1 border text-green-700 border-green-700 bg-[#D8D8D8] font-bold rounded-md hover:scale-110 duration-300 hover:text-white hover:bg-green-500'>
                                        Edit Time
                                    </button>
                                    <p>Currently booked slot</p>
                                    <strong>{format(parseISO(formatDate), 'do MMM yyyy', { locale: de })} at {format(parseISO(formatDate), 'kk:mm', { locale: de })}</strong>
                                </div>
                                <div className="m-1">
                                    <p className="px-3 text-[16px] md:text-[20px] flex flex-row">
                                        Name
                                    </p>
                                    <input
                                        className='w-full h-14 p-3 m-2 rounded-[15px] text-[16px] md:text-[23px] text-[#1C2331] bg-[#D8D8D8]'
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
                                        className='w-full h-14 p-3 m-2 rounded-[15px] text-[16px] md:text-[23px] text-[#1C2331] bg-[#D8D8D8]'
                                        name="surname"
                                        type="text"
                                        placeholder="Your Surname"
                                        value={input.surname}
                                        onChange={(e) => setInput((prev) => ({ ...prev, surname: e.target.value }))}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row flex-wrap items-center justify-center">
                                <div className="m-1">
                                    <p className="px-3 text-[16px] md:text-[20px] flex flex-row">
                                        Email
                                    </p>
                                    <input
                                        className='w-full h-14 p-3 my-2 md:m-2 rounded-[15px] text-[16px] md:text-[23px] text-[#1C2331] bg-[#D8D8D8]'
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
                                        className='w-full h-14 p-3 my-2 md:m-2 rounded-[15px] text-[16px] md:text-[23px] text-[#1C2331] bg-[#D8D8D8]'
                                        name="phone"
                                        type="tel"
                                        placeholder="Your Phone Number"
                                        value={input.phone}
                                        onChange={(e) => setInput((prev) => ({ ...prev, phone: e.target.value }))}
                                        required
                                    />
                                </div>
                                <div>
                                    <p className="px-3 text-[16px] md:text-[20px] flex flex-row">
                                        Seats
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
                            </div>
                            <div>
                                <p className="px-3 text-[16px] md:text-[20px] flex flex-row">
                                    Message and Comments
                                </p>
                                <textarea
                                    className='w-full min-h-[50px] p-3 m-2 rounded-[15px] text-[16px] md:text-[23px] text-[#1C2331] bg-[#D8D8D8]'
                                    name="message"
                                    placeholder="Your Message"
                                    value={input.message}
                                    onChange={(e) => setInput((prev) => ({ ...prev, message: e.target.value }))}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <button onClick={() => handleUpdate()} className='m-1 p-1 border text-green-700 border-green-700 bg-[#D8D8D8] font-bold rounded-md hover:scale-110 duration-300 hover:text-white hover:bg-green-500'>
                        SAVE & CLOSE
                    </button>
                </div>
            </motion.div>
        </div>
    )
};

export default UpdateReservation;