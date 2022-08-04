import dayjs from "dayjs";

export const getDogAge: (
    birthday?: Date,
    diffFormat?: "days" | "months" | "years"
) => string | undefined = (birthday, diffFormat = "years") => {
    if (!birthday) return undefined;

    const age = dayjs().diff(birthday, diffFormat);

    switch (diffFormat) {
        case "days":
            return `${age} day${age === 1 ? "" : "s"}`;
        case "months":
            return age > 0 ? `${age} month${age > 1 ? "s" : ""}` : getDogAge(birthday, "days");
        case "years":
        default:
            return age > 0 ? `${age * 7} (${age} Human)` : getDogAge(birthday, "months");
    }
};
