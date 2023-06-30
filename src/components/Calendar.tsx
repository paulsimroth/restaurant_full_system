'use client'
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import ReactCalendar from 'react-calendar';
import { add, format } from "date-fns";
import { closingTime, seatInterval, openingTime } from '../constants/config';
import { type DateTime } from '@types';


interface indexProps {
  date: DateTime
  setDate: Dispatch<SetStateAction<DateTime>>
}

/* interface DateType {
  justDate: Date | null
  dateTime: Date | null
}; */

const Calendar: FC<indexProps> = ({ setDate, date }) => {

/*   const [date, setDate] = useState<DateType>({
    justDate: null,
    dateTime: null,
  }); */

  function getTimes() {
    if (!date.justDate) return;

    const { justDate } = date;

    const beginning = add(justDate, { hours: openingTime });
    const end = add(justDate, { hours: closingTime });
    const interval = seatInterval;

    const times = [];

    for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      times.push(i)
    }

    return times;
  };

  const times = getTimes();

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
          onClickDay={(date) => setDate((prev) => ({ ...prev, justDate: date }))}
        />
      )}
    </div>
  )
};

export default Calendar;