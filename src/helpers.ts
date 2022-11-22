import {add, endOfMonth, endOfWeek, startOfMonth, startOfWeek, sub} from "date-fns";

export const sentenceCase = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export const makeDateRanges = () => {
    return {
        currentWeek: {
            startDate: startOfWeek(new Date(Date.now()), {weekStartsOn: 1}),
            endDate: endOfWeek(new Date(Date.now()), {weekStartsOn: 1}),
        },
        currentMonth: {
            startDate: add(startOfMonth(new Date(Date.now())), {days: 1}),
            endDate: endOfMonth(new Date(Date.now())),
        },
        previousMonth: {
            startDate: add(startOfMonth(sub(new Date(Date.now()), {months: 1})), {days: 1}),
            endDate: endOfMonth(sub(new Date(Date.now()), {months: 1})),
        }
    };
}