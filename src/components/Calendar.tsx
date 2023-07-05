'use client'

import type { Day } from '@prisma/client';
import type { DateTime } from '@types';
import { format, formatISO, isBefore, parse } from "date-fns";
import { useRouter } from 'next/router';
import { type FC, useEffect, useState } from 'react';
import ReactCalendar from 'react-calendar';
import { Seat_Interval, now } from '~/constants';
import { getOpeningTimes, roundToNearestMinutes } from '~/utils/helpers';

interface CalenderProps {
  days: Day[]
  closedDays: string[] //as ISO string
}

function Calendar<FC> ({ days, closedDays }: CalenderProps) {

  const router = useRouter();

  //determine if today is closed
  const today = days.find((d) => d.dayOfWeek === now.getDay());
  const rounded = roundToNearestMinutes(now, Seat_Interval);
  const closing = parse(today!.closeTime, 'kk:mm', now);
  const tooLate = !isBefore(rounded, closing);
  if (tooLate) closedDays.push(formatISO(new Date().setHours(0, 0, 0, 0)));


  const [date, setDate] = useState<DateTime>({
    justDate: null,
    dateTime: null,
  });

  useEffect(() => {
    if (date.dateTime) {
      localStorage.setItem('selectedTime', date.dateTime.toISOString());
      router.push('/menu');
    }
  }, [date.dateTime, router]);

  const times = date.justDate && getOpeningTimes(date.justDate, days);

  return (
    <div className='h-screen flex flex-col justify-center items-center'>
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
  )
};

export default Calendar;