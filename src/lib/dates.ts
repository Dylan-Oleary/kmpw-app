import dayjs from "dayjs";

export const convertDateToStartOfDay: (date: Date) => Date = (date) =>
    dayjs(date).startOf("day").toDate();

export const isTimestampStale: (timestamp: number, expiryTimestamp: number) => boolean = (
    timestamp,
    expiryTimestamp
) => dayjs(timestamp).isAfter(expiryTimestamp);
