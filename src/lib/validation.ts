export const removeAllNonDigits: (value: unknown) => string = (value) =>
    String(value)
        .replace(/[^0-9]/g, "")
        .trim();
