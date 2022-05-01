import dayjs from "dayjs";

export const isTimestampStale: (timestamp: number, expiryTimestamp: number) => boolean = (
    timestamp,
    expiryTimestamp
) => dayjs(timestamp).isAfter(expiryTimestamp);
