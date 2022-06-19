export type FormInputValidator<T = string> = (value?: T) => string | undefined;
export type FormInputWithError<T = string> = {
    value?: T;
    error?: string;
};
