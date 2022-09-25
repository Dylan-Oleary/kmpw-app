import dayjs from "dayjs";

export const convertDateToStartOfDay: (date: Date) => Date = (date) =>
    dayjs(date).startOf("day").toDate();
