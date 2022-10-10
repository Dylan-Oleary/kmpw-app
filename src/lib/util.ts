export const formatPossessiveNoun: (noun: string) => string = (noun) =>
    `${noun}${noun?.trim()?.endsWith("s") ? "'" : "'s"}`;

export const getRatio: (x: number, y: number, precision?: number) => number = (
    x,
    y,
    precision = 2
) => Math.trunc((x / y) * Math.pow(10, precision)) / Math.pow(10, precision);

export const withAsyncRetry = <T>(
    promise: () => Promise<T>,
    options: { exitErrorCodes?: number[]; numberOfRetries?: number } = {}
): Promise<T> => {
    const { exitErrorCodes, numberOfRetries } = {
        exitErrorCodes: [],
        numberOfRetries: 1,
        ...options
    };

    return promise().catch((error) => {
        const { response } = error;
        const { status = 500 } = response;
        const newNumberOfRetries = numberOfRetries - 1;

        if (exitErrorCodes.includes(status) || newNumberOfRetries <= 0) {
            throw error;
        }

        return withAsyncRetry(promise, { exitErrorCodes, numberOfRetries: newNumberOfRetries });
    });
};
