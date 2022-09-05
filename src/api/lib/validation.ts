export const is5xxError: (statusCode: string | number) => boolean = (statusCode) =>
    new RegExp(/^5[0-9][0-9]$/, "g").test(String(statusCode));
