import dayjs from "dayjs";

export const getDogAge: (birthday?: Date) => string | undefined = (birthday) => {
    if (!birthday) return undefined;

    const age = dayjs().diff(birthday, "years");

    return `${age * 7} (${age} Human)`;
};
