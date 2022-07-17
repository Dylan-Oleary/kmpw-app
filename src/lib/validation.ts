export const isValidEmail: (value: unknown) => boolean = (value) =>
    new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "g"
    ).test(String(value));

export const removeAllNonDigits: (value: unknown) => string = (value) =>
    String(value)
        .replace(/[^0-9]/g, "")
        .trim();

export const removeAllSpaces: (value: unknown) => string = (value) =>
    String(value).replace(/\s/g, "").trim();
