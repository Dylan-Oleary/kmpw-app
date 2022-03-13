export const getRatio: (x: number, y: number, precision?: number) => number = (
    x,
    y,
    precision = 2
) => Math.trunc((x / y) * Math.pow(10, precision)) / Math.pow(10, precision);
