'use client'
import { Day } from "@prisma/client";
import Head from "next/head";
import { prisma } from "~/server/db";
import { useState } from "react";
import { trpc } from "~/utils/trpc";
import { formatISO } from "date-fns";
import toast, { Toaster } from 'react-hot-toast'
import { Switch } from "@headlessui/react";
import { capitalize, classNames, weekdayIndexToName } from "~/utils/helpers";
import TimeSelector from "~/components/TimeSelector";
import Calendar from "react-calendar";
import { now } from "~/constants";
import Link from "next/link";
import Image from "next/image";
import AdminNav from "~/components/AdminNav";

interface openingProps {
    days: Day[]
}

function opening({ days }: openingProps) {

    const [enabled, setEnabled] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [openingHours, setOpeningHours] = useState([
        { name: 'sunday', openTime: days[0]!.openTime, closeTime: days[0]!.closeTime },
        { name: 'monday', openTime: days[1]!.openTime, closeTime: days[1]!.closeTime },
        { name: 'tuesday', openTime: days[2]!.openTime, closeTime: days[2]!.closeTime },
        { name: 'wednesday', openTime: days[3]!.openTime, closeTime: days[3]!.closeTime },
        { name: 'thursday', openTime: days[4]!.openTime, closeTime: days[4]!.closeTime },
        { name: 'friday', openTime: days[5]!.openTime, closeTime: days[5]!.closeTime },
        { name: 'saturday', openTime: days[6]!.openTime, closeTime: days[6]!.closeTime },
    ]);

    //tRPC
    const { mutate: saveOpeningHrs, isLoading } = trpc.opening.changeOpeningHours.useMutation({
        onSuccess: () => toast.success('Opening hours saved'),
        onError: () => toast.error('Something went wrong'),
    })
    const { mutate: closedDay } = trpc.opening.closedDay.useMutation({ onSuccess: () => refetch() })
    const { mutate: openDay } = trpc.opening.openDay.useMutation({ onSuccess: () => refetch() });
    const { data: closedDays, refetch } = trpc.opening.getClosedDays.useQuery();

    const dayIsClosed = selectedDate && closedDays?.includes(formatISO(selectedDate));

    function _changeTime(day: Day) {
        return function (time: string, type: 'openTime' | 'closeTime') {
            const index = openingHours.findIndex((x) => x.name === weekdayIndexToName(day.dayOfWeek))
            const newOpeningHours = [...openingHours]
            newOpeningHours[index]![type] = time
            setOpeningHours(newOpeningHours)
        }
    };

    return (
        <>
            <Head>
                <title>Admin Dashboard</title>
                <meta name="description" content="Admin Dashboard" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <AdminNav />
                <Toaster />
                <div className="flex flex-col items-center justify-around p-24 text-[#2E3A59]">
                    <h1 className='mt-8 text-[50px] font-bold'>Opening Hours Dashboard</h1>
                    <div className="inline-block">
                        <Switch
                            checked={enabled}
                            onChange={setEnabled}
                            className={classNames(
                                enabled ? 'bg-indigo-600' : 'bg-[#1C2331]',
                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                            )}>
                            <span className="sr-only">Use Setting</span>
                            <span
                                aria-hidden='true'
                                className={classNames(
                                    enabled ? 'translate-x-5' : 'translate-x-0',
                                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-300 ease-in-out'
                                )}
                            />
                        </Switch>
                        <p className={`${enabled ? 'font-medium' : ''}`}>Opening Days</p>
                    </div>
                    {!enabled ? (
                        //Opening time options
                        <div className="my-12 flex flex-col items-center justify-center gap-4">
                            {days.map((day) => {
                                const changeTime = _changeTime(day)
                                return (
                                    <div className="grid grid-cols-3 place-items-center" key={day.id}>
                                        <h3 className='font-bold'>{capitalize(weekdayIndexToName(day.dayOfWeek)!)}</h3>
                                        <div className='mx-4'>
                                            <TimeSelector
                                                type='openTime'
                                                changeTime={changeTime}
                                                selected={
                                                    openingHours[openingHours.findIndex((x) => x.name === weekdayIndexToName(day.dayOfWeek))]
                                                        ?.openTime
                                                }
                                            />
                                        </div>
                                        <div className='mx-4'>
                                            <TimeSelector
                                                type='closeTime'
                                                changeTime={changeTime}
                                                selected={
                                                    openingHours[openingHours.findIndex((x) => x.name === weekdayIndexToName(day.dayOfWeek))]
                                                        ?.closeTime
                                                }
                                            />
                                        </div>
                                    </div>
                                )
                            })}

                            <button
                                className="m-2 flex items-center h-fit w-fit border-2 border-[#FFA500] py-1 px-4 gap-[12px] text-[20px] font-bold hover:scale-110 hover:bg-[#7EC699] hover:text-[#2E3A59] duration-300"
                                onClick={() => {
                                    const withId = openingHours.map((day) => ({
                                        ...day,
                                        id: days[days.findIndex((d) => d.name === day.name)]!.id,
                                    }))
                                    saveOpeningHrs(withId)
                                }}
                            >
                                Save Changes
                            </button>
                        </div>
                    ) : (
                        //Opening Days Options
                        <div className="flex flex-col items-center justify-center">
                            <Calendar
                                minDate={now}
                                className='p-2 REACT-CALENDAR font-bold'
                                view='month'
                                onClickDay={(date) => setSelectedDate(date)}
                                tileClassName={({ date }) => {
                                    return closedDays?.includes(formatISO(date)) ? 'close-day' : null
                                }}
                            />

                            <button
                                className="m-2 flex items-center h-fit w-fit border-2 border-[#FFA500] py-1 px-4 gap-[12px] text-[20px] font-bold hover:scale-110 hover:bg-[#7EC699] hover:text-[#2E3A59] duration-300"
                                onClick={() => {
                                    if (dayIsClosed) openDay({ date: selectedDate })
                                    else if (selectedDate) closedDay({ date: selectedDate })
                                }}
                                disabled={!selectedDate}
                            >
                                {dayIsClosed ? 'Open this day' : 'Close this day'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </>
    )
};

export async function getServerSideProps() {
    const days = await prisma.day.findMany();
    if (!(days.length === 7)) throw new Error('Insert all days into database');
    return { props: { days } };
}

export default opening;