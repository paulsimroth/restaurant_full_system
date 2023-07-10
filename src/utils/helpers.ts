import { Day } from "@prisma/client";
import { add, addMinutes, getHours, getMinutes, isBefore, isEqual, parse } from "date-fns";
import { Seat_Interval, categories, now } from "~/constants";

export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

//Options to select from on the menu
export const selectOptions = categories.map((category) => ({value: category, label: capitalize(category)}));

//get weekday from index
export const weekdayIndexToName = (index: number) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[index];
};

export function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
};

//funtion to round nearest time to the next seatInterval; 
//eg.: you check at 09:02 and you will only be shown a table at 09:30 and so on..., if seatInterval === 30
export const roundToNearestMinutes = (date: Date, interval: number) => {
    const minutesLeftUntilNextInterval = interval - (getMinutes(date) % interval)
    return addMinutes(date, minutesLeftUntilNextInterval);
};

/**
 * @param startDate Day set to open
 * @param dbDays Opening hours for the week
 * @returns Array of seats for every opening hour
 */

export const getOpeningTimes = (startDate: Date, dbDays: Day[]) => {
    const dayOfWeek = startDate.getDay();
    const isToday = isEqual(startDate, new Date().setHours(0,0,0,0));

    const today = dbDays.find((d) => d.dayOfWeek === dayOfWeek);
    if (!today) throw new Error('This day does not exist in Database');

    const opening = parse(today.openTime, 'kk:mm', startDate);
    const closing = parse(today.closeTime, 'kk:mm', startDate);

    let hours: number;
    let minutes: number;

    if (isToday) {
        //Round current Time to nearest interval
        //Throw ERROOR if no more bookings for today
        const rounded = roundToNearestMinutes(now, Seat_Interval);
        const tooLate = !isBefore(rounded, closing);
        if (tooLate) throw new Error('No more bookings today')
        console.log('rounded', rounded);
        
        const isBeforeOpening = isBefore(rounded, opening);
        hours = getHours(isBeforeOpening ? opening : rounded);
        minutes = getMinutes(rounded);
    } else {
        hours = getHours(opening);
        minutes = getMinutes(opening);
    };

    const beginning = add(startDate, {hours, minutes});
    const end = add(startDate, {hours: getHours(closing), minutes: getMinutes(closing)});
    const interval = Seat_Interval;

    //from beginning to end, every interval, generate a date and put that into an array
    const times = [];
    for (let i = beginning; i <= end; i = add(i, {minutes: interval})) {
        times.push(i);
    };

    return times;
};